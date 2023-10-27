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
    client.on("message", (evt) => {
      console.log("Receive");
      let data;
      try{
        data = JSON.parse(event);
        console.log("Text");
        if("id" in msg && "action" in msg){
          client.send(`{"ID":${id}}`);
        }
      }
      catch(ex){
        client.send(obj);
      }   
    });
  }
}

let ctrl = new server_controller();

