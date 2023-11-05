class GameSpace{
  constructor(rows, cols){
    this.rows = rows;
    this.cols = cols;
    this.board = {};
    this.things = {};
    this.tools = {};
    this.accessible_types = {FLOOR:true};
    this.inaccessible_types = {WALL:true};
    this.dirs_map = {N:[0,-1], NE:[1,-1], E:[1,0], SE:[1,1], S:[0,1], SW:[-1,1], W:[-1,0], NW:[-1,-1] };

    let max_r = this.rows-1;
    let max_c = this.cols-1;
    for(let r = 0; r < this.rows; r++){
      this.board[r] = {};
      for(let c = 0; c < this.cols; c++){
        this.board[r][c] = {type:(r%4==0||c%4==0)?"WALL":"FLOOR",thing:null,tool:null};
      }
    }
    this.WilsonsMazeAlgorithm();
    //this.CreateMaze(this.rows-1,0,this.cols-1,0,"H");
    this.json_board = JSON.stringify(this.BoardObject());
    console.log(JSON.stringify(this.BoardObject()));
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
    console.log(`CheckIfSpaceIsOpen:${x},${y}`);
    if(y in this.board && x in this.board[y]){
      
      let space = this.board[y][x];
      console.log(this.accessible_types[space.type]);
      if(this.accessible_types[space.type] !== undefined && space.thing == null && space.tool == null){
        console.log("TRUE");
        return true;
      }
    }
    return false;
  }

  MoveTo(id, dir){
    console.log(`MoveTo:${id},${dir}`);
    if(id in this.things && dir in this.dirs_map){
      console.log("in");
      let thing = this.things[id];
      let xy = this.dirs_map[dir];
      if(this.CheckIfSpaceIsOpen(thing.x + xy[0], thing.y + xy[1])){
        console.log("found");
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

  UseTool(id, tool){
    return false;
  }

  BoardObject(){
    let rows = [];
    for(let r = 0; r < this.rows; r++){
      let cols = [];
      for(let c = 0; c < this.cols; c++){
        cols.push((this.board[r][c].type == "FLOOR")?0:1);
      }
      //console.log(JSON.stringify(cols));
      rows.push(cols);
    }
    //console.log(JSON.stringify(rows))
    return rows;
  }

  WilsonsMazeAlgorithm(){
    let ids_list = [];
    let hash = {}
    let count = 0;
    //setup
    for(let r = 2; r < this.rows; r+=4){
      for(let c = 2; c < this.cols; c+=4){
        let id = `${r}:${c}`;
        hash[id] = {location :[r,c], in_maze : false, next : null, id : id};
        ids_list.push(id);
        console.log(`${r}-${c}`);
        count++;
      }
    }

    let ids_list_idx = Math.floor(Math.random() * (ids_list.length-.0000000000001));
    let hash_id = ids_list[ids_list_idx];
    hash[hash_id].in_maze = true;

    //create maze
    let dirs = [[0,4],[4,0],[0,-4],[-4,0]];
    do{
      ids_list_idx = Math.floor(Math.random() * (ids_list.length-.0000000000001));
      hash_id = ids_list[ids_list_idx];
      let first = hash[hash_id];
      let current = first;
      ids_list.splice(ids_list_idx,1);

      if(current.in_maze == false){
        //find path
        do{
          let dir = 0, id = "";
          do{
            dir = dirs[Math.floor(Math.random() * 3.999999999999)];
            id = `${current.location[0]+dir[0]}:${current.location[1]+dir[1]}`;
          }while((id in hash) == false);
          current.next = hash[id];
          current = hash[id];
        }while(current.in_maze == false);
  
  
        //set path
        current = first;
        do{
          let Y = (current.location[0] + current.next.location[0])/2;
          let X = (current.location[1] + current.next.location[1])/2;
          if(Y != current.location[0]){
            this.board[Y][X-1]["type"] = "FLOOR";
            this.board[Y][X]["type"] = "FLOOR";
            this.board[Y][X+1]["type"] = "FLOOR";
          }
          else{
            console.log(`${Y}-${X}`);
            this.board[Y-1][X]["type"] = "FLOOR";
            this.board[Y][X]["type"] = "FLOOR";
            this.board[Y+1][X]["type"] = "FLOOR";
          }
          current.in_maze = true;
          
          current = current.next;
        }while(current.in_maze == false);
      }
    }while(ids_list.length > 0);
  }
  
  
  
  CreateMaze(top,left,right,bottom,direction){
    //console.log(`----------${top},${left},${right},${bottom},${direction}`);
    let width = right - left;
    let height = top - bottom;
    let vcutline = this.CalcCutline(width);
    let hcutline = this.CalcCutline(height);
    let hdoorcut = this.CalcDoorSpace(width);
    let vdoorcut = this.CalcDoorSpace(height);
    //console.log(`---${width},${height},${vcutline},${hcutline},${hdoorcut},${vdoorcut}`);
    

    if(direction == "H" && hcutline > 0){
      for(let c = left; c < right; c++){
        this.board[hcutline][c]["type"] = "WALL";
      }
      for(let c = hdoorcut+1; c < hdoorcut+4; c++){
        //console.log(`r=${hcutline} c=${c} size=${width}`);
        this.board[hcutline][c]["type"] = "FLOOR";
      }
      
      this.CreateMaze(top,left,right,hcutline,"V");
      this.CreateMaze(hcutline,left,right,bottom,"V");
      
    }
    else if(direction == "V" && vcutline > 0) {
      for(let r = bottom; r < top; r++){
        this.board[r][vcutline]["type"] = "WALL";
      }
      for(let r = vdoorcut+1; r < vdoorcut+4; r++){
        console.log(r);
        this.board[r][vcutline]["type"] = "FLOOR";
      }
      this.CreateMaze(top,left,vcutline,bottom,"H");
      this.CreateMaze(top,vcutline,right,bottom,"H");
    }
    return;
  }

  CalcCutline(size){
    if(size > 4){
        let num_possible_cutlines = (size/4) - 1;
        return 4 + 4 * Math.floor(Math.random() * (num_possible_cutlines-.0000000000001));
    }
    return  0;
  }

  CalcDoorSpace(size){
    if(size > 4){
      let num_possible_cutlines = (size/4);
      //console.log(num_possible_cutlines);
      return 4 * Math.floor(Math.random() * (num_possible_cutlines-.0000000000001));
    }
    return 0;
  }
  
  
}
module.exports = GameSpace;
