import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { getHistoryAsync, joinPostAsync, getDriverHistoryAsync, cancelPostAsync} from './thunks';


const INITIAL_STATE = {
    list: [],
    getUsers: REQUEST_STATE.IDLE,
    addUser: REQUEST_STATE.IDLE,
    getDrivers: REQUEST_STATE.IDLE,
    cancelPost: REQUEST_STATE.IDLE,
    error: null
  };

  const usersSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getHistoryAsync.pending, (state) => {
          state.getUsers = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(getHistoryAsync.fulfilled, (state, action) => {
          state.getUsers = REQUEST_STATE.FULFILLED;
          state.list = action.payload;
        })
        .addCase(getHistoryAsync.rejected, (state, action) => {
          state.getUsers = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(joinPostAsync.pending, (state) => {
          state.addUser = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(joinPostAsync.fulfilled, (state, action) => {
          state.addUser = REQUEST_STATE.FULFILLED;
          state.list.push(action.payload);
        })
        .addCase(joinPostAsync.rejected, (state, action) => {
          state.addUser = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(getDriverHistoryAsync.pending, (state) => {
          state.getDrivers = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(getDriverHistoryAsync.fulfilled, (state, action) => {
          state.getDrivers = REQUEST_STATE.FULFILLED;
          state.list = action.payload;
        })
        .addCase(getDriverHistoryAsync.rejected, (state, action) => {
          state.getDrivers = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
          .addCase(cancelPostAsync.pending, (state) => {
            state.getDrivers = REQUEST_STATE.PENDING;
            state.error = null;
          })
          .addCase(cancelPostAsync.fulfilled, (state, action) => {
            state.getDrivers = REQUEST_STATE.FULFILLED;
            state.list = action.payload;
          })
          .addCase(cancelPostAsync.rejected, (state, action) => {
            state.getDrivers = REQUEST_STATE.REJECTED;
            state.error = action.error;
          })


    }
  });

  export default usersSlice.reducer;
