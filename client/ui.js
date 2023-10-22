class ui {
  static keycodes = null;
  
  constructor(type, board_element_id){
      
      if(ui.keycodes == null){
        ui.keycodes = {};
      
        ui.keycodes["Numpad7"] = "MOVE.NW";
        ui.keycodes["Numpad8"] = ui.keycodes["ArrowUp"] = "MOVE.N"; 
        ui.keycodes["Numpad9"] = "MOVE.NE";
        ui.keycodes["Numpad6"] = ui.keycodes["ArrowRight"] = "MOVE.E";
        ui.keycodes["Numpad3"] = "MOVE.SE"; 
        ui.keycodes["Numpad2"] = ui.keycodes["ArrowDown"] = "MOVE.S";  
        ui.keycodes["Numpad1"] = "MOVE.SW"; 
        ui.keycodes["Numpad4"] = ui.keycodes["ArrowLeft"] = "MOVE.W";
  
        ui.keycodes["KeyA"] = "AIM.L";
        ui.keycodes["KeyD"] = "AIM.R";
        ui.keycodes["KeyW"] = "AIM.U";
        ui.keycodes["KeyX"] = "AIM.D";

        
        ui.keycodes["Space"] = "AIM.FIRE";
      }

      this.type = type;
      this.board = new client_board(board_element_id);
      this.cc = new client_controller(this); 
      this.mic = new client_audio(this.cc);
    
      document.addEventListener('keydown',OnKeyDownHandler);
      document.addEventListener('keydown',OnKeyUpHandler);
  }

  OnKeyDownHandler(event){
    if("code" in event && event.code in ui.keycodes){
      if(event.code in ui.keycodes){ 
        this.cc.Send(ui.keycodes[event.code]);
      }
      else if(event.code == "NumpadAdd"){
        this.mic.start();
      }
    }
  }
  
  OnKeyUpHandler(event){
    if(event.code == "NumpadAdd"){
      this.mic.stop();
    }
  }
}
