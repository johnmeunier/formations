const {
  render,
  generateInitialGrid,
  countAliveNeighbour,
  getNextState,
  step
} = require("./index");

it("should generate an array of array with the correct length", () => {
  const input = 3;
  const generatedGrid = generateInitialGrid(input);
  expect(generatedGrid.length).toEqual(input);
  expect(generatedGrid[0].length).toEqual(input);
  expect(generatedGrid[1].length).toEqual(input);
  expect(generatedGrid[2].length).toEqual(input);
});

it("should display a grid", () => {
  const arr = [
    [false, false, false],
    [false, true, false],
    [false, false, false]
  ];
  const expectedOutput = `...\n.X.\n...`;
  expect(render(arr)).toBe(expectedOutput);
});

[
  [
    [
      [false, false, false],
      [false, true, false],
      [false, false, false]
    ],
    0
  ],
  [
    [
      [true, true, false],
      [false, true, false],
      [false, true, true]
    ],
    4
  ]
].forEach(([grid, expected]) => {
  it("should count the number of alives neightbour for a center cell", () => {
    expect(countAliveNeighbour(grid, { x: 1, y: 1 })).toEqual(expected);
  });
});

[
  [
    [
      [true, false],
      [false, false]
    ],
    0
  ],
  [
    [
      [true, true],
      [false, false]
    ],
    1
  ],
  [
    [
      [true, true],
      [false, true]
    ],
    2
  ]
].forEach(([grid, expected]) => {
  it("should count the number of alives neightbour for a corner cell", () => {
    expect(countAliveNeighbour(grid, { x: 0, y: 0 })).toEqual(expected);
  });
});

[
  [false, 1, false],
  [false, 2, false],
  [false, 3, true],
  [false, 4, false],
  [false, 5, false],
  [false, 6, false],
  [false, 7, false],
  [false, 8, false]
].forEach(([currState, count, expected]) => {
  it("should return the next state for a dead cell", () => {
    expect(getNextState(currState, count)).toBe(expected);
  });
});

[
  [true, 1, false],
  [true, 2, true],
  [true, 3, true],
  [true, 4, false],
  [true, 5, false],
  [true, 6, false],
  [true, 7, false],
  [true, 8, false]
].forEach(([currState, count, expected]) => {
  it("should return the next state for a alive cell", () => {
    expect(getNextState(currState, count)).toBe(expected);
  });
});

it("shoud kill a center cell if 2 ou 3 neightbor cell are alives", () => {
  const input = [
    [false, false, false],
    [false, true, false],
    [false, false, false]
  ];
  const output = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ];
  expect(step(input)).toEqual(output);
});
