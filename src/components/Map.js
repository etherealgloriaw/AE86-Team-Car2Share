import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {GoogleMap, Marker, DirectionsRenderer} from "@react-google-maps/api";
import React from "react";
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
             <Paper className={classes.paper}>
                 <GoogleMap zoom={11} center={{lat: 49.26361670730985, lng:-123.14095958202498}}
                            mapContainerStyle={containerStyle} mapContainerClassName="map-container">
                {props.markerList.map((marker => {
                    if(props.forHome){
                        return <MyMarker marker={marker.coordinates} selected={props.selected} setSelected={props.setSelected}
                                         id={marker.id} setPopup={props.setPopup}/>
                    } else {
                        if (!props.directions) {
                            return <Marker position={marker}/>
                        }
                        return null
                    }

                }))}
                 {props.directions && (<DirectionsRenderer directions={props.directions}/>)}
            </GoogleMap></Paper>
        </Grid>
       )
}
