import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux'
import { Navigate } from "react-router-dom";
import {addPostAsync, editPostAsync} from "../redux/posts/thunks";
import { useGeolocated } from "react-geolocated";
import {
     Step,
    StepLabel,
    Stepper,
    Typography
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import AddressForm from "./ModifyPostForms/AddressForm";
import DetailForm from "./ModifyPostForms/DetailForm";
import Review from "./ModifyPostForms/Review";

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
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    }
}));

const steps = ['Address', 'Detail', 'Review'];


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
    const [activeStep, setActiveStep] = React.useState(0);
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
    const markerList = [dept, dest]
    // eslint-disable-next-line no-undef
    const deptBounds = new google.maps.LatLngBounds({ lat: 49.010569, lng: -123.466741 },
        { lat: 50.555913, lng: -119.017361 })
    // eslint-disable-next-line no-undef
    const destBounds = new google.maps.LatLngBounds({ lat: 49.241624, lng: -123.273167 },
        { lat: 49.241624, lng: -123.273167 })

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm setDept={setDept} dept={dept} setDeptString={setDeptString}
                                    forEdit={forEdit} deptString={deptString}
                                    posError={posError} deptBounds={deptBounds} posErrorMsg={posErrorMsg}
                                    displayErrMsg={displayErrMsg} handleLocation={handleLocation}
                                    setDest={setDest} dest={dest} setDestString={setDestString}
                                    destString={destString} label={2} destBounds={destBounds}
                                    markerList={markerList} directionResponse={directionResponse}
                                    distances={distances} duration={duration}/>;
            case 1:
                return <DetailForm seatsError={seatsError} handleChange={handleChange} availableSeats={availableSeats
                } price={price} priceError={priceError} dateError={dateError} departureTime={departureTime}
                                   contactInfo={contactInfo} contactInfoError={contactInfoError}/>;
            case 2:
                return <Review deptString={deptString} destString={destString} distances={distances} duration={duration}
                               availableSeats={availableSeats} price={price}  departureTime={departureTime}
                               contactInfo={contactInfo} markerList={markerList} directionResponse={directionResponse}/>;
            default:
                throw new Error('Unknown step');
        }
    }


    const handleNext = () => {
        switch (activeStep) {
            case 0:
                calculateRoute().then(() => {
                    if (checkInUBC()) {
                        if (posErrorVar === 0){
                            setActiveStep(activeStep + 1);
                        }
                    }
                })
                break
            case 1:
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
                if ((!seatsErrorVar) && (!contactInfoErrorVar) && (!dateErrorVar) && (!priceErrorVar)) {
                    setActiveStep(activeStep + 1)
                }
                break
            case 2:
                addPost()
                setActiveStep(activeStep + 1)
                break

            default:
                setActiveStep(activeStep + 1)

        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

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

    const handleReturn = () => {
        navigate("/");
    }

    const addPost = () => {
        if ((posErrorVar == 0) && (!seatsErrorVar) && (!contactInfoErrorVar) && (!dateErrorVar) &&
            (!priceErrorVar)) {
            if (forEdit) {
                newPost._id = prop.id;
                console.log(newPost)
                dispatch(editPostAsync(newPost)).then((user) => {navigate('/Profile/' + user._id, { replace: false });});
            } else {
                dispatch(addPostAsync(newPost)); //.then((user) => {navigate('/', { replace: false });});
            }
            setDeptString("")
            setDestString("")
            setAvailableSeats('');
            setDepartureTime('');
            setContactInfo('');
            setPrice(0)
        }
    }

    if (user != null) {
        return (
            <React.Fragment>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            {prop.forEdit? "Edit Your Post": "Add a New Post"}
                        </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Your post has been {forEdit? "edited": "added"}!
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        You will receive an E-mail notification when a user join your trip.
                                        Thank you for using Car2Share.
                                    </Typography>
                                    <div className={classes.buttons}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleReturn}
                                            className={classes.button}
                                        >
                                          Return to Home
                                        </Button>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                </main>
            </React.Fragment>
        );
    } else return < Navigate to='/Login' />
}
