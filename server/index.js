class server_controller{
  constructor(){
    const WebSocket = require('ws');
    this.ws = new WebSocket.Server({port: 32123});
    this.ws.on("open", (evt) => {this.Open(evt)});
    this.ws.on("connection", (evt) => {this.Connection(evt)});
    this.next_client_id = 0;
    this.clients = {};
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
        data = JSON.parse(JSON.parse(evt));
        console.log(data);
        console.log("Text");
        if("NEW" in data){
          client.send(`{"ID":${id}}`);
        }
      }
      catch(ex){
        console.log(ex);
        client.send(evt);
      }   
    });
  }
}

let ctrl = new server_controller();

