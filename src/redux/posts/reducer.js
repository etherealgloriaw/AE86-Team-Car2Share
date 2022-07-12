import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { addPostAsync, getPostAsync,deletePostAsync, searchPostAsync, editPostAsync } from './thunks';


const INITIAL_STATE = {
    list: [],
    getUsers: REQUEST_STATE.IDLE,
    addUser: REQUEST_STATE.IDLE,
    error: null
  };

  const postsSlice = createSlice({
    name: 'posts',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getPostAsync.pending, (state) => {
          state.getCards = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(getPostAsync.fulfilled, (state, action) => {
          state.getCards = REQUEST_STATE.FULFILLED;
          state.list = action.payload;
        })
        .addCase(getPostAsync.rejected, (state, action) => {
          state.getCards = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(addPostAsync.pending, (state) => {
          state.addCard = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(addPostAsync.fulfilled, (state, action) => {
          state.addCard = REQUEST_STATE.FULFILLED;
          state.list.push(action.payload);
        })
        .addCase(addPostAsync.rejected, (state, action) => {
          state.addCard = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(deletePostAsync.pending, (state) => {
          state.deleteCard = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(deletePostAsync.fulfilled, (state, action) => {
          state.deleteCard = REQUEST_STATE.FULFILLED;
          state.list= action.payload;
        })
        .addCase(deletePostAsync.rejected, (state, action) => {
          state.deleteCard = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(searchPostAsync.pending, (state) => {
          state.editCard = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(searchPostAsync.fulfilled, (state, action) => {
          state.editCard = REQUEST_STATE.FULFILLED;
          state.list= action.payload;
        })
        .addCase(searchPostAsync.rejected, (state, action) => {
          state.editCard = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(editPostAsync.pending, (state) => {
          state.editCard = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(editPostAsync.fulfilled, (state, action) => {
          state.editCard = REQUEST_STATE.FULFILLED;
          state.list= action.payload;
        })
        .addCase(editPostAsync.rejected, (state, action) => {
          state.editCard = REQUEST_STATE.REJECTED;
          state.error = action.error;
        });
    }
  });
  
  export default postsSlice.reducer;
  