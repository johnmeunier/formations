import { useParams } from "react-router-dom";
import { people } from "../../data.json";

export const Details = () => {
  const { id } = useParams();

  const data = people.find(({ guid }) => guid === id);

  console.log(data);

  return (
    <div className="details">
      <div className="header--sub">
        <h2>Détails de la personne</h2>
      </div>
    </div>
  );
};
