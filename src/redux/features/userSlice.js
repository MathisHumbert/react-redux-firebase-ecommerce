import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  userLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducer: {},
});

export default userSlice.reducer;
