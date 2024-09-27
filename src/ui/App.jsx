import React, { useEffect, useState } from "react";
import { Grid } from "./Grid.jsx";

import { DataGrid } from "./DataGrid.jsx";

import hotkeys from "hotkeys-js";
import { setHotActions } from "../user-input/hotkeys.js";
import { setGridPanning } from "../interactions/grid-pan.js";
import { setHistoryControls } from "../interactions/grid-history.js";
import { LeftPanel } from "../components/LeftPanel.jsx";


import { mouse_tool } from "../features/mouse-tool.js";
export const App = () => {


    const doItGrid = () => {
        console.log("do-it-grid");
        selectedGrid.doIt();
        selectedGrid.render();
    };
    const shortGrid = () => {
        console.log("do-it-grid");
        selectedGrid.shortGrid();
        selectedGrid.render();
    };
    const onInputChange = (e) => {
        selectedGrid.clear();
        selectedGrid.appendNumberAsBinary(parseInt(e.target.value));
        doItGrid();
        //shortGrid();
        selectedGrid.fitView();

    };
    const clearGrid = (e) => {
        console.log("clear-grid");
        selectedGrid.clear();
        selectedGrid.render();
    };
    const changeType = (type) => {
        mouse_tool.switch_tool(type);
    }

    // const grid = new DataGrid(null);
    const grids = [new DataGrid(null), new DataGrid(null)]
    const [selectedGrid, setSelectedGrid] = useState(grids[1]);

    useEffect(() => {
        hotkeys.unbind();
        setHotActions(selectedGrid);
        setGridPanning(selectedGrid);
        setHistoryControls(selectedGrid);
    }, [selectedGrid]);

    const selectGrid = grid => {
        if (selectGrid.dom != grid.dom) {
            setSelectedGrid(grid);
        }
    }


    const [showLeftPanel, setShowLeftPanel] = useState(false)
    const toggleLeftPanel = () => setShowLeftPanel(!showLeftPanel)
    const closeLeftPanel = () => setShowLeftPanel(false)
    return (<>
        <div id="main" class="p-4 sm:ml-64">
            <div id="grids" class="object-top flex justify-center">
                {grids.map((grid, index) => <Grid grid={grid} onSelected={selectGrid} key={index} toggleLeftPanel={toggleLeftPanel} />)}

            </div>

            {showLeftPanel &&
                <LeftPanel grid={selectedGrid} onInputChange={onInputChange} clearGrid={clearGrid} doItGrid={doItGrid} changeType={changeType} onClose={closeLeftPanel} />
            }
        </div>
    </>)
};