import { NewGrid as NewGrid } from "./src/models/new-grid.js";
import { GridView } from "./src/models/grid_view.js";
import { mouse_tool } from "./src/features/mouse-tool.js";
// Function to update the stats widget
export function onCellClick({ x, y }, value, grid, e) {
  mouse_tool.on_click({ x, y }, grid, e);
  grid.render();
}
export function updateHoverStats({ x, y }, value, grid) {
  const cellStats = document.getElementById("cell-hover-stats");
  if (cellStats == null) {
    console.warn("to do: update hover stats");
    return;
  }
  grid.setCurrentCell({ x, y, value });
  cellStats.innerHTML = `
    <p><strong>Cell:</strong> (${x}, ${y})</p>
    <p><strong>Value:</strong> ${value}</p>
    <p><strong>Value:</strong> ${value * 2 ** x * 3 ** y}</p>
  `;
}
export class DataGrid {
  constructor() {
    // this.grid = new HistoryGrid();
    this.grid = new NewGrid();
    this.size = 15;
    this.offsetX = -1;
    this.offsetY = -1;
    this.cellSize = 20;
    this.dom = document.getElementById("default-grid-view");
    this.currentCell = null;
  }
  moreSize(){
    this.size++;
  }
  lessSize(){
    if(this.size > 10)
    this.size--;
  }
  setCurrentCell(cell) {
    this.currentCell = cell;
  }
  getCurrentCell() {
    return this.currentCell;
  }
  getValue(x, y) {
    return this.grid.getValue(x, y);
  }
  getPrettyValue(x, y) {
    return this.grid.getValue(x, y);
  }
  setValue(x, y, value) {
    this.grid.setValue(x, y, value);
  }
  addValue(x, y, value) {
    this.grid.addValue(x, y, value);
  }
  appendNumberAsBinary(number) {
    this.grid.appendNumberAsBinary(number);
    this.render();
  }
  clear() {
    // clears history as well, dont use casually
    this.grid.clear();
    this.render();
  }
  viewToGrid({ x, y }) {
    return {
      x: this.XToGrid(x),
      y: this.YToGrid(y),
    };
  }
  YToGrid(y) {
    return this.size - y - 1 + this.offsetY;
  }
  XToGrid(x) {
    return this.size - x - 1 + this.offsetX;
  }
  getRow(y) {
    return this.grid.getRow(y);
  }
  getGrid() {
    return this.grid.getGrid();
  }
  setGrid(newGrid) {
    return this.grid.setGrid(newGrid);
  }
  setGridSnapshot(text) {
    return this.grid.fromSnapshot(text);
  }
  pushToHistory(grid) {
    return this.grid.pushToHistory(grid);
  }
  getColumn(x) {
    return this.grid.getColumn(x);
  }
  panGridProportionally23x() {
    this.grid.panGridProportionally23x();
  }
  panGridProportionally13x() {
    this.grid.panGridProportionally13x();
  }
  doIt() {
    this.grid.doIt();
  }
  shortGrid(){
    this.grid.shortGrid();
  }
  fitView() {
    const {xOffsetted,yOffsetted} = this.grid.getFurthestPoints();
    // const max  = Math.max(this.size,xOffsetted,yOffsetted)
    const max  = Math.max(xOffsetted,yOffsetted)+1
    this.size = max;
    // const max = Math.max(this.size, xOffsetted);
    const subgrid = new GridView(this.grid).calculateWindow(
      [this.offsetX, this.offsetY],
      this.size,
      "top-left"
    );
    this.renderGrid(subgrid, this.cellSize, this.dom, this);
    // console.log(this.grid.getFurthestPoints())
    // console.log( [this.offsetX, this.offsetY])
  }
  render() {
    const subgrid = new GridView(this.grid).calculateWindow(
      [this.offsetX, this.offsetY],
      this.size,
      "top-left"
    );
    this.renderGrid(subgrid, this.cellSize, this.dom, this);
  }
  renderGrid(windowView, cellSize, gridViewElement, grid) {
    gridViewElement.innerHTML = ""; // Clear previous grid
    let zoom = 400/(cellSize*windowView.length);
    
    console.log('zoom',zoom);
    gridViewElement.style.zoom=zoom;
    const column_actions = document.createElement("div");
    column_actions.className = "column-actions-selection";
    column_actions.classList.add("column-actions-selection");
    gridViewElement.appendChild(column_actions);

    const row_actions = document.createElement("div");
    row_actions.className = "row-actions-selection";
    row_actions.classList.add("row-actions-selection");
    gridViewElement.appendChild(row_actions);

    windowView.forEach((row, rowIndex) => {
      const rowElement = document.createElement("div");
      rowElement.classList.add("grid-row");
      row.forEach((cellValue, columnIndex) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        const { x, y } = grid.viewToGrid({ x: columnIndex, y: rowIndex });
        cellElement.setAttribute("data-x", x);
        cellElement.setAttribute("data-y", y);
        cellElement.onclick = (e) => onCellClick({ x, y }, cellValue, grid, e);
        cellElement.onmouseover = () =>
          updateHoverStats({ x, y }, cellValue, grid);
        if (cellValue != 0) cellElement.textContent = cellValue;
        else cellElement.textContent = "";
        if (cellValue > 0) {
          cellElement.style.backgroundColor = "rgb(186 230 253)";
        } else if (cellValue < 0) {
          cellElement.style.backgroundColor = "rgb(253 164 175)";
        }

        cellElement.style.width = `${cellSize}px`; // Set cell width
        cellElement.style.height = `${cellSize}px`; // Set cell height
        rowElement.appendChild(cellElement);
      });

      const columnNumberElement = document.createElement("div");
      columnNumberElement.style.width = `${cellSize}px`; // Set cell width
      columnNumberElement.style.height = `${cellSize}px`; // Set cell height
      columnNumberElement.classList.add("column-selection-cell");
      columnNumberElement.setAttribute("data-x", grid.XToGrid(rowIndex));
      columnNumberElement.innerHTML = grid.XToGrid(rowIndex);
      column_actions.append(columnNumberElement);

      const rowNumberElement = document.createElement("div");
      rowNumberElement.style.width = `${cellSize}px`; // Set cell width
      rowNumberElement.style.height = `${cellSize}px`; // Set cell height
      rowNumberElement.classList.add("row-selection-cell");
      rowNumberElement.setAttribute("data-y", grid.YToGrid(rowIndex));
      rowNumberElement.innerHTML = grid.YToGrid(rowIndex);
      row_actions.append(rowNumberElement);

      gridViewElement.appendChild(rowElement);
    });
  }

  moveGridLeft(amount = 1) {
    this.offsetX -= amount;
  }
  moveGridRight(amount = 1) {
    this.offsetX += amount;
  }
  moveGridUp(amount = 1) {
    this.offsetY -= amount;
  }
  moveGridDown(amount = 1) {
    this.offsetY += amount;
  }
  next() {
    this.grid.next();
    this.render();
  }
  prev() {
    this.grid.prev();
    this.render();
  }
  getGridJSON() {
    return this.grid.getGridJSON();
  }
}
