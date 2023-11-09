import { Grid } from "./grid";
export class GridView {
    constructor(grid) {
      if (!(grid instanceof Grid)) {
        throw new Error('View expects an instance of Grid');
      }
      this.grid = grid;
    }
  
    calculateWindow(origin, size, direction) {
      // Calculate the range of indices to extract based on origin and size
      const [xStart, yStart] = origin;
      let subgrid = [];
      for (let y = 0; y < size; y++) {
        let row = [];
        for (let x = 0; x < size; x++) {
          // Use the Grid's getValue method to check if the current x and y are within the bounds
          const value = this.grid.getValue(xStart + x, yStart + y);
          row.push(value);
        }
        subgrid.push(row);
      }
  
      // Depending on the rendering direction, we might need to reverse rows or columns
      if (direction === 'top-left') {
        // Reverse each row to make x axis grow from right to left
        for (let i = 0; i < subgrid.length; i++) {
          subgrid[i].reverse();
        }
        // Reverse the order of rows to make y axis grow from bottom to top
        subgrid.reverse();
      }
      return subgrid;
    }
  }