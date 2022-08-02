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
import { Grid, Box, Card, ImageList, ImageListItem } from "@material-ui/core";
import AddPic from "../components/AddPic";

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
    // alignItems: "center",
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    // marginRight: 100,
    marginTop: "2%",
    // marginLeft: "5%"
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
  var imageList = user.images;
  console.log(imageList);
  const navigate = useNavigate();
  var avatarAdd = "https://icons-for-free.com/download-icon-avatar-1320568024619304547_512.png"
  if (user != null) return (
    // <Container component="main" maxWidth="xs">
    <div className={classes.root}>
      <CssBaseline />
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12} md={6} className={classes.userProfile}>
          <Box display="flex"
            justifyContent="center">
            <Avatar className={classes.avatar} src={avatarAdd} />
          </Box>
          <Box display="flex"
            justifyContent="center">
            <Typography component="h1" variant="h7">
              {user.username}
            </Typography>
          </Box>
          <Box display="flex"
            justifyContent="center">
            <Typography component="h1" variant="h6">
              driving experience : {user.driving_experience}y
            </Typography>
          </Box>
          <Box display="flex"
            justifyContent="center">
            <Typography component="h1" variant="h6">
              {user.introduction}
            </Typography>
          </Box>
          <Box display="flex"
            justifyContent="center">
            <FormDialog />
            <AddPic />
          </Box>
          <Box display="flex"
            justifyContent="center">
            <ImageList rowHeight={160} className={classes.imageList} cols={3}>
            {imageList ? (imageList.map((item) => {
              return (
                <ImageListItem key={item.img} cols={item.cols || 1}>
                <img src={item} alt="car" />
                </ImageListItem>
              );
            })) : ""}
            </ImageList>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} >
          <UserHistory />
        </Grid>
      </Grid>
    </div>

    // </Container>
  )
  else return < Navigate to='/Login' />
}
