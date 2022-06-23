import Posts from "../components/Posts";
import { ResponsiveSearchBar } from "../components/ResponsiveSearchBar";
import {Filter} from "../components/Filter";
import React from 'react';
import { useMemo } from 'react';
import Map from '../components/Map'
import './Home.css'
import {useSelector} from "react-redux";



function Home () {
    return (
    <div className="Home">
        <ResponsiveSearchBar />
        <Filter/>
        <div className='bodyContainer'>
            <Posts />
            <Map/>
        </div>
    </div>
    )
}

export default Home;
