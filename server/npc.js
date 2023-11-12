const ServerController = require("./server_controller.js");

class NPC {  
  static headings = ['N','NE','E','SE','S','SW','W','NW'];
  
  constructor(type){
    this.id = ServerController.NextId();
    this.type = type;
    if(this.type in this){
      this[this.type]();
    }
    this.x = 0;
    this.y = 0;
    this.heading = 'S';
    this.tool = null;
    this.health = 100;
    this.speed = 2000;
  }

  send_message(){
    ServerController.SendTextTo(`{"ID":${this.id},"TYPE":"MOVE","THING":"${this.type}","X":${this.x},"Y":${this.y},"HEADING":"${this.heading}","TOOL":"${(this.tool)?this.tool.id:""}","HEALTH":${this.health}}`, "everyone", {});
  }

  random_direction(){
    return NPC.headings[Math.random * 8];
  }
  
  ZOMBIE(){
    setInterval(()=>{
      if(ServerController.MoveTo(this.id, this.heading)){
          this.send_message();
      }
      else{
        
        do{
          this.heading = this.random_direction();
        }while(ServerController.MoveTo(this.id, this.heading));
        
        this.send_message();
      }
    }, 1000);
  }
  
}

module.exports = NPC;
