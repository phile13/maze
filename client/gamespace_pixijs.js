class gamespace_pixijs{
  constructor(board, id, type, x, y){
    //init
    this.board = board;
    this.boardScale = 64;
    this.boardSize = { height : this.board.length , width : this.board[0].length };
    this.boardCenter = { x : this.boardScale * this.boardSize.width / 4 , y : this.boardScale * this.boardSize.height / 4 };
    this.canvasSize = { height : document.getElementById('board').height , width : document.getElementById('board').width };
    this.canvasCenter = { x : this.canvasSize.width / 2 , y : this.canvasSize.height / 2 };
    
    //create game stage
    this.app = new PIXI.Application({ background: '#1099bb', view: document.getElementById("board") , resize: window });
    this.app.stage.scale.x = this.app.stage.scale.y = 1;

    document.body.appendChild(this.app.view);

    //create game world  
    this.colors = ["lightgrey","darkgrey"];
    this.floor = new PIXI.Graphics();
    this.floor.beginFill("lightgrey");
    this.floor.drawRect(0, 0, this.boardSize.width * this.boardScale, this.boardSize.height * this.boardScale);
    this.floor.endFill();
    this.app.stage.addChild(this.floor);

    this.walls = new PIXI.Graphics();
    for (let r = 0, R = 0; r < this.boardSize.height-1; r++, R += this.boardScale) {
        let row = this.board[r];
        let next_row = this.board[r+1];
        for (let c = 1, C = this.boardScale; c < this.boardSize.width-1; c++, C += this.boardScale) {
            if(row[c] == 1){
              if(row[c-1] == 1){
                this.walls.beginFill("white");
                this.walls.drawRect(C, R - 8, 28, 8);
                this.walls.endFill();
                this.walls.beginFill("black");
                this.walls.drawRect(C, R, 28, 64);
                this.walls.endFill();
                this.walls.beginFill("darkgrey");
                this.walls.drawRect(C, R + 64, 28, 8);
                this.walls.endFill();
              }
              
              this.walls.beginFill("white");
              this.walls.drawRect(C + 28, R - 8, 8, 8);
              this.walls.endFill();
              this.walls.beginFill((next_row[c] == 1) ? "white" : "black");
              this.walls.drawRect(C + 28, R, 8, 64);
              this.walls.endFill();
              if(next_row[c] != 1){
                this.walls.beginFill("darkgrey");
                this.walls.drawRect(C + 28, R + 64, 8, 8);
                this.walls.endFill();
              }
              
              if(row[c+1] == 1){
                this.walls.beginFill("white");
                this.walls.drawRect(C + 36, R - 8, 28, 8);
                this.walls.endFill();
                this.walls.beginFill("black");
                this.walls.drawRect(C + 36, R, 28, 64);
                this.walls.endFill();
                this.walls.beginFill("darkgrey");
                this.walls.drawRect(C + 36, R + 64, 28, 8);
                this.walls.endFill();
              }
            }
        }
    }
    this.app.stage.addChild(this.walls);

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
