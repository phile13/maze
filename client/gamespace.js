class gamespace{
  constructor(board, id, type, x, y){
    this.board = board;
    this.app = new PIXI.Application({ background: '#1099bb', view: document.getElementById("board") , resize: window });
    document.body.appendChild(this.app.view);

    this.myscale = 4;
    this.app.stage.scale.x = this.app.stage.scale.y = 1;
    
    this.others = {};
    this.background = new PIXI.Graphics();
    this.colors = ["lightgrey","darkgrey"];
    this.canvasW = document.getElementById('board').width;
    this.canvasH = document.getElementById('board').height;
    this.height = this.board.length;
    this.width = this.board[0].length;
    this.canvasWRatio = this.width / this.canvasW ;
    this.canvasHRatio = this.height / this.canvasH;
    
    this.centerX = (this.canvasW/2);
    this.centerY = (this.canvasH/2);

    this.offsetR = -Math.floor(this.height / 2);
    this.offsetC = -Math.floor(this.width / 2);
    for (let r = 0, R = this.offsetR; r < this.height; r++, R++) {
        let row = this.board[r];
        for (let c = 0, C = this.offsetC; c < this.width; c++, C++) {
            this.background.beginFill((R == 0 || C == 0) ? 'red' : this.colors[row[c]]);
            this.background.drawRect(C*this.myscale, R*this.myscale, this.myscale, this.myscale);
            this.background.endFill();
        }
    }
    this.app.stage.addChild(this.background);
    
    this.app.stage.rotation = 0.78539816339;
    
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
      this.app.stage.x = this.centerX - this.canvasWRatio * who.x;
      this.app.stage.y =this.centerY - this.canvasHRatio * who.y;
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
