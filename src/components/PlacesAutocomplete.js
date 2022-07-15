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
        const coordinates = await getLatLng(results[0]);
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
            value={value}
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
            options={data.map(({place_id, description}) => description)}
            renderInput={(params) => (
                <TextField {...params} label={props.title} margin="normal" variant="outlined"/>
            )}
        />)
}

