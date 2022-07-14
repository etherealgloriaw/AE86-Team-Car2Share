import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from 'react-redux'
import {initialState, postAdded} from '../reducer/SinglePost.js'
import PlacesAutocomplete from "../components/PlacesAutocomplete";
import Map from "../components/Map";
import {useLoadScript} from "@react-google-maps/api";
import { Link } from "react-router-dom";
import {addPostAsync} from "../redux/posts/thunks";

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
    // const [startingPoint, setStartingPoint] = useState('')
    // const [destination, setDestination] = useState('')
    const [availableSeats, setAvailableSeats] = useState('')
    const [departureTime, setDepartureTime] = useState('')
    const [contactInfo, setContactInfo] = useState('')
    const [directionResponse, setDirectionResponse] = useState(null)
    const [distances, setDistances] = useState(null)
    const [duration, setDuration] = useState(null)


    const calculateRoute = async() => {
        if (dept == null || dest == null) {
            return
        }
        console.log("Starting point:" + dept)
        // eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService()
        const results = await directionService.route({
            origin: dept,
            destination: dest,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING
        })
        setDirectionResponse(results)
        setDistances(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }
    let deptLat = 50.11802598023384;
    let deptLng = -122.96137023530274;
    if (dept != null) {
        deptLat = dept.lat;
        deptLng = dept.lng;
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
    const newPost = {
        availableSeats: availableSeats,
        rating: 4,
        startingTime: departureTime,
        totalTime: duration,
        lat: deptLat,
        lng: deptLng,
        contactInfo: contactInfo,
        active: false,
        price: 10,
        to: "SSSS",
        from: "ABCDEF",
    }
    const submit = () => {
        dispatch(
            // postAdded({
            //     id: initialState.length+1,
            //     name: "New User",
            //     from: startingPoint,
            //     to: destination,
            //     availableSeats: availableSeats,
            //     rating: 4,
            //     startingTime: departureTime,
            //     totalTime: 25,
            //     dest: {lat: 49.2872071045258, lng:-123.11517882905274},
            //     contactInfo: contactInfo,
            //     active: false
            // })
            addPostAsync(newPost)
        )
        // setStartingPoint('');
        // setDestination('');
        setAvailableSeats('');
        setDepartureTime('');
        setContactInfo('');
    }
    const markerList = [dept, dest]
    return (
        <div>
        <form className={classes.root} noValidate autoComplete="off" >
            <div>
                <PlacesAutocomplete setSelected={setDept} selected={dept} title="Departure From"/>
                <PlacesAutocomplete setSelected={setDest} selected={dest} title="Arrive At"/>
                <Button variant="contained" color="primary" onClick={calculateRoute}>
                    Calculate Route
                </Button>
                <h3>Estimated time of arrival: {duration}</h3>
                <h3>Distance: {distances}</h3>
                <TextField
                    id="standard-number"
                    label="Available seats"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name = "availableSeats"
                    onChange={handleChange}
                    value={availableSeats}
                />
                <TextField required id="standard-required" label="Contact information"
                           name = "contactInfo"
                           value={contactInfo}
                           onChange={handleChange}/>
                    <TextField
                        id="datetime-local standard-required"
                        label="Departure time"
                        type="datetime-local"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name = "departureTime"
                        value={departureTime}
                        onChange={handleChange}
                    />
            </div>
            <Button variant="contained" color="primary" onClick={submit} component={Link} to='/'>
                Submit
            </Button>
        </form>
        <Map markerList={markerList} directionResponse={directionResponse} />
        </div>
    );
}

