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
    this.app = new PIXI.Application({ background: '#1099bb', view: document.getElementById("board") , resize: window });
    this.app.stage.scale.x = this.app.stage.scale.y = 1;

    document.body.appendChild(this.app.view);

    //create game world  
    this.colors = ["lightgrey","darkgrey"];
    this.background = new PIXI.Graphics();
    this.background.beginFill("red");
    this.background.drawRect(0, 0, this.boardSize.width, this.boardSize.height);
    this.background.endFill();
    
    for (let r = 0, R = 0; r < this.boardSize.height; r++, R += this.boardScale) {
        let row = this.board[r];
        for (let c = 0, C = 0; c < this.boardSize.width; c++, C += this.boardScale) {
            if(row[c] == 1){
              this.background.beginFill("darkgrey");
              this.background.drawRect(C, R, this.boardScale, this.boardScale);
              this.background.endFill();
            }
        }
    }
    this.app.stage.addChild(this.background);

    //add player to game world
    this.things = {'BOARD':-1};
    this.myid = id;
    this.mytype = type;
    this.me = this.CreateThings(id, type , true);
    this.MOVE({ID : this.myid, X : x, Y : y });
  }

  HandleMessage(msg){
    console.log("GS: " + msg.TYPE);
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
    this.things[id] = { graphic : g , offset : { x : 8 , y : 8 } , size : { x : 32 , y : 32 }};
    if(is_me){
      g.beginFill("black");
    }
    else{
      g.beginFill("red");
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
      }
    }
  }

}
