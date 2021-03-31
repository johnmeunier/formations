import { useState } from "react";

import { generateInitialGrid, step } from "services/algo";

import { Header } from "components/Header";
import { Grid } from "components/Grid";

export const Game = () => {
  const [grid, setGrid] = useState(generateInitialGrid(40));
  const [chars, setChars] = useState({ alive: "🍎", dead: "💀" });

  const nextStateGridHandler = () => setGrid((prevGrid) => step(prevGrid));

  const changeStateCellHandler = (y, x) => {
    const newGrid = [...grid];
    newGrid[y][x] = !newGrid[y][x];
    setGrid(newGrid);
  };

  return (
    <div className="App">
      <Header gridLength={grid.length} setGrid={setGrid} chars={chars} setChars={setChars} nextStateGridHandler={nextStateGridHandler} />
      <Grid grid={grid} chars={chars} changeStateCellHandler={changeStateCellHandler} />
    </div>
  );
};
