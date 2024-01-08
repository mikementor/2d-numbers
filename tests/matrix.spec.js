import  {Matrix} from '../src/models/matrix';
import { expect, it, describe } from 'vitest'
describe('Matrix functionality', () => {
  it('prints horziontally x',()=>{
    const matrix = new Matrix();
    matrix.addVal(0,0,1)
    matrix.addVal(2,0,2);
 
    expect(matrix.print()).toBe('2 0 1');
  });
  it('prints vertically y',()=>{
    const matrix = new Matrix();
    matrix.addVal(0,0,1)
    matrix.addVal(0,1,2);

    expect(matrix.print()).toBe('2\n1');
  })

it('panGridProportionally23x no changes on first line', () => {
    const matrix = new Matrix();
    matrix.addVal(0,0,1)

    matrix.print(); //? 
    matrix.panGridProportionally23x();
    matrix.print();//? 
    
    expect(matrix.offset[0]).toBe(0);
    expect(matrix.offset[1]).toBe(0);

    expect(matrix.getVal(0,0)).toBe(1);
  });


it('panGridProportionally23x no changes on first line', () => {
  const matrix = new Matrix();
  matrix.addVal(0,0,1)
  matrix.addVal(0,1,3)
  matrix.addVal(2,0,2);

  matrix.print(); //? 
  matrix.panGridProportionally23x();
  matrix.panGridProportionally23x();
  matrix.panGridProportionally23x();
  matrix.print();//? 
  
  expect(matrix.offset[0]).toBe(3);
  expect(matrix.offset[1]).toBe(0);

  expect(matrix.getVal(0,0)).toBe(1);
  expect(matrix.getVal(2,0)).toBe(2);
});

it('panGridProportionally23x simple', () => {
  const matrix = new Matrix();
  matrix.addVal(0,0,1)
  matrix.addVal(1,1,2);

  matrix.print(); //? 
  matrix.panGridProportionally23x();
  matrix.print();//? 
  
  expect(matrix.offset[0]).toBe(0);
  expect(matrix.offset[1]).toBe(0);

  expect(matrix.getVal(0,0)).toBe(1);
  expect(matrix.getVal(0,1)).toBe(2);
});

});