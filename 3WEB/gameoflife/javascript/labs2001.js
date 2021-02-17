const generateInitialGrid = (length) => Array.from({ length }, () => Array.from({ length }, () => Math.random() >= 0.8));

const generateGridWithFalse = (length) => Array.from({ length }, () => Array.from({ length }, () => false));

const render = (grid) => {
  let gridDisplayed = "";
  grid.forEach((line, index) => {
    let lineDisplayed = "";
    line.forEach((cell) => {
      lineDisplayed += cell ? "X" : ".";
    });
    if (index !== grid.length - 1) {
      gridDisplayed += lineDisplayed + "\n";
    } else {
      gridDisplayed += lineDisplayed;
    }
  });
  return gridDisplayed;
};

const countAliveNeighbour = (grid, { x, y }) => {
  let count = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      const line = grid[i];
      if (line) {
        const cell = grid[i][j];
        if ((i !== x || j !== y) && cell) {
          count += 1;
        }
      }
    }
  }
  return count;
};

const getNextStateCell = (currState, aliveNeighbour) => (currState ? aliveNeighbour === 2 || aliveNeighbour === 3 : aliveNeighbour === 3);

const getNextStateGrid = (grid) => {
  const newGrid = JSON.parse(JSON.stringify(grid));
  const size = grid.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      newGrid[i][j] = getNextStateCell(grid[i][j], countAliveNeighbour(grid, { x: j, y: i }));
    }
  }
  return newGrid;
};

module.exports = {
  generateInitialGrid,
  generateGridWithFalse,
  render,
  countAliveNeighbour,
  getNextStateCell,
  getNextStateGrid,
};

let grid = generateInitialGrid(40);
// // let clignotant = generateInitialGridFalse(5);
// // clignotant[2][1] = true;
// // clignotant[2][2] = true;
// // clignotant[2][3] = true;
// // let planeur = generateInitialGridFalse(25);
// // planeur[1][3] = true;
// // planeur[2][3] = true;
// // planeur[2][1] = true;
// // planeur[3][3] = true;
// // planeur[3][2] = true;
const nbOfRenders = 100000;
(function myLoop(i, grid) {
  setTimeout(function () {
    console.clear();
    console.log(`Step : ${nbOfRenders - i}`);
    console.log(render(grid));
    console.log("\n");
    grid = getNextStateGrid(grid);
    if (--i) myLoop(i, grid); //  decrement i and call myLoop again if i > 0
  }, 100);
})(nbOfRenders, grid);
