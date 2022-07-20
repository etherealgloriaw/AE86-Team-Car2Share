import "./styles/Login.css"
import React, {useState} from 'react';
import { Link as Jump, useNavigate } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signUpAsync } from "../redux/auth/thunks";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignUp() {
  const classes = useStyles();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    setInputEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setInputPassword(e.target.value);
  };

  const usernameChangeHandler = (e) => {
    setInputUsername(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault(); // to prevent the website reloading
    let form = {email: inputEmail, password: inputPassword, username: inputUsername};
    setInputUsername('');
    setInputEmail('');
    setInputPassword('');
    dispatch(signUpAsync(form)).then(() => {navigate("/Profile", { replace: false });});
    // navigate("/Profile", { replace: false });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            label="username"
            type="username"
            id="username"
            autoComplete="username"
            value={inputUsername}
            onChange = {usernameChangeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={inputEmail}
            onChange = {emailChangeHandler}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={inputPassword}
            onChange = {passwordChangeHandler}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {handleSignUp}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}