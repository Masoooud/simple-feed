import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    text: 'Corona',
    page: 1,
  },
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetSearch: (state) => {
      return { ...state, searchText: '', page: 1 };
    },
  },
});

export const { setText, setPage, resetSearch } = searchSlice.actions;

export const selectText = (state) => state.search.text;
export const selectPage = (state) => state.search.page;

export default searchSlice.reducer;
