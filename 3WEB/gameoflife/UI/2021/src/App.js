import "./App.css";
import { List } from "./pages/List/List";
import { Details } from "./pages/Details/Details";

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Personas</h1>
      </header>
      <List />
      <Details />
    </div>
  );
};

export default App;
