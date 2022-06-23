import { Post } from '../components/Post';
import Card from '@material-ui/core/Card';
import React from 'react';
import Map from "../components/Map";

function Current () {
    return (
    <div className="Home">
        <Post />
        <Map />
    </div>
    )
}

export default Current;
