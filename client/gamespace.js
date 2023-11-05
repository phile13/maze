class gamespace{
  constructor(board){
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
  }
}
