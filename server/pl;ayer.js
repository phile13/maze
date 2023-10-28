const ServerController = require("./server_controller.js");
const Thing = require("./thing.js");

class Player extends Thing{
  constructor(id, socket){
    super(id, socket);
  }

  HandleReceiveJSONObj(json){
    ServerController.SendBinaryTo(binary, "not_in_hash" , hash);
  }

  HandleReceiveBinary(binary){
  }
}

module.exports = Player;
