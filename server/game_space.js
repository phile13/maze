class GameSpace{
  constructor(rows, cols){
    this.rows = rows;
    this.cols = cols;
    this.board = {};
    this.things = {};
    this.tools = {};
    this.accessible_types = {FLAT:true};
    this.inaccessible_types = {WALL:true};
    this.dirs_map = {N:[0,-1], NE:[1,-1], E:[1,0], SE:[1,1], S:[0,1], SW:[-1,1], W:[-1,0], NW:[-1,-1] };

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
    
    while(this.CheckIfSpaceIsOpen(thing.x, thing.y) == false){
      thing.x = Math.floor(Math.random() * this.cols);
      thing.y = Math.floor(Math.random() * this.rows);
    }
    this.board[thing.y][thing.x].thing = thing;
  }

  UnRegisterThing(id){
    if(id in this.things){
      let thing = this.things[id];
      if(thing.tool != null){
        thing.tool.owned = false;
        thing.tool.x = thing.x;
        thing.tool.y = thing.y;
        this.board[thing.y][thing.x].tool = thing.tool;
      }
      this.board[thing.y][thing.x].thing = null;
      delete this.things[id];
    }
  }
  

  RegisterTool(tool){
    this.tools[tool.id] = tool;
    tool.x = Math.floor(Math.random() * this.cols);
    tool.y = Math.floor(Math.random() * this.rows);
    
    while(this.CheckIfSpaceIsOpen(tool.x, tool.y) == false){
      tool.x = Math.floor(Math.random() * this.cols);
      tool.y = Math.floor(Math.random() * this.rows);
    }
    this.board[tool.y][tool.x].tool = tool;
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

  MoveTo(id, dir){
    if(id in this.things && dir in this.dirs_map){
      let thing = this.things[id];
      let xy = this.dirs_map[dir];
      if(this.CheckIfSpaceIsOpen(thing.x + xy[0], thing.y + xy[1])){
        this.board[thing.y][thing.x].thing = null;
        thing.x = thing.x + xy[0];
        thing.y = thing.y + xy[1];
        this.board[thing.y][thing.x].thing = thing;
        return true;
      }
    }
    return false;
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

  UseTool(x, y, tool){
    return false;
  }
  
}

