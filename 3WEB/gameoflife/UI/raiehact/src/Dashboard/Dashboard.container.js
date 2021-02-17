import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";

import { generateInitialGrid, step, generateInitialGridFalse } from "../services/algo";

const EnhanceDashboard = (props) => {
  const [gridSize, setGridSize] = useState(40);
  const [grid, setGrid] = useState(generateInitialGrid(gridSize));
  const [numberOfSteps, setNumberOfSteps] = useState(10);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (live) {
        setNumberOfSteps(numberOfSteps - 1);
        nextStep();
      }
    }, 24);
    if (numberOfSteps <= 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  const generatePattern = (patternName) => {
    switch (patternName) {
      case "empty":
        setGrid(generateInitialGridFalse(gridSize));
        break;
      default:
        break;
    }
  };

  const nextStep = () => {
    setGrid(step(grid));
  };

  useEffect(() => {
    setGrid(generateInitialGrid(gridSize));
  }, [gridSize]);

  return (
    <Dashboard
      {...props}
      grid={grid}
      setGrid={setGrid}
      gridSize={gridSize}
      setGridSize={setGridSize}
      nextStep={nextStep}
      numberOfSteps={numberOfSteps}
      setNumberOfSteps={setNumberOfSteps}
      live={live}
      setLive={setLive}
      generatePattern={generatePattern}
    />
  );
};

export default EnhanceDashboard;
