import React,{useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { useDispatch } from 'react-redux';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {searchPostAsync} from "../redux/posts/thunks";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './style/Filter.css'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import SearchAutocomplete from "./SearchAutocomplete";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '38%',
        maxWidth: "38%",
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, ),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    formControl: {
        // position: 'absolute',
        // position: 'relative',
        // width: 150,
        // height: 220,
        width: "80%",
        height: "50%",
        borderRadius: 9,
        marginTop: 0,
        margin: theme.spacing(1),
    },
    sort: {
        // position: 'relative',
        // width: 150,
        // height: 220,
    },
    filter: {
        width: "100%",
        height: "100%",
        marginTop: 0,
        borderRadius: 9,
        fontSize: 18
    },
    filter2: {
        width: "100%",
        marginTop: 0,
        borderRadius: 9,
        fontSize: 16
    }
}));



export const ResponsiveSearchBar = () => {
    const classes = useStyles();

    const[selection, setSelection] = useState('rating')
    const[sorting, setSorting] = useState('ascending')
    const[coordinate, setCoordinate] = useState(null)

    const dispatch = useDispatch()

    const handleSearch = (e) => {

        //TODO: remember to check if the coordinates exists!

        // alert(coordinate.lat + " " + coordinate.lng);
        const lat = coordinate.lat;
        const lng = coordinate.lng;
        console.log(lat)

        const searchReq = {
            selection,
            sorting,
            lat,
            lng
        }


        // console.log(searchReq);
        dispatch(searchPostAsync(searchReq));

    };

    const selectionMade = (e) =>{
        // console.log("selection made: " + e.target.value)
        setSelection(e.target.value);
    }

    const sortingMade = (e) =>{
        setSorting(e.target.value);
    }

    return (
        <Grid container spacing={12} direction="row"
              justifyContent="flex-start"
              alignItems="center">
            <Grid xs = {8} className={classes.search}>
                <SearchAutocomplete setSelected={setCoordinate} handleSearch={handleSearch}/>
            </Grid>
            <Grid item xs={2} className={classes.filter} >
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-select-label" ></InputLabel>
                    <Select
                        labelId="demo-controlled-select-label"
                        id="demo-controlled-select"
                        value={selection}
                        onChange={selectionMade} className={classes.filter2}
                    >
                        <MenuItem value={"distance"}>Distance</MenuItem>
                        <MenuItem value={"rating"}>Ratings</MenuItem>
                        <MenuItem value={"totalTime"}>Total Time</MenuItem>
                        <MenuItem value={"availableSeats"}>Available Seats</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={2} className={classes.sort}>
                <FormControl component="fieldset">
                    <RadioGroup row aria-label="sorting" name="sorting"  onChange={sortingMade}>
                        <FormControlLabel value="ascending" control={<Radio />} label="ascending" />
                        <FormControlLabel value="descending" control={<Radio />} label="descending" />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
}
