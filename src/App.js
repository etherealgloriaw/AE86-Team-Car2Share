import './App.css';
import Home from "./pages/Home"
import User from './pages/User';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>         </Route>
          <Route path="/User" element={<User />}>         </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
