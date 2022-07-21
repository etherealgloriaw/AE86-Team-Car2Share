import {Marker} from "@react-google-maps/api";
import React, {useState} from "react";

export default function MyMarker (props) {
    const [animation, setAnimation] = useState(false);
    const handleHover = () => {
        // eslint-disable-next-line no-undef
        setAnimation(google.maps.Animation.BOUNCE)
    }
    const handleOut = () => {
        // eslint-disable-next-line no-undef
        setAnimation(false)
    }

    return <Marker position={props.position} animation={animation} onMouseOver={handleHover} onMouseOut={handleOut}/>
}
