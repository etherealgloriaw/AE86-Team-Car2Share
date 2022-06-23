import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        '& > *': {
            margin: theme.spacing(2),
        }

    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function AddNewPost() {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField required id="standard-required" label="Starting at" defaultValue="Hello World" />
                <TextField required id="standard-required" label="Destination" defaultValue="Hello World" />
                <TextField
                    id="standard-number"
                    label="Available seats"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField required id="standard-required" label="Contact information" defaultValue="Hello World" />
                <TextField
                    id="standard-helperText"
                    label="Optional message"
                    defaultValue="Default Value"
                    helperText="Some helpful message"
                />
                <form className={classes.container} noValidate>
                    <TextField
                        id="datetime-local standard-required"
                        label="Departure time"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
            </div>
            <Button variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
}

