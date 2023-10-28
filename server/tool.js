class Tool extends Thing {  
  constructor(id, socket){
    this.id = id;
    this.type = "TOOL";
    this.x = 0;
    this.y = 0;
    this.heading = "S";
    this.health = 100;

    this.socket = socket;
    this.socket.on("message", (evt) => {this.Receive(evt);});
  }
  
  SendText(msg){
    this.socket.send(msg);
  }

  SendBinary(msg){
    this.socket.send(msg);
  }

  HandleReceiveJSONObj(json){

  }

  HandleReceiveBinary(binary){

  }

  Pickup(){
    ServerController.SendTextTo(`{"ID":${this.tool.id},"X":${this.tool.x},"Y":${this.tool.y},"OWNED":"false"}`, "everyone");
  }

  PutDown(){
    ServerController.SendTextTo(`{"ID":${this.tool.id},"X":${this.tool.x},"Y":${this.tool.y},"OWNED":"false"}`, "everyone");
  }

  Use(action){
    ServerController.SendTextTo(`{"ID":${this.tool.id},"X":${this.tool.x},"Y":${this.tool.y},"OWNED":"false"}`, "everyone");
  }
          
}

module.exports = Tool;
