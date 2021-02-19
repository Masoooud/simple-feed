import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './search/searchSlice';
import { createWrapper } from 'next-redux-wrapper';

const initStore = () => {
  return configureStore({
    reducer: {
      search: searchReducer,
    },
  });
};
export const wrapper = createWrapper(initStore);
