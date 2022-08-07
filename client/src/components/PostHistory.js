import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
import {
    Card, CardHeader, CardContent, CardActions, Collapse, Avatar, Box, IconButton, Typography,
    Dialog, DialogContent, DialogTitle, InputLabel
} from "@material-ui/core";
import { rateUserAsync } from "../redux/auth/thunks";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DriveEtaTwoToneIcon from "@material-ui/icons/DriveEtaTwoTone";
import ListItemText from "@material-ui/core/ListItemText";
import TrackChangesTwoToneIcon from "@material-ui/icons/TrackChangesTwoTone";
import AccessAlarmTwoToneIcon from "@material-ui/icons/AccessAlarmTwoTone";
import List from "@material-ui/core/List";
import CancelIcon from '@material-ui/icons/Cancel';
import {cancelPostAsync} from "../redux/users/thunks";


const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: "100%",
    },
    root: {
        marginTop: '2%',
        marginLeft: '3%',
        marginRight: '3%',
        maxWidth: "100%",
        maxHeight: '100%',
        marginBottom: '3%',
        backgroundColor: "#ECECEC",
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
        itemList: {
            paddingLeft: "4%",
            maxHeight: "20%",
        },
        item: {
            maxHeight: 55,
            marginBottom: 10,
        },
        cardHeader: {
            marginTop: "5%",
            maxHeight: 1,
            paddingLeft: "3.5%"
        },
        finishedLabel: {
            borderRadius: 5,
            width: '100%',
            textAlign: "center",
            backgroundColor: '#839b67',
            color: 'white'
        },
        upcomingLabel: {
            borderRadius: 5,
            width: '100%',
            textAlign: "center",
            backgroundColor: 'yellow',
        },
        ongoingLabel: {
            borderRadius: 5,
            width: '100%',
            textAlign: "center",
            backgroundColor: '#3c52b2',
            color: 'white'
        },
        iconText: {
            fontSize: 16
        }
}
));

export const PostHistory = (slice) => {
    const classes = useStyles();
    // let navigate = useNavigate();
    const [expanded, setExpanded] = React.useState(false);
    const [active, setActive] = React.useState(slice.active);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const rate = useSelector(state => state.auth.rate);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleRate = () => {
        if (rate == null || rate._id != slice.name._id) {
            if (slice.active == 2) setOpen(true);
            else alert('This drive has not ended!');
        }
        else alert('You have rated this drive!');
    };

    const handleCancel = () => {
        if (slice.active == 1) {
            dispatch(
                cancelPostAsync(slice.id)
            )
        } else {
            alert('You cannot cancel this trip!');
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleSubmit = () => {
        setOpen(false);
    };

    const status = slice.active;
    let statusStr = "";
    let statusLabel = ''
    if (status == "0") {
        statusStr = "In the future";
        statusLabel = <InputLabel id="statusLabel" className={classes.upcomingLabel}>{statusStr}</InputLabel>
    } else if(status == "1") {
        statusStr = "Ongoing"
        statusLabel = <InputLabel id="statusLabel" className={classes.ongoingLabel}>{statusStr}</InputLabel>
    } else if(status == 2) {
        statusStr = "Finished"
        statusLabel = <InputLabel id="statusLabel" className={classes.finishedLabel}>{statusStr}</InputLabel>
    }

    return (
        <Card className={classes.root} key={Math.random()}>
            {statusLabel}
            <CardHeader className="cardHeader"
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} >
                        {slice.name.username}
                    </Avatar>
                }

                title={slice.name.username}
                starting_time={slice.startingTime}
            />
            <CardContent>
                <List className={classes.itemList}>
                    <ListItem className={classes.item}>
                        <ListItemIcon>
                            <DriveEtaTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary= "From: "
                            secondary={slice.from}
                        />
                    </ListItem>
                    <ListItem className={classes.item}>
                        <ListItemIcon>
                            <TrackChangesTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary= "To: "
                            secondary={slice.to}
                        />
                    </ListItem>
                    <ListItem className={classes.item}>
                        <ListItemIcon>
                            <AccessAlarmTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary= "Departure Time: "
                            secondary={slice.startingTime}
                        />
                    </ListItem>
                </List>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="share" onClick={handleRate} className={classes.iconText}>
                    <RateReviewIcon />
                    Rate
                </IconButton>
                <IconButton aria-label="share" onClick={handleCancel} className={classes.iconText}>
                    <CancelIcon />
                    Cancel
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
                    <Typography paragraph>Rating: {rate == null || rate._id != slice.name._id ? slice.rating : rate.rating.$numberDecimal}</Typography>
                    <Typography paragraph>Available seats: {slice.availableSeats}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )


}
