const Thing = require("./thing.js");
const WebSocket = require("ws").Server;
const HttpsServer = require('https').createServer;
const fs = require("fs");
const express = require("express");

class server_controller{
  constructor(){
    this.next_client_id = 0;
    this.clients = {};

    this.express = express();
    this.router = express.Router();
    this.router.all("/",(req,res) => {
      res.send("hi there");
    });
    this.express.use("/", this.router);
    

    
    this.ws = null;
    this.server = HttpsServer({
      cert : fs.readFileSync("/etc/ssl/certs/fiorra.xyz_ssl_certificate.cer"),
      key: fs.readFileSync("/etc/ssl/private/_.fiorra.xyz_private_key.key")
    }, this.express);
  
    

    this.ws = new WebSocket({server: this.server});
    this.ws.on("open", (evt) => {console.log("open");this.Open(evt)});
    this.ws.on("connection", (evt) => {console.log("connection");this.Connection(evt)});

    this.server.on('error', (err) => {console.error(err);});
    this.server.listen(32123, (err) =>{
      if(err){
        console.log(err);
        process.exit();
      }
      console.log("Server is Listening");
    });
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

