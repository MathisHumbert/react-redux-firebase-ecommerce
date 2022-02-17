import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import filterReducer from '../features/filterSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
  },
});

export default store;
