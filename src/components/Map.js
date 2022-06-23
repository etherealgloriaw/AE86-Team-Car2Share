// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Hidden from '@material-ui/core/Hidden';
// import {GoogleMap, useLoadScript} from "@react-google-maps/api";
//
// const useStyles = makeStyles({
//     card: {
//       display: 'flex',
//       height: 300,
//     },
//   });
//
// export default function Map(props) {
//     const classes = useStyles();
//     const { post } = props;
//
//     return (
//       <Grid item xs={12} md={6}>
//         <CardActionArea component="a" href="#">
//           <Card className={classes.card}>
//               <MapComponent/>
//           </Card>
//         </CardActionArea>
//       </Grid>
//     );
// }
// function MapComponent(){
//     var { isLoaded } = useLoadScript({
//         googleMapsApiKey: '',
//     });
//
//     if (!isLoaded) return <div>Loading</div>;
//     return (
//         <div>
//             <GoogleMap zoom={10} center={{lat: 49.261443, lng:-123.256696}} mapContainerClassName="map-container"></GoogleMap>;
//         </div>)
// }
//
// Map.propTypes = {
//     post: PropTypes.object,
// };



import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import React from "react";
import {useSelector} from "react-redux";

export default function Map(){
    var { isLoaded } = useLoadScript({
        googleMapsApiKey: '',
    });

    const postList = useSelector(state => state.posts);



    if (!isLoaded) return <div>Loading</div>;
    return (
        <div className='mapComponent'>
            <GoogleMap zoom={10} center={{lat: 49.261443, lng:-123.256696}} mapContainerClassName="map-container">
                {postList.map((post => {
                    return <Marker position={post.dest}/>
                }))}
            </GoogleMap>;
        </div>)
}
