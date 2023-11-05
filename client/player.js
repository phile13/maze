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
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAmhJREFUeF7tnVFuwyAUBMkF2vsfs72AK1Jb/WeQJm6m/+sHO2/BqSB5jP5UBx5q9YqPAMhNEIAAyA7I5UtAAGQH5PIlIACyA3L5EhAA2QFY/hjjeIz1z1MoAbQ4nPv4GMfxPR5oDmQMO+rTwR8D0CeTP7W3rx8A1gXH2QHLPi4L5/JzjZ2sgavzn/G/tNYypC9B77wHzLl/jmNQ+MsJmN33zgDm/EtAb0HPfQClaHUP6C3o14EAwAak3RsAGQBcQZLTBOQgdCAA0EAqDwB1EOoDAA2k8gBQB6E+ANBAKg8AdRDqAwANpPIAUAehPgDQQCoPAHUQ6gMADaTyAFAHoT4A0EAqDwB1EOoDAA2k8gBQB6E+ANBAKg8AdRDqAwANpPIAUAehHgEwjybOY4Ff55kw43DwdTiZng9dBnCaP/kvPwM2z5Tf/lwSNQ+fj4cQ3htAS9AY6hJ0rj80RUshuPYAY/2/BrzjjgAy7xUSEABpEy4Bvzm8/Sa4tP79ifD80RIUAN6AAWAR0BPAhp9a/RSb/fK/EQIQAL8H6Cbsz+DmIwiADDAAAZAdkMuXgADIDsjlS0AAZAfk8iUgALIDcvkSEADZAbl8CQiA7IBcvgQEQHZALl8C7grAPBUne7a1PErAjq/uJbP5D02AALzCwSz69fGkAXZolwHYFzTs+jvMn89YBjDFLUEcAwYw72lZR8Sve1pWfW5/CdjhIXoGTgD9BQky+t6Cuh9A+uepRQl4hdfQDXPAJpIHBIC4t0FLAWwYwns/IgAy/wAEQHZALl8CAiA7IJcvAQGQHZDLl4AAyA7I5UuADOAHgUOhYYoklvEAAAAASUVORK5CYII=',
        format: 'RGBA8888',
        size : { w: 96, h: 96},
        scale : 1
      },
      animations:{
      }
    }
  }

  HandleTextMessage(text){
    console.log("Player:" + text);
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
