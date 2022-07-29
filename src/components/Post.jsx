import React, {useEffect} from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {CardActionArea, Tooltip} from "@material-ui/core";
import { joinPostAsync } from "../redux/users/thunks";

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
  const [raised, setRaised] = React.useState(false)

  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleJoin = () => {
    dispatch(
      joinPostAsync({
        id: slice.id,
        user: user._id
      })
    )
    navigate("/Profile/" + user._id, { replace: false });
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

  // console.log(profile)

  return (
    <Card className={classes.root} key={Math.random()} raised={raised} onMouseOver={handleHover} onMouseOut={handleOut}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} >
            {slice.name.username}
          </Avatar>
        }
        title={slice.name.username}
        starting_time={slice.startingTime}
      />
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
          <IconButton aria-label="add to favorites" onClick={handleJoin}>
            <FavoriteIcon className={classes.fav} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )


}
