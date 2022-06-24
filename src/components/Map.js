import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

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

export default function Map() {
    const classes = useStyles();
    var { isLoaded } = useLoadScript({
        googleMapsApiKey: '',
    });

    const containerStyle = {
        width: '800px',
        height: '1000px'
    };

    const postList = useSelector(state => state.posts);

    if (!isLoaded) return <div>Loading</div>;
    return (
        <Grid item xs={12}>
             <Paper className={classes.paper}><GoogleMap zoom={10} center={{lat: 49.261443, lng:-123.256696}}  mapContainerStyle={containerStyle} mapContainerClassName="map-container">
                {postList.map((post => {
                    return <Marker position={post.dest}/>
                }))}
            </GoogleMap></Paper>
        </Grid>
       )
}
