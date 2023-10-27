class thing {  
  constructor(){
    this.type = "thing";
    this.keycodes = {};
    this.id = -1;
    this.port = 32123;
    this.ws = new WebSocket(`ws://74.208.107.245:${this.port}`);
    this.ws.addEventListener("open", (evt) => {this.Open(evt)});
    this.ws.addEventListener("message", (evt) => {this.FirstReceive(evt)}, true);
    document.addEventListener('keydown',(evt) => {this.OnKeyDownHandler(evt)});
    document.addEventListener('keydown',(evt) => {this.OnKeyUpHandler(evt)});
  }

  Open(){
    this.SendText(`{"NEW":"${this.type}"}`);
  }

  FirstReceive(event){
    console.log("FirstReceive");
    if(event.data){
      try{
        let msg = JSON.parse(event.data);
        if("id" in msg){
          this.id = msg;
          this.ws.addEventListener("message", (evt) => {this.Receive(evt)});
        }
      }
      catch(e){
      }
    }
  }

  SendText(obj){
    console.log("SendText");
    this.ws.send(JSON.stringify(obj));
  }

  SendBinary(obj){
    console.log("SendBinary");
    this.ws.send(obj);
  }

  Receive(event){
    console.log("Receive");
    if(event.data){
      if(event.data instanceof Blob){
        this.HandleBlobMessage(event.data);
      }
      else{
        try{
          let msg = JSON.parse(event.data);
          this.HandleTextMessage(msg);
        }
        catch(e){
        }
      }
    }
  }

  HandleTextMessage(text){
    
  }
  
  HandleBlobMessage(blob){
    
  }

  HandleKeyDown(code){

  }

  HandleKeyUp(code){

  }

  OnKeyDownHandler(event){
    if("code" in event && event.code in this.keycodes){
      if(event.code in this.keycodes){ 
        this.HandleKeyDown(this.keycodes[event.code]);
      }
    }
  }
  
  OnKeyUpHandler(event){
    if("code" in event && event.code in this.keycodes){
      if(event.code in this.keycodes){ 
        this.HandleKeyUp(this.keycodes[event.code]);
      }
    }
  }
}
