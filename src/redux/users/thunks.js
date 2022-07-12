import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import UserService from './services';

export const getHistoryAsync = createAsyncThunk(
  actionTypes.GET_HISTORY,
  async () =>{
    return await UserService.getHistory();
}
)

export const joinPostAsync = createAsyncThunk(
    actionTypes.JOIN_POST,
    async () =>{
        return await UserService.joinPost();
    }
  )

export const editProfileAsync = createAsyncThunk(
    actionTypes.EDIT_PROFILE,
    async () =>{
        return await UserService.editProfile();
    }
)










  