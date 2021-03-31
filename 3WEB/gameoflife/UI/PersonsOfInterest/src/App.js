import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { List } from "./pages/List/List";
import { Details } from "./pages/Details/Details";
import { Api } from "./pages/Api/Api";
import { Fail } from "./components/Fail/Fail";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Personas</h1>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </header>
        <Switch>
          <Route path="/details/:id" exact>
            <Details />
          </Route>
          <Route path="/api" exact>
            <Api />
          </Route>
          <Route path="/" exact>
            <List />
          </Route>
          <Route>
            <div className="notFound">
              <Fail />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
