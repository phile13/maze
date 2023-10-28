const ServerController = require("./server_controller.js");
const Thing = require("./thing.js");

class WalkieTalkie extends Thing{
  constructor(id, socket){
    super(id, socket);
  }

  HandleReceiveJSONObj(json){

  }

  HandleReceiveBinary(binary){
    let hash = {};
    hash[this.id] = true;
    console.log(typeof ServerController);
    console.log(typeof ServerController.SendBinaryTo);
    for (const [k, v] of Object.entries(ServerController)) {
      console.log(`${k} - ${v}`);
    }
    
    ServerController.SendBinaryTo(binary, "not_in_hash" , hash);
  }
}

module.exports = WalkieTalkie;
