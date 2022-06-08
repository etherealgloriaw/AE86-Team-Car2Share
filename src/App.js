import logo from './logo.svg';
import './App.css';
import Posts from "./components/Posts";
import {SearchBar} from "./components/SearchBar";
import {Filter} from "./components/Filter";
import {Logo} from "./components/Logo";

function App() {
  return (
    <div className="App">
        <Logo />
        <SearchBar />
        <Filter></Filter>
      <Posts />
    </div>
  );
}

export default App;
