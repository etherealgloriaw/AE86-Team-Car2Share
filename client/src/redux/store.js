import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts/reducer';
import usersReducer from './users/reducer';
import authReducer from './auth/reducer';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    auth: authReducer,
  },
  devTools: true
});
