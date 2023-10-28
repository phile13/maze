class walkie_talkie extends thing {
  constructor(){
    super();
    this.type = "walkie_talkie";
    this.keycodes["NumpadAdd"] = "MIC";
    this.mime_type = null;
    this.mediaRecorder = null;
    this.stream_being_captured = null;
    this.empty_message_count = 0;
    
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      this.ready = false;
    }
    else{
      this.ready = true;
    }
  }

  HandleTextMessage(text){
    
  }
  
  async HandleBlobMessage(blob){
    return new Promise((resolve) => {
      try{
        const buf = await blob.arrayBuffer();
        const audioBlob = new Blob(buf ,{type:'audio/webm;codecs=opus'});
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        resolve({ audioBlob, audioUrl, play });
      }
      catch(ex){
        console.log(ex);
      }
    });
  }

  HandleKeyDown(code){
    if(code == "MIC"){
      this.Start();
    }
  }
  
  HandleKeyUp(code){
    if(code == "MIC"){
      this.Stop();
    }
  }
  
  Start(){
    if(this.ready){
      this.Stop();
      navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
            this.stream_being_captured = stream;
            this.media_recorder = new MediaRecorder(this.stream_being_captured, { 'mimeType' : 'audio/webm' });
            this.media_recorder.addEventListener("dataavailable", (evt) => {this.HandleRecordingData(evt)});
            this.mime_type = this.media_recorder.mimeType;
            
            this.media_recorder.start(250);
          })
          .catch(error => {
            console.log(error.message);
          });
      }
  }

  HandleRecordingData(evt){
    if(this.empty_message_count > 10){
      this.Stop();
    }
    else if(evt.data && evt.data instanceof Blob && evt.data.type == 'audio/webm;codecs=opus' && evt.data.size > 1){
      this.SendBinary(evt.data);
      this.empty_message_count++;
    }
    else{
      this.empty_message_count++;
    }
  }
  
 Stop(){
   if(this.ready){
      if(this.media_recorder){
        this.media_recorder.stop();
      }
      if(this.stream_being_captured){
        this.stream_being_captured.getTracks().forEach(track => track.stop());
      }
      
      this.mime_type = null;
      this.mediaRecorder = null;
      this.stream_being_captured = null;
      this.empty_message_count = 0;
   }
  }
}
