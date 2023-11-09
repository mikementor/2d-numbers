export const setGridPanning = (grid)=>{
    hotkeys('up', function(event, handler){
      event.preventDefault()
      grid.moveGridUp();
      grid.render();
    });
  
    hotkeys('down', function(event, handler){
      event.preventDefault()
      grid.moveGridDown();
      grid.render();
    });
  
    hotkeys('left', function(event, handler){
      event.preventDefault()
      grid.moveGridLeft();
      grid.render();
    });
  
    hotkeys('right', function(event, handler){
      event.preventDefault()
      grid.moveGridRight();
      grid.render();
    });
  };