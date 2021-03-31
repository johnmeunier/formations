import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import { Game } from "pages/Game";
import { Home } from "pages/Home";

const App = () => {
  return (
    <Router>
      <header>Application développé pour le cours de 3WEB</header>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/game" exact component={Game} />
      </Switch>
    </Router>
  );
};

export default App;
