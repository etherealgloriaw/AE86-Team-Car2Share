import React,{useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { useDispatch } from 'react-redux';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {searchPostAsync} from "../redux/posts/thunks";

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
}));



export const ResponsiveSearchBar = () => {
    const classes = useStyles();

    var[destination, setDestination] = useState('')
    const[selection, setSelection] = useState('rating')
    const[sorting, setSorting] = useState('ascending')

    const handleChange = e =>{
        if(e.target.name == 'destination'){
            setDestination(e.target.value);
        }
    }

    const dispatch = useDispatch()

    const handleSearch = () => {
        if(destination == ""){
            destination = "NULL"
        }

        const searchReq = {
            selection,
            sorting,
            destination
        }
            

        console.log(searchReq);
        setDestination('');
        dispatch(searchPostAsync(searchReq));
        
      };

    const selectionMade = (e) =>{
        setSelection(e.target.value);
    }

    const sortingMade = (e) =>{
        setSorting(e.target.value);
    } 

    return (
        <div className={classes.search} >
            <div></div>
            <InputBase onChange={handleChange}
            value = {destination}
                id = "destination"
                name = "destination"
                placeholder="To…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
            />
            <IconButton aria-label="search" onClick = {handleSearch}>
                <SearchIcon />
            </IconButton>

            <div>
            <div className="filter" >

            <select onChange={selectionMade}>           
                <option value = "rating">Ratings</option>
                <option value = "totalTime">Total Time</option>
                <option value = "availableSeats">Available Seats</option>              
            </select>
            </div>
            <div className='sorting' onChange = {sortingMade}>
                <input type="radio" name="option" value = "ascending"/>Ascending
                <input type="radio" name="option" value = "descending" />Descending
            </div>

        </div>
        </div>
    )
}