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
    if(typeof msg == "object"){
      if(type in msg){
        console.log(msg.type);
      }
    }
    
    try{
      console.log(typeof msg);
      let json = JSON.parse(msg);
      json = JSON.parse(json);
      if("NEW" in json){
        this.SendText(`{"ID":${this.id}}`);
      }
    }
    catch(ex){
      console.log(ex);
      this.SendBinary(msg);
    }   
  }
  
}

module.exports = Thing;
