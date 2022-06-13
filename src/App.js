import './App.css';
import Home from "./pages/Home"
import User from './pages/User';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrimarySearchAppBar from './components/ResponsiveAppbar';
import { createTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createTheme(
{
  palette: {
    primary: {
      main: '#388e3c',
    },
    secondary: {
      main: '#0d47a1',
    },
  },
}
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      <BrowserRouter>
        <PrimarySearchAppBar />
        <Routes>
          <Route path="/" element={<Home />}>         </Route>
          <Route path="/Login" element={<Login />}>       </Route>
          <Route path="/User" element={<User />}>         </Route>
          <Route path="/SignUp" element={<SignUp />}>    </Route>
        </Routes>
      </BrowserRouter>
    </div>
    </ThemeProvider>
    
  );
}

export default App;
