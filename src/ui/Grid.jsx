import React, { useEffect, useRef, useState } from "react";
import HelpModal from "../components/HelpModal.jsx";
import { mouse_tool } from "../features/mouse-tool.js";
import { LeftPanel } from "../components/LeftPanel.jsx";

export const Grid = ({ grid, onSelected, toggleLeftPanel }) => {
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

    const gridRef = useRef(null);
    useEffect(() => {
        grid.dom = gridRef.current;
        grid.render();
        // onInputChange({ target: { value: '13' } })
        const onSelect = () => {
            onSelected(grid)
        };
        grid.dom.removeEventListener('click', onSelect)
        grid.dom.addEventListener('click', onSelect)
    },[])

    const onEdit = () => {
        // onSelected(grid)
        toggleLeftPanel()
    }
    return (<>
        <div ref={gridRef} className="grid-container"></div>
        <span>
            <button
                type="button"
                id="toggle-left-panel"
                class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={onEdit}
            >
                edit
            </button>
        </span>

        {/* <HelpModal /> */}
    </>)
};