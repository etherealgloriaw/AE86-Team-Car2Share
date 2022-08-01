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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DriveEtaTwoToneIcon from "@material-ui/icons/DriveEtaTwoTone";
import ListItemText from "@material-ui/core/ListItemText";
import TrackChangesTwoToneIcon from "@material-ui/icons/TrackChangesTwoTone";
import AccessAlarmTwoToneIcon from "@material-ui/icons/AccessAlarmTwoTone";
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',

  },
  root: {
      marginTop: '2%',
      marginLeft: '6%',
      marginRight: '6%',
    maxWidth: "100%",
    maxHeight: 350,
    marginBottom: '3%',
      backgroundColor: "#ECECEC",
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
    backgroundColor: "#336600",
  },
  fav: {
    '&:hover': {
      color: 'red',
    }
  },
    root2: {
        width: '100%',
        marginTop: "2%",
        marginBottom: 0,
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    cardHeader: {
        marginTop: "5%",
        maxHeight: 1,
        paddingLeft: "3.5%"
    },
    joinButton: {
        fontSize: 14,
        color: "white",
        backgroundColor: "#336600",
        marginTop: 0,
        marginRight: "5%",
        marginBottom: '5%',
        float: "right",
        maxHeight: 40,
        padding: '6px 12px',
            '&:hover': {
                backgroundColor: 'green',
            }
    },
        itemList: {
          paddingLeft: "4%",
            maxHeight: "20%",
        },
        item: {
            maxHeight: 55,
            marginBottom: 10,
        }
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
        if (slice.selected == null) {
            setRaised(false)
        } else if (slice.id == slice.selected) {
            // eslint-disable-next-line no-undef
            setRaised(true)
        }
    }, [slice.selected, slice.id])


  return (
    <Card className={classes.root} key={Math.random()} raised={raised} onMouseOver={handleHover} onMouseOut={handleOut}>
      <CardHeader className={classes.cardHeader}
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
                  secondary={slice.startingTime}
                />
                </ListItem>
            </List>
          </CardActionArea>
          <Tooltip title="Join the post">
              <div>
              <Button className={classes.joinButton} variant="contained" onClick={handleJoin}>Join</Button>
                  </div>
          </Tooltip>
      </CardContent>
      {/*<CardActions disableSpacing>*/}
      {/*  <Tooltip title="Join the post">*/}
      {/*    <IconButton aria-label="add to favorites" onClick={handleJoin}>*/}
      {/*      <FavoriteIcon className={classes.fav} />*/}
      {/*    </IconButton>*/}
      {/*  </Tooltip>*/}
      {/*</CardActions>*/}
    </Card>
  )


}
