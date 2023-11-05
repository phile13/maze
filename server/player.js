const ServerController = require("./server_controller.js");
const Thing = require("./thing.js");

class Player extends Thing{
  constructor(id, socket, board){
    super(id, socket, board);
    this.type = "PLAYER";
    this.dirs_map = {N:[0,-1], NE:[1,-1], E:[1,0], SE:[1,1], S:[0,1], SW:[-1,1], W:[-1,0], NW:[-1,-1] };
  }

  HandleReceiveJSONObj(json){
    //console.log("HandleReceiveJSONObj.Player");
    if("TYPE" in json && "ACTION" in json){
      switch(json.TYPE){
        case "MOVE":
          if(ServerController.MoveTo(this.id, json.ACTION)){
            this.heading = json.ACTION;
            ServerController.SendTextTo(`{"ID":${this.id},"TYPE":"MOVE","THING":"${this.type}","X":${this.x},"Y":${this.y},"HEADING":"${json.ACTION}","TOOL":"${(this.tool)?this.tool.id:""}","HEALTH":${this.health}}`, "everyone", {});
          }
          break;
        case "PICKUP":
          if(ServerController.PickupNearbyTool(this.id)){
            ServerController.SendTextTo(this.tool.Pickup(),"everyone", {});
          }
          break;
        case "PUTDOWN":
          if(ServerController.FindSpotToPutTool(this.id)){
            ServerController.SendTextTo(this.tool.PutDown(),"everyone", {});
          }
          break;
        case "USE":
          this.TryToUse(json.ACTION);
          break;
      }
    }
  }

  
  TryToUse(action){
    if(this.tool != null){
      ///let affected_by = ServerController.UseTool(this.x, this.y, this.tool);
      //for(let ab = 0; ab < affected_by.length; ab++){
      //   ServerController.SendTextTo(affected_by[ab],"everyone", {});
      //}
    }
  }
  
  HandleReceiveBinary(binary){
  }
}

module.exports = Player;
