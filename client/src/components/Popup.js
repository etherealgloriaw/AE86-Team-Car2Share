// The general idea of popup window and tiny bit of code was adapted from
// https://www.cluemediator.com/create-simple-popup-in-reactjs
import './Popup.css'
import {DirectionsRenderer, GoogleMap} from "@react-google-maps/api";
import React, {useEffect, useMemo, useState} from "react";
import {Rating} from "@material-ui/lab";
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DriveEtaTwoToneIcon from '@material-ui/icons/DriveEtaTwoTone';
import TrackChangesTwoToneIcon from '@material-ui/icons/TrackChangesTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import PermContactCalendarTwoToneIcon from '@material-ui/icons/PermContactCalendarTwoTone';
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';
import GroupTwoToneIcon from '@material-ui/icons/GroupTwoTone';
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';
import DirectionsRailwayTwoToneIcon from '@material-ui/icons/DirectionsRailwayTwoTone';
import QueryBuilderTwoToneIcon from '@material-ui/icons/QueryBuilderTwoTone';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import AccessAlarmTwoToneIcon from '@material-ui/icons/AccessAlarmTwoTone';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },

}));



export default function Popup(props) {
    const classes = useStyles();

    const containerStyle = {
        position: 'relative',
        width: "39vw",
        height: "57vh",
        marginTop: 10,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    };
    const [directionResponse, setDirectionResponse] = useState(null)
    const [distances, setDistances] = useState(null)
    const [duration, setDuration] = useState(null)
    const calculateRoute = async() => {
        // eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService()
        const results = await directionService.route({
            origin: props.data.from,
            destination: props.data.to,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING
        })
        setDirectionResponse(results)
        console.log("directionResponse: " + directionResponse)
        setDistances(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }
    console.log("setPopup: " + props.data)
    useMemo(() => {
        if (props.data){
            calculateRoute()
        }

    }, [props.data])

    const date = new Date(props.data.startingTime)
    const dateString = date.toDateString() + " " +date.getHours()+ ":"
        + ((date.getMinutes() > 9)? date.getMinutes(): ("0" + date.getMinutes()))+ ":" +
        ((date.getSeconds() > 9)? date.getSeconds(): ("0" + date.getSeconds()))
    return (
        // <div className="popup-box">
        //     <div className="box">
        //         <div className="details">
        //         <h2>Trip Details:</h2>
        //         <h3>From: {props.data.from}</h3>
        //         <h3>To: {props.data.to}</h3>
        //         <h3>Driver: {props.data.driver.username}</h3>
        //         <h3>Contact information: {props.data.contactInfo} (phone), {props.data.driver.email} (E-mail) </h3>
        //         <h3>Price: {props.data.price}</h3>
        //         <h3>Available Seats: {props.data.availableSeats}</h3>
        //         <div className="rating">
        //             <h3>Driver rating:</h3>
        //             <Rating className={"stars"} name="read-only" value={props.data.rating} readOnly />
        //         </div>
        //         <h3>Distance: {distances}</h3>
        //         <h3>Estimated travel time: {duration}</h3>
        //
        //         <button id="button" type="button" onClick={
        //             (e) => {
        //                 e.preventDefault();
        //                 props.togglePopup(0)
        //             }
        //         }>close
        //         </button>
        //         </div>
        //         <div className="map">
        //         <GoogleMap zoom={11} center={{lat: 49.26361670730985, lng:-123.14095958202498}}
        //                    mapContainerStyle={containerStyle} mapContainerClassName="map-container">
        //             {directionResponse && (<DirectionsRenderer directions={directionResponse}/>)}
        //         </GoogleMap>
        //         </div>
        //     </div>
        //
        // </div>
        <div className="popup-box">
            <div className="box">
                <div className="closeButton">
                    <CloseTwoToneIcon id="button" type="button" onClick={
                        (e) => {
                            e.preventDefault();
                            props.togglePopup(0)
                        }
                    }/>
                </div>
                <div className="details">
                    <div className={classes.root}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <ListItemIcon>
                                    <DriveEtaTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary= "From: "
                                    secondary={props.data.from}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <TrackChangesTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary= "To: "
                                    secondary={props.data.to}
                                />
                            </ListItem>
                            <div><span /></div>
                        </List>

                    </div>
                    <GoogleMap zoom={11} center={{lat: 49.26361670730985, lng:-123.14095958202498}}
                               mapContainerStyle={containerStyle} mapContainerClassName="map-container">
                        {directionResponse && (<DirectionsRenderer directions={directionResponse}/>)}
                    </GoogleMap>
                </div>
                <div className="map">
                    <div className={classes.root}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <ListItemIcon>
                                    <AccessAlarmTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary= "Departure Time: "
                                    secondary={dateString}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <FaceTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary= "Driver: "
                                    secondary={props.data.driver.username}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <PermContactCalendarTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary= "Contact information: "
                                    secondary={props.data.contactInfo}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <MonetizationOnTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary= "Price: "
                                    secondary= {"$" + props.data.price}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <GroupTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary= "Available Seats: "
                                    secondary= {props.data.availableSeats}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <ThumbUpTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary= "Rating: "
                                    secondary= {props.data.rating}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DirectionsRailwayTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary= "Distance: "
                                    secondary= {distances}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <QueryBuilderTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary= "Estimated Travel Time: "
                                    secondary= {duration}
                                />
                            </ListItem>
                        </List>
                    </div>
                </div>
            </div>
        </div>
    );

};
