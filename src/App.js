import './App.css';
import Home from "./pages/Home"
import User from './pages/User';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>         </Route>
          <Route path="/Login" element={<Login />}>         </Route>
          <Route path="/User" element={<User />}>         </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
