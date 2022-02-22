import { createSlice } from '@reduxjs/toolkit';

const localCart = JSON.parse(localStorage.getItem('cart')) || [];

const initialState = {
  cart: localCart,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const { total, cartItem } = action.payload;
      const { id } = action.payload.cartItem;
      let itemAlreadyInTheCart = false;

      state.cart.forEach((item) => {
        if (item.id === id) {
          itemAlreadyInTheCart = true;
        }
      });

      if (itemAlreadyInTheCart) {
        state.cart.map((item) => {
          if (item.id === id) {
            item.total += total;
          }
        });
      } else {
        state.cart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    toggleCartInfo: (state) => {
      const { amount, total } = state.cart.reduce(
        (acc, curr) => {
          acc.total += curr.total;
          acc.amount += curr.total * curr.price;
          return acc;
        },
        { amount: 0, total: 0 }
      );
      state.amount = amount;
      state.total = total;
    },
    toggleCartTotal: (state, action) => {
      const { id, type } = action.payload;

      state.cart.map((item) => {
        if (item.id === id) {
          if (type === 'inc') {
            item.total += 1;
          } else {
            item.total -= 1;
          }
        }
      });

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    deleteItemFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const {
  addItemToCart,
  toggleCartInfo,
  toggleCartTotal,
  deleteItemFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
