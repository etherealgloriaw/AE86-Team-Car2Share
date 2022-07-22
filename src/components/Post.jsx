import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import {CardActionArea, Tooltip} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import { joinPostAsync } from "../redux/users/thunks";
import {deletePostAsync} from "../redux/posts/thunks";
// import 'reactjs-popup/dist/index.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    maxWidth: 520,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  active: {
    color: "red"
  },
  inactive: {
    color: "gray"
  },
  avatar: {
    backgroundColor: "#0d47a1",
  },
  fav: {
    '&:hover': {
      color: 'red',
    }
  },
}
));

export const Post = (slice) => {
  const classes = useStyles();
  let navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [active, setActive] = React.useState(slice.active);
  const [raised, setRaised] = React.useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleJoin = () => {
    dispatch(
      joinPostAsync({
        id: slice.id,
        user: user._id
      })
    )
    navigate("/Profile", { replace: false });
  }

  const handleDelete = () => {
    // console.log(user)
    if (user.length == 0) {
      alert("Please login")
    } else if (user._id == slice.name._id) {
      dispatch(
          deletePostAsync(slice.id)
      )
    } else {
      alert("No permission to delete this post.")
    }


    // navigate("/Profile", { replace: true });
  }

  const handleEdit = () => {
    // console.log(user)
    if (user.length == 0) {
      alert("Please login")
    } else if (user._id == slice.name._id) {
      navigate(`/Edit/${slice.id}`, { replace: false })
    } else {
      alert("No permission to edit this post.")
    }

    // navigate("/Profile", { replace: true });
  }

    const handleClick = () => {
      slice.setPopup(slice.id)
    }

    const handleHover = () => {
        setRaised(true)
        slice.setSelected(slice.id)
    }

    const handleOut = () => {
      setRaised(false)
        slice.setSelected(null)
    }

    useEffect(() => {
        if (slice.selected === null) {
            setRaised(false)
        } else if (slice.id === slice.selected) {
            // eslint-disable-next-line no-undef
            setRaised(true)
        }
    }, [slice.selected, slice.id])

  return (
    <Card className={classes.root} key={Math.random()} raised={raised} onMouseOver={handleHover} onMouseOut={handleOut}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} component={Link} to='/Profile'>
            {slice.name.username}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={slice.name.username}
        starting_time={slice.startingTime}
      />
      {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        /> */}
      <CardContent>
          <CardActionArea onClick={handleClick}>
        <Typography paragraph color="textSecondary" component="p">
          <span style={{fontWeight: 'bold'}}>From: </span>{slice.from}
        </Typography>
        <Typography paragraph color="textSecondary" component="p">
          <span style={{fontWeight: 'bold'}}>To: </span>{slice.to}
        </Typography>
          <Typography paragraph color="textSecondary" component="p">
            <span style={{fontWeight: 'bold'}}>Departure time: </span>{slice.startingTime}
          </Typography>
          </CardActionArea>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Join the post">
          <IconButton aria-label="add to favorites" onClick={handleJoin}
            className={clsx({
              [classes.active]: active,
            })}>
            <FavoriteIcon className={classes.fav} />
          </IconButton>
        </Tooltip>
        <IconButton aria-label="share" onClick={handleDelete}>
          <DeleteIcon />

        </IconButton>
        <IconButton aria-label="share" onClick={handleEdit} >
          <EditIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Contact: {slice.contactInfo}</Typography>
          <Typography paragraph>Rating: {slice.rating}</Typography>
          <Typography paragraph>Available seats: {slice.availableSeats}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )


}
