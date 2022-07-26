import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Grid, List } from "@material-ui/core";
import './style/posts.css'
import { getHistoryAsync, getDriverHistoryAsync } from "../redux/users/thunks";
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { PostHistory } from "./PostHistory";
import {AppBar} from '@material-ui/core';
import {Toolbar} from '@material-ui/core';
import {Button} from '@material-ui/core';
import { SignalCellular0Bar } from "@material-ui/icons";



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  Button: {
    // height: '50%',
    // width: '50%',
    margin: theme.spacing(1),
  },
}));

export const UserHistory = () => {
  const classes = useStyles();
  const posts = useSelector(state => state.users.list)
  const user = JSON.parse(localStorage.getItem('profile'));

  const [status, setStatus] = React.useState(true);
  var time = 'History'

  const handleChange = (event) => {
    setStatus(!status);
    if (status)
      dispatch(getDriverHistoryAsync(user._id));
    else
      dispatch(getHistoryAsync(user._id));
  };

  const dispatch = useDispatch();

  const handleHistoryPost = () =>{
    time = 'History';
    // posts.filter(function(slice){
    //   return slice.active== "0";
    // })
  }

  const handleOngoingPost = () =>{
    time = 'Ongoing'
    // console.log("post: " + posts)
    // posts.filter(function(slice){
    //   console.log("active: " + JSON.stringify(slice))
    //   return slice.active === "1";
    // })
    // console.log("post: " + posts)
  }

  const handleUpcomingPost = () =>{
    time = 'Upcoming'
    // console.log("Time: " + time)
    // posts.filter(function(slice){
    //   return slice.active== "2";
    // })
  }


  var renderedPosts = posts.map((slice) => {
    if(time == "Histroy"){
      if(slice.active != "0") return
    }else if(time == "Upcoming"){
      if(slice.active != "2") return
    }else{
      if(slice.active != "1") return
    }
    const date = new Date(slice.startingTime)
    const dateString = date.toDateString() + " " + date.getHours() + ":"
      + ((date.getMinutes() > 9) ? date.getMinutes() : ("0" + date.getMinutes())) + ":" +
      ((date.getSeconds() > 9) ? date.getSeconds() : ("0" + date.getSeconds()))
      return (
          <Grid item xs={12} md={12} key={Math.random()}>
            {
              <PostHistory name = {slice.driver} startingTime = {dateString} from = {slice.from}
                    to = {slice.to} contactInfo={slice.contactInfo} key={Math.random()} id={slice._id}
                    active={slice.active} rating={slice.rating} price={slice.price}
                    availableSeats={slice.availableSeats}/>
            }
          </Grid>
      )
  })

  var renderedDriverPosts = posts.map((slice) => {
    const date = new Date(slice.startingTime)
    const dateString = date.toDateString() + " " + date.getHours() + ":"
      + ((date.getMinutes() > 9) ? date.getMinutes() : ("0" + date.getMinutes())) + ":" +
      ((date.getSeconds() > 9) ? date.getSeconds() : ("0" + date.getSeconds()))
      return (
        <Grid item xs={12} md={12} key={Math.random()}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {slice.active ? 'Active' : 'Inactive'}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          // title={slice.active ? 'Active' : 'Inactive'}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            From: {slice.from}
            <div></div>
            To: {slice.to}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="right" component="p">
            Departure time: {dateString}
          </Typography>
        </CardContent>
      </Grid>
      )
  })

  


  return (
    <section className="posts">
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={status} onChange={handleChange} aria-label="login switch" />}
          label={status ? 'Passenger' : 'Driver'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              </Typography>
              <Button color="inherit" onClick = {handleOngoingPost}>Ongoing</Button>
              <Button color="inherit" onClick = {handleUpcomingPost}>Upcoming</Button>
              <Button color="inherit" onClick = {handleHistoryPost}>History</Button>
              </Toolbar>
              </AppBar>
      <List style={{ maxHeight: '250%', overflow: 'auto' }}>
        {/* <Grid sx={{ overflowY: "scroll", maxHeight: "250px" }}, container spacing={2}> */}
        {status ? renderedPosts : renderedDriverPosts}
        {/* </Grid> */}
      </List>
    </section>
  )
}


export default UserHistory;
