import * as THREE from 'three';

class gamespace{
  constructor(board, id, type, x, y){
    //init
    this.board = board;
    this.boardScale = 64;
    this.boardSize = { height : this.board.length , width : this.board[0].length };
    this.boardCenter = { x : this.boardScale * this.boardSize.width / 4 , y : this.boardScale * this.boardSize.height / 4 };
    this.canvasSize = { height : document.getElementById('board').height , width : document.getElementById('board').width };
    this.canvasCenter = { x : this.canvasSize.width / 2 , y : this.canvasSize.height / 2 };
    
    //create game stage
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
    


    document.body.appendChild(this.app.view);

    //create game world  
    this.colors = ["lightgrey","darkgrey"];
    this.floor = new PIXI.Graphics();
    this.floor.beginFill("lightgrey");
    this.floor.drawRect(0, 0, this.boardSize.width * this.boardScale, this.boardSize.height * this.boardScale);
    this.floor.endFill();
    this.app.stage.addChild(this.floor);

    
    for (let r = 0; r < this.boardSize.height; r++) {
        let row = this.board[r];
        for (let c = 0; c < this.boardSize.width; c++) {
            if(row[c] == 1){
              let geometry = new THREE.BoxGeometry( 1, 4, 1 );
              let material = new THREE.MeshBasicMaterial( { color: colors[i%3] } );
              let cube = new THREE.Mesh( geometry, material );
            	cube.position.x = c;
              cube.position.z = r; 
              scene.add( cube );
            }
        }
    }
    
    //add player to game world
    this.things = {'BOARD':-1};
    this.myid = id;
    this.mytype = type;
    this.me = this.CreateThings(id, type , true);
    this.MOVE({ID : this.myid, X : x, Y : y });
  }

  HandleMessage(msg){
    console.log("GS: " + msg.TYPE + " " + msg.ID);
    if('ID' in msg){
      if((msg.ID in this.things) == false){
        this.CreateThings(msg.ID, msg.THING);
      }
      if('TYPE' in msg && msg.TYPE in this){
        this[msg.TYPE](msg);
      }
    }
  }

  CreateThings(id, type, is_me = false){
    let g = new PIXI.Graphics();
    this.things[id] = { graphic : g , offset : { x : 16 , y : 16 } , size : { x : 32 , y : 32 }};
    if(type == "player"){
      g.beginFill((is_me)? "red" : "black");
    }
    else if(type == "ZOMBIE"){
      g.beginFill("green");
    }
    g.drawRect(this.things[id].offset.x, this.things[id].offset.y, this.things[id].size.x, this.things[id].size.y);
    g.endFill();
    this.app.stage.addChild(g);
    return g;
  }

  MOVE(msg){
    if(msg.ID >= 0){
      let who = this.things[msg.ID];
      who.graphic.x = msg.X * this.boardScale + who.offset.x;
      who.graphic.y = msg.Y * this.boardScale + who.offset.y;
      if(msg.ID == this.myid){
        this.app.stage.x = this.canvasCenter.x - who.graphic.x;
        this.app.stage.y = this.canvasCenter.y - who.graphic.y;
        
        this.walls.beginFill("rgba(255,128,0,.1)");
        this.walls.drawRect(who.graphic.x + 16, who.graphic.y + 16 , 32, 32);
        this.walls.endFill();
      }
    }
  }

}
