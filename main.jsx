import "./src/index.css";
import { Grid } from "./src/models/grid.js";
import { HistoryGrid } from "./src/models/grid-history.js";
import { GridView } from "./src/models/grid_view.js";
import hotkeys from "hotkeys-js";
import { setHotActions } from "./src/hotkeys.js";
import { setGridPanning } from "./src/interactions/grid-pan.js";
import { setHistoryControls } from "./src/interactions/grid-history.js";
import React from "react";
import ReactDOM from "react-dom/client";
import HelpModal from "./src/components/HelpModal.jsx";
import { mouse_tool } from "./src/features/mouse-tool.js";

// react migration
ReactDOM.createRoot(document.getElementById("react-root")).render(
  <React.StrictMode>
    <HelpModal />
  </React.StrictMode>
);
class DataGrid {
  constructor() {
    this.grid = new HistoryGrid();
    this.size = 30;
    this.offsetX = -5;
    this.offsetY = -5;
    this.cellSize = 20;
    this.dom = document.getElementById("default-grid-view");
    this.currentCell = null;
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
  getGrid(){
    return this.grid.getGrid();
  }
  setGrid(newGrid){
    return this.grid.setGrid(newGrid);
  }
  pushToHistory(){
    return this.grid.pushToHistory();
  }
  getColumn(x) {
    return this.grid.getColumn(x);
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
        cellElement.onmouseover = () => updateHoverStats({ x, y }, cellValue);
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

  moveGridLeft() {
    this.offsetX -= 1;
  }
  moveGridRight() {
    this.offsetX += 1;
  }
  moveGridUp() {
    this.offsetY -= 1;
  }
  moveGridDown() {
    this.offsetY += 1;
  }
  next() {
    return this.grid.next();
  }
  prev() {
    return this.grid.prev();
  }
}
const grid = new DataGrid();
grid.render();
document.querySelector("#enter-number").addEventListener("change", (e) => {
  grid.clear();
  grid.appendNumberAsBinary(parseInt(e.target.value));
});
document.querySelector("#clear-grid").addEventListener("click", (e) => {
  console.log("clear-grid");
  grid.clear();
  grid.render();
});

// Function to update the stats widget
function onCellClick({ x, y }, value, grid, e) {
  const cellStats = document.getElementById("cell-stats");
  // const value = grid.getValue(x, y);
  // const rowValue = grid.computeRowValue(x); // You'll need to implement this method in Grid class

  cellStats.innerHTML = `
    <p><strong>Cell:</strong> (${x}, ${y})</p>
    <p><strong>Value:</strong> ${value}</p>
    <p><strong>Value:</strong> ${value * 2 ** x * 3 ** y}</p>
  `;
  const currentCell = grid.getCurrentCell();
  const gridCellCurrent = grid.getValue(currentCell.x, currentCell.y);

  // grid.addValue(currentCell.x, currentCell.y, 1);
  mouse_tool.on_click(currentCell, grid, e);
  grid.render();
}
function updateHoverStats({ x, y }, value) {
  const cellStats = document.getElementById("cell-hover-stats");
  grid.setCurrentCell({ x, y, value });
  cellStats.innerHTML = `
    <p><strong>Cell:</strong> (${x}, ${y})</p>
    <p><strong>Value:</strong> ${value}</p>
    <p><strong>Value:</strong> ${value * 2 ** x * 3 ** y}</p>
  `;
}

const mouse_tools_selects = document.querySelectorAll(".mouse-tool-select");
const selected_tool = document.querySelector(".selected-mouse-tool");
mouse_tools_selects.forEach((select) => {
  select.addEventListener("click", function handleClick(e) {
    mouse_tool.switch_tool(e.target.getAttribute("tool-type"));
    selected_tool.innerHTML = e.target.getAttribute("tool-type");
  });
});
setHotActions(grid);
setGridPanning(grid);
setHistoryControls(grid);
