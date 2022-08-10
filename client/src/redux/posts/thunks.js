import {createAsyncThunk} from '@reduxjs/toolkit';
import {actionTypes} from './actionTypes';
import PostService from './services';

export const getPostAsync = createAsyncThunk(
    actionTypes.GET_POST,
    async () => {
        return await PostService.getPosts();
    }
)

export const addPostAsync = createAsyncThunk(
    actionTypes.ADD_POST,
    async (newPost) => {
        return await PostService.addPost(newPost);
    }
);

export const deletePostAsync = createAsyncThunk(
    actionTypes.DELETE_POST,
    async (id) => {
        return await PostService.deletePost(id);
    }
);

export const searchPostAsync = createAsyncThunk(
    actionTypes.SEARCH_POST,
    async (searchReq) => {
        return await PostService.searchPost(searchReq)
    }
)


export const finishPostAsync = createAsyncThunk(
    actionTypes.FINISH_POST,
    async (id) => {
        console.log(id)
        return await PostService.finishPost(id);
    }
)

export const editPostAsync = createAsyncThunk(
    actionTypes.EDIT_POST,
    async (edited) => {
        return await PostService.editPost(edited)
    }
)


export const joinPostAsync = createAsyncThunk(
    actionTypes.JOIN_POST,
    async (id, edited) => {
        return await PostService.joinPost(id, edited)
    }
)









