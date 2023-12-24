export const setHistoryControls = (grid)=>{
    hotkeys('alt+left', function(event, handler){
        event.preventDefault();
        grid.prev();
        grid.render();
      });
    
      hotkeys('alt+right', function(event, handler){
        event.preventDefault();
        grid.next();
        grid.render();
      });
}