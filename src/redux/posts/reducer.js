import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { addPostAsync, getPostAsync,deletePostAsync, searchPostAsync, editPostAsync, joinPostAsync } from './thunks';


const INITIAL_STATE = {
    list: [],
    getPosts: REQUEST_STATE.IDLE,
    addPost: REQUEST_STATE.IDLE,
    deletePost:REQUEST_STATE.IDLE,
    findPost:REQUEST_STATE.IDLE,
    joinPost: REQUEST_STATE.IDLE,
    editPost: REQUEST_STATE.IDLE,
    error: null
  };

const postsSlice = createSlice({
    name: 'posts',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getPostAsync.pending, (state) => {
          state.getPosts = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(getPostAsync.fulfilled, (state, action) => {
          state.getPosts = REQUEST_STATE.FULFILLED;
          state.list = action.payload;

        })
        .addCase(getPostAsync.rejected, (state, action) => {
          state.getPosts = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(addPostAsync.pending, (state) => {
          state.addPost = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(addPostAsync.fulfilled, (state, action) => {
          state.addPost = REQUEST_STATE.FULFILLED;
          state.list.push(action.payload);
        })
        .addCase(addPostAsync.rejected, (state, action) => {
          state.addPost = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(deletePostAsync.pending, (state) => {
          state.deletePost = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(deletePostAsync.fulfilled, (state, action) => {
          state.deletePost = REQUEST_STATE.FULFILLED;
          state.list= action.payload;
        })
        .addCase(deletePostAsync.rejected, (state, action) => {
          state.deletePost = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(searchPostAsync.pending, (state) => {
          state.findPost = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(searchPostAsync.fulfilled, (state, action) => {
          state.findPost = REQUEST_STATE.FULFILLED;
          state.list= action.payload;
        })
        .addCase(searchPostAsync.rejected, (state, action) => {
          state.findPost = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(editPostAsync.pending, (state) => {
          state.editPost = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(editPostAsync.fulfilled, (state, action) => {
          state.editPost = REQUEST_STATE.FULFILLED;
            state.list.push(action.payload);
        })
        .addCase(editPostAsync.rejected, (state, action) => {
          state.editPost = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
          .addCase(joinPostAsync.pending, (state) => {
            state.joinPost = REQUEST_STATE.PENDING;
            state.error = null;
          })
          .addCase(joinPostAsync.fulfilled, (state, action) => {
            state.joinPost = REQUEST_STATE.FULFILLED;
            state.list= action.payload;
          })
          .addCase(joinPostAsync.rejected, (state, action) => {
            state.joinPost = REQUEST_STATE.REJECTED;
            state.error = action.error;
          });
    }
  });

export default postsSlice.reducer;
