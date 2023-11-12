const ServerController = require("./server_controller.js");

class NPC {  
  constructor(type){
    this.id = let id = ServerController.NextId();
    this.type = type;
    if(this.type in this){
      this[this.type]();
    }
  }

  zombie(){
    
  }
  
}
