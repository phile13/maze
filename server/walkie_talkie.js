const ServerCtrl = require("./index.js");
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
    ServerCtrl.SendBinaryTo(binary, "not_in_hash" , hash);
  }
}

module.exports = WalkieTalkie;
