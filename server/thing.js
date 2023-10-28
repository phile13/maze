class Thing {  
  constructor(id, socket){
    this.id = id;
    this.type = "THING";
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
    console.log("HandleReceiveJSONObj.Thing");
  }

  HandleReceiveBinary(binary){

  }

  Receive(msg){
    console.log("Receive");
    try{
      if(typeof msg == "object"){
        if(msg[0] == 34 && msg[1] == 123 && msg[2] == 92 && msg[3] == "34"){
          let json = JSON.parse(msg);
          let obj = JSON.parse(json);
          if("NEW" in obj){
            this.SendText(`{"ID":${this.id}}`);
          }
          else{
            this.HandleReceiveJSONObj(obj);
          }
        }
        else if((msg[0] == 123 && msg[1] == 34)){
          let obj = JSON.parse(msg);
          console.log(obj);
          if("NEW" in obj){
            this.SendText(`{"ID":${this.id}}`);
          }
          else{
            this.HandleReceiveJSONObj(obj);
          }
        }
        else{
          console.log(msg);
          this.HandleReceiveBinary(msg);
        }
      }
    }
    catch(ex){
      console.log(ex);
    }   
  }
}

module.exports = Thing;
