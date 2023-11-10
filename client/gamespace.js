class gamespace{
  constructor(board, id, type, x, y){
    this.board = board;
    this.app = new PIXI.Application({ background: '#1099bb', view: document.getElementById("board") , resize: window });
    document.body.appendChild(this.app.view);
    this.others = {};
    this.background = new PIXI.Graphics();
    this.colors = ["lightgrey","darkgrey"];
    this.height = this.board.length;
    this.width = this.board[0].length;
    this.myscale = 2;
    this.centerY = this.height * this.myscale/2;
    this.centerX = this.width * this.myscale/2;

    this.offsetR = -this.height / 2;
    this.offsetC = -this.width / 2;
    for (let r = 0, R = this.offsetR; r < this.height; r++, R++) {
        let row = this.board[r];
        for (let c = 0, C = this.offsetC; c < this.width; c++, C++) {
            this.background.beginFill(this.colors[row[c]]);
            this.background.drawRect(C*this.myscale, R*this.myscale, this.myscale, this.myscale);
            this.background.endFill();
        }
    }
    this.app.stage.addChild(this.background);
    this.app.stage.scale.x = this.app.stage.scale.y = 1;
    
    
    this.myid = id;
    this.mytype = type;
    this.me = this.CreateThings(id, type , true);
    this.me.x = (x+this.offsetC)*this.myscale*this.app.stage.scale.x;
    this.me.y = (y+this.offsetR)*this.myscale*this.app.stage.scale.y;
  
    // // PI / 4
    this.app.stage.x = -this.offsetC*this.myscale*this.myscale*this.app.stage.scale.x;
    this.app.stage.y = -this.offsetR*this.myscale*this.myscale*this.app.stage.scale.x;
    this.app.stage.rotation = 0.78539816339;
    //this.RotateStage(this.me.x, this.me.y);
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

  RotateStage(x,y){
    this.app.stage.x = -.7071067811 * (x - y);
    this.app.stage.y = .7071067811 * (x + y);
  }

  MOVE(msg){
    let who = this.others[msg.ID];
    if(who === undefined){
      this.CreateThings(msg.ID, msg.THING);
      who = this.others[msg.ID];
    }
    who.x = msg.X*this.myscale*this.app.stage.scale.x;
    who.y = msg.Y*this.myscale*this.app.stage.scale.y;
    if(msg.ID == this.myid){
      this.app.stage.x = -who.x*+this.centerX;
      this.app.stage.y = -who.y*+this.centerY;
    }
  }
  
}
