import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: '',
    email: '',
    id: '',
  },
  userLoggedIn: false,
  isLoginOpen: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    openLogin: (state) => {
      state.isLoginOpen = true;
    },
    closeLoggin: (state) => {
      state.isLoginOpen = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.userLoggedIn = true;
    },
    resetUser: (state) => {
      state.userLoggedIn = false;
      state.user = {
        name: '',
        email: '',
        id: '',
      };
    },
  },
});

export const { openLogin, closeLoggin, setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;

// login
// logout
// persist user
// private route for checkout
// show checkout link in nav and sidebar if user is logged in
