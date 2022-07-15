import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import UserService from './services';

export const getHistoryAsync = createAsyncThunk(
  actionTypes.GET_HISTORY,
  async (name) =>{
    return await UserService.getHistory(name);
}
)

export const joinPostAsync = createAsyncThunk(
    actionTypes.JOIN_POST,
    async (post) =>{
        return await UserService.joinHistory(post);
    }
  )

export const editProfileAsync = createAsyncThunk(
    actionTypes.EDIT_PROFILE,
    async () =>{
        return await UserService.editProfile();
    }
)










  