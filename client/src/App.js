import './App.css';
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PrimarySearchAppBar from './components/ResponsiveAppbar';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import AddNewPost from "./pages/AddNewPost";
import EditPost from "./pages/EditPost";
import {useLoadScript} from "@react-google-maps/api";
import {useEffect} from "react";

const theme = createTheme(
    {
        palette: {
            primary: {
                main: '#336600',
            },
            secondary: {
                main: '#0d47a1',
            },
        },
    }
);

function App() {
    useEffect(() => {
        document.title = 'Car2Share';
    });

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: 'AIzaSyAWxWcp2Mfk3fLOtlhl-ajt-m253pDswVY',
        libraries: ["places"],
    });

    if (isLoaded) {
        return (
            <ThemeProvider theme={theme}>
                <div className="App">
                    <BrowserRouter>
                        <PrimarySearchAppBar/>
                        <Routes>
                            <Route path="/" element={<Home/>}> </Route>
                            <Route path="/Login" element={<Login/>}> </Route>
                            <Route path="/Profile" element={<Profile/>}> </Route>
                            <Route path="/SignUp" element={<SignUp/>}> </Route>
                            <Route path="/Add" element={<AddNewPost/>}> </Route>
                            <Route path="/Edit/:postID" element={<EditPost/>}> </Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </ThemeProvider>

        );
    }
}

export default App;
