import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { List } from "./pages/List/List";
import { Details } from "./pages/Details/Details";
import { ApiUseApi } from "./pages/Api/ApiUseApi";
import { ApiList } from "./pages/Api/ApiList";
import { ApiPost } from "./pages/Api/ApiPost";
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
          <Route path="/apiUseApi" exact>
            <ApiUseApi />
          </Route>
          <Route path="/api" exact>
            <ApiList />
          </Route>
          <Route path="/api/:postId" exact>
            <ApiPost />
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
