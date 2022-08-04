import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import {editPostAsync} from "../redux/posts/thunks";
import PlacesAutocomplete from "../components/PlacesAutocomplete";
import Map from "../components/Map";
import ModifyPost from "../components/ModifyPost";


function EditPost({ match }) {
    const dispatch = useDispatch();
    const { postID } = useParams()
    // const post = useSelector(state => state.posts.list.find(p => p._id == postID))
const post = null
    const posts = useSelector(state => state.posts.list)
    console.log("id" + postID)
    console.log(posts)
    console.log("find " + posts.find(p => p._id == postID))
    // const handleChange = e => {
    // if (e.target.name == 'availableSeats') {
    //         setAvailableSeats(e.target.value);
    //     } else if (e.target.name == "departureTime") {
    //         setDepartureTime(e.target.value);
    //     } else if (e.target.name == "contactInfo") {
    //         setContactInfo(e.target.value);
    //     }
    // }
    //
    // const edited = {
    //     _id: post._id,
    //     availableSeats: availableSeats,
    //     rating: post.rating,
    //     startingTime: departureTime,
    //     totalTime: duration,
    //     lat: post.lat,
    //     lng: post.lng,
    //     contactInfo: contactInfo,
    //     active: 0,
    //     price: 10,
    //     to: destString,
    //     from: deptString,
    //     driver: post.driver
    // }
    //
    // // destLat = post.lat;
    // // destLng = post.lng;
    //
    // const calculateRoute = async() => {
    //     if (dept == null || dest == null) {
    //         return
    //     }
    //     console.log("Starting point:" + dept)
    //     // eslint-disable-next-line no-undef
    //     const directionService = new google.maps.DirectionsService()
    //     const results = await directionService.route({
    //         origin: deptString,
    //         destination: destString,
    //         // eslint-disable-next-line no-undef
    //         travelMode: google.maps.TravelMode.DRIVING
    //     })
    //     setDirectionResponse(results)
    //     setDistances(results.routes[0].legs[0].distance.text)
    //     setDuration(results.routes[0].legs[0].duration.text)
    // }
    //
    // const markerList = [dept, dest]
    //
    // const submit = () => {
    //     dispatch(
    //         editPostAsync(edited)
    //     )
    //     setAvailableSeats('');
    //     setDepartureTime('');
    //     setContactInfo('');
    //
    // }
    return (
        <div>



            <ModifyPost post={post}/>




            {/*<form className={classes.root} noValidate autoComplete="off" >*/}
            {/*    <div>*/}
            {/*        <PlacesAutocomplete setSelected={setDept} selected={dept} setString={setDeptString} title="Departure From" forEdit={true} string={deptString}/>*/}
            {/*        <PlacesAutocomplete setSelected={setDest} selected={dest} setString={setDestString} title="Arrive At" forEdit={true} string={destString}/>*/}
            {/*        <Button variant="contained" color="primary" onClick={calculateRoute}>*/}
            {/*            Calculate Route*/}
            {/*        </Button>*/}
            {/*        <h3>New Estimated Travel Time: {duration}</h3>*/}
            {/*        <h3>New Distance: {distances}</h3>*/}
            {/*        <TextField*/}
            {/*            id="standard-number"*/}
            {/*            label="Available seats"*/}
            {/*            type="number"*/}
            {/*            InputLabelProps={{*/}
            {/*                shrink: true,*/}
            {/*            }}*/}
            {/*            name = "availableSeats"*/}
            {/*            onChange={handleChange}*/}
            {/*            value={availableSeats}*/}
            {/*        />*/}
            {/*        <TextField required id="standard-required" label="Contact information"*/}
            {/*                   name = "contactInfo"*/}
            {/*                   value={contactInfo}*/}
            {/*                   onChange={handleChange}/>*/}
            {/*        <TextField*/}
            {/*            id="datetime-local standard-required"*/}
            {/*            label="Departure time"*/}
            {/*            type="datetime-local"*/}
            {/*            className={classes.textField}*/}
            {/*            InputLabelProps={{*/}
            {/*                shrink: true,*/}
            {/*            }}*/}
            {/*            name = "departureTime"*/}
            {/*            value={departureTime}*/}
            {/*            onChange={handleChange}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <Button variant="contained" color="primary" onClick={submit} component={Link} to='/'>*/}
            {/*        Submit*/}
            {/*    </Button>*/}
            {/*</form>*/}
            {/*<Map markerList={markerList} directions={directionResponse} forHome={false}/>*/}
        </div>
    );
}

export default EditPost;
