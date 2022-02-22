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
  },
});

export const { openLogin, closeLoggin, setUser } = userSlice.actions;
export default userSlice.reducer;
