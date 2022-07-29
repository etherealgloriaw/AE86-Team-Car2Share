import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
import {Card, CardHeader, CardContent,CardActions, Collapse, Avatar, Box, IconButton, Typography,
    Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import { rateUserAsync } from "../redux/auth/thunks";

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
    },
    root: {
        maxWidth: 520,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    active: {
        color: "red"
    },
    inactive: {
        color: "gray"
    },
    avatar: {
        backgroundColor: "#0d47a1",
    },
    fav: {
        '&:hover': {
            color: 'red',
        }
    },
}
));

export const PostHistory = (slice) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const rate = useSelector(state => state.auth.rate);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleRate = () => {
        if (rate == null || rate._id !== slice.name._id) setOpen(true);
        else alert('You have rated this drive!');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()
    // const user = JSON.parse(localStorage.getItem('profile'));

    // const handleSubmit = () => {
    //     setOpen(false);
    // };

    return (
        <Card className={classes.root} key={Math.random()}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} >
                        {slice.name.username}
                    </Avatar>
                }
                title={slice.name.username}
                starting_time={slice.startingTime}
            />
            <CardContent>
                <Typography paragraph color="textSecondary" component="p">
                    <span style={{ fontWeight: 'bold' }}>From: </span>{slice.from}
                </Typography>
                <Typography paragraph color="textSecondary" component="p">
                    <span style={{ fontWeight: 'bold' }}>To: </span>{slice.to}
                </Typography>
                <Typography paragraph color="textSecondary" component="p">
                    <span style={{ fontWeight: 'bold' }}>Departure time: </span>{slice.startingTime}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="share" onClick={handleRate} >
                    <RateReviewIcon />
                </IconButton>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Rate</DialogTitle>
                    <DialogContent>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                    dispatch(rateUserAsync({id: slice.name._id, rate: newValue}));
                                    setOpen(false);
                                }}
                            />
                        </Box>
                    </DialogContent>
                </Dialog>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Contact: {slice.contactInfo}</Typography>
                    <Typography paragraph>Rating: {rate == null || rate._id !== slice.name._id ? slice.rating : rate.rating.$numberDecimal}</Typography>
                    <Typography paragraph>Available seats: {slice.availableSeats}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )


}
