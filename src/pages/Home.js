import Posts from "../components/Posts";
import {SearchBar} from "../components/SearchBar";
import {Filter} from "../components/Filter";
import {Logo} from "../components/Logo";
import { Link } from "react-router-dom";
import Login from "./Login";
import React from 'react';
import "./styles/Home.css"

function Home () {
    return (
    <div className="Home">
        <h1>Car2share</h1>
        <Logo />
        <SearchBar />
        <Filter/>
        <Link to={"/Login"} className="button">
            <button className = "login" type="submit">Login</button>
        </Link>
        <Posts />
    </div>
    )
}

export default Home;
