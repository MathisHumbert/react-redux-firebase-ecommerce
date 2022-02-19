import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import filterReducer from '../features/filterSlice';
import cartReducer from '../features/cartSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
    cart: cartReducer,
  },
});

export default store;
