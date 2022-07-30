import Posts from "../components/Posts";
import { ResponsiveSearchBar } from "../components/ResponsiveSearchBar";
import { Filter } from "../components/Filter";
import React, {useEffect, useState} from 'react';
import Map from '../components/Map'
import './Home.css'
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {useLoadScript} from "@react-google-maps/api";
import Popup from "../components/Popup"

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
    const [popup, setPopup] = useState(null)
    const [popupData, setPopupData] = useState(null);
    console.log(postList);
    useEffect(() => {
        if (popup !== null) {
            setPopupData(postList.find(post => {
            return post._id == popup
        }))
        } else {
            setPopupData(null)
        }
    }, [popup, postList, popupData])
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
                        <Posts selected={selected} setSelected={setSelected} posts={postList} setPopup={setPopup}/>
                    </Grid>
                    <Grid item xs={7}>
                       <Map markerList={postList.map((post) => {
                           return {coordinates: {lat: Number(post.lat.$numberDecimal), lng: Number(post.lng.$numberDecimal)},
                           id: post._id}})}
                       selected={selected} setSelected={setSelected} setPopup={setPopup} forHome={true}/>
                    </Grid>
                </Grid>
            </div>
            {popupData ? (<Popup togglePopup={setPopup} data={popupData}/>) : null}
        </div>

    )
}

export default Home;
