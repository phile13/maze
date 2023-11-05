class thing {  
  constructor(){
    this.type = "thing";
    this.keycodes = {};
    this.id = -1;
    this.port = 32123;
    this.ws = new WebSocket(`wss://fiorra.xyz:${this.port}`);
    this.ws.addEventListener("open", (evt) => {this.Open(evt)});
    this.ws.addEventListener("message", (evt) => {this.Receive(evt)});
    document.addEventListener('keydown',(evt) => {this.OnKeyDownHandler(evt)});
    document.addEventListener('keyup',(evt) => {this.OnKeyUpHandler(evt)});
    console.log("walkie talkie created");
  }

  Open(){
    console.log("walkie talkie created");
    this.SendText(JSON.stringify({NEW:this.type}));
  }

  FirstReceive(event){
    console.log("FirstReceive");
    if(event.data){
      try{
        let msg = JSON.parse(event.data);
        if("ID" in msg){
          this.id = msg['ID'];
        }
        if("BOARD" in msg){
          this.board = new gamespace(msg.['BOARD']);
        }
      }
      catch(e){
        console.log(e);
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
    if(this.id == -1){
      this.FirstReceive(event);
    }
    else if(event.data){
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
    console.log(`text:${text}`);
  }
  
  HandleBlobMessage(blob){
    console.log("blob");
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
