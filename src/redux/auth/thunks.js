import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import AuthService from './services';

export const loginSuccessAsync = createAsyncThunk(
    actionTypes.LOGIN_SUC,
    async (email) =>{
        return await AuthService.loginSuccess(email);
    }
)

export const loginFailedAsync = createAsyncThunk(
    actionTypes.LOGIN_FAILED,
    async () =>{
        return await AuthService.loginFailed();
    }
)

export const signUpAsync = createAsyncThunk(
    actionTypes.LOGIN_FAILED,
    async () =>{
        return await AuthService.signUp();
    }
)

export const editProfileAsync = createAsyncThunk(
    actionTypes.EDIT_PROFILE,
    async (edited) =>{
        return await AuthService.editProfile(edited);
    }
)