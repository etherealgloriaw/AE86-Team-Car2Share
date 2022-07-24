import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import {editPostAsync} from "../redux/posts/thunks";
import PlacesAutocomplete from "../components/PlacesAutocomplete";
import Map from "../components/Map";

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

function EditPost({ match }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { postID } = useParams()

    const post = useSelector(state => state.posts.list.find(p => p._id == postID))
    const posts = useSelector(state => state.posts.list)
    // console.log(post)
    const [availableSeats, setAvailableSeats] = useState(post.availableSeats)
    const dateStr = post.startingTime.toString()
    const dateFormat = dateStr.substring(0,dateStr.length-2)
    const [departureTime, setDepartureTime] = useState(dateFormat)
    const [contactInfo, setContactInfo] = useState(post.contactInfo)
    const [dept, setDept] = useState(null);
    const [dest, setDest] = useState(null)
    const [directionResponse, setDirectionResponse] = useState(null)
    const [distances, setDistances] = useState();
    const [duration, setDuration] = useState(null)
    const [deptString, setDeptString] = useState(post.from);
    const [destString, setDestString] = useState(post.to)

    const handleChange = e => {
    if (e.target.name == 'availableSeats') {
            setAvailableSeats(e.target.value);
        } else if (e.target.name == "departureTime") {
            setDepartureTime(e.target.value);
        } else if (e.target.name == "contactInfo") {
            setContactInfo(e.target.value);
        }
    }

    const edited = {
        _id: post._id,
        availableSeats: availableSeats,
        rating: post.rating,
        startingTime: departureTime,
        totalTime: duration,
        lat: post.lat,
        lng: post.lng,
        contactInfo: contactInfo,
        active: 0,
        price: 10,
        to: destString,
        from: deptString,
        driver: post.driver
    }


    let destLat
    let destLng

    destLat = post.lat;
    destLng = post.lng;

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

    const markerList = [dept, dest]

    const submit = () => {
        dispatch(
            editPostAsync(edited)
        )
        setAvailableSeats('');
        setDepartureTime('');
        setContactInfo('');

    }
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" >
                <div>
                    <PlacesAutocomplete setSelected={setDept} selected={dept} setString={setDeptString} title="Departure From"/>
                    <PlacesAutocomplete setSelected={setDest} selected={dest} setString={setDestString} title="Arrive At"/>
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

export default EditPost;

