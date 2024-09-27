import React, { useEffect } from "react";
import HelpModal from "../../src/components/HelpModal.jsx";
import { mouse_tool } from "../../src/features/mouse-tool.js";
import hotkeys from "hotkeys-js";
import { setHotActions } from "../../src/user-input/hotkeys.js";
import { setGridPanning } from "../../src/interactions/grid-pan.js";
import { setHistoryControls } from "../../src/interactions/grid-history.js";
import { LeftPanel } from "../../src/components/LeftPanel.jsx";

export const App = ({grid}) => {
    const doItGrid = () => {
        console.log("do-it-grid");
        grid.doIt();
        grid.render();
      };
      const shortGrid = () => {
        console.log("do-it-grid");
        grid.shortGrid();
        grid.render();
      };
      const onInputChange = (e) => {
        grid.clear();
        grid.appendNumberAsBinary(parseInt(e.target.value));
        doItGrid();
        //shortGrid();
        grid.fitView();
      
      };
      const clearGrid = (e) => {
        console.log("clear-grid");
        grid.clear();
        grid.render();
      };
      const changeType = (type) => {
        mouse_tool.switch_tool(type);
      }
      
      
    
    useEffect(()=>{
        grid.render();
        onInputChange({ target: { value: '13' } })
                
        setHotActions(grid);
        setGridPanning(grid);
        setHistoryControls(grid);
    })      

    return (<>
            <LeftPanel grid={grid} onInputChange={onInputChange} clearGrid={clearGrid} doItGrid={doItGrid} changeType={changeType} />
            <HelpModal />
        </>)
};