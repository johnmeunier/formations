import { generateInitialGrid } from "../services/algo";

export const Header = ({ gridLength, setGrid, probabilityDead, setProbabilityDead, chars, setChars, nextStateGridHandler }) => (
  <header>
    <label>
      Size :
      <input type="number" value={gridLength} onChange={({ target: { value } }) => setGrid(generateInitialGrid(Number(value)))} />
    </label>
    <label>
      Dead probability :
      <input type="number" value={probabilityDead} onChange={({ target: { value } }) => setProbabilityDead(value)} />
    </label>
    {["alive", "dead"].map((state) => (
      <label>
        {state} char :
        <input type="text" value={chars[state]} onChange={({ target: { value } }) => setChars((prevChars) => ({ ...prevChars, [state]: value }))} />
      </label>
    ))}
    <button onClick={nextStateGridHandler}>Next</button>
  </header>
);
