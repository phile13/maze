import * as THREE from 'three';

export class gamespace{
  constructor(board, id, type, x, y){
    //init
    this.board = board;
    this.boardScale = 64;
    this.boardSize = { height : this.board.length , width : this.board[0].length };
 
    //create game stage
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 150, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    this.light = new THREE.PointLight( 0xff0000, 1, 100 );
    this.light.position.set( 0, 0, 0 );
    this.light.castShadow = true;
    this.scene.add( this.light );
    //Set up shadow properties for the light
    this.light.shadow.mapSize.width = 512; // default
    this.light.shadow.mapSize.height = 512; // default
    this.light.shadow.camera.near = 0.5; // default
    this.light.shadow.camera.far = 500; // default
    
    //Create a sphere that cast shadows (but does not receive them)
    const sphereGeometry = new THREE.SphereGeometry( 5, 32, 32 );
    const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
    const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = false; //default
    this.scene.add( sphere );
    
    //Create a plane that receives shadows (but does not cast them)
    const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
    const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
    const plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.receiveShadow = true;
    this.scene.add( plane );
    
    //Create a helper for the shadow camera (optional)
    const helper = new THREE.CameraHelper( this.light.shadow.camera );
    this.scene.add( helper );

    //create game world  
    let geometry = new THREE.BoxGeometry( this.boardSize.width, -1, this.boardSize.height );
    let material = new THREE.MeshBasicMaterial( { color: 0x444444 } );
    let floor = new THREE.Mesh( geometry, material );
    floor.position.x = 0;
    floor.position.z = 0; 
    this.scene.add( floor );

    let pi_over_4 = Math.PI / 4;
    this.heading_angles = {N : [0,-100] , NW : [-100,-100] , W : [-100,0], SW : [-100,100], S: [0,100], SE : [100,100], E : [100,0], NE : [100,-100]};
    
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
    this.MOVE({ID : this.myid, X : x, Y : y});

    
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
        this.camera.position.z = msg.Y + 1;
        this.camera.position.y = 10;
        this.camera.lookAt(msg.X , 0, msg.Y);
        this.light.position.set( msg.X, 10,  msg.Y + 1 );
        //if("HEADING" in msg){
          //let dir = this.heading_angles[msg.HEADING];
          //this.camera.lookAt(msg.X + dir[0], 0, msg.Y + dir[1]);
        //}
      }
      this.renderer.render( this.scene, this.camera );
    }
  }

}
