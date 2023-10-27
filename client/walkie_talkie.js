class walkie_talkie extends thing {
  constructor(){
    super();
    this.type = "walkie_talkie";
    this.keycodes["NumpadAdd"] = "MIC";
    this.mime_type = null;
    this.mediaRecorder = null;
    this.stream_being_captured = null;
    
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      this.ready = false;
    }
    else{
      this.ready = true;
    }
  }

  HandleTextMessage(text){
    
  }
  
  HandleBlobMessage(blob){
    
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
          .then(stream => {
            this.stream_being_captured = stream;
            this.media_recorder = new MediaRecorder(this.stream_being_captured, { 'mimeType' : 'audio/webm' });
            this.media_recorder.addEventListener("dataavailable", (evt) => {this.HandleRecordingData(evt)});
            this.mime_type = this.media_recorder.mimeType;
            
            this.media_recorder.start(50);
          })
          .catch(error => {
            console.log(error.message);
          });
      }
  }

  HandleRecordingData(evt){
    this.SendBinary(new Blob(evt.data, { 'type' : 'audio/webm' }));
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
   }
  }
}
