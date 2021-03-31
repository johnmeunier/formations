const Cell = ({ changeStateCellHandler, x, y, children }) => (
  <span className="grid__cell" onClick={() => changeStateCellHandler(y, x)}>
    {children}
  </span>
);

const Line = ({ children }) => <div className="grid__line"> {children} </div>;

export const Grid = ({ grid, chars, changeStateCellHandler }) => (
  <div className="grid">
    {grid.map((line, y) => (
      <Line>
        {line.map((cell, x) => (
          <Cell changeStateCellHandler={changeStateCellHandler} x={x} y={y}>
            {cell ? chars.alive : chars.dead}
          </Cell>
        ))}
      </Line>
    ))}
  </div>
);
