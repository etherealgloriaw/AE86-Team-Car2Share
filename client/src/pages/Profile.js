import "./styles/Login.css"
import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom'
import UserHistory from "../components/UserHistory";
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import FormDialog from "../components/Edit";
import Button from '@material-ui/core/Button';

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

  const user = JSON.parse(localStorage.getItem('profile'));
  // const user = useSelector(state => state.auth.currUser);
  // console.log(user)
  const navigate = useNavigate();

  // const handleLogOut = () => {
  //   localStorage.clear();
  //   navigate("/", { replace: false });
  // };

  if (user != null) return <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h7">
        {user.username}
      </Typography>
      <Typography component="h1" variant="h6">
        {user.introduction}
      </Typography>
      <FormDialog />
      {/* <Button variant="outlined" color="primary" onClick = {handleLogOut}>
        Log Out
      </Button> */}
    </div>
    <UserHistory />
  </Container>
  else return < Navigate to='/Login' />
}
