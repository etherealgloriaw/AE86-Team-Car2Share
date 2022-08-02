import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { loginSuccessAsync, loginFailedAsync, signUpAsync, editProfileAsync, rateUserAsync, uploadPhotoAsync} from './thunks';

const INITIAL_STATE = {
    rate: null,
    images: [],
    getUsers: REQUEST_STATE.IDLE,
    addUser: REQUEST_STATE.IDLE,
    editUser: REQUEST_STATE.IDLE,
    logOutUser: REQUEST_STATE.IDLE,
    rateUser: REQUEST_STATE.IDLE,
    uploadPhoto: REQUEST_STATE.IDLE,
    error: null
  };

  const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loginSuccessAsync.pending, (state) => {
          state.getUsers = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(loginSuccessAsync.fulfilled, (state, action) => {
          state.getUsers = REQUEST_STATE.FULFILLED;
          localStorage.setItem('profile', JSON.stringify(action.payload.result));
        })
        .addCase(loginSuccessAsync.rejected, (state, action) => {
          state.getUsers = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(editProfileAsync.pending, (state) => {
          state.editUser = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(editProfileAsync.fulfilled, (state, action) => {
          state.editUser = REQUEST_STATE.FULFILLED;
          // var result = {_id: action.payload._id, username: action.payload.username, introduction: action.payload.introduction}
          console.log(action.payload);
          localStorage.setItem('profile', JSON.stringify(action.payload));
        })
        .addCase(editProfileAsync.rejected, (state, action) => {
          state.editUser= REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(rateUserAsync.pending, (state) => {
          state.rateUser = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(rateUserAsync.fulfilled, (state, action) => {
          state.rateUser = REQUEST_STATE.FULFILLED;
          state.rate = action.payload;
        })
        .addCase(rateUserAsync.rejected, (state, action) => {
          state.rateUser = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(uploadPhotoAsync.pending, (state) => {
          state.uploadPhoto  = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(uploadPhotoAsync.fulfilled, (state, action) => {
          state.uploadPhoto = REQUEST_STATE.FULFILLED;
          localStorage.setItem('profile', JSON.stringify(action.payload[0]));
        })
        .addCase(uploadPhotoAsync.rejected, (state, action) => {
          state.uploadPhoto  = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })

    }
  });

  export default authSlice.reducer;

