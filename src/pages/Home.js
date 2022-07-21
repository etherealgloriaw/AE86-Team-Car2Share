import Posts from "../components/Posts";
import { ResponsiveSearchBar } from "../components/ResponsiveSearchBar";
import { Filter } from "../components/Filter";
import React, {useState} from 'react';
import { useMemo } from 'react';
import Map from '../components/Map'
import './Home.css'
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useLoadScript} from "@react-google-maps/api";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

// const libraries = ['places']

function Home() {
    const classes = useStyles();
    const [ libraries ] = useState(['places']);
    const postList = useSelector(state => state.posts.list);
    const [selected, setSelected] = useState(null)
    // localStorage.clear();
    useLoadScript({
        googleMapsApiKey: 'AIzaSyAWxWcp2Mfk3fLOtlhl-ajt-m253pDswVY',
        libraries
    });
    return (
        <div className="Home">
            <ResponsiveSearchBar />
            <Filter />
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Posts />
                    </Grid>
                    <Grid item xs={7}>
                       <Map markerList={postList.map((post) => {
                           return {lat: Number(post.lat.$numberDecimal), lng: Number(post.lng.$numberDecimal)}})}/>
                    </Grid>
                </Grid>
            </div>
        </div>

    )
}

export default Home;
