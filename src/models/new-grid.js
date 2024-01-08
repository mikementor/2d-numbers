import * as math from "mathjs";
import { Matrix } from "./matrix";
export class NewGrid {
  first() {
    return this.history.slice(0, 1)[0];
  }
  last() {
    return this.history.slice(-1)[0];
  }

  nth(n) {
    return this.history.slice(n, n + 1)[0];
  }
  currentGrid() {
    const currentGrid = this.nth(this.currentPointer);
    return currentGrid;
  }
  next() {
    if (this.currentPointer >= this.history.length - 1) {
      this.currentPointer = this.history.length - 1;
      return this.last();
    } else {
      this.currentPointer++;
      return this.nth(this.currentPointer);
    }
  }
  prev() {
    if (this.currentPointer <= 0) {
      this.currentPointer = 0;
      return this.first();
    } else {
      this.currentPointer--;
      return this.nth(this.currentPointer);
    }
  }
  diffNext() {}
  diffPrev() {}

  pushToHistory() {
    this.history.push(this.grid.clone());
    this.currentPointer = this.history.length - 1;
    console.log("push to history this:", this);
  }

  constructor(_grid = new Matrix(), _history = [[]], _currentPointer = 0) {
    this.grid = _grid;
    this.history = _history;
    this.currentPointer = _currentPointer;
  }
  clear() {
    this.grid =  new Matrix();
    this.history = [[]];
    this.currentPointer = 0;
  }

 
  // Method to compute the number for the whole grid
  computeGridNumber() {
    let sum = 0;
    // for each row in the grid compute the sum of the number of cells in the row
    for (let i = 0; i < this.grid.length; i++) {
      let rowsum = 0;
      if (!this.grid[i]) continue;
      for (let j = 0; j < this.grid[i].length; j++) {
        rowsum += this.computeCellNumber(i, j);
      }
      sum += rowsum;
    }
    return sum;
  }

  // Method to append a number to the grid
  appendNumberAsBinary(num, offsetX = 0, offsetY = 0) {
    const binary = num
      .toString(2)
      .split("")
      .map((e) => parseInt(e)); //?
    const len = binary.length;
    binary.forEach((digit, index) => {
      const offx = len - 1 - index + offsetX; //?
      if (digit != 0) {
        this.addValue(offx, offsetY, digit); //?
      }
    });
    this.pushToHistory();
  }

  getColumn(x) {
    return this.grid.getColumn(x);
  }
  getRow(y) {
    return this.grid.getRow(y);
  }

  // Method to set a value in the grid
  setValue(x, y, value) {
    this.grid.setVal(x,y,value);
    // if (!this.grid[y]) {
    //   this.grid[y] = [];
    // }
    // this.grid[y][x] = new Cell(value);
    this.pushToHistory();
  }
  addValue(x, y, value) {
    this.grid.addVal(x,y,value);
    // if (!this.grid[y]) {
    //   this.grid[y] = [];
    // }
    // this.grid[y][x] = new Cell(this.getValue(x, y) + value);
    this.pushToHistory();
  }

  // Method to get a value from the grid
  getValue(x, y) {
    return this.grid.getVal(x,y);
    // if (this.getGrid()[y] && this.getGrid()[y][x]) {
    //   return this.getGrid()[y][x].getValue(); //?
    // }
    // return 0;
  }
  getGrid() {
    return this.currentGrid();
  }
  setGrid(newGrid) {
    this.clear();
    console.log('before setting the grid,', this.grid)
    this.grid = newGrid;
    console.log('after setting the grid,', this.grid)
    this.pushToHistory();
  } 
  fromSnapshot(text) {
    this.clear();
    console.log('before setting the grid,', this.grid)
    this.grid = Matrix.fromString(text);
    console.log('after setting the grid,', this.grid)
    this.pushToHistory();
  }
  panGridProportionally23x(){
    this.grid.panGridProportionally23x();
    this.pushToHistory();
  } 
  panGridProportionally13x(){
    this.grid.panGridProportionally13x();
    this.pushToHistory();
  }
  getGridJSON(){
    return this.grid.stringify();
  }
}
