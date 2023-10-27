const Thing = require("./thing.js");

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
    this.clients[id] = new Thing(id, client);
  }
}

let ctrl = new server_controller();

