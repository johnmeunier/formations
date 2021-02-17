const { generateInitialGrid, generateGridWithFalse, render, countAliveNeighbour, getNextStateCell, getNextStateGrid } = require("./labs2001");

[
  {
    size: 3,
    expected: [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
  },
  {
    size: 4,
    expected: [
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
    ],
  },
].forEach(({ size, expected }) => {
  it("should generate an array of array with the correct length filled with false", () => {
    const generatedGrid = generateGridWithFalse(size);
    expect(generatedGrid.length).toEqual(size);
    expect(generatedGrid).toEqual(expected);
  });
});

it("should generate an array of array with the correct length", () => {
  const size = 3;
  const generatedGrid = generateInitialGrid(size);
  expect(generatedGrid.length).toEqual(size);
  expect(generatedGrid[0].length).toEqual(size);
  expect(generatedGrid[1].length).toEqual(size);
  expect(generatedGrid[2].length).toEqual(size);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      expect(generatedGrid[i][j]).toEqual(expect.any(Boolean));
    }
  }
});

it("shouldn't modify each cell of a column", () => {
  const generatedGrid = generateInitialGrid(4);
  generatedGrid[2][0] = "a";
  expect(generatedGrid[2][0]).toEqual("a");
  expect(generatedGrid[0][0]).not.toEqual("a");
  expect(generatedGrid[1][0]).not.toEqual("a");
  expect(generatedGrid[3][0]).not.toEqual("a");
});

it("should display a grid", () => {
  const arr = [
    [false, false, false],
    [false, true, false],
    [false, false, false],
  ];
  const expectedOutput = `...\n.X.\n...`;
  expect(render(arr)).toBe(expectedOutput);
});

[
  [
    [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ],
    { x: 1, y: 1 },
    0,
  ],
  [
    [
      [true, true, false],
      [false, true, false],
      [false, true, true],
    ],
    { x: 1, y: 1 },
    4,
  ],
  [
    [
      [true, true],
      [false, true],
    ],
    { x: 1, y: 1 },
    2,
  ],
  [
    [
      [true, true, true, false, true],
      [false, true, true, false, true],
      [false, true, true, false, true],
      [false, true, true, false, true],
      [false, true, true, false, true],
    ],
    { x: 0, y: 0 },
    2,
  ],
  [
    [
      [true, true, true, false, true],
      [false, true, true, false, true],
      [false, true, true, false, true],
      [false, true, true, false, true],
      [false, true, true, false, true],
    ],
    { x: 4, y: 4 },
    1,
  ],
  [
    [
      [true, true, true, false, true],
      [false, true, true, false, true],
      [false, true, true, false, true],
      [false, true, true, false, true],
      [false, true, true, false, true],
    ],
    { x: 4, y: 0 },
    2,
  ],
].forEach(([grid, coords, expected]) => {
  it("should count the number of alives neightbour for a center cell", () => {
    expect(countAliveNeighbour(grid, coords)).toEqual(expected);
  });
});

[
  [false, 0, false],
  [false, 1, false],
  [false, 2, false],
  [false, 3, true],
  [false, 4, false],
  [false, 5, false],
  [false, 6, false],
  [false, 7, false],
  [false, 8, false],
  [true, 0, false],
  [true, 1, false],
  [true, 2, true],
  [true, 3, true],
  [true, 4, false],
  [true, 5, false],
  [true, 6, false],
  [true, 7, false],
  [true, 8, false],
].forEach(([currState, aliveNeighbour, expected]) => {
  it("should return the next state for a dead cell", () => {
    expect(getNextStateCell(currState, aliveNeighbour)).toBe(expected);
  });
});

[
  {
    grid: [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ],
    nextGrid: [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
  },
  {
    grid: [
      [true, false, false],
      [false, true, false],
      [false, false, true],
    ],
    nextGrid: [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ],
  },
].forEach(({ grid, nextGrid }) => {
  it("should compute the next state of the grid", () => {
    expect(getNextStateGrid(grid)).toEqual(nextGrid);
  });
});
