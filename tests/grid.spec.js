import  {Class,Grid} from '../src/models/grid';
import { expect, it, describe } from 'vitest'
describe('Grid and Cell functionality', () => {
it('Grid should compute cell number based on x and y coordinates', () => {
    const grid = new Grid();
    grid.setValue(1, 1, 3);
    expect(grid.computeCellNumber(1, 1)).toBe(3 * (2 ** 1) * (3 ** 1));
  });

  it('Grid should compute the total number by summing up all cell numbers', () => {
    const grid = new Grid();
    grid.setValue(0, 0, 1);
    grid.setValue(1, 1, 1);
    const total = 1 * (2 ** 0) * (3 ** 0) + 1 * (2 ** 1) * (3 ** 1);
    expect(grid.computeGridNumber()).toBe(total);
  });

  it('Appending a number as binary should add cells to the zero-th row', () => {
    const grid = new Grid();// ?
    grid.appendNumberAsBinary(5); // 5 in binary is 101
    expect(grid.getValue(0, 0)).toBe(1);
    expect(grid.getValue(1, 0)).toBe(0);
    expect(grid.getValue(2, 0)).toBe(1);
    
  });

  it('Appending a number as binary should not affect existing cells', () => {
    const grid = new Grid();
    grid.setValue(1, 1, 2);
    grid.appendNumberAsBinary(1); // 1 in binary is 1
    expect(grid.getValue(1, 1)).toBe(2);
    expect(grid.computeGridNumber()).toBe(13);
  });
  it('Appending a number as binary with offset move the number on the grid', () => {
    const grid = new Grid();
    grid.appendNumberAsBinary(4,1,0); 
    expect(grid.getValue(3, 0)).toBe(1);
    expect(grid.computeGridNumber()).toBe(8);
  });
    it('Appending two numbers on grid == sum of numbers', () => {
    const grid = new Grid();
    grid.appendNumberAsBinary(4); 
    grid.appendNumberAsBinary(13); 
    expect(grid.computeGridNumber()).toBe(17);
  });
  it('Grid should return null for non-existent cells', () => {
    const grid = new Grid();
    expect(grid.getValue(0, 0)).toBe(0);
  });
  it('Grid should return 0 for computing number non-existent cells', () => {
    const grid = new Grid();
    expect(grid.computeCellNumber(0, 0)).toBe(0);
  });

  // Additional tests can be written for edge cases and other functionalities
});