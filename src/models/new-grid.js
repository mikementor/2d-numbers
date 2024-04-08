
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
    if(!currentGrid) throw 'currentGrid is undefined';
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

  pushToHistory(grid) {
    if(!grid) throw new Error('somebody pushed undefined to history!')
    this.history.push(grid);
    this.currentPointer = this.history.length - 1;
    console.log("push to history this:", this);
  }

  constructor(_grid = new Matrix(), _history = [_grid], _currentPointer = 0) {
    this.history = _history;
    this.currentPointer = _currentPointer;
  }
  clear() {
    this.history = [new Matrix()];
    this.currentPointer = 0;
  }

 
  // Method to compute the number for the whole grid
  computeGridNumber() {
    let sum = 0;
    // for each row in the grid compute the sum of the number of cells in the row
    for (let i = 0; i < this.grid.length; i++) {
      let rowsum = 0;
      if (!this.getGrid()[i]) continue;
      for (let j = 0; j < this.getGrid()[i].length; j++) {
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
    this.pushToHistory(this.getGrid());
  }

  getColumn(x) {
    return this.getGrid().getColumn(x);
  }
  getRow(y) {
    return this.getGrid().getRow(y);
  }

  // Method to set a value in the grid
  setValue(x, y, value) {
    this.getGrid().setVal(x,y,value);

    this.pushToHistory(this.getGrid().clone());
  }
  addValue(x, y, value) {
    this.getGrid().addVal(x,y,value);

    this.pushToHistory(this.getGrid().clone());
  }

  // Method to get a value from the grid
  getValue(x, y) {
    return this.getGrid().getVal(x,y);

  }
  getGrid() {
    return this.currentGrid();
  }
  setGrid(newGrid) {
    this.clear();

    this.pushToHistory(newGrid);
  } 
  fromSnapshot(text) {
    this.clear();
    this.pushToHistory( Matrix.fromString(text));
  }
  panGridProportionally23x(){
    this.getGrid().panGridProportionally23x();
    this.pushToHistory(this.getGrid().clone());
  } 
  panGridProportionally13x(){
    this.getGrid().panGridProportionally13x();
    this.pushToHistory(this.getGrid().clone());
  }
  getGridJSON(){
    return this.getGrid().stringify();
  }
}
