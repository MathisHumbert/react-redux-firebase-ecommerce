import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  userLoggedIn: false,
  isLogginOpen: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducer: {
    openLoggin: (state) => {
      state.isLogginOpen = true;
    },
    closeLoggin: (state) => {
      state.isLogginOpen = false;
    },
  },
});

export const { openLoggin, closeLoggin } = userSlice.actions;
export default userSlice.reducer;
