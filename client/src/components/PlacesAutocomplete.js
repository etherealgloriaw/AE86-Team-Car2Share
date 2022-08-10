import Autocomplete from '@material-ui/lab/Autocomplete';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import TextField from "@material-ui/core/TextField" ;
import {IconButton, InputAdornment} from "@material-ui/core";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import React from "react";


export default function PlacesAutocomplete(props) {
    // eslint-disable-next-line no-undef

    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions,
    } = usePlacesAutocomplete({requestOptions: {
        bounds: props.boundary
        }}
    );


    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        const results = await getGeocode({address});
        console.log(results)
        const coordinates = await getLatLng(results[0]);
        console.log(coordinates)
        props.setString(address)
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
            value={props.string? props.string:value}
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
                if (props.label == props.error || props.error == 3){
                    if (props.label == 1) {
                        return <TextField error helperText={props.posErrorMsg? props.posErrorMsg:
                            "Please choose address from list"}
                                          {...params} label={props.title} margin="normal"
                                          InputProps={{...params.InputProps,
                                              endAdornment: (
                                                  <InputAdornment position="end">
                                                      <IconButton aria-label="Use current location" onClick={props.handleLocation}>
                                                          <MyLocationIcon />
                                                      </IconButton>
                                                  </InputAdornment>
                                              ),
                                          }}/>
                    } else return <TextField error helperText={props.posErrorMsg? props.posErrorMsg:
                        "Please choose address from list"}
                                      {...params} label={props.title} margin="normal"/>
                } else if (props.label == 1){
                    return (
                        <TextField required {...params} label={props.title} margin="normal"
                                   InputProps={{...params.InputProps,
                                       endAdornment: (
                                           <InputAdornment position="end">
                                               <IconButton aria-label="Use current location" onClick={props.handleLocation}>
                                                   <MyLocationIcon />
                                               </IconButton>
                                           </InputAdornment>
                                       ),
                                   }}/>
                    )
                } else return (
                <TextField required {...params} label={props.title} margin="normal"/>
            )}
        }/>)
}

