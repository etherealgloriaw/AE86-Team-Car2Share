import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom';
import ModifyPost from "../components/ModifyPost";
import {getGeocode, getLatLng} from "use-places-autocomplete";


function EditPost() {
    const {postID} = useParams()
    const post = useSelector(state => state.users.list.find(p => p._id == postID))
    const [initDept,setInitDept] = useState(null)
    const [initDest,setInitDest] = useState(null)
    const [directionResponse, setDirectionResponse] = useState(null)
    const [distances, setDistances] = useState(null)
    const [duration, setDuration] = useState(null)
    console.log(post)
    useEffect(() => {
        async function initLocation() {
            const results = await getGeocode({address: post.from});
            const dept = await getLatLng(results[0]);
            setInitDept(dept)
            const dest = {lat: Number(post.lat.$numberDecimal), lng: Number(post.lng.$numberDecimal)}
            setInitDest(dest)
            // eslint-disable-next-line no-undef
            const directionService = new google.maps.DirectionsService()
            const direction = await directionService.route({
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
            setDirectionResponse(direction)
            setDistances(direction.routes[0].legs[0].distance.text)
            setDuration(direction.routes[0].legs[0].duration.text)
        }
        initLocation()
    },[])

    return (
        <div>
            {(initDept && directionResponse)? (<ModifyPost post={post} forEdit={true} dept={initDept} dest={initDest}
                                  direction={directionResponse} distance={distances} duration={duration} id = {post._id} />) : null}
        </div>
    )
}

export default EditPost;
