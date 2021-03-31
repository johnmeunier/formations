import { Link } from "react-router-dom";

export const Home = () => (
  <h1>
    Bienvenue dans le jeux de la vie, pour accéder au jeux, <Link to="/game">cliquez ici</Link>
  </h1>
);
