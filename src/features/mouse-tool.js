
const add1=(currentCell,grid)=>{
    grid.addValue(currentCell.x,currentCell.y,1);
}
const minus1=(currentCell,grid)=>{
    grid.addValue(currentCell.x,currentCell.y,-1);
}
const move_left=(currentCell,grid)=>{
    grid.addValue(currentCell.x,currentCell.y,-2);
    grid.addValue(currentCell.x+1,currentCell.y,+1);
}
const move_right=(currentCell,grid)=>{
    grid.addValue(currentCell.x,currentCell.y,-1);
    grid.addValue(currentCell.x-1,currentCell.y,+1);
}
const move_up=(currentCell,grid)=>{
    grid.addValue(currentCell.x,currentCell.y,-1);
    grid.addValue(currentCell.x+1,currentCell.y+1,+1);
    grid.addValue(currentCell.x,currentCell.y+1,+1);
}
const move_down=(currentCell,grid)=>{
    grid.addValue(currentCell.x,currentCell.y,1);
    grid.addValue(currentCell.x+1,currentCell.y+1,-1);
    grid.addValue(currentCell.x,currentCell.y+1,-1);
}
const map = { 
    'add-1':{
        positive:add1,
        inverse:minus1,
    },
    'minus-1':{
        positive:minus1,
        inverse:add1,
    }, 
    'move-left':{
        positive:move_left,
        inverse:move_right,
    },
    'move-right':{
        positive:move_right,
        inverse:move_left,
    },
    'move-up':{
        positive:move_up,
        inverse:move_down,
    },
    'move-down':{
        positive:move_down,
        inverse:move_up,
    }
}
export const mouse_tool = {
    tool:'add-1',

    current_tool(){
        return this.tool;
    },
    switch_tool(tool){
        this.current_tool = tool;
        console.log('current_tool', this.current_tool)
    },

    on_click(cell,grid,event){
        if (event.shiftKey){
            map[this.current_tool].inverse(cell, grid)
        }else{
         map[this.current_tool].positive(cell, grid)
       }
    }
}