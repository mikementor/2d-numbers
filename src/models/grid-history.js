import { Cell } from "./cell";
export class HistoryGrid {
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

  clone(grid) {
    const res = [];
    for (let i = 0; i < grid.length; i++) {
      if (grid[i]) res[i] = grid[i].map((e) => e.clone());
    }
    return res;
  }
  pushToHistory() {
    this.history.push(this.clone(this.grid));
    this.currentPointer = this.history.length - 1;
    // console.log("push to history this:", this);
  }

  constructor(_grid = [], _history = [[]], _currentPointer = 0) {
    this.grid = _grid;
    this.history = _history;
    this.currentPointer = _currentPointer;
  }
  clear() {
    this.grid = [];
    this.history = [[]];
    this.currentPointer = 0;
  }

  // Method to compute the number for a cell
  computeCellNumber(x, y) {
    if (!this.grid[y] || !this.grid[y][x]) return 0;
    const value = this.grid[y][x].getValue(x, y); //?
    const res = this.computeNumber(x, y, value); //?
    return res; //?
  }
  computeNumber(x, y, value) {
    return value * 2 ** x * 3 ** y;
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
    let res = [];
    for (let y = 0; y < this.grid.length; y++) {
      res.push(this.grid[y] ? this.grid[y][x] : undefined);
    }
    return res;
  }
  getRow(y, x = 0) {
    if (!this.grid[y]) return [];
    const res = [];
    for (let i = x; i < this.grid[y].length; i++) res.push(this.grid[y][i]);
    return res;
  }
  // Method to set a value in the grid
  setValue(x, y, value) {
    if (!this.grid[y]) {
      this.grid[y] = [];
    }
    this.grid[y][x] = new Cell(value);
    this.pushToHistory();
  }
  addValue(x, y, value) {
    if (!this.grid[y]) {
      this.grid[y] = [];
    }
    this.grid[y][x] = new Cell(this.getValue(x, y) + value);
    this.pushToHistory();
  }

  // Method to get a value from the grid
  getValue(x, y) {
    if (this.getGrid()[y] && this.getGrid()[y][x]) {
      return this.getGrid()[y][x].getValue(); //?
    }
    return 0;
  }
  getGrid() {
    return this.currentGrid();
  }
  setGrid(newGrid) {
    this.clear();
    this.grid = newGrid;
    this.pushToHistory();
  }
}
