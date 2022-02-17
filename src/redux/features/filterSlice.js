import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gridView: false,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleGridView: (state) => {
      state.gridView = !state.gridView;
    },
  },
});

export const { toggleGridView } = filterSlice.actions;
export default filterSlice.reducer;
