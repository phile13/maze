class client_controller{  
  constructor(type){
    this.id = -1;
    this.type = type;
    this.port = 32123;
    this.ws = new WebSocket(`ws://74.208.107.245:${port}`);
    ws.addEventListener("open", this.Open);
    ws.addEventListener("message", this.Receive);
  }

  Open(){
    this.Send("NEW:" + this.type);
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
