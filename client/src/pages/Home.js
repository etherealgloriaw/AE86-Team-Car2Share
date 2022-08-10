import Posts from "../components/Posts";
import {ResponsiveSearchBar} from "../components/ResponsiveSearchBar";
import React, {useEffect, useState} from 'react';
import Map from '../components/Map'
import './Home.css'
import {useSelector} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {useLoadScript} from "@react-google-maps/api";
import Popup from "../components/Popup"
import UserIntro from "../components/UserIntro"

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


function Home() {
    const classes = useStyles();
    const [libraries] = useState(['places']);
    const postList = useSelector(state => state.posts.list);
    const [selected, setSelected] = useState(null)
    const [popup, setPopup] = useState(null)
    const [popupData, setPopupData] = useState(null);
    const [intro, setIntro] = useState(null)
    const [introData, setIntroData] = useState(null);
    useEffect(() => {
        if (popup !== null) {
            setPopupData(postList.find(post => {
                return post._id == popup
            }))
        } else {
            setPopupData(null)
        }
        if (intro !== null) {
            setIntroData(postList.find(post => {
                return post._id == intro
            }))
        } else {
            setIntroData(null)
        }
    }, [popup, postList, popupData, intro, introData])
    // localStorage.clear();
    useLoadScript({
        googleMapsApiKey: 'AIzaSyAWxWcp2Mfk3fLOtlhl-ajt-m253pDswVY',
        libraries
    });
    return (
        <div className="Home">
            <ResponsiveSearchBar/>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Posts selected={selected} setSelected={setSelected} posts={postList} setPopup={setPopup}
                               setIntro={setIntro}/>
                    </Grid>
                    <Grid item xs={7}>
                        <Map markerList={postList.map((post) => {
                            return {
                                coordinates: {
                                    lat: Number(post.lat.$numberDecimal),
                                    lng: Number(post.lng.$numberDecimal)
                                },
                                id: post._id
                            }
                        })}
                             selected={selected} setSelected={setSelected} setPopup={setPopup} forHome={true}/>
                    </Grid>
                </Grid>
            </div>
            {popupData ? (<Popup togglePopup={setPopup} data={popupData}/>) : null}
            {introData ? (<UserIntro togglePopup={setIntro} data={introData}/>) : null}
        </div>

    )
}

export default Home;
