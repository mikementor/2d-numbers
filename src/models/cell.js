export class Cell {
  constructor(value) {
    this.value = value; // The value can be an integer or a tuple representing factorized dividers.
  }

  clone(){
    return new Cell(this.value);
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