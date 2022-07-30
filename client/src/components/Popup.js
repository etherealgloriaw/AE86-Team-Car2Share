// The general idea of popup window and tiny bit of code was adapted from
// https://www.cluemediator.com/create-simple-popup-in-reactjs
import './Popup.css'
import {DirectionsRenderer, GoogleMap} from "@react-google-maps/api";
import React, { useMemo, useState} from "react";
import {Rating} from "@material-ui/lab";
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function Popup(props) {
    const containerStyle = {
        position: 'relative',
        width: "40vw",
        height: "60vh"
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

    }, [props.data, calculateRoute])
    return (
        <div className="popup-box">
            <div className="box">
                <div className="details">
                <h2>Trip Details:</h2>
                <h3>From: {props.data.from}</h3>
                <h3>To: {props.data.to}</h3>
                <h3>Driver: {props.data.driver.username}</h3>
                <h3>Contact information: {props.data.contactInfo} (phone), {props.data.driver.email} (E-mail) </h3>
                <h3>Price: {props.data.price}</h3>
                <h3>Available Seats: {props.data.availableSeats}</h3>
                <div className="rating">
                    <h3>Driver rating:</h3>
                    <Rating className={"stars"} name="read-only" value={props.data.rating} readOnly />
                </div>
                <h3>Distance: {distances}</h3>
                <h3>Estimated travel time: {duration}</h3>

                <button id="button" type="button" onClick={
                    (e) => {
                        e.preventDefault();
                        props.togglePopup(0)
                    }
                }>close
                </button>
                </div>
                <div className="map">
                <GoogleMap zoom={11} center={{lat: 49.26361670730985, lng:-123.14095958202498}}
                           mapContainerStyle={containerStyle} mapContainerClassName="map-container">
                    {directionResponse && (<DirectionsRenderer directions={directionResponse}/>)}
                </GoogleMap>
                </div>
            </div>

        </div>
    );

};
