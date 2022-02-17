import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allProducts: [],
  filteredProducts: [],
  isFilteredProductSuccess: false,
  gridView: false,
  sort: 'price-lowest',
  filters: {
    search: '',
    category: 'all',
    company: 'all',
    color: 'all',
    price: 309999,
    shipping: false,
  },
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
      if (action.payload === 'name-a') {
        state.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (action.payload === 'name-z') {
        state.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      }
    },
    updateFilters: (state, action) => {
      const { name, value } = action.payload;
      state.filters[name] = value;
    },
  },
});

export const { toggleGridView, updateSort, setProducts, updateFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
