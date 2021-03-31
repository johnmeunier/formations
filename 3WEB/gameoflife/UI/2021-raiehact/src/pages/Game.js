import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import { generateInitialGrid, step } from "services/algo";

import { Header } from "components/Header";
import { Grid } from "components/Grid";

export const Game = () => {
  const [probabilityDead, setProbabilityDead] = useState(80);
  const [grid, setGrid] = useState(generateInitialGrid(40, probabilityDead));
  const [chars, setChars] = useState({ alive: "🍎", dead: "💀" });
  const [probabilityDeadDebounced] = useDebounce(probabilityDead, 3000);

  useEffect(() => {
    console.log("hello");
    setGrid((prevGrid) => generateInitialGrid(prevGrid.length, probabilityDeadDebounced));
  }, [probabilityDeadDebounced]);

  const nextStateGridHandler = () => setGrid((prevGrid) => step(prevGrid));

  const changeStateCellHandler = (y, x) => {
    const newGrid = [...grid];
    newGrid[y][x] = !newGrid[y][x];
    setGrid(newGrid);
  };

  return (
    <div className="App">
      <Header
        gridLength={grid.length}
        setGrid={setGrid}
        probabilityDead={probabilityDead}
        setProbabilityDead={setProbabilityDead}
        chars={chars}
        setChars={setChars}
        nextStateGridHandler={nextStateGridHandler}
      />
      <Grid grid={grid} chars={chars} changeStateCellHandler={changeStateCellHandler} />
    </div>
  );
};
