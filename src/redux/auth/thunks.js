import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import AuthService from './services';

export const loginSuccessAsync = createAsyncThunk(
    actionTypes.LOGIN_SUC,
    async () =>{
        return await AuthService.loginSuccess();
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