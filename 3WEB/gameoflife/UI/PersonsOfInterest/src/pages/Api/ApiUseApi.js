import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import useApi from "hooks/useApi";

export const ApiUseApi = () => {
  const [id, setId] = useState("1");
  const [idDebounced] = useDebounce(id, 300);
  const [ressource, setRessource] = useState("films");
  const { data: sw, setParams, error, isLoading } = useApi({
    url: "https://swapi.dev/api",
    params: {
      ressource: ressource,
      id,
    },
    defaultValue: {},
  });

  useEffect(() => {
    setParams({
      ressource,
      id: idDebounced,
    });
  }, [idDebounced, ressource, setParams]);

  return (
    <>
      <div className="header--sub">
        <h2>Api</h2>
        <div className="filters">
          <h3>Filter by :</h3>
          <div className="filter">
            <label htmlFor="ressource" className="filter__input">
              Ressource
            </label>
            <select name="ressource" id="ressource" onChange={({ target: { value } }) => setRessource(value)}>
              {["films", "people", "planets", "species", "starships", "vehicles"].map((ressourceName) => (
                <option value={ressourceName}>{ressourceName}</option>
              ))}
            </select>
          </div>
          <div className="filter">
            <label htmlFor="id" className="filter__input">
              Id
              <input type="tel" name="id" id="id" value={id} onChange={({ target: { value } }) => setId(value)} />
            </label>
          </div>
        </div>
      </div>
      <div className="container">
        {isLoading && "Loading"}
        {error && "Error"}
        {!isLoading && !error && <h3 className="details__name">{sw.name || sw.title}</h3>}
      </div>
    </>
  );
};
