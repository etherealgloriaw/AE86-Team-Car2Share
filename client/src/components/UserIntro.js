// The general idea of popup window and tiny bit of code was adapted from
// https://www.cluemediator.com/create-simple-popup-in-reactjs
import './Popup.css'
import {DirectionsRenderer, GoogleMap} from "@react-google-maps/api";
import React, {useEffect, useMemo, useState} from "react";
import {Rating} from "@material-ui/lab";
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DriveEtaTwoToneIcon from '@material-ui/icons/DriveEtaTwoTone';
import TrackChangesTwoToneIcon from '@material-ui/icons/TrackChangesTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import PermContactCalendarTwoToneIcon from '@material-ui/icons/PermContactCalendarTwoTone';
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';
import GroupTwoToneIcon from '@material-ui/icons/GroupTwoTone';
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';
import DirectionsRailwayTwoToneIcon from '@material-ui/icons/DirectionsRailwayTwoTone';
import QueryBuilderTwoToneIcon from '@material-ui/icons/QueryBuilderTwoTone';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import AccessAlarmTwoToneIcon from '@material-ui/icons/AccessAlarmTwoTone';
import { Grid, Box, Card, ImageList, ImageListItem, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    containerStyle: {
      position: 'relative',
      width: "30vw",
      height: "57vh",
      marginTop: 10,
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
  }

}));

export default function UserIntro(props) {
    const classes = useStyles();
    useMemo(() => {
        if (props.data){
            console.log(props.data)
        }

    }, [props.data])
    var driver = props.data.driver;

    return (
        <div className="popup-box">
            <div className="box">
                <div className="closeButton">
                    <CloseTwoToneIcon id="button" type="button" onClick={
                        (e) => {
                            e.preventDefault();
                            props.togglePopup(0)
                        }
                    }/>
                </div>
        <Grid item xs={12} md={6} className={classes.containerStyle}>
          <Box display="flex"
            justifyContent="center">
            <Avatar className={classes.avatar} src={driver.avatar_address} />
          </Box>
          <Box display="flex"
            justifyContent="center">
            <Typography component="h1" variant="h7">
              {driver.username}
            </Typography>
          </Box>
          <Box display="flex"
            justifyContent="center">
            <Typography component="h1" variant="h6">
              Rate : <Rating name="half-rating" value={driver.rating.$numberDecimal} precision={0.1} readOnly />
            </Typography>
          </Box>
          <Box display="flex"
            justifyContent="center">
            <Typography component="h1" variant="h6">
              driving experience : {driver.driving_experience ? driver.driving_experience: "0"}y
            </Typography>
          </Box>
          <Box display="flex"
            justifyContent="center">
            <Typography component="h1" variant="h6">
              {driver.introduction}
            </Typography>
          </Box>
          <Box display="flex"
            justifyContent="center">
            <ImageList rowHeight={160} className={classes.imageList} cols={3}>
            {driver.images ? (driver.images.map((item) => {
              return (
                <ImageListItem key={item.img} cols={item.cols || 1}>
                <img src={item} alt="car" />
                </ImageListItem>
              );
            })) : ""}
            </ImageList>
          </Box>
        </Grid>
               
            </div>
        </div>
    );

};
