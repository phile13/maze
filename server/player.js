const ServerController = require("./server_controller.js");
const Thing = require("./thing.js");

class Player extends Thing{
  constructor(id, socket){
    super(id, socket);
    this.type = "PLAYER";
    this.dirs_map = {N:[0,-1], NE:[1,-1], E:[1,0], SE:[1,1], S:[0,1], SW:[-1,1], W:[-1,0], NW:[-1,-1] };
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
    if(action in this.dirs_map){
      let dir = this.dirs_map[action];
      if(ServerController.CheckIfSpaceIsOpen(this.x + dir[0], this.y + dir[1])){
        this.x += dir[0];
        this.y += dir[1];
        this.heading = action;
        ServerController.SendTextTo(`{"ID":${this.id},"TYPE":"${this.type}","X":${this.x},"Y":${this.y},"HEADING":"${action}","TOOL":"${(this.tool)?this.tool.id:""}","HEALTH":${this.health}}`, "everyone");
      }
    }
  }

  TryToPickup(action){
    if(this.tool == null){
      this.tool = ServerController.PickupNearbyTool(this.x, this.y);
      if(this.tool != null){
        this.tool.x = this.x;
        this.tool.y = this.y;
        this.tool.owned = true;
        ServerController.SendTextTo(`{"ID":${this.tool.id},"OWNED":"true"}`, "everyone");
      }
    }
  }

  TryToPutDown(action){
    if(this.tool != null){
      let loc = ServerController.FindSpotToPutTool(this.x, this.y);
      if(loc.length == 2){
        this.tool.x = loc[0];
        this.tool.y = loc[1];
        this.tool.owned = false;
        ServerController.SendTextTo(`{"ID":${this.tool.id},"X":${this.tool.x},"Y":${this.tool.y},"OWNED":"false"}`, "everyone");
      }
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
