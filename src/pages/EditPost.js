import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from 'react-redux'
import {initialState, postAdded, postEdit} from '../reducer/SinglePost.js'
import { Link, useParams } from 'react-router-dom';
import {editPostAsync} from "../redux/posts/thunks";

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

    const classes = useStyles();
    const { postID } = useParams()
    // console.log(postID)
    const postList = useSelector(state => state.posts.list);

    const post = useSelector(state => state.posts.list.find(p => p._id == postID))
    console.log(post)
    const [startingPoint, setStartingPoint] = useState(post.from)
    const [destination, setDestination] = useState(post.to)
    const [availableSeats, setAvailableSeats] = useState(post.availableSeats)
    const [departureTime, setDepartureTime] = useState(post.startingTime)
    const [contactInfo, setContactInfo] = useState(post.contactInfo)

    const handleChange = e => {
        if (e.target.name == 'startingPoint') {
            setStartingPoint(e.target.value);
        } else if (e.target.name == 'destination') {
            setDestination(e.target.value);
        } else if (e.target.name == 'availableSeats') {
            setAvailableSeats(e.target.value);
        } else if (e.target.name == "departureTime") {
            setDepartureTime(e.target.value);
        } else if (e.target.name == "contactInfo") {
            setContactInfo(e.target.value);
        }
    }
    const dispatch = useDispatch()

    const edited = {
        availableSeats: availableSeats,
        rating: 4,
        startingTime: departureTime,
        totalTime: 10,
        lat: 49.2872071045258,
        lng: -123.11517882905274,
        contactInfo: contactInfo,
        active: false,
        price: 10,
        to: "SSSS",
        from: "ABCDEF",
    }
    const submit = () => {
        dispatch(
            // postEdit({
            //     id: postID,
            //     name: "New User",
            //     from: startingPoint,
            //     to: destination,
            //     availableSeats: availableSeats,
            //     rating: 4,
            //     startingTime: departureTime,
            //     totalTime: 25,
            //     dest: {lat: 49.2872071045258, lng:-123.11517882905274},
            //     contactInfo: contactInfo
            // })
            editPostAsync(postID, edited)
        )
        setStartingPoint('');
        setDestination('');
        setAvailableSeats('');
        setDepartureTime('');
        setContactInfo('');
    }
    return (
        <form className={classes.root} noValidate autoComplete="off" >
            <div>
                <TextField required id="standard-required" label="Starting at"
                           onChange={handleChange}
                           name="startingPoint"
                           value={startingPoint}/>
                <TextField required id="standard-required" label="Destination"
                           name="destination"
                           onChange={handleChange}
                           value={destination}/>
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
            <Button variant="contained" color="primary" onClick={submit}>
                Submit
            </Button>
        </form>
    );
}

export default EditPost;

