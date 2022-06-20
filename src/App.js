import './App.css';
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Current from './pages/Current';
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
          <Route path="/Profile" element={<Profile />}>         </Route>
          <Route path="/SignUp" element={<SignUp />}>    </Route>
          <Route path="/Current" element={<Current />}>    </Route>
        </Routes>
      </BrowserRouter>
    </div>
    </ThemeProvider>
    
  );
}

export default App;
