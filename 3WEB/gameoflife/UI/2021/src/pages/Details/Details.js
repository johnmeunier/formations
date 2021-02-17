import { useParams } from "react-router-dom";
import { people } from "../../data.json";

import "./Details.css";

export const Details = () => {
  const { id } = useParams();

  const { name, company, about, address, tags, friends } = people.find(({ guid }) => guid === id);

  return (
    <div className="details">
      <div className="header--sub">
        <h2>{name}</h2>
      </div>
      <div className="container">
        <div className="info">
          <div className="details__picture-container">
            <img className="details__picture" src="https://picsum.photos/300" alt="" />
          </div>
          <h3 className="details__name">{name}</h3>
          <h4 className="details__company">{company}</h4>
          <p className="details__description">{about}</p>
          <ul className="details__tags">
            {tags.map((tag) => (
              <li>{tag}</li>
            ))}
          </ul>
          <ul className="details__friends">
            {friends.map((friend) => (
              <li>{friend.name}</li>
            ))}
          </ul>
          <a className="details__location" href={`https://www.google.fr/maps/search/${address.replaceAll(" ", "+")}`} target="_blank">
            Voir sur Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};
