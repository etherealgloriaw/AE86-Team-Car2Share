import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from "react-router-dom";
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import HomeIcon from '@material-ui/icons/Home';
// import Login from './GoogleLogin';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    position: 'relative',
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    fontFamily: 'BlinkMacSystemFont',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionMobile: {
    display: 'flex',
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const user = JSON.parse(localStorage.getItem('profile'));
  var profileURL = '/Profile/';
  if (user != null) profileURL = '/Profile/' + user._id;
  else profileURL = '/Login'
  
  // const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
  };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
    >
      <MenuItem component={Link} to='/' onClick={handleProfileMenuOpen}>
        <IconButton color="inherit" >
          <Badge badgeContent={0} color="secondary">
            <HomeIcon />
          </Badge>
        </IconButton>
        <p>Home</p>
      </MenuItem>
      {/* <MenuItem component={Link} to='/Current' onClick={handleProfileMenuOpen}>
        <IconButton color="inherit" >
          <Badge badgeContent={0} color="secondary">
            <EmojiPeopleIcon />
          </Badge>
        </IconButton>
        <p>Current Travel</p>
      </MenuItem> */}
      <MenuItem component={Link} to={profileURL} onClick={handleProfileMenuOpen}>
        <IconButton color="inherit">
          <Badge badgeContent={0} color="secondary">
            <DashboardIcon />
          </Badge>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem component={Link} to='/Login' onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Login</p>
      </MenuItem>
      <MenuItem component={Link} to='/Add' onClick={handleProfileMenuOpen}>
        <IconButton color="inherit">
          <Badge badgeContent={0} color="secondary">
            <DriveEtaIcon />
          </Badge>
        </IconButton>
        <p>Add a new post</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            component={Link} to='/'
          >
            <DirectionsCarIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Car2Share
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}