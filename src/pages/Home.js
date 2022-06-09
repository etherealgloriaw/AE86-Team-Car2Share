import Posts from "../components/Posts";
import {SearchBar} from "../components/SearchBar";
import {Filter} from "../components/Filter";
import {Logo} from "../components/Logo";
import { Login } from "../components/Login";
import React from 'react';

function Home () {
    return (
    <div className="App">
        <Logo />
        <SearchBar />
        <Filter></Filter>
        <Login />
        <Posts />
    </div>
    )
}

export default Home;