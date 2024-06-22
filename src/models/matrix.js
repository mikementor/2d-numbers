import * as math from "mathjs";
globalThis.math = math;
const DEFAULT_VALUE = 0;

export class Cell{
  val=0
  twos=0
  threes=0
  constructor(val=0){
    this.val = val
  }
  multiplyBy2(times){
    this.twos+=times;
  }
  multiplyBy3(times){
    this.threes+=times;
  }
  pretty(){
    if(this.twos == 0 && this.threes == 0)
      return this.val
    return `${this.val}(${this.twos};${this.threes})`
  }
}
export class Row {
  constructor(row = math.sparse([[0]]), _offset = [0, 0],y) {
    this.offset = _offset; // x,y offset for keeping negative values
    this.row = row;
    this.y = y;
  }

  forEach(func,grid){
    const _self = this;
    this.row.forEach(function (value, index, matrix) {
      const [x]=index;
     
      const xOffsetted = x - _self.offset[0];
      const yOffsetted = _self.y - _self.offset[1];
      
      const val = grid.getValue(xOffsetted, _self.y);
      func( xOffsetted, _self.y,val);
    })

  }
  isRow11(){
    console.log('isRow11',this.row._values,this.row);
    return this.row._values.length==2 && this.row._values[0]==1 && this.row._values[1]==-1;
  }
}
export class Matrix {
  constructor(_grid = math.sparse([[0]]), _offset = [0, 0]) {
    this.offset = _offset; // x,y offset for keeping negative values
    this.grid = _grid;
  }
  clone() {
    return new Matrix(math.clone(this.grid), this.offset);
  }
  stringify() {
    return JSON.stringify(this, math.replacer);
  }
  static fromString(snap) {
    const res = JSON.parse(snap, math.reviver);
    return new Matrix(res.grid, res.offset);
  }
  getColumn(x) {
    // todo add out of range checks
    const xOffsetted = x + this.offset[0];
    const [_, ySize] = this.grid.size();
    return this.grid.subset(
      math.index([xOffsetted, 0], [xOffsetted, ySize - 1])
    );
  }


  getRow(y) {
    // todo add out of range checks
    const yOffsetted = y + this.offset[1];
    return new Row(math.column(this.grid,yOffsetted),this.offset,y);
  }

  
  getPrettyVal(x,y){
    return this.getVal(x,y)
  }
  getVal(x, y) {
    const [xSize, ySize] = this.grid.size();

    const xOffsetted = x + this.offset[0];
    const yOffsetted = y + this.offset[1];

    if (
      xOffsetted < 0 ||
      yOffsetted < 0 ||
      xOffsetted >= xSize ||
      yOffsetted < 0 ||
      yOffsetted >= ySize
    )
      return DEFAULT_VALUE;

    return this.grid.get([xOffsetted, yOffsetted]);
  }

  setVal(x, y, val) {
    const [xSize, ySize] = this.grid.size();

    const xOffsetted = x + this.offset[0];
    const yOffsetted = y + this.offset[1];

    if (
      xOffsetted < 0 ||
      //   xOffsetted >= xSize ||
      yOffsetted < 0
      //   ||yOffsetted >= ySize
    ) {
      // resize?
      //or just set offset
      let needPan = false;
      const offsetOffOffset = [0, 0];
      if (xOffsetted < 0) {
        offsetOffOffset[0] = -xOffsetted;
        this.offset[0] += -xOffsetted;
        needPan = true;
      }
      if (yOffsetted < 0) {
        offsetOffOffset[1] = -yOffsetted;
        this.offset[1] += -yOffsetted;
        needPan = true;
      }
      if (needPan) {
        this.grid = this.panGrid(offsetOffOffset);
      }
    }
    this.grid.set([this.offset[0] + x, this.offset[1] + y], val);
  }

  panGrid([x, y]) {
    console.log("panGrid", x, y, this.offset);
    const new_grid = math.sparse([[]]);
    this.grid.forEach((value, index, grid) => {
      new_grid.set([index[0] + x, index[1] + y], value);
    });

    return new_grid;
  }

  panGridProportionally23x() {
    const offset = [...this.offset];
    console.log(`panGridProportionally23x`);
    const new_map = [];

    this.grid.forEach((value, index, grid) => {
      if (value == 0) return;
      const [x, y] = index;
      if (y - this.offset[1] == 0) {
        new_map.push({ x: x, y: y, value });
      } else {
        new_map.push({ x: x - y, y: y, value });
      }
      this.grid.set([x, y], 0);
    });
    new_map.forEach(({ x, y, value }) => {
      this.setVal(x - offset[0], y - offset[1], value);
    });
  }

  panGridProportionally13x() {
    const offset = [...this.offset];
    console.log(`panGridProportionally13x`);
    const new_map = [];

    this.grid.forEach((value, index, grid) => {
      if (value == 0) return;
      const [x, y] = index;
      if (y - this.offset[1] == 0) {
        new_map.push({ x: x, y: y, value });
      } else {
        new_map.push({ x: x + y, y: y, value });
      }
      this.grid.set([x, y], 0);
    });
    new_map.forEach(({ x, y, value }) => {
      this.setVal(x - offset[0], y - offset[1], value);
    });
  }
  addVal(x, y, val) {
    this.setVal(x, y, this.getVal(x, y) + val);
  }
  printWithHeaders() {
    let xHeader = `X |`;
    const [xsize, ysize] = this.grid.size();
    let res = "";
    for (let x = xsize - 1; x >= 0; x--) {
      xHeader += `${x - this.offset[0]}|`;
    }
    for (let y = ysize - 1; y >= 0; y--) {
      for (let x = xsize - 1; x >= 0; x--) {
        res += `${
          x == xsize - 1 ? `${y - this.offset[1]} | ` : " "
        }${this.getVal(x, y)}`;
      }
      if (y > 0) res += `\n`;
    }
    const r = xHeader + `\n` + res;
    console.log(r);
    return r;
  }
  print() {
    const [xsize, ysize] = this.grid.size();
    const [xOffset, yOffset] = this.offset;
    let res = "";

    for (let y = ysize - 1; y >= 0; y--) {
      for (let x = xsize - 1; x >= 0; x--) {
        res += `${x == xsize - 1 ? `` : " "}${this.grid.get([x, y])}`;
      }
      if (y > 0) res += `\n`;
    }

    console.log(res);
    return res;
  }
}
