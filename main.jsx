import "./src/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { DataGrid } from "./src/ui/DataGrid.jsx";
import { App } from "./src/ui/index.jsx";

window.grid = new DataGrid(document.getElementById("default-grid-view"));

// react migration
ReactDOM.createRoot(document.getElementById("react-root")).render(
  <React.StrictMode>
    <App grid={window.grid}/>
    {/* <LeftPanel grid={grid} onInputChange={onInputChange} clearGrid={clearGrid} doItGrid={doItGrid} changeType={changeType} />
    <HelpModal /> */}
  </React.StrictMode>
);
