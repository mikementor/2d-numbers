import "./src/index.css";
import { HistoryGrid } from "./src/models/grid-history.js";
import hotkeys from "hotkeys-js";
import { setHotActions } from "./src/hotkeys.js";
import { setGridPanning } from "./src/interactions/grid-pan.js";
import { setHistoryControls } from "./src/interactions/grid-history.js";
import React from "react";
import ReactDOM from "react-dom/client";
import HelpModal from "./src/components/HelpModal.jsx";
import { mouse_tool } from "./src/features/mouse-tool.js";
import * as math from 'mathjs';
import {Matrix} from './src/models/matrix.js';
import { DataGrid } from "./DataGrid.jsx";

window.math = math;
window.matrix = ()=> new Matrix();
// react migration
ReactDOM.createRoot(document.getElementById("react-root")).render(
  <React.StrictMode>
    <HelpModal />
  </React.StrictMode>
);
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
export function onCellClick({ x, y }, value, grid, e) {
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
export function updateHoverStats({ x, y }, value) {
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
