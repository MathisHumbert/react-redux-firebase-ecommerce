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
    filterProducts: (state) => {
      let tempFilteredProducts = state.allProducts;

      const { search, category, company, color, price, shipping } =
        state.filters;

      // SEARCH
      if (search) {
        tempFilteredProducts = tempFilteredProducts.filter(
          (item) => item.name.includes(search) === true
        );
      }

      // CATEGORY
      if (category !== 'all') {
        tempFilteredProducts = tempFilteredProducts.filter(
          (item) => item.category === category
        );
      }

      // COMPANY
      if (company !== 'all') {
        tempFilteredProducts = tempFilteredProducts.filter(
          (item) => item.company === company
        );
      }

      // COLOR
      if (color !== 'all') {
        tempFilteredProducts = tempFilteredProducts.filter(
          (item) => item.colors.includes(color) === true
        );
      }

      // PRICE
      tempFilteredProducts = tempFilteredProducts.filter(
        (item) =>
          // eslint-disable-next-line
          Number(item.price) <= price === true
      );

      // SHIPPING
      if (shipping === true) {
        tempFilteredProducts = tempFilteredProducts.filter(
          (item) => item.shipping === true
        );
      }

      // SORT
      if (state.sort === 'price-lowest') {
        tempFilteredProducts = tempFilteredProducts.sort(
          (a, b) => a.price - b.price
        );
      }
      if (state.sort === 'price-highest') {
        tempFilteredProducts = tempFilteredProducts.sort(
          (a, b) => b.price - a.price
        );
      }
      if (state.sort === 'name-a') {
        tempFilteredProducts = tempFilteredProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (state.sort === 'name-z') {
        tempFilteredProducts = tempFilteredProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }

      state.filteredProducts = tempFilteredProducts;
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: 'all',
        company: 'all',
        color: 'all',
        price: 309999,
        shipping: false,
      };
    },
  },
});

export const {
  toggleGridView,
  updateSort,
  setProducts,
  updateFilters,
  filterProducts,
  clearFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
