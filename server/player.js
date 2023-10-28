const ServerController = require("./server_controller.js");
const Thing = require("./thing.js");

class Player extends Thing{
  constructor(id, socket){
    super(id, socket);
    this.tool = null;
  }

  HandleReceiveJSONObj(json){
    if("TYPE" in json && "ACTION" in json){
      switch(json.TYPE){
        case "MOVE":
          this.TryToMove(json.ACTION);
          break;
        case "PICKUP":
          this.TryToPickup(json.ACTION);
          break;
        case "PUTDOWN":
          this.TryToPutDown(json.ACTION);
          break;
        case "USE":
          this.TryToUse(json.ACTION);
          break;
      }
    }
    ServerController.SendBinaryTo(json, "everyone");
  }

  TryToMove(action){
    
  }

  TryToPickup(action){
    if(this.tool == null){
      //look in gamespace for nearby item
    }
  }

  TryToPutDown(action){
    if(this.tool != null){
      //look in gamespace for place to put item
    }
  }

  TryToUse(action){
    if(this.tool != null){
      this.tool.Use(action);
    }
  }
  
  HandleReceiveBinary(binary){
  }
}

module.exports = Player;
