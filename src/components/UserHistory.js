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
import {Post} from "./Post";

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
  const handleChange = (event) => {
    setStatus(!status);
    if (status)
      dispatch(getDriverHistoryAsync(user._id));
    else
      dispatch(getHistoryAsync(user._id));
  };

  const dispatch = useDispatch();

  const renderedPosts = posts.map((slice) => {
    const date = new Date(slice.startingTime)
    const dateString = date.toDateString() + " " + date.getHours() + ":"
      + ((date.getMinutes() > 9) ? date.getMinutes() : ("0" + date.getMinutes())) + ":" +
      ((date.getSeconds() > 9) ? date.getSeconds() : ("0" + date.getSeconds()))
      return (
          <Grid item xs={12} md={12} key={Math.random()}>
            {
              <Post name = {slice.driver} startingTime = {dateString} from = {slice.from}
                    to = {slice.to} contactInfo={slice.contactInfo} key={Math.random()} id={slice._id}
                    active={slice.active} rating={slice.rating} price={slice.price}
                    availableSeats={slice.availableSeats}/>
            }
          </Grid>
      )
  })

  const renderedDriverPosts = posts.map((slice) => {
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
          title={slice.active ? 'Active' : 'Inactive'}
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
      <List style={{ maxHeight: '250%', overflow: 'auto' }}>
        {/* <Grid sx={{ overflowY: "scroll", maxHeight: "250px" }}, container spacing={2}> */}
        {status ? renderedPosts : renderedDriverPosts}
        {/* </Grid> */}
      </List>
    </section>
  )
}


export default UserHistory;
