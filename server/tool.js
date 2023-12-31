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
    return `{"ID":${this.tool.id},"X":${this.tool.x},"Y":${this.tool.y},"OWNED":"true"}`;
  }

  PutDown(){
    return `{"ID":${this.tool.id},"X":${this.tool.x},"Y":${this.tool.y},"OWNED":"false"}`;
  }

  Use(action){
    return `{"ID":${this.tool.id},"X":${this.tool.x},"Y":${this.tool.y},"OWNED":"true"}`;
  }
          
}

module.exports = Tool;
