import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PlacesAutocomplete from "../PlacesAutocomplete";
import Map from "../Map";

export default function AddressForm(props) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Route Information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <PlacesAutocomplete setSelected={props.setDept} selected={props.dept}
                                        setString={props.setDeptString}
                                        title="Departure From" forEdit={props.forEdit}
                                        string={props.deptString} label={1}
                                        error={props.posError} boundary={props.deptBounds}
                                        posErrorMsg={props.posErrorMsg}
                                        displayErrMsg={props.displayErrMsg} handleLocation={props.handleLocation}/>

                </Grid>
                <Grid item xs={12} sm={6}>
                    <PlacesAutocomplete setSelected={props.setDest} selected={props.dest}
                                        setString={props.setDestString} title="Arrive At"
                                        forEdit={props.forEdit} string={props.destString} label={2}
                                        error={props.posError} boundary={props.destBounds}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant='subtitle1' gutterBottom>
                        Distance: {props.distances}
                    </Typography>

                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant='subtitle1' gutterBottom>
                        Estimated Travel Time: {props.duration}
                    </Typography>

                </Grid>
                <Grid item xs={12}>
                    <Map markerList={props.markerList} directions={props.directionResponse} forHome={false}/>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}
