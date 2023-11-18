import * as THREE from 'three';

export class gamespace{
  constructor(board, id, type, x, y){
    //init
    this.board = board;
    this.boardScale = 64;
    this.boardSize = { height : this.board.length , width : this.board[0].length };
 
    //create game stage
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    //create game world  
    let geometry = new THREE.BoxGeometry( this.boardSize.width, 1, this.boardSize.height );
    let material = new THREE.MeshBasicMaterial( { color: 0x444444 } );
    let floor = new THREE.Mesh( geometry, material );
    floor.position.x = 0;
    floor.position.z = 0; 
    this.scene.add( floor );

    let pi_over_4 = Math.PI / 4;
    this.heading_angles = {N : 2 * pi_over_4 , NW : 3 * pi_over_4 , W : 4 * pi_over_4 , SW : 5 * pi_over_4, S: 6 * pi_over_4, SE : 7 * pi_over_4, E : 0, NE : pi_over_4};
    
    for (let r = 0; r < this.boardSize.height; r++) {
        let row = this.board[r];
        for (let c = 0; c < this.boardSize.width; c++) {
            if(row[c] == 1){
              let geometry = new THREE.BoxGeometry( 1, 4, 1 );
              let material = new THREE.MeshBasicMaterial( { color: 0x999999 } );
              let wall = new THREE.Mesh( geometry, material );
            	wall.position.x = c;
              wall.position.z = r; 
              this.scene.add( wall );
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
    let geometry = new THREE.BoxGeometry( 1, 4, 1 );
    let material;
    if(type == "player"){
      material = new THREE.MeshBasicMaterial( { color: (is_me)? 0xff0000 : 0x000000 } );
    }
    else if(type == "ZOMBIE"){
      material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    }
    let thing = new THREE.Mesh( geometry, material );
    this.things[id] = { graphic : thing };
    this.scene.add( thing );
    this.renderer.render( this.scene, this.camera );
    return thing;
  }

  MOVE(msg){
    if(msg.ID >= 0){
      let who = this.things[msg.ID];
      who.graphic.position.x = msg.X;
      who.graphic.position.z = msg.Y;
      if(msg.ID == this.myid){
        this.camera.position.x = msg.X;
        this.camera.position.z = msg.Y;
      }
      let angle = this.heading_angles[msg.HEADING];
      this.camera.position.x = radius * Math.cos( angle );  
      this.camera.position.z = radius * Math.sin( angle );
      
      this.renderer.render( this.scene, this.camera );
    }
  }

}
