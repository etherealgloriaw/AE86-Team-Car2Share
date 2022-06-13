import Posts from "../components/Posts";
import { ResponsiveSearchBar } from "../components/ResponsiveSearchBar ";
import {Filter} from "../components/Filter";
import React from 'react';

function Home () {
    return (
    <div className="Home">
        <ResponsiveSearchBar />
        <Filter/>
        <Posts />
    </div>
    )
}

export default Home;
