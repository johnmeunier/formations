import { generateInitialGrid } from "../services/algo";

export const Header = ({ gridLength, setGrid, chars, setChars, nextStateGridHandler }) => (
  <header>
    <input type="number" value={gridLength} onChange={({ target: { value } }) => setGrid(generateInitialGrid(Number(value)))} />
    {["alive", "dead"].map((state) => (
      <input type="text" value={chars[state]} onChange={({ target: { value } }) => setChars((prevChars) => ({ ...prevChars, [state]: value }))} />
    ))}
    <button onClick={nextStateGridHandler}>Next</button>
  </header>
);
