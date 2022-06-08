import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import {Login} from "./components/Login";
import Posts, {RecipesList} from "./components/Posts";
import {Provider} from "react-redux";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<App />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>
    </BrowserRouter>
);

export default Router;
