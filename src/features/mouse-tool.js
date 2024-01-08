import * as math from 'mathjs';
const view_2_3 = (_, grid) => {
    grid.panGridProportionally23x();
};

const default_view = (_, grid) => {
    grid.panGridProportionally13x();
//   const raw_grid = grid.getGrid();
//   const new_grid = [];
//   console.log("default_view");
//   for (let y = 0; y < raw_grid.length; y++) {
//     new_grid[y] = [];
//     if (!raw_grid[y]) continue;
//     const length = raw_grid[y].length;
//     for (let x = 0; x < length; x++) {
//       const val = grid.getValue(x, y);
//       new_grid[y][x + y] = new Cell(val);
//     }
    
//   }
//   grid.setGrid(new_grid);
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
  const val = grid.getValue(currentCell.x, currentCell.y);
  grid.addValue(currentCell.x, currentCell.y, -amount);
  grid.addValue(currentCell.x + 1, currentCell.y + 1, +amount);
  grid.addValue(currentCell.x, currentCell.y + 1, +amount);
};
const move_down = (currentCell, grid, amount = 1) => {
  const val = grid.getValue(currentCell.x, currentCell.y);
  grid.addValue(currentCell.x, currentCell.y, amount);
  grid.addValue(currentCell.x + 1, currentCell.y + 1, -amount);
  grid.addValue(currentCell.x, currentCell.y + 1, -amount);
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
const up_row = (currentCell, grid) => {
  const y = currentCell.y;
  const row = grid.getRow(currentCell.y);
  for (let x = 0; x < row.length; x++)
    if (grid.getValue(x, y)) move_up({ x, y }, grid);
};
const down_row = (currentCell, grid) => {
  alert("what would it mean?");
  // const  y = currentCell.y;
  // const row = grid.getRow(currentCell.y);
  // for (let x=0; x<row.length; x++)
  //     if(grid.getValue(x,y))
  //         move_down({x,y},grid);
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
  const row = grid.getRow(y, cell.x);
  let x;
  for (let i = 0; i < row.length; i++) {
    if (row[i] != undefined) {
      x = i;
    }
  }
  if (row.length == 0 || row[x].value == "-1") return;

  if (row[x].value % 2 == 0) {
    //...
    move_left(cell, grid, row[x].value / 2);
    make_row_start_from_minus_1({ x: x + 1, y }, grid);
  } else {
    move_left(cell, grid, (row[x].value + 1) / 2);
  }
};
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
