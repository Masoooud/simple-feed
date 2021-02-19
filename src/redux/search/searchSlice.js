import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    text: 'Corona',
    page: 1,
  },
  reducers: {
    setText: (state, action) => {
      state.searchText = action.payload;
    },
    setPage: (state, action) => {
      state.value = action.payload;
    },
    resetSearch: (state) => {
      return { ...state, searchText: '', page: 1 };
    },
  },
});

export const { setText, setPage, resetSearch } = searchSlice.actions;

export const selectText = (state) => state.search.searchText;
export const selectPage = (state) => state.search.page;

export default searchSlice.reducer;
