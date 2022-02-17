import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://course-api.com/react-store-products';

const initialState = {
  products: [],
  featuredProducts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isSidebarOpen: false,
};

export const getProducts = createAsyncThunk('products/getAll', async () => {
  try {
    // GET URL
    const { data } = await axios(url);
    return data;
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
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload;
      state.featuredProducts = action.payload.filter(
        (product) => product.featured === true
      );
    },
    [getProducts.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      state.products = [];
      state.featuredProducts = [];
    },
  },
});

export const { openSidebar, closeSidebar } = productsSlice.actions;
export default productsSlice.reducer;
