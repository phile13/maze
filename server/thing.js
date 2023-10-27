class Thing {  
  constructor(id, socket){
    this.socket = socket;
    client.on("message", (evt) => {this.Receive(evt);});
  }
  
  NextId(){
    return this.next_client_id++;
  }

  SendText(msg){
    this.socket.send(msg);
  }

  SendBinary(msg){
    this.socket.send(msg);
  }

  Receive(msg){
    console.log("Receive");
    let data;
    try{
      data = JSON.parse(JSON.parse(evt));
      console.log(data);
      console.log("Text");
      if("NEW" in data){
        this.SendText(`{"ID":${id}}`);
      }
    }
    catch(ex){
      console.log(ex);
      this.SendBinary(evt);
    }   
  }
  
}

module.exports = Thing;
