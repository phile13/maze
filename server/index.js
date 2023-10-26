class server_controller{
  constructor(){
    const WebSocket = require('ws');
    this.ws = new WebSocket.Server({port: 32123});
    this.ws.on("open", this.Open);
    this.ws.on("message", this.Receive);
    console.log("Leaving Constructor");
  }

  Open(){
    console.log("Listening");
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

let ctrl = new server_controller();

