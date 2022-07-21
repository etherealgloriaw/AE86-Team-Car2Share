import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {GoogleMap, Marker, DirectionsRenderer} from "@react-google-maps/api";
import React, {useState} from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import MyMarker from "./MyMarker";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Map(props) {
    const classes = useStyles();
    const containerStyle = {
        position: 'relative'
    };

    return (
        <Grid item xs={12}>
             <Paper className={classes.paper}><GoogleMap zoom={10} center={{lat: 49.261443, lng:-123.256696}}  mapContainerStyle={containerStyle} mapContainerClassName="map-container">
                {props.markerList.map((marker => {
                    return <MyMarker position={marker}/>
                }))}
                 {props.directionResponse && (<DirectionsRenderer directions={props.directionResponse}/>)}
            </GoogleMap></Paper>
        </Grid>
       )
}
