export class Cell {
  constructor(value) {
    this.value = value; // The value can be an integer or a tuple representing factorized dividers.
  }

  // Getter for the value, if it's a tuple, it will compute the number from the dividers.
  getValue() {
    return this.value;
  }

  // Setter for the value
  setValue(value) {
    this.value = value;
  }
}

export class Grid {
  constructor() {
    this.grid = [];
    
  }
  clear(){
    this.grid = [];
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
  }

  // Method to set a value in the grid
  setValue(x, y, value) {
    if (!this.grid[y]) {
      this.grid[y] = [];
    }
    this.grid[y][x] = new Cell(value);
  }
  addValue(x, y, value) {

    if (!this.grid[y]) {
      this.grid[y] = [];
    }
    this.grid[y][x] =  new Cell(this.getValue(x, y)+value);
  }

  // Method to get a value from the grid
  getValue(x, y) {
    if (this.grid[y] && this.grid[y][x]) {
      return this.grid[y][x].getValue(); //?
    }
    return 0;
  }
  getGrid() {
    return this.grid;
  }
}
