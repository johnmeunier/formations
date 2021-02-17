import { useState } from "react";
import "./App.css";
import { people } from "./data.json";
import { Person } from "./components/Person/Person";

const App = () => {
  const [displayGender, setDisplayGender] = useState(["female", "male"]);
  const [filterPhone, setFilterPhone] = useState();

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

  const handleFilterPhone = ({ target: { value } }) => {
    setFilterPhone(value);
  };

  return (
    <div className="App">
      <header>
        <h1>Personas</h1>
        <h2 className="numberResult">x people</h2>
        <div className="filters">
          <h2>Filter by :</h2>
          <div className="filter">
            {["female", "male"].map((gender) => (
              <label htmlFor={gender} className="filter__input">
                <input type="checkbox" name="gender" value={gender} id={gender} checked={displayGender.includes(gender)} onChange={handleCheckGender} />
                Femme
              </label>
            ))}
          </div>
          <div className="filter">
            <label htmlFor="filter-phone" className="filter__input">
              Phone number
              <input type="tel" name="filter-phone" id="filter-phone" value={filterPhone} onChange={handleFilterPhone} />
            </label>
          </div>
        </div>
      </header>
      <div className="people">
        {people
          .filter(({ gender }) => displayGender.includes(gender))
          .filter(({ phone }) => (filterPhone ? phone.includes(filterPhone) : true))
          .map(({ name, email, phone, greeting, gender }) => (
            <Person name={name} email={email} phone={phone} greeting={greeting} gender={gender} />
          ))}
      </div>
    </div>
  );
};

export default App;
