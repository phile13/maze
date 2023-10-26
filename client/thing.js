class thing {  
  constructor(){
    this.type = "thing";
    this.id = -1;
    this.port = 32123;
    this.ws = new WebSocket(`ws://74.208.107.245:${port}`);
    ws.addEventListener("open", this.Open);
    ws.addEventListener("message", this.FirstReceive, true);
    document.addEventListener('keydown',OnKeyDownHandler);
    document.addEventListener('keydown',OnKeyUpHandler);
  }

  Open(){
    this.Send("NEW:" + this.type);
  }

  FirstReceive(event){
    console.log("FirstReceive");
    if(event.data){
      try{
        let msg = JSON.parse(event.data);
        if("id" in msg){
          this.id = msg;
          ws.addEventListener("message", this.Receive);
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
}
