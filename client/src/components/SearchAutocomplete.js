import Autocomplete from '@material-ui/lab/Autocomplete';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import TextField from "@material-ui/core/TextField" ;
import {IconButton, Input, InputAdornment} from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";


export default function SearchAutocomplete(props) {
    // eslint-disable-next-line no-undef
    const bounds = new google.maps.LatLngBounds({ lat: 49.241624, lng: -123.273167 },
        { lat: 49.241624, lng: -123.273167 })

    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions,
    } = usePlacesAutocomplete({requestOptions: {
            bounds: bounds
        }}
    );



    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        const results = await getGeocode({address});
        let coordinates = await getLatLng(results[0]);
        props.setSelected(coordinates);
    };

    const handleChange = (event, value, reason) => {
        switch (reason) {
            case "select-option":
                handleSelect(value)
                break;

            case "clear":
                setValue(null)
                props.setSelected(null);
                break;

            default:
                return;
        }


    }
    return (
        <Autocomplete
            id="autocomplete"
            value={value}
            freeSolo
            clearOnEscape={true}
            disabled={!ready}
            loading={!(ready && (status == "OK"))}
            onInputChange={(event, value) => {
                setValue(value)
            }
            }
            onChange={(event, value, reason) => {
                handleChange(event, value, reason)
            }}
            options={data.map(({ description}) => description)}
            renderInput={(params) => {
                        return(
                            <TextField {...params} margin="normal"
                                           InputProps={{...params.InputProps,
                                               endAdornment: (
                                                   <InputAdornment position="end">
                                                       <IconButton aria-label="Use current location" onClick={props.handleSearch}>
                                                           <SearchIcon />
                                                       </IconButton>
                                                   </InputAdornment>
                                               ),
                                           }}/>
                            // <InputBase
                            //     className={classes.input}
                            //     {...params}
                            // />
                        )

                    }}
            />)
}

