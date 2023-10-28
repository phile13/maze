const ServerController = require("./server_controller.js");
const Thing = require("./thing.js");

class WalkieTalkie extends Thing{
  constructor(id, socket){
    super(id, socket);
    this.type = "WALKIE_TALKIE";
  }

  HandleReceiveJSONObj(json){

  }

  HandleReceiveBinary(binary){
    let hash = {};
    hash[this.id] = true;    
    ServerController.SendBinaryTo(binary, "not_in_hash" , hash);
  }
}

module.exports = WalkieTalkie;
