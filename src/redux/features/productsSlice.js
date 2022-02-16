import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = '';

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  isSidebarOpen: false,
};

export const getProducts = createAsyncThunk('products/getAll', async () => {
  try {
    // GET URL
    const { data } = await axios(url);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

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
