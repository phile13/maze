class GameSpace{
  constructor(rows, cols){
    this.rows = rows;
    this.cols = cols;
    this.board = {};
    this.accessible_types = {FLAT:true};
    this.inaccessible_types = {WALL:true};

    let max_r = this.rows-1;
    let max_c = this.cols-1;
    for(let r = 0; r < this.rows; r++){
      this.board[r] = {};
      for(let c = 0; c < this.cols; c++){
        this.board[r][c] = {type:(r==0||c==0||r==max_r||c==max_c)?"FLAT":"WALL",thing:null,tool:null};
      }
    }
  }

  RegisterThing(thing){
    this.things[thing.id] = thing;
    thing.x = Math.floor(Math.random() * this.cols);
    thing.y = Math.floor(Math.random() * this.rows);
    
    while(CheckIfSpaceIsOpen(thing.x, thing.y) == false){
      thing.x = Math.floor(Math.random() * this.cols);
      thing.y = Math.floor(Math.random() * this.rows);
    }
    this.board[thing.y][thing.x].thing = thing;
  }

  RegisterTool(tool){

  }
  
  CheckIfSpaceIsOpen(x,y){
    if(y in this.board && x in this.board[y]){
      let space = this.board[y][x];
      if(space.type in this.accessible_types && space.thing == null && space.tool == null){
        return true;
      }
    }
    return false;
  }

  MoveTo(){
    if(id in this.things){
      let thing = this.things[id];
      
    }
  }

  PickupNearbyTool(id){
    if(id in this.things){
      let thing = this.things[id];
      if(thing.tool == null){
        let x = thing.x;
        let y = thing.y;
        
        for(let r = y-1; r < y+2; r++){
          for(let c = x-1; c < x+2; c++){
            let space = this.board[r][c];
            if(space.tool){
              space.tool.owned = true;
              thing.tool = space.tool;
              this.board[r][c].tool = null;
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  FindSpotToPutTool(id){
    if(id in this.things){
      let thing = this.things[id];
      if(thing.tool != null){
        let x = thing.x;
        let y = thing.y;
        
        for(let r = y-1; r < y+2; r++){
          for(let c = x-1; c < x+2; c++){
            let space = this.board[r][c];
            if(space.type in this.accessible_types && space.thing == null && space.tool == null){
              space.tool.owned = false;
              thing.tool = null;
              this.board[r][c].tool = space.tool;
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  ServerController.UseTool(x, y, tool){
    return this.gs.UseTool(x,y,tool);
  }
  
}

