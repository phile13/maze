const WebSocket = require("ws").Server;
const HttpsServer = require('https').createServer;
const fs = require("fs");
const config = require('config');

class ServerController{
  static clients = {};
  
  constructor(){
    this.next_client_id = 0;

    this.ws = null;
    this.server = HttpsServer({
      cert : fs.readFileSync(config.get('cert')),
      key: fs.readFileSync(config.get('key'))
    });
  
    this.ws = new WebSocket({server: this.server});
    this.ws.on("open", (evt) => {console.log("open");this.Open(evt)});
    this.ws.on("connection", (evt) => {console.log("connection");this.Connection(evt)});

    this.server.listen(32123, (err) =>{
      if(err){
        console.log(err);
        process.exit();
      }
      console.log("Server is Listening");
    });
    console.log("Leaving Constructor");

    this.CreateGameSpace(1024, 1024);
  }

  CreateGameSpace(width, height){
    this.width = width;
    this.height = height;
    this.gs = [];
    for(let r = 0; r < this.height; r++){
      let row = [];
      for(let c = 0; c < this.width; c++){
        row.push({});
      }
      this.gs.push(row);
    }
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
    const Thing = require("./thing.js");
    const WalkieTalkie = require("./walkie_talkie.js");
    ServerController.clients[id] = new WalkieTalkie(id, client);
  }

  static SendTextTo(msg, who, hash){
    if(who == "everyone"){
      for (const [id, client] of Object.entries(ServerController.clients)) {
        client.SendText(msg);
      }
    }
    else if(who == "not_in_hash"){
      for (const [id, client] of Object.entries(ServerController.clients)) {
        if(!(hash[id])){
          client.SendText(msg);
        }
      }
    }
    else if(who == "in_hash"){
      for (const [id, client] of Object.entries(ServerController.clients)) {
        if(!(hash[id])){
          client.SendText(msg);
        }
      }
    }
  }

  static SendBinaryTo(msg, who, hash){
    if(who == "everyone"){
      for (const [id, client] of Object.entries(ServerController.clients)) {
        client.SendBinary(msg);
      }
    }
    else if(who == "not_in_hash"){
      for (const [id, client] of Object.entries(ServerController.clients)) {
        if(!(hash[id])){
          client.SendBinary(msg);
        }
      }
    }
    else if(who == "in_hash"){
      for (const [id, client] of Object.entries(ServerController.clients)) {
        if(!(hash[id])){
          client.SendBinary(msg);
        }
      }
    }
  }

  static CheckIfSpaceIsOpen(x,y){
  
  }

  static PickupNearbyTool(x,y){

  }

  static FindSpotToPutTool(x,y){

  }

  static ServerController.UseTool(x, y, tool){

  }
}

module.exports = ServerController;
