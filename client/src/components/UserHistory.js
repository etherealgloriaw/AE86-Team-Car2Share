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
import { FormLabel } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';


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
  activeButton: {
    backgroundColor: '#fff',
    color: '#3c52b2',
    border: "3px solid #fff",
    fontWeight: 540,
    fontSize: 16,
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
    }
  },
  basicButton: {
    fontWeight: 540,
    fontSize: 16,
    color: 'white',
    fontStyle: 'bold',
    border: "3px solid #658940",
    maxWidth: '100%',
    backgroundColor: '#839b67',
    // backgroundColor: '#658940',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
    },
  },
  finishedLabel: {
    borderRadius: 5,
    width: '100%',
    textAlign: "center",
    backgroundColor: '#839b67',
    color: 'white'
  },
  upcomingLabel: {
    borderRadius: 5,
    width: '100%',
    textAlign: "center",
    backgroundColor: 'orange',
  },
  ongoingLabel: {
    borderRadius: 5,
    width: '100%',
    textAlign: "center",
    backgroundColor: '#3c52b2',
    color: 'white'
  },
  iconText: {
    fontSize: 16
  }
}));

export const UserHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const posts = useSelector(state => state.users.list)
  const user = JSON.parse(localStorage.getItem('profile'));
  const [status, setStatus] = React.useState(true);
  const [time, setTime] = React.useState('')

  const handleChange = () => {

    setTime('')
    setStatus(!status);
    if (status)
      dispatch(getDriverHistoryAsync(user._id));
    else
      dispatch(getHistoryAsync(user._id));
  };

  const handleTimeChange = (e) =>{
    // document.getElementById("ongoing").style.color = "#ECECEC";
    // document.getElementById("upcoming").style.color = "#ECECEC";
    // document.getElementById("history").style.color = "#ECECEC";

    if (e.currentTarget.name == 'ongoing') {
      e.currentTarget.classList.add(
          classes.activeButton
      );
      e.currentTarget.classList.remove(
          classes.basicButton
      )
      document.getElementById("upcoming").classList.remove(
          classes.activeButton
      )
      document.getElementById("history").classList.remove(
          classes.activeButton
      )
      document.getElementById("upcoming").classList.add(
          classes.basicButton
      )
      document.getElementById("history").classList.add(
          classes.basicButton
      )
    } else if (e.currentTarget.name == 'upcoming') {
      e.currentTarget.classList.add(
          classes.activeButton
      );
      e.currentTarget.classList.remove(
          classes.basicButton
      )
      document.getElementById("ongoing").classList.remove(
          classes.activeButton
      )
      document.getElementById("history").classList.remove(
          classes.activeButton
      )
      document.getElementById("ongoing").classList.add(
          classes.basicButton
      )
      document.getElementById("history").classList.add(
          classes.basicButton
      )
    } else if (e.currentTarget.name == 'history') {
      e.currentTarget.classList.add(
          classes.activeButton
      );
      e.currentTarget.classList.remove(
          classes.basicButton
      )
      document.getElementById("ongoing").classList.remove(
          classes.activeButton
      )
      document.getElementById("upcoming").classList.remove(
          classes.activeButton
      )
      document.getElementById("ongoing").classList.add(
          classes.basicButton
      )
      document.getElementById("upcoming").classList.add(
          classes.basicButton
      )
    }
    // document.getElementById("history").classList.remove('')

    setTime(e.currentTarget.value)
    // console.log( document.getElementById(e.currentTarget.value).textContent)
    // document.getElementById(e.currentTarget.value).style.color = "#000000";
    // document.getElementById(e.currentTarget.value).textContent.style.color = "#336600";
  }




  var renderedPosts = posts.map((slice) => {
    if (slice._id == null) return
    if(time === "history"){
      if(slice.active !== 2) return
    }else if(time === 'ongoing'){
      if(slice.active !== 1) return
    }else if(time === 'upcoming'){
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
      if(slice.active !== 2) return
    }else if(time === 'ongoing'){
      if(slice.active !== 1) return
    }else if(time === 'upcoming'){
      if(slice.active !== 0) return
    }
    const date = new Date(slice.startingTime)
    const dateString = date.toDateString() + " " + date.getHours() + ":"
      + ((date.getMinutes() > 9) ? date.getMinutes() : ("0" + date.getMinutes())) + ":" +
      ((date.getSeconds() > 9) ? date.getSeconds() : ("0" + date.getSeconds()))
    const status = slice.active;
    let statusStr = "";
    let statusLabel = ''
    if (status == "0") {
      statusStr = "In the future";
      statusLabel = <InputLabel id="statusLabel" className={classes.upcomingLabel}>{statusStr}</InputLabel>
    } else if(status == "1") {
      statusStr = "Ongoing"
      statusLabel = <InputLabel id="statusLabel" className={classes.ongoingLabel}>{statusStr}</InputLabel>
    } else if(status == 2) {
      statusStr = "Finished"
      statusLabel = <InputLabel id="statusLabel" className={classes.finishedLabel}>{statusStr}</InputLabel>
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
          {statusLabel}
        <CardHeader className={classes.cardHeader}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {/*{slice.active ? 'Active' : 'Inactive'}*/}
              {slice.driver.username}
            </Avatar>
          }
          title={slice.driver.username}
        />

        <CardContent>
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
          <IconButton aria-label="share" onClick={handleDelete} className={classes.iconText}>
            <DeleteIcon />
            Delete
          </IconButton>
          <IconButton aria-label="share" onClick={handleEdit} className={classes.iconText}>
            <EditIcon />
            Edit
          </IconButton>
          <IconButton aria-label="share" onClick={handleFinish} className={classes.iconText}>
            <CheckBoxIcon />
            Finish
          </IconButton>

        </CardContent>
      </Card>
      )
  })




  return (
    <div className="postsInProfilePage"  checked={status} onLoad={handleChange}>
      <FormGroup>
        <FormControlLabel
          control={<Switch onChange={handleChange} aria-label="login switch" />}
          label={status ? 'Passenger' : 'Driver'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton>
            <Typography variant="h6" className={classes.title}></Typography>
            <Grid id = "buttons" container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">
              <Grid >
                <Button id="ongoing" color="inherit" value = {'ongoing'} onClick = {handleTimeChange} name={'ongoing'} className={classes.basicButton}>Ongoing</Button>
              </Grid>

              <Grid>
                <Button id="upcoming" color="inherit" value = {'upcoming'} onClick = {handleTimeChange} name={'upcoming'} className={classes.basicButton}>Upcoming</Button>
              </Grid>
              <Grid>
                <Button id="history" color="inherit" value = {'history'} onClick = {handleTimeChange} name={'history'} className={classes.basicButton}>History</Button>
              </Grid>
              {/*<Button id="ongoing" color="inherit" value = {'ongoing'} onClick = {handleTimeChange} name={'ongoing'} className={classes.basicButton}>Ongoing</Button>*/}
              {/*<Button id="upcoming" color="inherit" value = {'upcoming'} onClick = {handleTimeChange} name={'upcoming'} className={classes.basicButton}>Upcoming</Button>*/}
              {/*<Button id="history" color="inherit" value = {'history'} onClick = {handleTimeChange} name={'history'} className={classes.basicButton}>History</Button>*/}
            </Grid>
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
