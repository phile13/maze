class client_controller{  
  constructor(port){
    this.ui = ui;
    this.id = -1;
    this.ws = new WebSocket(`ws://74.208.107.245:${port}`);
    ws.addEventListener("open", this.Open);
    ws.addEventListener("message", this.Receive);
  }

  Open(){
    this.Send("NEW" + this.ui.type);
  }

  Send(action){
    this.ws.send(`{"id":${this.id},"action":"${action}"}`);
  }

  SendBinary(blob){
    this.ws.send(blob);
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
        this.SendBinary(event.data);
      }
      else{
        try{
          let msg = JSON.parse(event.data);
          if("id" in msg && "action" in msg){
            this.SendText(event.data);
          }
        }
        catch(e){
        }
      }
    }
  }
}
