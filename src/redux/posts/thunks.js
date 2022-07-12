import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import PostService from './services';

export const getPostAsync = createAsyncThunk(
  actionTypes.GET_POST,
  async () =>{
      return await PostService.getPost();
  }
)

export const addPostAsync = createAsyncThunk(
    actionTypes.ADD_POST,
    async (newPost) => {
      return await PostService.addCard(newPost);
    }
  );

export const deletePostAsync = createAsyncThunk(
  actionTypes.DELETE_POST,
  async(id) => {
    return await PostService.deletePost(id);
  }
);

export const searchPostAsync = createAsyncThunk(
  actionTypes.SEARCH_POST,
  async (dest) => {
      return await PostService.searchPost(dest)
  }
)


export const editPostAsync = createAsyncThunk(
  actionTypes.EDIT_POST,
  async (id, edited) => {
      return await PostService.editPost(id, edited)
  }
)








  