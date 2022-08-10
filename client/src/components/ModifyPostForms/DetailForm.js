import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {FormHelperText, Input} from "@material-ui/core";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

function TextMaskCustom(props) {
    const {inputRef, ...other} = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="$"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function DetailForm(props) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Trip Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="standard-number"
                        label="Available seats"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={props.seatsError}
                        name="availableSeats"
                        onChange={props.handleChange}
                        value={props.availableSeats}
                        inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                        helperText={props.seatsError ? "Invalid input" : null}
                    />

                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Price"
                        value={props.price}
                        onChange={props.handleChange}
                        name="price"
                        id="formatted-numberformat-input"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                        error={props.priceError}
                        helperText={props.priceError ? "Invalid price" : null}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="datetime-local standard-required"
                        required
                        error={props.dateError}
                        label="Departure time"
                        type="datetime-local"
                        // className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="departureTime"
                        value={props.departureTime}
                        onChange={props.handleChange}
                        helperText={props.dateError ? "Invalid departure time" : null}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl error={props.contactInfoError}>
                        <InputLabel htmlFor="formatted-text-mask-input">Contact information</InputLabel>
                        <Input
                            value={props.contactInfo}
                            onChange={props.handleChange}
                            name="contactInfo"
                            id="formatted-text-mask-input"
                            inputComponent={TextMaskCustom}
                        />
                        {props.contactInfoError ? <FormHelperText id="component-error-text">Invalid phone number
                        </FormHelperText> : null}
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
