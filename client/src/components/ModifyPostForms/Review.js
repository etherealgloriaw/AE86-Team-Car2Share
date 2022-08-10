import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Map from "../Map";

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Review(props) {
    const classes = useStyles();
    const date = new Date(props.departureTime)
    const dateString = date.toDateString() + ", " +date.getHours()+ ":"
        + ((date.getMinutes() > 9)? date.getMinutes(): ("0" + date.getMinutes()))+ ":" +
        ((date.getSeconds() > 9)? date.getSeconds(): ("0" + date.getSeconds()))

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Trip summary
            </Typography>
            <List disablePadding>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Departure From" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {props.deptString}
                    </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Arrive At" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {props.destString}
                    </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Distance" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {props.distances}
                    </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Estimated Duration" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {props.duration}
                    </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Available Seats" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {props.availableSeats}
                    </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Price" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {props.price}
                    </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Departure Time" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {dateString}
                    </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Contact Information" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {props.contactInfo}
                    </Typography>
                </ListItem>
            </List>
            <Grid item xs={12}>
                <Map markerList={props.markerList} directions={props.directionResponse} forHome={false} />
            </Grid>
        </React.Fragment>
    );
}
