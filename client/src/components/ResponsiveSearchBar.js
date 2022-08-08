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
        width: '50%',
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
        position: 'absolute',
        width: 150,
        height: 220,
        margin: theme.spacing(1),
    },
}));



export const ResponsiveSearchBar = () => {
    const classes = useStyles();

    var[destination, setDestination] = useState('')
    const[selection, setSelection] = useState('rating')
    const[sorting, setSorting] = useState('ascending')
    const[coordinate, setCoordinate] = useState(null)
    const handleChange = e =>{
        if(e.target.name == 'destination'){
            setDestination(e.target.value);
        }
    }

    const dispatch = useDispatch()

    const handleSearch = () => {
        // if(destination == ""){
        //     destination = "NULL"
        // }
        //
        // const searchReq = {
        //     selection,
        //     sorting,
        //     destination
        // }
        //
        //
        // console.log(searchReq);
        // setDestination('');
        // dispatch(searchPostAsync(searchReq));

        //TODO: remember to check if the coordinates exists!
        alert(coordinate.lat + " " + coordinate.lng)

      };

    const selectionMade = (e) =>{
        console.log("selection made: " + e.target.value)
        setSelection(e.target.value);
    }

    const sortingMade = (e) =>{
        setSorting(e.target.value);
    }

    return (
        <div>
        <div className={classes.search} >
            <SearchAutocomplete setSelected={setCoordinate} handleSearch={handleSearch}/>
            {/*<InputBase onChange={handleChange}*/}
            {/*           value = {destination}*/}
            {/*           id = "destination"*/}
            {/*           name = "destination"*/}
            {/*           placeholder="To…"*/}
            {/*           classes={{*/}
            {/*               root: classes.inputRoot,*/}
            {/*               input: classes.inputInput,*/}
            {/*           }}*/}
            {/*/>*/}
            {/*<IconButton aria-label="search" onClick = {handleSearch}>*/}
            {/*    <SearchIcon />*/}
            {/*</IconButton>*/}
        </div>
        <div className="filter" >
        <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-select-label"></InputLabel>
                    <Select
                        labelId="demo-controlled-select-label"
                        id="demo-controlled-select"
                        value={selection}
                        onChange={selectionMade}
                        >
                        <MenuItem value={"distance"}>Distance</MenuItem>
                        <MenuItem value={"rating"}>Ratings</MenuItem>
                        <MenuItem value={"totalTime"}>Total Time</MenuItem>
                        <MenuItem value={"availableSeats"}>Available Seats</MenuItem>
                    </Select>
                    </FormControl></div>
            <div className="sorting" >
            <FormControl component="fieldset">
                <RadioGroup row aria-label="sorting" name="sorting"  onChange={sortingMade}>
                    <FormControlLabel value="ascending" control={<Radio />} label="ascending" />
                    <FormControlLabel value="descending" control={<Radio />} label="descending" />
                </RadioGroup>
                </FormControl>
            </div>
            </div>
    )
}
