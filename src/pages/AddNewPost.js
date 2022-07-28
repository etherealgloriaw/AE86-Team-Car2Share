import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from 'react-redux'
import PlacesAutocomplete from "../components/PlacesAutocomplete";
import Map from "../components/Map";
import {useLoadScript} from "@react-google-maps/api";
import {Link, Navigate} from "react-router-dom";
import {addPostAsync} from "../redux/posts/thunks";
import {useGeolocated} from "react-geolocated";
import {IconButton} from "@material-ui/core";
import MyLocationIcon from '@material-ui/icons/MyLocation';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        '& > *': {
            margin: theme.spacing(2),
        }

    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function AddNewPost() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [dept, setDept] = useState(null);
    const [dest, setDest] = useState(null)
    const [deptString, setDeptString] = useState(null);
    const [destString, setDestString] = useState(null)
    const [availableSeats, setAvailableSeats] = useState('')
    const [departureTime, setDepartureTime] = useState('')
    const [contactInfo, setContactInfo] = useState('')
    const [directionResponse, setDirectionResponse] = useState(null)
    const [distances, setDistances] = useState(null)
    const [duration, setDuration] = useState(null)
    const user = JSON.parse(localStorage.getItem('profile'));
    const [forEdit, setForEdit] = useState(false)
    const [posError, setPosError] = useState(0)
    const [seatsError, setSeatsError] = useState(false)
    const [contactInfoError, setContactInfoError] = useState(false)
    const [dateError, setDateError] = useState(false)

    const {coords, isGeolocationAvailable, isGeolocationEnabled} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    const handleLocation = () => {
        if (isGeolocationAvailable && isGeolocationEnabled) {
            // eslint-disable-next-line no-undef
            const geocoder = new google.maps.Geocoder();
            let location = {lat: coords.latitude, lng: coords.longitude}
            setDept(location)
            geocoder
                .geocode({location: location})
                .then((response) => {
                    if (response.results[0]) {
                        response.results.every((result) => {
                            if (result.address_components[0].types[0] === 'street_number') {
                                setDeptString(result.formatted_address)
                                setForEdit(true)
                                return false
                            }
                            return true
                        })

                    } else {
                        window.alert("No results found");
                    }
                })
                .catch((e) => window.alert("Geocoder failed due to: " + e));

        } else alert("Location Service is not available")

    }

    const calculateRoute = async () => {
        if (dept == null || dest == null) {
            if (dept == null && dest == null) {
                setPosError(3)
            } else if (dept == null) {
                setPosError(1)
            } else {
                setPosError(2)
            }
            return
        }

        setPosError(0)
        // console.log("Starting point:" + dept)
        // console.log("dest:" + dest)
        // eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService()
        const results = await directionService.route({
            origin: dept,
            destination: dest,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
            region: "ca"
        }, (result, status) => {
            if (status !== "OK") {
                alert("no result")
            }
        })
        console.log(results)
        setDirectionResponse(results)
        setDistances(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    let destLat
    let destLng

    if (dest != null) {
        destLat = dest.lat;
        destLng = dest.lng;
    }


    const handleChange = e => {
        if (e.target.name == 'availableSeats') {
            setAvailableSeats(e.target.value);
        } else if (e.target.name == "departureTime") {
            setDepartureTime(e.target.value);
        } else if (e.target.name == "contactInfo") {
            setContactInfo(e.target.value);
        }
    }


    const markerList = [dept, dest]

    if (user != null) {
        const submit = () => {



            if (!posError && !seatsError && !contactInfoError && ! dateError) {
                dispatch(
                    addPostAsync(newPost)
                )
                setAvailableSeats('');
                setDepartureTime('');
                setContactInfo('');
            }


        }

        const newPost = {
            availableSeats: availableSeats,
            rating: 4,
            startingTime: departureTime,
            totalTime: duration,
            lat: destLat,
            lng: destLng,
            contactInfo: contactInfo,
            active: 0,
            price: 10,
            to: destString,
            from: deptString,
            driver: user._id
        }
        return (
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <PlacesAutocomplete setSelected={setDept} selected={dept} setString={setDeptString}
                                            title="Departure From" forEdit={forEdit} string={deptString} label={1}
                                            error={posError}/>
                        <IconButton aria-label="Use current location" onClick={handleLocation}>
                            <MyLocationIcon/>
                        </IconButton>
                        <PlacesAutocomplete setSelected={setDest} selected={dest} setString={setDestString}
                                            title="Arrive At"
                                            forEdit={false} label={2} error={posError}/>
                        <Button variant="contained" color="primary" onClick={calculateRoute}>
                            Calculate Route
                        </Button>
                        <h3>Estimated Travel Time: {duration}</h3>
                        <h3>Distance: {distances}</h3>
                        <TextField
                            required
                            id="standard-number"
                            label="Available seats"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={seatsError}
                            name="availableSeats"
                            onChange={handleChange}
                            value={availableSeats}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                        <TextField required id="standard-required" label="Contact information"
                                   name="contactInfo"
                                   error={contactInfoError}
                                   value={contactInfo}
                                   onChange={handleChange}/>
                        <TextField
                            id="datetime-local standard-required"
                            required
                            error={dateError}
                            label="Departure time"
                            type="datetime-local"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="departureTime"
                            value={departureTime}
                            onChange={handleChange}
                        />
                    </div>
                    <Button variant="contained" color="primary" onClick={submit} component={Link} to='/'>
                        Submit
                    </Button>
                </form>
                <Map markerList={markerList} directions={directionResponse} forHome={false}/>
            </div>
        )
    } else return < Navigate to='/Login'/>
}

