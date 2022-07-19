import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { loginSuccessAsync, loginFailedAsync, signUpAsync, editProfileAsync} from './thunks';

const INITIAL_STATE = {
    getUsers: REQUEST_STATE.IDLE,
    addUser: REQUEST_STATE.IDLE,
    editUser: REQUEST_STATE.IDLE,
    logOutUser: REQUEST_STATE.IDLE,
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
          state.list= action.payload;
        })
        .addCase(editProfileAsync.rejected, (state, action) => {
          state.editUser= REQUEST_STATE.REJECTED;
          state.error = action.error;
        });

    }
  });

  export default authSlice.reducer;

