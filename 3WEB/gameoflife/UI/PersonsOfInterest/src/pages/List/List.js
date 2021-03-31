import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import { people } from "../../data.json";
import { Person } from "../../components/Person/Person";
import { Fail } from "../../components/Fail/Fail";

export const List = () => {
  const [displayGender, setDisplayGender] = useState(["female", "male"]);
  const [filterPhone, setFilterPhone] = useState();
  const [filterName, setFilterName] = useState();
  const [filterNameDebounced] = useDebounce(filterName, 300);
  const [peopleFiltered, setPeopleFiltered] = useState(people);

  useEffect(() => {
    setPeopleFiltered(
      people
        .filter(({ gender }) => displayGender.includes(gender))
        .filter(({ phone }) => (filterPhone ? phone.includes(filterPhone) : true))
        .filter(({ name }) => (filterNameDebounced ? name.toUpperCase().includes(filterNameDebounced.toUpperCase()) : true))
    );
  }, [displayGender, filterPhone, filterNameDebounced]);

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

  const handleFilterName = ({ target: { value } }) => {
    setFilterName(value);
  };
  return (
    <div className="list">
      <header className="header--sub">
        <h2 className="numberResult" role="heading">
          {peopleFiltered.length} people
        </h2>
        <div className="filters">
          <h3>Filter by :</h3>
          <div className="filter">
            {["female", "male"].map((gender) => (
              <label htmlFor={gender} className="filter__input">
                <input type="checkbox" name="gender" value={gender} id={gender} checked={displayGender.includes(gender)} onChange={handleCheckGender} />
                {gender}
              </label>
            ))}
          </div>
          <div className="filter">
            <label htmlFor="filter-phone" className="filter__input">
              Phone number
              <input type="tel" name="filter-phone" id="filter-phone" value={filterPhone} onChange={handleFilterPhone} />
            </label>
          </div>
          <div className="filter">
            <label htmlFor="filter-name" className="filter__input">
              Name
              <input type="tel" name="filter-name" id="filter-name" value={filterName} onChange={handleFilterName} />
            </label>
          </div>
        </div>
      </header>
      <div className="cards">
        {peopleFiltered.length > 0 ? (
          peopleFiltered.map(({ name, email, phone, greeting, gender, guid }) => (
            <Person name={name} email={email} phone={phone} greeting={greeting} gender={gender} guid={guid} />
          ))
        ) : (
          <Fail />
        )}
      </div>
    </div>
  );
};
