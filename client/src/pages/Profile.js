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
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    // margin: theme.spacing(3),

    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(20),
    height: theme.spacing(20),
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
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  userProfile: {
    textAlign: "center",
    backgroundColor: "#ECECEC",
    alignItems: "center",
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    marginRight: 100,
    marginTop: "2%",
    marginLeft: "2%"
  },
  introduction: {
    textAlign: "center",
    marginBottom: 10,
  },
  carImage: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  userHistory: {
    marginTop: 0
  }
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

  if (user != null) return (
    // <Container component="main" maxWidth="xs">
    <div className={classes.root}>
      <CssBaseline />
      <Grid container direction="row" spacing={3} alignItems="center"  justify="flex-start">
        <Grid  item
                 className={classes.userProfile} xs={5} justify="center"
               container item spacing={4}
        direction="column">
          <Grid item >
            <Avatar className={classes.avatar} src="https://i.ytimg.com/vi/Q_doqjFGL-Q/maxresdefault.jpg">
              {/*<LockOutlinedIcon />*/}
            </Avatar>
          </Grid>
          <Grid >
          <Typography className={classes.introduction} component="h1" variant="h7">
            {user.username}
          </Typography>
          <Typography className={classes.introduction} component="h1" variant="h6">
            {user.introduction}
          </Typography>
            <FormDialog className={classes.introduction} />
            <Typography className={classes.introduction} component="h1" variant="h6">
              Car: Lamborghini Urus
            </Typography>
            <img className={classes.introduction} className={classes.carImage} src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/models_gw/hero-banner/2022/04_12/gate_models_og_01.jpg" alt="car" />
          </Grid>
        </Grid>
        <Grid item xs={5} alignItems="end" className="userHistory">
            <UserHistory />
        </Grid>
      </Grid>
    </div>

    // </Container>
  )
  else return < Navigate to='/Login' />
}
