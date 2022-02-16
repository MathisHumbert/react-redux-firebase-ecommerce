import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { openSidebar, closeSidebar } = productsSlice.actions;
export default productsSlice.reducer;
