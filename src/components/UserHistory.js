import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Grid, List } from "@material-ui/core";
import './style/posts.css'
import {getHistoryAsync} from "../redux/users/thunks";
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

export const UserHistory = (props) => {
    const classes = useStyles();
    const posts = useSelector(state => state.users.list)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getHistoryAsync(props.props._id));
    }, []);

    console.log(posts)
    
    const renderedPosts = posts.map((slice) => (
        <Grid item xs={12} md={12} key={Math.random()}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {slice.driver.username}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          
          title={slice.driver.username}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            From: {slice.from}
            <div></div>
            To: {slice.to}
          </Typography>
          <Typography variant="body2" color="textSecondary" align = "right" component="p">
          Departure time: {slice.startingTime}
        </Typography>
        </CardContent>
      </Grid>
    ))

    return (
        <section className="posts">
            <List style={{maxHeight: '250%', overflow: 'auto'}}>
            {/* <Grid sx={{ overflowY: "scroll", maxHeight: "250px" }}, container spacing={2}> */}
                {renderedPosts}
            {/* </Grid> */}
            </List>
        </section>
    )
}


export default UserHistory;
