import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts/reducer';

export const store = configureStore({
  reducer: {
    posts: postsReducer
  },
  devTools: true
});
