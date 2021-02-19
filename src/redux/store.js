import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './search/searchSlice';
import articleReducer from './article/articleSlice';
import { createWrapper } from 'next-redux-wrapper';

const initStore = () => {
  return configureStore({
    reducer: {
      search: searchReducer,
      article: articleReducer,
    },
  });
};
export const wrapper = createWrapper(initStore);
