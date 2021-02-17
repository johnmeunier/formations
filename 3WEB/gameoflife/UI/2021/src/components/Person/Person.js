import "./Person.css";
import mailIcon from "./mail-icon.png";

export const Person = ({ name, email, phone, greeting, gender }) => (
  <div className="person">
    <h3 className="person__name">
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
  </div>
);
