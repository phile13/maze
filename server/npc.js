const ServerController = require("./server_controller.js");

class NPC {  
  constructor(type){
    this.id = let id = ServerController.NextId();
    this.type = type;
    if(this.type in this){
      this[this.type]();
    }
    this.x = 0;
    this.y = 0;
    this.heading = 'S';
    this.tool = null;
    this.health = 100;
    this.speed = 1000;
  }

  send_message(){
    ServerController.SendTextTo(`{"ID":${this.id},"TYPE":"MOVE","THING":"${this.type}","X":${this.x},"Y":${this.y},"HEADING":"${json.ACTION}","TOOL":"${(this.tool)?this.tool.id:""}","HEALTH":${this.health}}`, "everyone", {});
  }
  
  zombie(){
    
    setInterval(()=>{
      
    }, this.speed);
  }
  
}
