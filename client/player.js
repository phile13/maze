class player {  
  constructor(){
      this.type = "player";    
      this.keycodes["Numpad7"] = "MOVE.NW";
      this.keycodes["Numpad8"] = this.keycodes["ArrowUp"] = "MOVE.N"; 
      this.keycodes["Numpad9"] = "MOVE.NE";
      this.keycodes["Numpad6"] = this.keycodes["ArrowRight"] = "MOVE.E";
      this.keycodes["Numpad3"] = "MOVE.SE"; 
      this.keycodes["Numpad2"] = this.keycodes["ArrowDown"] = "MOVE.S";  
      this.keycodes["Numpad1"] = "MOVE.SW"; 
      this.keycodes["Numpad4"] = this.keycodes["ArrowLeft"] = "MOVE.W";

      this.keycodes["KeyA"] = "AIM.L";
      this.keycodes["KeyD"] = "AIM.R";
      this.keycodes["KeyW"] = "AIM.U";
      this.keycodes["KeyX"] = "AIM.D";

      ui.keycodes["Space"] = "AIM.FIRE";
  }

  HandleKeyDown(code){

  }
  
  HandleKeyUp(code){

  }
  
}
