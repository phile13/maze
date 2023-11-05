class player extends thing {  
  constructor(){
    super();
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

    this.keycodes["Space"] = "AIM.FIRE";

    let srcSz = { w : 32 , h : 32 };
    let spriteSrcSz = { x: 0, y: 0, w: 32, h: 32 }; 
    this.spritesheet = {
      frames: {
        S : {
            frame: { x: 32, y:0, w:32, h:32 },
            sourceSize: srcSz,
            spriteSourceSize: spriteSrcSz
        },
        N: {
            frame: { x: 64, y:0, w:32, h:32 },
            sourceSize: srcSz,
            spriteSourceSize: spriteSrcSz
        },
        NE: {
            frame: { x: 0, y:32, w:32, h:32 },
            sourceSize: srcSz,
            spriteSourceSize: spriteSrcSz
        },
        SW: {
            frame: { x: 32, y:32, w:32, h:32 },
            sourceSize: srcSz,
            spriteSourceSize: spriteSrcSz
        },
        E: {
            frame: { x: 64, y:32, w:32, h:32 },
            sourceSize: srcSz,
            spriteSourceSize: spriteSrcSz
        },
        W: {
            frame: { x: 0, y:64, w:32, h:32 },
            sourceSize: srcSz,
            spriteSourceSize: spriteSrcSz
        },
        NW: {
            frame: { x: 32, y:64, w:32, h:32 },
            sourceSize: srcSz,
            spriteSourceSize: spriteSrcSz
        },
        SE: {
            frame: { x: 64, y:64, w:32, h:32 },
            sourceSize: srcSz,
            spriteSourceSize: spriteSrcSz
        },
      },
      meta:{
        image: 'imgs/player.png',
        format: 'RGB',
        size : { w: 96, h: 96},
        scale : 1
      },
      animations:{
      }
    }
  }

  HandleTextMessage(text){
    console.log(text);
  }
  
  HandleBlobMessage(blob){
   
  }

  HandleKeyDown(code){
    let parts = code.split(".");
    this.SendText({TYPE:parts[0], ACTION:parts[1]});
  }
  
  HandleKeyUp(code){

  }
  
}
