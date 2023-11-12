class gamespace{
  constructor(board, id, type, x, y){
    this.board = board;
    this.app = new PIXI.Application({ background: '#1099bb', view: document.getElementById("board") , resize: window });
    document.body.appendChild(this.app.view);

    this.myscale = 1;
    this.app.stage.scale.x = this.app.stage.scale.y = 1;
    
    this.others = {};
    this.background = new PIXI.Graphics();
    this.colors = ["lightgrey","darkgrey"];
    this.canvasW = document.getElementById('board').width;
    this.canvasH = document.getElementById('board').height;
    this.height = this.board.length;
    this.width = this.board[0].length;

    this.centerX = (this.canvasW/2);
    this.centerY = (this.canvasH/2);

    for (let r = 0; r < this.height; r++) {
        let row = this.board[r];
        for (let c = 0; c < this.width; c++) {
            this.background.beginFill(this.colors[row[c]]);
            this.background.drawRect(c*this.myscale, r*this.myscale, this.myscale, this.myscale);
            this.background.endFill();
        }
    }
    this.app.stage.addChild(this.background);
  
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
