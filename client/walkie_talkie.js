class walkie_talkie extends thing {  
  constructor(){
    super();
    this.type = "walkie_talkie";
    this.keycodes["KeyM"] = "MIC";
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
    try{
      this.talkie.src = URL.createObjectURL(new Blob([blob] ,{type:'audio/webm'}));
      this.talkie.load();
    }
    catch(ex){
      console.log(ex);
    }
  }

  HandleKeyDown(code){

  }
  
  HandleKeyUp(code){
    if(code == "MIC"){
      this.Start();
    }
  }
  
  Start(){
    if(this.ready){

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          let stream_being_captured = stream;
          let media_recorder = new MediaRecorder(stream_being_captured, { 'mimeType' : 'audio/webm' });
          let counter = 0;
          
          media_recorder.addEventListener("dataavailable", (evt) => {
            if(counter >= 1){ 
              media_recorder.stop();
              stream_being_captured.getTracks().forEach(track => track.stop());
            }
            else if(evt.data && evt.data instanceof Blob && evt.data.type == 'audio/webm;codecs=opus' && evt.data.size > 1){
              this.SendBinary(evt.data);
            }
            counter++;
          });
          
          media_recorder.start(3000);
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
