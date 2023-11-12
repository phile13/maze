class gamespace{
  constructor(board, id, type, x, y){
    //init
    this.board = board;
    this.boardScale = 1;
    this.boardSize = { height : this.board.length , width : this.board[0].length };
    this.canvasSize = { height : document.getElementById('board').height , width : document.getElementById('board').width };
    this.canvasCenter = { x : this.canvasSize.width / 2 , y : this.canvasSize.height / 2 };
    
    //create game stage
    this.app = new PIXI.Application({ background: '#1099bb', view: document.getElementById("board") , resize: window });
    this.app.stage.scale.x = this.app.stage.scale.y = 1;
    document.body.appendChild(this.app.view);

    //create game world  
    this.colors = ["lightgrey","darkgrey"];
    this.background = new PIXI.Graphics();
    for (let r = 0, R = 0; r < this.boardSize.height; r++, R += this.boardScale) {
        let row = this.board[r];
        for (let c = 0, C = 0; c < this.boardSize.width; c++, C += this.boardScale) {
            this.background.beginFill(this.colors[row[c]]);
            this.background.drawRect(C, R, this.boardScale, this.boardScale);
            this.background.endFill();
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
    if(is_me){
      g.beginFill("black");
    }
    else{
      g.beginFill("red");
    }
    g.drawRect(0, 0, this.boardScale, this.boardScale);
    g.endFill();
    this.app.stage.addChild(g);
    this.things[id] = g;
    return g;
  }

  MOVE(msg){
    if(msg.ID >= 0){
      let who = this.things[msg.ID];
      who.x = msg.X * this.boardScale;
      who.y = msg.Y * this.boardScale;
      if(msg.ID == this.myid){
        //this.app.stage.x = who.x - this.canvasCenter.x;
        //this.app.stage.y = who.y - this.canvasCenter.y;
      }
    }
  }

}
