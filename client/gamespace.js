class gamespace{
  constructor(board, id, type){
    this.board = board;
    this.app = new PIXI.Application({ background: '#1099bb', view: document.getElementById("board") , resize: window });
    document.body.appendChild(this.app.view);
    
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
    this.me = new PIXI.Graphics();
    this.me.beginFill("pink");
    this.me.drawRect(100, 100, 4, 4);
    this.me.endFill();
    this.app.stage.addChild(this.me);
  }

  HandleMessage(msg){
    console.log("GS: " + msg.TYPE);
    if(msg.TYPE in this){
      this[msg.TYPE](msg);
    }
  }

  Move(msg){
    console.log("MOVE:" + msg);
  }
  
}
