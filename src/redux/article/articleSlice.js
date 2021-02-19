import { createSlice } from '@reduxjs/toolkit';

export const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: null,
  },
  reducers: {
    setArticle: (state, action) => {
      state.article = { ...action.payload };
    },

    resetArticle: (state) => {
      return { ...state, article: null };
    },
  },
});

export const { setArticle, resetArticle } = articleSlice.actions;

export const selectArticle = (state) => state.article.article;

export default articleSlice.reducer;
