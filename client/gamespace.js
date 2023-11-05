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
    this.centerY = this.height * 4/2;
    this.centerX = this.width * 4/2;
    for (let r = 0; r < this.height; r++) {
        let row = this.board[r];
        for (let c = 0; c < this.width; c++) {
            this.background.beginFill(this.colors[row[c]]);
            this.background.drawRect(c*4, r*4, 4, 4);
            this.background.endFill();
        }
    }
    this.app.stage.addChild(this.background);
    this.app.stage.scale = .5;
    //this.app.stage.scale.y = .5;

    this.myid = id;
    this.mytype = type;
    this.me = this.CreateThings(id, type , true);
    this.me.x = 4*x;
    this.me.y = 4*y;
    this.app.stage.x = -4*x+this.centerX;
    this.app.stage.y = -4*y+this.centerY;
  }

  CreateThings(id, type, is_me = false){
    let g = new PIXI.Graphics();
    if(is_me){
      g.beginFill("pink");
    }
    else{
      g.beginFill("red");
    }
    g.drawRect(0, 0, 4, 4);
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
    who.x = msg.X*4;
    who.y = msg.Y*4;
    if(msg.ID == this.myid){
      this.app.stage.x = -msg.X*4+this.centerX;
      this.app.stage.y = -msg.Y*4+this.centerY;
    }
  }
  
}
