class Thing {  
  constructor(id, socket){
    this.id = id;
    this.socket = socket;
    this.socket.on("message", (evt) => {this.Receive(evt);});
  }
  
  SendText(msg){
    this.socket.send(msg);
  }

  SendBinary(msg){
    this.socket.send(msg);
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
        else{
          this.HandleReceiveBinary(msg);
        }
      }
    }
    catch(ex){
      console.log(ex);
    }   
  }

  HandleReceiveJSONObj(json){

  }

  HandleReceiveBinary(binary){

  }
}




module.exports = Thing;
