const { expect } = require("@jest/globals");
const { generateGrid } = require("./grid");

describe("grid", () => {
  it("should generate an array of array with a length of 3 filled with false", () => {
    expect(generateGrid(3)).toEqual([
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]);
  });

  it("should generate an array of array with a length of 4 filled with false", () => {
    expect(generateGrid(4)).toEqual([
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
    ]);
  });

  it("should change the correct value", () => {
    const myGrid = generateGrid(3);
    myGrid[0][1] = true;
    expect(myGrid[0][1]).toEqual(true);
    expect(myGrid[0][2]).toEqual(false);
    expect(myGrid[1][1]).not.toEqual(true);
  });
});
