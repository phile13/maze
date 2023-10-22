class client_audio {
  constructor(socket){
    this.socket = socket;
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
  
  start(){
    if(this.ready){
      this.stop();
      navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            this.stream_being_captured = stream;
            this.media_recorder = new MediaRecorder(this.stream_being_captured, { 'mimeType' : 'audio/webm' });
            this.media_recorder.addEventListener("dataavailable", this.recording_handler);
            this.mime_type = this.media_recorder.mimeType;
            
            this.media_recorder.start(50);
          })
          .catch(error => {
            console.log(error.message);
          });
      }
  }

  recording_handler(evt){
    this.socket.SendBinary(new Blob(evt.data, { 'type' : 'audio/webm' }));
  }
  
 stop(){
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
