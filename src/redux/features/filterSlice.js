import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allProducts: [],
  filteredProducts: [],
  isFilteredProductSuccess: false,
  gridView: false,
  sort: 'price-lowest',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.isFilteredProductSuccess = true;
      state.allProducts = action.payload;
      state.filteredProducts = action.payload;
    },
    toggleGridView: (state) => {
      state.gridView = !state.gridView;
    },
    updateSort: (state, action) => {
      state.sort = action.payload;

      if (action.payload === 'price-lowest') {
        state.filteredProducts.sort((a, b) => a.price - b.price);
      }
      if (action.payload === 'price-highest') {
        state.filteredProducts.sort((a, b) => b.price - a.price);
      }
    },
  },
});

export const { toggleGridView, updateSort, setProducts } = filterSlice.actions;
export default filterSlice.reducer;
