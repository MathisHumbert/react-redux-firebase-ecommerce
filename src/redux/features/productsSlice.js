import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const products_url = 'https://course-api.com/react-store-products';
const single_product_url = `https://course-api.com/react-store-single-product?id=`;

const initialState = {
  products: [],
  featuredProducts: [],
  product: [],
  isProductsLoading: false,
  isProductsError: false,
  isProductsSuccess: false,
  isProductLoading: false,
  isProductError: false,
  isSidebarOpen: false,
};

export const getProducts = createAsyncThunk('products/getAll', async () => {
  try {
    const { data } = await axios(products_url);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getProduct = createAsyncThunk('products/get', async (id) => {
  try {
    const { data } = await axios(`${single_product_url}${id}`);
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
      state.isProductsLoading = true;
      state.isProductsError = false;
      state.isProductsSuccess = false;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isProductsLoading = false;
      state.isProductsSuccess = true;
      state.products = action.payload;
      state.featuredProducts = action.payload.filter(
        (product) => product.featured === true
      );
    },
    [getProducts.rejected]: (state) => {
      state.isProductsLoading = false;
      state.isProductsError = true;
      state.products = [];
      state.featuredProducts = [];
    },
    [getProduct.pending]: (state) => {
      state.isProductLoading = true;
      state.isProductError = false;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.isProductLoading = false;
      state.product = action.payload;
    },
    [getProduct.rejected]: (state) => {
      state.isProductLoading = false;
      state.isProductError = true;
      state.product = [];
    },
  },
});

export const { openSidebar, closeSidebar } = productsSlice.actions;
export default productsSlice.reducer;
