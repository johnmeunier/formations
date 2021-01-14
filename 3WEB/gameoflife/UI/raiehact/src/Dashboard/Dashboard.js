import React from "react";
import "./Dashboard.css";
import Header from "../layout/Header/Header";

const subtitle = "Dashboard";

const Dashboard = ({
  grid,
  setGrid,
  symbols,
  setSymbols,
  gridSize,
  setGridSize,
  nextStep,
  numberOfSteps,
  setNumberOfSteps,
  live,
  setLive,
  generatePattern
}) => (
  <>
    <Header subtitle={subtitle} />
    <div className="dashboard">
      <div class="configuration">
        <span class="input__container">
          Taille{" "}
          <input
            id="gridSize"
            className="input--number"
            type="text"
            value={gridSize}
            placeholder="Grid size"
            onChange={e => setGridSize(e.target.value)}
          />
          <button
            id="next"
            className="waves-effect waves-light btn"
            onClick={nextStep}
          >
            >
          </button>
        </span>
        <span class="input__container">
          <input
            id="numberOfSteps"
            className="input--number"
            type="text"
            placeholder="Number of steps"
            value={numberOfSteps}
            onChange={e => setNumberOfSteps(e.target.value)}
          />
          <button
            id="live"
            className="waves-effect waves-light btn"
            onClick={() => setLive(!live)}
          >
            {live ? "Stop" : "Start"}
          </button>
        </span>
        <span class="input__container">
          <select
            className="select"
            onChange={e => generatePattern(e.target.value)}
          >
            <option value="">--Pattern--</option>
            <option value="empty">Vide</option>
            <option value="blinker">Clignotant</option>
            <option value="ship">Vaisseau</option>
          </select>
        </span>
      </div>
      <div className="grid">
        {grid.map((line, idLine) => (
          <div className="grid__line">
            {line.map((cell, idCell) => (
              <span
                className={`grid__cell grid__cell--${cell ? "alive" : "dead"}`}
                onClick={() => {
                  const newGrid = [...grid];
                  newGrid[idLine][idCell] = !cell;
                  setGrid(newGrid);
                }}
              >
                {/* {cell ? symbols.alive : symbols.dead} */}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </>
);

export default Dashboard;
