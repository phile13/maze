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
    for (let r = 0, R = 0; r < this.height; r++, R += this.boardScale) {
        let row = this.board[r];
        for (let c = 0, C = 0; c < this.width; c++, C += this.boardScale) {
            this.background.beginFill(this.colors[row[c]]);
            this.background.drawRect(C, R, this.boardScale, this.boardScale);
            this.background.endFill();
        }
    }
    this.app.stage.addChild(this.background);

    //add player to game world
    this.others = {};
    this.myid = id;
    this.mytype = type;
    this.me = this.CreateThings(id, type , true);
    this.move(this.myid,this.me,x,y);
  }

  CreateThings(id, type, is_me = false){
    let g = new PIXI.Graphics();
    if(is_me){
      g.beginFill("black");
    }
    else{
      g.beginFill("red");
    }
    g.drawRect(0, 0, this.myscale, this.myscale);
    g.endFill();
    this.app.stage.addChild(g);
    this.others[id] = g;
    return g;
  }

  HandleMessage(msg){
    console.log("GS: " + msg.TYPE);
    if(msg.TYPE in this){
      this[msg.TYPE](msg);
    }
  }

  move(id,who,x,y){
    who.x = (x+this.offsetC) *this.myscale;
    who.y = (y+this.offsetR) *this.myscale;
    if(id == this.myid){
      this.app.stage.x = this.centerX - who.x;
      this.app.stage.y = this.centerY - who.y;
    }
  }

  MOVE(msg){
    let who = this.others[msg.ID];
    if(who === undefined){
      this.CreateThings(msg.ID, msg.THING);
      who = this.others[msg.ID];
    }
    this.move(msg.ID,who,msg.X,msg.Y);
  }
  
  
}
