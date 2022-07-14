import "./styles/Login.css"
import React, { useEffect } from 'react';
import { Link as Jump } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormDialog from "../components/Edit";
import { getHistoryAsync } from "../redux/users/thunks";


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



export default function Profile() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const posts = useSelector(state => state.posts.list);
  console.log("post is: " + posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHistoryAsync());
  }, []);

  const renderedPosts = posts.map((slice) => (
    <Grid item xs={12} md={12} key={Math.random()}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {slice.name}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={slice.name}
        starting_time={slice.startingTime}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          From: {slice.from}
          <div></div>
          To: {slice.to}
        </Typography>
      </CardContent>
    </Grid>
  ));

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h7">
          User Name
        </Typography>
        <Typography component="h1" variant="h6">
          User Introduction
        </Typography>
        <FormDialog />
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
            label={auth ? 'Passenger' : 'Driver'}
          />
        </FormGroup>
      </div>
      {renderedPosts}
    </Container>
  );
}
