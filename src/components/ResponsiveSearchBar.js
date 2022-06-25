import React,{useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { useDispatch } from 'react-redux';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { initialState, postSearch } from './SinglePost';

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

    const[destination, setDestination] = useState('')

    const handleChange = e =>{
        if(e.target.name == 'destination'){
            setDestination(e.target.value);
        }
    }

    const dispatch = useDispatch()

    const handleSearch = () => {
        dispatch(
            postSearch(destination)
        )
        setDestination('');
      };

    return (
        <div className={classes.search}>
            <InputBase
                placeholder="From…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                // inputProps={{ 'aria-label': 'search' }}
            />
            <div></div>
            <InputBase onChange={handleChange}
                name = "destination"
                placeholder="To…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                // inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton aria-label="search">
                <SearchIcon onClick = {handleSearch}/>
            </IconButton>
        </div>
    )
}