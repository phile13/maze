class thing {  
  constructor(id, socket){
    this.socket = socket;
    client.on("message", (evt) => {this.Receive(evt);});
  }
  
  NextId(){
    return this.next_client_id++;
  }

  Receive(msg){
    console.log("Receive");
    let data;
    try{
      data = JSON.parse(JSON.parse(evt));
      console.log(data);
      console.log("Text");
      if("NEW" in data){
        client.send(`{"ID":${id}}`);
      }
    }
    catch(ex){
      console.log(ex);
      client.send(evt);
    }   
  }
  
}
