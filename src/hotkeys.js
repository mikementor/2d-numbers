export const setHotActions = (grid) => {
  hotkeys("1", function (event, handler) {
    event.preventDefault();
    const currentCell = grid.getCurrentCell();
    const gridCellCurrent = grid.getValue(currentCell.x, currentCell.y);
    grid.addValue(currentCell.x, currentCell.y, -1);
    grid.addValue(currentCell.x, currentCell.y + 1, 1);
    grid.addValue(currentCell.x + 1, currentCell.y + 1, 1);
    grid.render();
  });
  hotkeys("2", function (event, handler) {
    event.preventDefault();
    const currentCell = grid.getCurrentCell();
    const gridCellCurrent = grid.getValue(currentCell.x, currentCell.y);
    grid.addValue(currentCell.x, currentCell.y, 1);
    grid.addValue(currentCell.x, currentCell.y + 1, -1);
    grid.addValue(currentCell.x + 1, currentCell.y + 1, -1);
    grid.render();
  });
  hotkeys('3', function(event, handler){
    event.preventDefault()
    const currentCell = grid.getCurrentCell();
    const gridCellCurrent =  grid.getValue(currentCell.x, currentCell.y);
    grid.addValue(currentCell.x, currentCell.y, -2);
    grid.addValue(currentCell.x+1, currentCell.y, 1);
    grid.render();
  });
  hotkeys('4', function(event, handler){
    event.preventDefault()
    const currentCell = grid.getCurrentCell();
    const gridCellCurrent =  grid.getValue(currentCell.x, currentCell.y);
    grid.addValue(currentCell.x, currentCell.y, 2);
    grid.addValue(currentCell.x+1, currentCell.y, -1);
    grid.render();
  });
  hotkeys("q", function (event, handler) {
    event.preventDefault();
    const currentCell = grid.getCurrentCell();
    const gridCellCurrent = grid.getValue(currentCell.x, currentCell.y);
    grid.addValue(currentCell.x, currentCell.y, -2);
    grid.addValue(currentCell.x + 1, currentCell.y + 1, 3);
    grid.render();
  });
  hotkeys("w", function (event, handler) {
    event.preventDefault();
    const currentCell = grid.getCurrentCell();
    const gridCellCurrent = grid.getValue(currentCell.x, currentCell.y);
    grid.setValue(currentCell.x, currentCell.y, 0);
    grid.addValue(currentCell.x, currentCell.y + 1, gridCellCurrent * 3);
    grid.render();
  });
  hotkeys("e", function (event, handler) {
    event.preventDefault();
    alert("you pressed e");
  });
  hotkeys(".", function (event, handler) {
    event.preventDefault();
    const currentCell = grid.getCurrentCell();
    grid.setValue(currentCell.x, currentCell.y, 0);
    grid.render();
  });
  hotkeys("a", function (event, handler) {
    event.preventDefault();
    const currentCell = grid.getCurrentCell();
    const gridCellCurrent = grid.getValue(currentCell.x, currentCell.y);
    grid.setValue(currentCell.x, currentCell.y, 0);
    grid.addValue(currentCell.x + 1, currentCell.y, gridCellCurrent / 2);
    grid.render();
  });
  hotkeys("s", function (event, handler) {
    event.preventDefault();
    const currentCell = grid.getCurrentCell();
    const gridCellCurrent = grid.getValue(currentCell.x, currentCell.y);
    grid.setValue(currentCell.x, currentCell.y, -gridCellCurrent);
    grid.render();
  });
  hotkeys("d", function (event, handler) {
    event.preventDefault();
    const currentCell = grid.getCurrentCell();
    const gridCellCurrent = grid.getValue(currentCell.x, currentCell.y);
    grid.setValue(currentCell.x, currentCell.y, 0);
    grid.addValue(currentCell.x - 1, currentCell.y, gridCellCurrent * 2);
    grid.render();
  });

  hotkeys("z", function (event, handler) {
    const currentCell = grid.getCurrentCell();
    event.preventDefault();
    alert("you pressed z");
  });
  hotkeys("x", function (event, handler) {
    event.preventDefault();
    const currentCell = grid.getCurrentCell();
    const gridCellCurrent = grid.getValue(currentCell.x, currentCell.y);
    grid.setValue(currentCell.x, currentCell.y, 0);
    grid.addValue(currentCell.x, currentCell.y - 1, gridCellCurrent / 3);
    grid.render();
  });
  hotkeys("c", function (event, handler) {
    event.preventDefault();
    const currentCell = grid.getCurrentCell();
    const gridCellCurrent = grid.getValue(currentCell.x, currentCell.y);
    grid.render();
  });
};
