import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
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
      console.log(id);
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
  },
});

export const { addItemToCart, toggleCartInfo } = cartSlice.actions;
export default cartSlice.reducer;
