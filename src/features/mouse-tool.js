
const view_2_3 = (_, grid) => {
    grid.panGridProportionally23x();
};

const default_view = (_, grid) => {
    grid.panGridProportionally13x();
};
const add1 = (currentCell, grid) => {
  grid.addValue(currentCell.x, currentCell.y, 1);
};
const minus1 = (currentCell, grid) => {
  grid.addValue(currentCell.x, currentCell.y, -1);
};
const move_left = (currentCell, grid, amount = 1) => {
  grid.addValue(currentCell.x, currentCell.y, -2 * amount);
  grid.addValue(currentCell.x + 1, currentCell.y, +amount);
};
const move_right = (currentCell, grid, amount = 1) => {
  grid.addValue(currentCell.x, currentCell.y, -1 * amount);
  grid.addValue(currentCell.x - 1, currentCell.y, +2 * amount);
};
const move_up = (currentCell, grid, amount = 1) => {
  console.log('move-up')
  // const val = grid.getValue(currentCell.x, currentCell.y);
  grid.addValue(currentCell.x, currentCell.y, -amount);
  grid.addValue(currentCell.x + 1, currentCell.y + 1, +amount);
  grid.addValue(currentCell.x, currentCell.y + 1, +amount);
};
const move_down = (currentCell, grid, amount = 1) => {
  // const val = grid.getValue(currentCell.x, currentCell.y);
  grid.addValue(currentCell.x, currentCell.y, -amount);
  grid.addValue(currentCell.x-1, currentCell.y, -amount);
  grid.addValue(currentCell.x-1, currentCell.y-1, amount);
  // grid.addValue(currentCell.x , currentCell.y -1, +3*amount);
  // grid.addValue(currentCell.x , currentCell.y -1, +3*amount);
  // grid.addValue(currentCell.x, currentCell.y + 1, -amount);
  // grid.addValue(currentCell.x, currentCell.y + 1, -amount);
};
const move_diag_right = (currentCell, grid, amount = 1) => {
  const val = grid.getValue(currentCell.x, currentCell.y);
  grid.addValue(currentCell.x, currentCell.y, -amount);
  grid.addValue(currentCell.x - 1, currentCell.y, -amount);
  grid.addValue(currentCell.x - 1, currentCell.y - 1, amount);
};
const move_diag_right_inverse = (currentCell, grid, amount = 1) => {
  const val = grid.getValue(currentCell.x, currentCell.y);
  grid.addValue(currentCell.x, currentCell.y, amount);
  grid.addValue(currentCell.x - 1, currentCell.y, amount);
  grid.addValue(currentCell.x - 1, currentCell.y - 1, -amount);
};
const up_row = (currentCell, grid, startX = -Infinity) => {
  // console.log('up_row', currentCell)
  (grid.getRow(currentCell.y)).forEach(function (x,y,val) {
    // console.log('forEach', x,y,val);
    if (val && x>=startX) 
        move_up({ x, y }, grid,val);
  },grid )
};
const down_row = (currentCell, grid) => {
  (grid.getRow(currentCell.y)).forEach(function (x,y,val) {
    if (val) 
        move_down({ x, y }, grid,val);
  },grid )
};
// almost normalizes the row - new filled last cell wont be normalized 
// fix some day
const normalize_row = (currentCell, grid) => {
  (grid.getRow(currentCell.y)).forEach(function (x,y,val) {
    if (Math.abs(val)>1) {
      if (Math.abs(val)%2==0) 
        move_left({ x, y }, grid,val/2);
      else
        move_left({ x, y }, grid,(val-1)/2);
    }
  },grid )
};
const left_column = (currentCell, grid) => {
  alert("grid column: " + grid.getColumn(currentCell.x));
};
const right_column = (currentCell, grid) => {};
const do_nothing = (cell, grid) => {
  alert("do nothing");
};
const make_row_start_from_minus_1 = (cell, grid) => {
  const y = cell.y;
  const row = grid.getRow(y, /*cell.x*/);
  let _x;
  let _val;
  console.log("make_row_start_from_minus_1", cell, row)
  // переделать в фильтр ибо следующая -1 перезаписывает предыдущую
  // уже в принципе не надо
  row.forEach(function (x,y,val) {
    if (val != undefined && val !== 0 && !_val) {
      _x = x;
      _val = val;
    }
  },grid )
  
  if(_val == -1)
    return {x:_x,val:_val,y};

  if (row.length == 0 || _val==undefined) {
      console.log(row)
      console.log(_x)
      console.log(y)
      throw new Error('empty row for -1')
  }
  console.log('first x,y to make -1: ', _x, y, _val);
  // grid.addValue(_x,y,-_val-1);
  if (_val% 2 == 0) {
    //...
    move_left({x:_x,y:y}, grid, _val / 2);
   return make_row_start_from_minus_1({ x: _x + 1, y }, grid);
  } else {
    move_left({x:_x,y:y}, grid, (_val + 1) / 2);
    return {x:_x,y:y};
  }
  
};
const do_it=(_cell, grid)=>{
  // alert('hehe')
  // up_row({x:0,y:0},grid)
  let cell ;
  // do{
    let y=0
    do{
      up_row({ x: 0, y}, grid,cell?cell.x+1:0);
      cell = make_row_start_from_minus_1({ x: 0, y:y+1}, grid);
      normalize_row( {x: 0, y:y+1 }, grid);
    }
    while(!grid.getRow(++y).isRow11() && y<30);
    // up_row({ x: cell.x, y:cell.y+2 }, grid,cell.x+1);
    // normalize_row( {x: cell.x, y:cell.y+2 }, grid);
    // console.log('isRow11: ',grid.getRow(cell.y+1).isRow11());
    // cell = {x: cell.x, y: cell.y+1};
  // }
  // while(!grid.getRow(cell.y+1).isRow11())
  // let i=0;
  // while(i++<5){
  //
  //   cell = make_row_start_from_minus_1({ x: cell.x+1, y:cell.y+1 }, grid);
  // }
}
const map = {
  "2-23-view": {
    positive: view_2_3,
    inverse: default_view,
  },
  "2-3-view": {
    positive: default_view,
    inverse: view_2_3,
  },

  "add-1": {
    positive: add1,
    inverse: minus1,
  },
  "minus-1": {
    positive: minus1,
    inverse: add1,
  },
  "move-left": {
    positive: move_left,
    inverse: move_right,
  },
  "move-right": {
    positive: move_right,
    inverse: move_left,
  },
  "move-up": {
    positive: move_up,
    inverse: move_down,
  },
  "move-down": {
    positive: move_down,
    inverse: move_up,
  },
  "up-the-row": {
    positive: up_row,
    inverse: down_row,
  },
  "down-the-row": {
    positive: down_row,
    inverse: up_row,
  },
  "left-column": {
    positive: left_column,
    inverse: right_column,
  },
  "right-column": {
    positive: right_column,
    inverse: left_column,
  },
  "make-row-start-from-minus-1": {
    positive: make_row_start_from_minus_1,
    inverse: do_nothing,
  },
  "move-diag-right": {
    positive: move_diag_right,
    inverse: move_diag_right_inverse,
  },
  "do-it":{
    positive: do_it,
    inverse: do_nothing
  }
};
export const mouse_tool = {
  tool: "add-1",

  current_tool() {
    return this.tool;
  },
  switch_tool(tool) {
    this.tool = tool;
    console.log("current_tool", this.tool);
  },

  on_click(cell, grid, event) {
    if (event.shiftKey) {
      map[this.current_tool()].inverse(cell, grid);
    } else {
      map[this.current_tool()].positive(cell, grid);
    }
  },
};
