import "./styles/Login.css"
import React, {useState} from 'react';
import {Link as Jump, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {loginSuccessAsync} from "../redux/auth/thunks";
import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://im.vsco.co/aws-us-west-2/0bc2b8/44033854/5c4e93d9c0a5ab2a01192d8b/vsco5c4e93db4d626.jpg?w=480)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type == 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

export default function Login() {
    const classes = useStyles();
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [openalert, setalertOpen] = React.useState(false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleAlertClose = () => {
        setalertOpen(false);
    };


    const emailChangeHandler = (e) => {
        setInputEmail(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setInputPassword(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault(); // to prevent the website reloading
        if (!isValidEmail(inputEmail)) {
            setalertOpen(true);
        } else {
            let form = {email: inputEmail, password: inputPassword};
            setInputEmail('');
            setInputPassword('');
            dispatch(loginSuccessAsync(form)).then((user) => {
                navigate('/Profile', {replace: false});
            });
        }
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={6} className={classes.image}/>
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={inputEmail}
                            onChange={emailChangeHandler}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={inputPassword}
                            onChange={passwordChangeHandler}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleLogin}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={Jump} to={"/SignUp"} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
            <Snackbar open={openalert} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="error" sx={{width: '100%'}}>
                    Your Login credential is invalid!
                </Alert>
            </Snackbar>
        </Grid>
    );
}


