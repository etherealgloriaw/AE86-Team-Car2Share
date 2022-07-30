import Autocomplete from '@material-ui/lab/Autocomplete';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import TextField from "@material-ui/core/TextField" ;


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
                    return <TextField error helperText={props.posErrorMsg? props.posErrorMsg:
                        "Please choose address from list"}
                                      {...params} label={props.title} margin="normal"/>
                } else return (
                <TextField required {...params} label={props.title} margin="normal"/>
            )}
        }
        />
        )
}

