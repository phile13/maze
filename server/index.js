class server_controller{
  constructor(){
    const WebSocket = require('ws');
    this.ws = new WebSocket.Server({port: 32123});
    this.ws.on("open", (evt) => {this.Open(evt)});
    this.ws.on("connection", (evt) => {this.Connection(evt)});
    this.clients = {};
    this.next_client_id = 0;
    console.log("Leaving Constructor");
  }

  NextId(){
    return this.next_client_id++;
  }
  
  Open(){
    console.log("Listening");
  }

  Connection(client){
    console.log("Connection");
    let id = this.NextId();
    this.clients[client] = id;
    this.clients[id] = client;
    client.on("message", (evt) => {this.Receive(evt)});
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
    let data;
    try{
      data = JSON.parse(event);
    }
    catch(ex){
      console.log(ex);
      return;
    }
    console.log(data);
    if(event.data){
      if(event.data instanceof Blob){
        console.log("Blob");
        this.SendBinary(event.data);
      }
      else{
        try{
          let msg = JSON.parse(event.data);
          console.log("Text");
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

