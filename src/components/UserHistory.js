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
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {deletePostAsync,finishPostAsync } from "../redux/posts/thunks";
import { useNavigate } from 'react-router-dom'

import { PostHistory } from "./PostHistory";


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
  const dispatch = useDispatch();
  let navigate = useNavigate();
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



  const renderedPosts = posts.map((slice) => {
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

  const renderedDriverPosts = posts.map((slice) => {
    const date = new Date(slice.startingTime)
    const dateString = date.toDateString() + " " + date.getHours() + ":"
      + ((date.getMinutes() > 9) ? date.getMinutes() : ("0" + date.getMinutes())) + ":" +
      ((date.getSeconds() > 9) ? date.getSeconds() : ("0" + date.getSeconds()))
    const status = slice.active;
    let statusStr = "";
    if (status == 0) {
      statusStr = "In the future"
    } else if(status == 1) {
      statusStr = "Ongoing"
    } else if(status == 2) {
      statusStr = "Finished"
    }

    const handleDelete = () => {
      dispatch(
          deletePostAsync(slice._id)
      )
    }

    const handleEdit = () => {
      navigate(`/Edit/${slice._id}`, { replace: false })
    }

    const handleFinish = () => {
      dispatch(
          finishPostAsync(slice._id)
      )
    }


    return (
        <Grid item xs={12} md={12} key={Math.random()}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {user.username}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={statusStr}
        />
        <CardContent>
          <Typography variant="body1" color="black" component="p">
            <span style={{fontWeight: 'bold'}}>From: </span>{slice.from}
          </Typography>
          <Typography variant="body1" color="black" component="p">
            <span style={{fontWeight: 'bold'}}>To: </span>{slice.from}{slice.to}
          </Typography>
          <Typography variant="body1" color="black" component="p">
            <span style={{fontWeight: 'bold'}}>Departure time: </span>{dateString}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <span style={{fontWeight: 'bold'}}>Available Seats: </span>{slice.availableSeats}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <span style={{fontWeight: 'bold'}}>Price:  </span>{slice.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <span style={{fontWeight: 'bold'}}>Departure time: </span>{dateString}
          </Typography>
          <IconButton aria-label="share" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={handleEdit} >
            <EditIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={handleFinish} >
            <CheckBoxIcon />
          </IconButton>

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
