class GameSpace{
  constructor(rows, cols){
    this.rows = rows;
    this.cols = cols;
    this.board = {};
    for(let r = 0; r < this.rows; r++){
      this.board[r] = {};
      for(let c = 0; c < this.cols; c++){
        this.board[r][c] = {type:"FLAT",thing:null,tool:null};
      }
    }
  }
  
  CheckIfSpaceIsOpen(x,y){
    if(y in this.board && x in this.board[y]){
      let space = this.board[x][y];
      if(space.type in this.accessible_types && space.thing == null && space.tool == null){
        
      }
    }
  }

  PickupNearbyTool(x,y){
    return this.gs.PickupNearbyTool(x,y);
  }

  FindSpotToPutTool(x,y){
    return this.gs.FindSpotToPutTool(x,y);
  }

  ServerController.UseTool(x, y, tool){
    return this.gs.UseTool(x,y,tool);
  }
  
}

