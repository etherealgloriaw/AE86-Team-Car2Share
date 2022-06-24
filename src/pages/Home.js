import Posts from "../components/Posts";
import { ResponsiveSearchBar } from "../components/ResponsiveSearchBar";
import { Filter } from "../components/Filter";
import React from 'react';
import { useMemo } from 'react';
import Map from '../components/Map'
import './Home.css'
import { useSelector } from "react-redux";
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

function Home() {
    const classes = useStyles();

    return (
        <div className="Home">
            <ResponsiveSearchBar />
            <Filter />
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Posts />
                    </Grid>
                    <Grid item xs={8}>
                        <Map />
                    </Grid>
                </Grid>
            </div>
        </div>

    )
}

export default Home;
