import { Post } from '../components/Post';
import Card from '@material-ui/core/Card';
import React from 'react';
import Map from "../components/Map";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

function Current () {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Post />
            </Grid>
            <Grid item xs={8}>
                <Map />
            </Grid>
        </Grid>
    </div>
    )
}

export default Current;
