class server_controller{
  constructor(){
    this.ws = new WebSocket.Server({port: 32123});
    ws.addEventListener("open", this.Open);
    ws.addEventListener("message", this.Receive);
  }

  Open(){
    console.log("Listening");
  }

  SendFirstContactMessage(id,board,pieces){
    this.Send({type : "_FIRST_CONTACT_", new_id : id, board : board, pieces : pieces});
  }

  SendBoardUpdateMessage(id,board,pieces){
    this.Send({type : "_BOARD_UPDATE_", board : board});
  }

  SendPiecesUpdateMessage(id,board,pieces){
    this.Send({type : "_PIECES_UPDATE_", pieces : pieces});
  }

  Send(obj){
    this.ws.send(JSON.stringify(obj));
  }

  Receive(event){
    try{
      let msg = JSON.parse(event.data);
      if("id" in msg && "action" in msg){
        this.board.Update(msg.id, msg.action);
      }
    }
    catch(e){
    }
  }
}

let ctrl = new server_controller();

