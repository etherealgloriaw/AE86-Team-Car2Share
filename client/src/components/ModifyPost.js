import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux'
import PlacesAutocomplete from "../components/PlacesAutocomplete";
import Map from "../components/Map";
import { Navigate } from "react-router-dom";
import {addPostAsync, editPostAsync} from "../redux/posts/thunks";
import { useGeolocated } from "react-geolocated";
import { FormControl, FormHelperText, IconButton, Input, InputLabel } from "@material-ui/core";
import MyLocationIcon from '@material-ui/icons/MyLocation';
import MaskedInput from "react-text-mask/dist/reactTextMask";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import { Grid } from '@material-ui/core';
import {getGeocode, getLatLng} from "use-places-autocomplete";

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

//Reference: https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
export function calcDistance(coordsA, coordsB) {
    const R = 3958.8; // Radius of the Earth in miles
    const rlat1 = coordsA.lat * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = coordsB.lat * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = (coordsB.lng - coordsA.lng) * (Math.PI / 180); // Radian difference (longitudes)

    const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) *
        Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
}


function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="$"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


export default function ModifyPost(prop) {
    const target = prop.post
    const dispatch = useDispatch();
    const classes = useStyles();
    const [dept, setDept] = useState(prop.forEdit? prop.dept: null)
    const [dest, setDest] = useState(prop.forEdit? prop.dest: null)
    const [deptString, setDeptString] = useState(target? target.from: null);
    const [destString, setDestString] = useState(target? target.to: null)
    const [availableSeats, setAvailableSeats] = useState(target? target.availableSeats: null)
    let dateStr
    let dateFormat
    if (target) {
        dateStr = target.startingTime.toString()
        dateFormat = dateStr.substring(0,dateStr.length-2)
    }
    const [departureTime, setDepartureTime] = useState(target? dateFormat: null)
    const [contactInfo, setContactInfo] = useState(target? target.contactInfo: null)
    const [directionResponse, setDirectionResponse] = useState(prop.forEdit? prop.direction: null)
    const [distances, setDistances] = useState(prop.forEdit? prop.distance: null)
    const [duration, setDuration] = useState(prop.forEdit? prop.duration: null)
    const user = JSON.parse(localStorage.getItem('profile'));
    const [forEdit, setForEdit] = useState(prop.forEdit)
    const [posError, setPosError] = useState(0)
    const [seatsError, setSeatsError] = useState(false)
    const [contactInfoError, setContactInfoError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [priceError, setPriceError] = useState(false)
    const [price, setPrice] = useState(target? target.price:"0")
    const [posErrorMsg, setPosErrorMsg] = useState("Please choose address from list")
    const [displayErrMsg,setDisplayErrMsg] = useState(false)
    const [isInit, setIsInit] = useState(true)
    let posErrorVar = 0
    let seatsErrorVar = false
    let contactInfoErrorVar = false
    let dateErrorVar = false
    let priceErrorVar = false
    const navigate = useNavigate();

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    useEffect(() => {
        if (dept && dest) {
            setIsInit(false)
        }
        if (!isInit) {
            calculateRoute()
        }
    }, [dept, dest, isInit])



    const handleLocation = () => {
        if (isGeolocationAvailable && isGeolocationEnabled) {
            // eslint-disable-next-line no-undef
            const geocoder = new google.maps.Geocoder();
            let location = { lat: coords.latitude, lng: coords.longitude }
            setDept(location)
            geocoder
                .geocode({ location: location })
                .then((response) => {
                    if (response.results[0]) {
                        response.results.every((result) => {
                            if (result.address_components[0].types[0] == 'street_number') {
                                setDeptString(result.formatted_address)
                                setDisplayErrMsg(true)
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

    const checkInUBC = () => {
        if (dept) {
            if (calcDistance(dept, { lat: 49.260859, lng: -123.248456 }) > 1.5) {
                if (posErrorVar == 2) {
                    setPosError(3)
                    posErrorVar = 3
                } else {
                    setPosError(1)
                    posErrorVar = 1
                }
                setPosErrorMsg("Dept cannot outside UBC")
                return false
            } else {
                return true
            }
        }
    }

    const calculateRoute = async () => {
            if (dept == null || dest == null) {
                if (dept == null && dest == null) {
                    setPosError(3)
                    setPosErrorMsg("Please choose address from list")
                    posErrorVar = 3

                } else if (dept == null) {
                    setPosError(1)
                    posErrorVar = 1
                    setPosErrorMsg("Please choose address from list")
                } else {
                    setPosError(2)
                    posErrorVar = 2
                }
                return
            }
            if (!checkInUBC()) {
                return
            }

        setPosError(0)
        posErrorVar = 0
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
        } else if (e.target.name == "price") {
            setPrice(e.target.value)
        }
    }

    const markerList = [dept, dest]

    if (user != null) {
        const newPost = {
            availableSeats: availableSeats,
            rating: 0,
            startingTime: departureTime,
            totalTime: duration,
            lat: destLat,
            lng: destLng,
            contactInfo: contactInfo,
            active: 0,
            price: price,
            to: destString,
            from: deptString,
            driver: user._id
        }
        const addPost = () => {
            if ((posErrorVar == 0) && (!seatsErrorVar) && (!contactInfoErrorVar) && (!dateErrorVar) &&
                (!priceErrorVar)) {
                if (forEdit) {
                    alert("Edited!")
                    dispatch (editPostAsync(newPost))
                } else {
                    alert("Added")
                    dispatch(addPostAsync(newPost))
                }

                setDeptString("")
                setDestString("")
                setAvailableSeats('');
                setDepartureTime('');
                setContactInfo('');
                setPrice(0)
                navigate("/");
            }
        }


        const submit = () => {
            if (!/^\(\d{3}\)\s\d{3}-\d{4}/.test(contactInfo)) {
                setContactInfoError(true)
                contactInfoErrorVar = true
            } else {
                setContactInfoError(false)
                contactInfoErrorVar = false
            }
            if (!(availableSeats > 0 && availableSeats < 20)) {
                setSeatsError(true)
                seatsErrorVar = true
            } else {
                setSeatsError(false)
                seatsErrorVar = false
            }
            if (!(price >= 0 && price < 99999)) {
                setPriceError(true)
                priceErrorVar = true
            } else {
                setPriceError(false)
                priceErrorVar = false
            }
            const inputTime = new Date(departureTime)
            const now = new Date()
            const limit = new Date('2050-01-01T00:00')
            if (!(inputTime > now && inputTime < limit)) {
                setDateError(true)
                dateErrorVar = true
            } else {
                setDateError(false)
                dateErrorVar = false
            }
            calculateRoute().then(() => {
                if (checkInUBC()) {
                    addPost()
                }
            })
        }


        // eslint-disable-next-line no-undef
        const deptBounds = new google.maps.LatLngBounds({ lat: 49.010569, lng: -123.466741 },
            { lat: 50.555913, lng: -119.017361 })
        // eslint-disable-next-line no-undef
        const destBounds = new google.maps.LatLngBounds({ lat: 49.241624, lng: -123.273167 },
            { lat: 49.241624, lng: -123.273167 })

        return (
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item>
                            <PlacesAutocomplete setSelected={setDept} selected={dept} setString={setDeptString}
                                                title="Departure From" forEdit={forEdit} string={deptString} label={1}
                                                error={posError} boundary={deptBounds} posErrorMsg={posErrorMsg}
                                                displayErrMsg={displayErrMsg} />
                            <IconButton aria-label="Use current location" onClick={handleLocation}>
                                <MyLocationIcon />
                            </IconButton>
                            <PlacesAutocomplete setSelected={setDest} selected={dest} setString={setDestString}
                                                title="Arrive At"
                                                forEdit={forEdit} string={destString} label={2} error={posError} boundary={destBounds} />
                            <Button variant="contained" color="primary" onClick={calculateRoute}>
                                Calculate Route
                            </Button>
                            <h3>Estimated Travel Time: {duration}</h3>
                            <h3>Distance: {distances}</h3>
                        </Grid>
                        <Grid item>
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
                                helperText={seatsError ? "Invalid input" : null}
                            />
                        </Grid>
                        <Grid item >
                            <TextField
                                label="Price"
                                value={price}
                                onChange={handleChange}
                                name="price"
                                id="formatted-numberformat-input"
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                                error={priceError}
                                helperText={priceError ? "Invalid price" : null}
                            />
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
                                helperText={dateError ? "Invalid departure time" : null}
                            />
                        </Grid>
                        <Grid item>
                            <FormControl error={contactInfoError}>
                                <InputLabel htmlFor="formatted-text-mask-input">Contact information</InputLabel>
                                <Input
                                    value={contactInfo}
                                    onChange={handleChange}
                                    name="contactInfo"
                                    id="formatted-text-mask-input"
                                    inputComponent={TextMaskCustom}
                                />
                                {contactInfoError ? <FormHelperText id="component-error-text">Invalid phone number
                                </FormHelperText> : null}
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Button variant="contained" color="primary" onClick={submit}>
                        Submit
                    </Button>
                </form>
                <Map markerList={markerList} directions={directionResponse} forHome={false} />
            </div>
        )
    } else return < Navigate to='/Login' />
}
