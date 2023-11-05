class gamespace{
  constructor(board){
    this.board = board;
    this.app = new PIXI.Application({ background: '#1099bb', view: document.getElementById("board") });
    document.body.appendChild(this.app.view);
    
    this.background = new PIXI.Graphics();
    this.colors = ["grey","blue"];
    for (let row = 0; row < this.board.length; row++) {
        let row = this.board[row];
        for (let col = 0; col < row.length; col++) {
            this.background.beginFill(this.colors[row[col]]);
            this.background.drawRect(col, row, 1, 1);
            this.background.endFill();
        }
    }
    this.app.stage.addChild(this.background);
  }
}
