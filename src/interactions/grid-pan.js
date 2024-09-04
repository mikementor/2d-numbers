export const setGridPanning = (grid)=>{
    hotkeys('up',{keydown:true}, function(event, handler){
      event.preventDefault()
      grid.moveGridUp();
      grid.render();
    });
  
    hotkeys('down',{keydown:true}, function(event, handler){
      event.preventDefault()
      grid.moveGridDown();
      grid.render();
    });
  
    hotkeys('left',{keydown:true}, function(event, handler){
      event.preventDefault()
      grid.moveGridLeft();
      grid.render();
    });
  
    hotkeys('right',{keydown:true}, function(event, handler){
      event.preventDefault()
      grid.moveGridRight();
      grid.render();
    }); 
    hotkeys('-',{keydown:true}, function(event, handler){
      event.preventDefault()
      grid.lessSize();
      grid.render();
    });
    hotkeys('=',{keydown:true}, function(event, handler){
      event.preventDefault()
      grid.moreSize();
      grid.render();
    });
  };