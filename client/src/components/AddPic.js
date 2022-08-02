import { uploadPhotoAsync } from "../redux/auth/thunks";
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux'
import { editProfileAsync } from "../redux/auth/thunks";
export default function AddPic() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState('')
    const [introduction, setIntroduction] = useState('')
    const [avatarAddress, setAvatarAddress] = useState('')
    const [drivingEx, setdrivingEx] = useState('')
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const inputArr = [
        {
            type: "text",
            id: 1,
            value: ""
        }
    ];
    const [arr, setArr] = useState(inputArr);
    const addInput = () => {
        setArr(s => {
            return [
                ...s,
                {
                    type: "text",
                    value: ""
                }
            ];
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = e => {
        e.preventDefault();
        const index = e.target.id;
        setArr(s => {
            const newArr = s.slice();
            newArr[index].value = e.target.value;
            return newArr;
        });
    }

    const handleSubmit = () => {
        var form = { id: user._id, username: name, introduction: introduction, avatar: avatarAddress, drivingEx: drivingEx }
        console.log(form)
        dispatch(
            uploadPhotoAsync(form)
        )
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Upload Images
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new images to profile</DialogTitle>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={addInput}>Add Another</Button >
                    {arr.map((item, i) => {
                        return (
                            <div>
                                <TextField
                                onChange={handleChange}
                                value={item.value}
                                id={i}
                                type={item.type}
                                size="40"
                            />
                            </div>
                            
                        );
                    })}
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