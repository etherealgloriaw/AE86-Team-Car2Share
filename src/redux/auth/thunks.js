import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import AuthService from './services';

export const loginSuccessAsync = createAsyncThunk(
    actionTypes.LOG_IN,
    async (email) =>{
        return await AuthService.loginIn(email);
    }
)

export const signUpAsync = createAsyncThunk(
    actionTypes.SIGN_UP,
    async (form) =>{
        return await AuthService.signUp(form);
    }
)

export const editProfileAsync = createAsyncThunk(
    actionTypes.EDIT_PROFILE,
    async (edited) =>{
        return await AuthService.editProfile(edited);
    }
)