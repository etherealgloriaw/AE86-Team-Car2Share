import {Marker} from "@react-google-maps/api";
import React, {useEffect, useState} from "react";

export default function MyMarker (props) {
    const [animation, setAnimation] = useState(false);
    const handleHover = () => {
        // eslint-disable-next-line no-undef
        props.setSelected(props.id);
    }
    const handleOut = () => {
        // eslint-disable-next-line no-undef
        props.setSelected(null)
    }
    const handleClick = () => {
        props.setPopup(props.id)
    }
    useEffect(() => {
        if (props.selected !== props.id) {
            setAnimation(null)
        } else {
            // eslint-disable-next-line no-undef
            setAnimation(google.maps.Animation.BOUNCE)
        }
    }, [props.selected, props.id])

    return <Marker position={props.marker} animation={animation} onMouseOver={handleHover} onMouseOut={handleOut}
    onClick={handleClick}/>
}
