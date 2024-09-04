import React, { useState } from "react";
import { mouse_tool } from "../features/mouse-tool";
import { tools } from "../features/mouse-tool";
import { to_svg } from "../features/to-svg";
export const Stats = () => {
  return (
    <div
      id="stats-widget"
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 p-4 border rounded mt-4 bg-white shadow-lg"
    >
      <div id="cell-hover-stats"></div>
      <div id="cell-stats"></div>
    </div>
  );
};

export const CodeArea = ({onClick})=>{
  const [text,setText]=useState('');
  const onCodeClick = ()=>{
      onClick(text);
  }
  const onChange = (e)=>{
    setText(e.target.value)
  }
  return (<div>
    <textarea size={20} onChange={onChange} className="border-solid border-2 border-sky-500"/>
    <button onClick={onCodeClick}>Do</button>
  </div>)
}
export const MouseTools = ({changeType,grid}) => {
  const types = mouse_tool.types
  const onModifierChange = (e)=>{
    mouse_tool.switch_type(e.target.value)
  }
  const onCodeClick=(text)=>{
    mouse_tool.execute(text,grid)
  }
  return (
    <div>
      <h2 class="text-lg font-bold mt-4 mb-2">Mouse tools</h2>
      <div>
        <div>modifier</div>
        <select size="3"  onChange={onModifierChange}>
          {types.map(type=><option value={type} label={type} key={type}/>)}
        </select>
      </div>
      {tools.map((tool) => (
        <button
          key={tool.type}
          type="button"
          onClick={()=>changeType(tool.type)}
          tool-type={tool.type}
          className="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          {tool.text}
        </button>
      ))}
      <CodeArea onClick={onCodeClick}/>
    </div>
  );
};
export const Transformations = () => {
  return (
    <div>
      <h2 class="text-lg font-bold mt-4 mb-2">Transformations</h2>
      <button
        type="button"
        tool-type="move-diag-right"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        [ [-1 -1] [0 +1]]{" "}
      </button>
      <button
        type="button"
        tool-type="move-diag-right-till_zero"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        [ [-1 -1] [0 +1]] till zero{" "}
      </button>
      <button
        type="button"
        tool-type="dbl-move-diag-right"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        [ [-1 0 +1] [0 0 +1]]{" "}
      </button>
      <button
        type="button"
        tool-type="move-left"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        move-left
      </button>
      <button
        type="button"
        tool-type="move-right"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        move right
      </button>
      <button
        type="button"
        tool-type="move-up"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        move up
      </button>
      <button
        type="button"
        tool-type="move-down"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        move down
      </button>
    </div>
  );
};

export const LeftPanel = ({ grid,onInputChange, clearGrid, doItGrid,changeType }) => {
  return (
    <div class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 p-4 border rounded mt-4 bg-white shadow-lg">
      <button
        type="button"
        id="clear-grid"
        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={clearGrid}
      >
        Clear
      </button>
      <button
        type="button"
        onClick={to_svg}
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
       to svg
      </button>
      <button
        type="button"
        // tool-type="do-it"
        onClick={doItGrid}
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Do it!
      </button>
      <div class="mb-4">
        <input
          type="number"
          id="enter-number"
          name="clear-row"
          min={1}
          step={2}
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Enter number to fill 0 row"
          onChange={onInputChange}
        />
      </div>
      <MouseTools changeType={changeType} grid={grid}/>
    </div>
  );
};

/// old
{
  /* <div
      id="stats-widget"
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 p-4 border rounded mt-4 bg-white shadow-lg"
    >
      <div id="cell-hover-stats"></div>
      <div id="cell-stats"></div>

      <h2 class="text-lg font-bold mt-4 mb-2">Mouse tools</h2>
      <h2 class="text-lg font-bold mb-2">Grid Controls</h2>

      <button
        type="button"
        id="clear-grid"
        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={clearGrid}
      >
        Clear
      </button>
      <button
        type="button"
        tool-type="do-it"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Do it!
      </button>
      <div class="mb-4">
        <input
          type="number"
          id="enter-number"
          name="clear-row"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Enter number to fill 0 row"
          onChange={onInputChange}
        />
      </div>
      <div>
        Current tool:<div class="selected-mouse-tool"></div>
      </div>
      <h2 class="text-lg font-bold mt-4 mb-2">Editing</h2>
      <button
        type="button"
        tool-type="2-23-view"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        2 , 2/3 view
      </button>
      <button
        type="button"
        tool-type="2-3-view"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        2, 1/3 view
      </button>
      <button
        type="button"
        tool-type="add-1"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        add 1
      </button>
      <button
        type="button"
        tool-type="minus-1"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        minus 1
      </button>
      <h2 class="text-lg font-bold mt-4 mb-2">Transformations</h2>
      <button
        type="button"
        tool-type="move-diag-right"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        [ [-1 -1] [0 +1]]{" "}
      </button>
      <button
        type="button"
        tool-type="move-diag-right-till_zero"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        [ [-1 -1] [0 +1]] till zero{" "}
      </button>
      <button
        type="button"
        tool-type="dbl-move-diag-right"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        [ [-1 0 +1] [0 0 +1]]{" "}
      </button>
      <button
        type="button"
        tool-type="move-left"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        move-left
      </button>
      <button
        type="button"
        tool-type="move-right"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        move right
      </button>
      <button
        type="button"
        tool-type="move-up"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        move up
      </button>
      <button
        type="button"
        tool-type="move-down"
        class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        move down
      </button>
      <h2 class="text-lg font-bold mt-4 mb-2">Cell Actions</h2>
      <div id="cell-actions" class="mb-4"></div>
      <h2 class="text-lg font-bold mt-4 mb-2">Row Actions</h2>
      <div id="row-actions" class="mb-4">
        <button
          type="button"
          tool-type="up-the-row"
          class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          up the row
        </button>
        <button
          type="button"
          tool-type="down-the-row"
          class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          down the row
        </button>

        <button
          type="button"
          tool-type="make-row-start-from-minus-1"
          class="mouse-tool-select py-2.5 px-5 me-2 mb-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          make row start from -1
        </button>
      </div>
      <h2 class="text-lg font-bold mt-4 mb-2">Stats</h2>
      <div id="grid-actions" class="mb-4"></div>
    </div> */
}
