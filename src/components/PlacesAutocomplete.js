import Autocomplete from '@material-ui/lab/Autocomplete';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import TextField from "@material-ui/core/TextField" ;


export default function PlacesAutocomplete(props) {
    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions,
    } = usePlacesAutocomplete();


    const handleSelect = async (address) => {

        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({address});
        console.log(results)
        const coordinates = await getLatLng(results[0]);
        console.log(coordinates.lat)
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
            value={props.forEdit? props.string:value}
            freeSolo
            clearOnEscape={true}
            disabled={!ready}
            loading={!(ready && (status === "OK"))}
            onInputChange={(event, value) => {
                setValue(value)
                }
            }
            onChange={(event, value, reason) => {
                handleChange(event, value, reason)
            }}
            options={data.map(({ description}) => description)}
            renderInput={(params) => {
                if (props.label === props.error || props.error === 3){
                    return <TextField error helperText={"Please choose address from list"}
                                      {...params} label={props.title} margin="normal"/>
                } else return (
                <TextField required {...params} label={props.title} margin="normal"/>
            )}
        }
        />
        )
}

