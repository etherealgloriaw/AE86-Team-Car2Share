import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { loginSuccessAsync, loginFailedAsync, signUpAsync} from './thunks';

const INITIAL_STATE = {
    list: [],
    getUsers: REQUEST_STATE.IDLE,
    addUser: REQUEST_STATE.IDLE,
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
          state.list = action.payload;
        })
        .addCase(loginSuccessAsync.rejected, (state, action) => {
          state.getUsers = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        // .addCase(loginFailedAsync.pending, (state) => {
        //   state.addCard = REQUEST_STATE.PENDING;
        //   state.error = null;
        // })
        // .addCase(loginFailedAsync.fulfilled, (state, action) => {
        //   state.addCard = REQUEST_STATE.FULFILLED;
        //   state.list.push(action.payload);
        // })
        // .addCase(loginFailedAsync.rejected, (state, action) => {
        //   state.addCard = REQUEST_STATE.REJECTED;
        //   state.error = action.error;
        // })
        // .addCase(signUpAsync.pending, (state) => {
        //   state.addCard = REQUEST_STATE.PENDING;
        //   state.error = null;
        // })
        // .addCase(signUpAsync.fulfilled, (state, action) => {
        //   state.addCard = REQUEST_STATE.FULFILLED;
        //   state.list.push(action.payload);
        // })
        // .addCase(signUpAsync.rejected, (state, action) => {
        //   state.addCard = REQUEST_STATE.REJECTED;
        //   state.error = action.error;
        // })

    }
  });

  export default authSlice.reducer;

