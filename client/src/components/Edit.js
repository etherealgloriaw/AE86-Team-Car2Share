import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch} from 'react-redux'
import {editProfileAsync} from "../redux/auth/thunks";
export default function FormDialog() {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState(user.username)
  const [introduction, setIntroduction] = useState(user.introduction)
  const [avatarAddress, setAvatarAddress] = useState(user.avatar_address)
  const [drivingEx, setdrivingEx] = useState(user.driving_experience)
  const dispatch = useDispatch();
  
  console.log(user)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = e => {
    if (e.target.id == 'name') {
        setName(e.target.value);
    } else if (e.target.id == "intro") {
        setIntroduction(e.target.value);
    } else if (e.target.id == "avatar") {
      setAvatarAddress(e.target.value);
    } else if (e.target.id == "de") {
      setdrivingEx(e.target.value);
    }
}

  const handleSubmit = () => {
    if (name > 25 || isNaN(drivingEx)) {
        alert('Input is invalid, please make sure username is below 25 characters and driving experience is a number')
    } else {
      var form = {id: user._id, username: name, introduction: introduction, avatar: avatarAddress, drivingEx: drivingEx}
      console.log(form)
      dispatch(
        editProfileAsync(form)
      )
      setOpen(false);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            type="string"
            value={name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="intro"
            label="User Introduction"
            type="string"
            value={introduction}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="avatar"
            label="Avatar Address"
            type="string"
            value={avatarAddress}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="de"
            label="Driving Experience"
            type="string"
            value={drivingEx}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}