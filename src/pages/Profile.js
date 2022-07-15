import "./styles/Login.css"
import React from 'react';
// import { Link as Jump } from "react-router-dom";
import { Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import UserHistory from "../components/UserHistory";
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import FormDialog from "../components/Edit";

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
  const [status, setStatus] = React.useState(true);
  const handleChange = (event) => {
    setStatus(event.target.checked);
  };
  const user = useSelector(state => state.auth.list);

  if (user.length > 0) return <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h7">
        {user[0].username}
      </Typography>
      <Typography component="h1" variant="h6">
        {user[0].introduction}
      </Typography>
      <FormDialog />
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={status} onChange={handleChange} aria-label="login switch" />}
          label={status ? 'Passenger' : 'Driver'}
        />
      </FormGroup>
    </div>
    {<UserHistory props={user[0]} />}
  </Container>
  else return < Navigate to='/Login' />
}
