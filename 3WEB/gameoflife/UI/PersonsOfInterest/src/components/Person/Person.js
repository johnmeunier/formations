import { Link } from "react-router-dom";

import "./Person.css";
import mailIcon from "./mail-icon.png";

export const Person = ({ name, email, phone, greeting, gender, guid }) => (
  <div className="card">
    <h3 className="card__name">
      {gender === "male" ? <span>&#9794;</span> : <span>&#9792;</span>}
      {name}
    </h3>
    <div className="contacts">
      <h4 className="contact">
        <img src={mailIcon} className="contact__icon" />
        <a href={`mailto:${email}`}>{email}</a>
      </h4>
      <h4 className="contact">
        <a href={`tel:${phone}`}>{phone}</a>
      </h4>
    </div>
    <p>{greeting}</p>
    <Link to={`/details/${guid}`}>Voir le détails de {name}</Link>
  </div>
);
