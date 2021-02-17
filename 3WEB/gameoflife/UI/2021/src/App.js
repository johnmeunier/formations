import { useState } from "react";
import "./App.css";
import { people } from "./data.json";
import { Person } from "./components/Person/Person";

const App = () => {
  const [displayGender, setDisplayGender] = useState(["female", "male"]);

  const handleCheckGender = ({ target: { value } }) => {
    setDisplayGender((prev) => {
      const newGender = new Set(prev);
      if (newGender.has(value)) {
        newGender.delete(value);
      } else {
        newGender.add(value);
      }
      return Array.from(newGender);
    });
  };
  return (
    <div className="App">
      <div className="filter">
        {["female", "male"].map((gender) => (
          <label htmlFor={gender} className="filter__input">
            <input type="checkbox" name="gender" value={gender} id={gender} checked={displayGender.includes(gender)} onChange={handleCheckGender} />
            Femme
          </label>
        ))}
      </div>
      <div className="people">
        {people
          .filter(({ gender }) => displayGender.includes(gender))
          .map(({ name, email, phone, greeting, gender }) => (
            <Person name={name} email={email} phone={phone} greeting={greeting} gender={gender} />
          ))}
      </div>
    </div>
  );
};

export default App;
