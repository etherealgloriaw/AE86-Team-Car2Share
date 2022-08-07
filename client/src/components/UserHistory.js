import React from "react";
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
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {deletePostAsync,finishPostAsync } from "../redux/posts/thunks";
import { useNavigate } from 'react-router-dom'
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DriveEtaTwoToneIcon from "@material-ui/icons/DriveEtaTwoTone";
import ListItemText from "@material-ui/core/ListItemText";
import TrackChangesTwoToneIcon from "@material-ui/icons/TrackChangesTwoTone";
import AccessAlarmTwoToneIcon from "@material-ui/icons/AccessAlarmTwoTone";
import {Card} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
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
  itemList: {
    paddingLeft: "4%",
    maxHeight: "20%",
  },
  item: {
    maxHeight: 55,
    marginBottom: 10,
  },
  cardHeader: {
    marginTop: "5%",
    maxHeight: 1,
    paddingLeft: "3.5%"
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: "100%",
  },
  root: {
    maxWidth: "100%",
    marginTop: '2%',
    marginLeft: '3%',
    marginRight: '3%',
    maxHeight: '100%',
    marginBottom: '3%',
    backgroundColor: "#ECECEC",
  },
}));

export const UserHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const posts = useSelector(state => state.users.list)
  const user = JSON.parse(localStorage.getItem('profile'));

  const [status, setStatus] = React.useState(true);
  const [time, setTime] = React.useState('')

  const handleChange = (event) => {
    setTime('')
    setStatus(!status);
    if (status)
      dispatch(getDriverHistoryAsync(user._id));
    else
      dispatch(getHistoryAsync(user._id));
  };

  const handleTimeChange = (e) =>{
    setTime(e.currentTarget.value)    
  }




  var renderedPosts = posts.map((slice) => {
    if (slice._id == null) return
    if(time === "history"){
      // console.log("history")
      if(slice.active !== 2) return
    }else if(time === 'ongoing'){
      // console.log("ongoing")
      // console.log("active status: " + slice.active)
      console.log(slice.active !== 1)
      if(slice.active !== 1) return
      
    }else if(time === 'upcoming'){
      // console.log("upcoming")
      if(slice.active !== 0) return
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
    if (slice._id == null) return
    if(time === "history"){
      console.log("history")
      console.log(slice.active !== 2)
      if(slice.active !== 2) return
    }else if(time === 'ongoing'){
      // console.log("ongoing")
      // console.log("active status: " + slice.active)
      console.log(slice.active !== 1)
      if(slice.active !== "1") return
      
    }else if(time === 'upcoming'){
      // console.log("upcoming")
      if(slice.active !== 0) return
    }
    const date = new Date(slice.startingTime)
    const dateString = date.toDateString() + " " + date.getHours() + ":"
      + ((date.getMinutes() > 9) ? date.getMinutes() : ("0" + date.getMinutes())) + ":" +
      ((date.getSeconds() > 9) ? date.getSeconds() : ("0" + date.getSeconds()))
    const status = slice.active;
    let statusStr = "";
    if (status == "0") {
      statusStr = "In the future"
    } else if(status == "1") {
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
      if (slice.active == 2) alert("The past post cannot be edited!")
      else navigate(`/Edit/${slice._id}`, { replace: false })
    }

    const handleFinish = () => {
      dispatch(
          finishPostAsync(slice._id)
      )
    }


    return (
        <Card className={classes.root} key={Math.random()}>
        <CardHeader className={classes.cardHeader}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {slice.active ? 'Active' : 'Inactive'}
            </Avatar>
          }
          title={statusStr}
        />
        <CardContent>
          {/*<Typography variant="body2" color="textSecondary" component="p">*/}
          {/*  From: {slice.from}*/}
          {/*  <div></div>*/}
          {/*  To: {slice.to}*/}
          {/*</Typography>*/}

          {/*<Typography variant="body2" color="textSecondary" component="p">*/}
          {/*  <span style={{fontWeight: 'bold'}}>Departure time: </span>{dateString}*/}
          {/*</Typography>*/}
          <List className={classes.itemList}>
            <ListItem className={classes.item}>
              <ListItemIcon>
                <DriveEtaTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                  primary= "From: "
                  secondary={slice.from}
              />
            </ListItem>
            <ListItem className={classes.item}>
              <ListItemIcon>
                <TrackChangesTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                  primary= "To: "
                  secondary={slice.to}
              />
            </ListItem>
            <ListItem className={classes.item}>
              <ListItemIcon>
                <AccessAlarmTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                  primary= "Departure Time: "
                  secondary={dateString}
              />
            </ListItem>
          </List>
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
      </Card>
      )
  })




  return (
    <div className="postsInProfilePage">
      <FormGroup>
        <FormControlLabel
          control={<Switch checked = {status} defaultchecked = {status} onChange={handleChange} aria-label="login switch" />}
          label={status ? 'Passenger' : 'Driver'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              </Typography>
              <Button color="inherit" value = {'ongoing'} onClick = {handleTimeChange}>Ongoing</Button>
              <Button color="inherit" value = {'upcoming'} onClick = {handleTimeChange}>Upcoming</Button>
              <Button color="inherit" value = {'history'} onClick = {handleTimeChange}>History</Button>
              </Toolbar>
        </AppBar>
      <List style={{ maxHeight: '250%', overflow: 'auto' }}>
        {/* <Grid sx={{ overflowY: "scroll", maxHeight: "250px" }}, container spacing={2}> */}
        {status ? renderedPosts : renderedDriverPosts}
        {/* </Grid> */}
      </List>
    </div>
  )
}


export default UserHistory;
