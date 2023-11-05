class gamespace{
  constructor(board, id, type){
    this.board = board;
    this.app = new PIXI.Application({ background: '#1099bb', view: document.getElementById("board") , resize: window });
    document.body.appendChild(this.app.view);
    this.others = {};
    this.background = new PIXI.Graphics();
    this.colors = ["grey","blue"];
    for (let r = 0; r < this.board.length; r++) {
        let row = this.board[r];
        for (let c = 0; c < row.length; c++) {
            this.background.beginFill(this.colors[row[c]]);
            this.background.drawRect(c*4, r*4, 4, 4);
            this.background.endFill();
        }
    }
    this.app.stage.addChild(this.background);

    this.myid = id;
    this.mytype = type;
    this.me = this.CreateThings(id, "ME");
  }

  CreateThings(id, type){
    let g = new PIXI.Graphics();
    if(type == "ME"){
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
  }
  
}
