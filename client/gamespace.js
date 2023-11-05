class gamespace{
  constructor(board, id, type, x, y){
    this.board = board;
    this.app = new PIXI.Application({ background: '#1099bb', view: document.getElementById("board") , resize: window });
    document.body.appendChild(this.app.view);
    this.others = {};
    this.background = new PIXI.Graphics();
    this.colors = ["grey","blue"];
    this.height = this.board.length;
    this.width = this.board[0].length;
    this.myscale = 4;
    this.centerY = this.height * this.myscale/2;
    this.centerX = this.width * this.myscale/2;
    for (let r = 0; r < this.height; r++) {
        let row = this.board[r];
        for (let c = 0; c < this.width; c++) {
            this.background.beginFill(this.colors[row[c]]);
            this.background.drawRect(c*this.myscale, r*this.myscale, this.myscale, this.myscale);
            this.background.endFill();
        }
    }
    this.app.stage.addChild(this.background);
    this.app.stage.scale.x = 8;
    this.app.stage.scale.y = 8;

    this.myid = id;
    this.mytype = type;
    this.me = this.CreateThings(id, type , true);
    this.me.x = this.myscale*x;
    this.me.y = this.myscale*y;
    this.app.stage.x = -this.myscale*this.app.stage.scale.x*x+this.centerX;
    this.app.stage.y = -this.myscale*this.app.stage.scale.x*y+this.centerY;
  }

  CreateThings(id, type, is_me = false){
    let g = new PIXI.Graphics();
    if(is_me){
      g.beginFill("pink");
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

  MOVE(msg){
    let who = this.others[msg.ID];
    if(who === undefined){
      this.CreateThings(msg.ID, msg.THING);
      who = this.others[msg.ID];
    }
    who.x = msg.X*this.myscale;
    who.y = msg.Y*this.myscale;
    if(msg.ID == this.myid){
      this.app.stage.x = -msg.X*this.myscale*this.app.stage.scale.x+this.centerX;
      this.app.stage.y = -msg.Y*this.myscale*this.app.stage.scale.x+this.centerY;
    }
  }
  
}
