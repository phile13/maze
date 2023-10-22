class client_controller{  
  constructor(port){
    this.ui = ui;
    this.id = -1;
    this.ws = new WebSocket(`ws://74.208.107.245:${port}`);
    ws.addEventListener("open", this.Open);
    ws.addEventListener("message", this.Receive);
  }

  Open(){
    this.Send("NEW" + this.ui.type);
  }

  Send(action){
    this.ws.send(`{"id":${this.id},"action":"${action}"}`);
  }

  SendBinary(blob){
    this.ws.send(blob);
  }

  Receive(event){
    try{
      let msg = JSON.parse(event.data);
      if("type" in msg and msg.type == "_GAME_UPDATE_"){
        this.ui.board.Update(msg);
      }
    }
    catch(e){
    }
  }
}
