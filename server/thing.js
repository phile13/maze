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
      let json = msg;
      console.log(json);
      console.log("Text");
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
