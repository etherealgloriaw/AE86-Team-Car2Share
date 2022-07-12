import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { getHistoryAsync, joinPostAsync,editProfileAsync} from './thunks';


const INITIAL_STATE = {
    list: [],
    getUsers: REQUEST_STATE.IDLE,
    addUser: REQUEST_STATE.IDLE,
    error: null
  };

  const usersSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getHistoryAsync.pending, (state) => {
          state.getCards = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(getHistoryAsync.fulfilled, (state, action) => {
          state.getCards = REQUEST_STATE.FULFILLED;
          state.list = action.payload;
        })
        .addCase(getHistoryAsync.rejected, (state, action) => {
          state.getCards = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(joinPostAsync.pending, (state) => {
          state.addCard = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(joinPostAsync.fulfilled, (state, action) => {
          state.addCard = REQUEST_STATE.FULFILLED;
          state.list.push(action.payload);
        })
        .addCase(joinPostAsync.rejected, (state, action) => {
          state.addCard = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(editProfileAsync.pending, (state) => {
          state.deleteCard = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(editProfileAsync.fulfilled, (state, action) => {
          state.deleteCard = REQUEST_STATE.FULFILLED;
          state.list= action.payload;
        })
        .addCase(editProfileAsync.rejected, (state, action) => {
          state.deleteCard = REQUEST_STATE.REJECTED;
          state.error = action.error;
        });
       
    }
  });
  
  export default usersSlice.reducer;
  