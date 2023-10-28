const ServerCtrl = require("./index.js");

class walkie_talkie extends thing{
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
