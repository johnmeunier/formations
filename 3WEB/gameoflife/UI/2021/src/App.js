import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { List } from "./pages/List/List";
import { Details } from "./pages/Details/Details";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Personas</h1>
        </header>
        <Switch>
          <Route path="/details">
            <Details />
          </Route>
          <Route path="/" exact>
            <List />
          </Route>
          <Route>404</Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
