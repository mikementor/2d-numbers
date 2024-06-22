import "./src/index.css";
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
import RuleConstructorModal from "./src/components/RuleConstructorModal.jsx";
import { LeftPanel } from "./src/components/LeftPanel.jsx";

// window.math = math;
// window.matrix = ()=> new Matrix();
const doItGrid = () => {
  console.log("do-it-grid");
  grid.doIt();
  grid.render();
};
const onInputChange= (e) => {
  grid.clear();
  grid.appendNumberAsBinary(parseInt(e.target.value));
  doItGrid()
};
const clearGrid = (e) => {
  console.log("clear-grid");
  grid.clear();
  grid.render();
};
const changeType = (type)=>{
  mouse_tool.switch_tool(type);
}

const grid = new DataGrid();
grid.render();
onInputChange({target:{value:'13'}})
doItGrid();
changeType('test');



// react migration
ReactDOM.createRoot(document.getElementById("react-root")).render(
  <React.StrictMode>
    <LeftPanel  grid={grid} onInputChange={onInputChange} clearGrid={clearGrid} doItGrid={doItGrid} changeType={changeType}/>
    <HelpModal />
    {/* <RuleConstructorModal /> */}
  </React.StrictMode>
);


document.addEventListener("DOMContentLoaded", function(event) { 

setHotActions(grid);
setGridPanning(grid);
setHistoryControls(grid);

});