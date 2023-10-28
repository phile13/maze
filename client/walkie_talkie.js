class walkie_talkie extends thing {  
  constructor(){
    super();
    this.type = "walkie_talkie";
    this.keycodes["NumpadAdd"] = "MIC";
    this.mime_type = null;
    this.media_recorder = null;
    this.stream_being_captured = null;
    this.empty_message_count = 0;
    this.talkie = document.querySelector("#talkie");
    
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && typeof Audio !== "undefined")) {
      this.ready = false;
    }
    else{
      this.ready = true;
    }
  }

  HandleTextMessage(text){
    
  }
  
  HandleBlobMessage(blob){
    return new Promise((resolve) => {
      try{
        this.talkie.src = URL.createObjectURL(new Blob([blob] ,{type:'audio/webm'}));
        this.talkie.load();
        resolve();
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
      //cleanup
      if(this.media_recorder){
        this.media_recorder.stop();
      }
      if(this.stream_being_captured){
        this.stream_being_captured.getTracks().forEach(track => track.stop());
      }
      
      this.mime_type = null;
      this.media_recorder = null;
      this.stream_being_captured = null;
      this.empty_message_count = 0;

      //get stream
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          //start recording 
          this.stream_being_captured = stream;
          this.media_recorder = new MediaRecorder(this.stream_being_captured, { 'mimeType' : 'audio/webm' });
          this.media_recorder.addEventListener("dataavailable", (evt) => {

            //capture recorded data
            if(this.empty_message_count > 10){ //stop capture
              this.media_recorder.stop();
              this.stream_being_captured.getTracks().forEach(track => track.stop());
              this.mime_type = null;
              this.media_recorder = null;
              this.stream_being_captured = null;
              this.empty_message_count = 0;
            }
            else if(evt.data && evt.data instanceof Blob && evt.data.type == 'audio/webm;codecs=opus' && evt.data.size > 1){
              this.SendBinary(evt.data);
              this.empty_message_count++;
            }
            else{
              this.empty_message_count++;
            }
          });
          this.mime_type = this.media_recorder.mimeType;
          
          this.media_recorder.start(250);
        })
        .catch(error => {
          console.log(error.message);
        });
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
      this.media_recorder = null;
      this.stream_being_captured = null;
      this.empty_message_count = 0;
   }
  }
}
