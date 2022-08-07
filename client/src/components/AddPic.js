import { uploadPhotoAsync } from "../redux/auth/thunks";
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux'

export default function AddPic() {
    const [open, setOpen] = React.useState(false);
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
        var form = {id: user._id, images: arr}
        console.log(form)
        dispatch(
            uploadPhotoAsync(form)
        )
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Upload Memories
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new images to profile</DialogTitle>
                <DialogContent>
                    {arr.map((item, i) => {
                        return (
                            <div>
                                <TextField
                                label="Photo Address"
                                onChange={handleChange}
                                value={item.value}
                                id={i}
                                type={item.type}
                                fullWidth
                            />
                            </div>
                            
                        );
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={addInput}>Add Another</Button >
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