// user-slice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userToken: null,
    userData: {},
    academicYear: '',
    currentYear: '',
    role: '',
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload.data;
      state.userToken = action.payload.token;
      state.academicYear = action.payload.academicYear;
      state.currentYear = action.payload.year || '';
      state.role = action.payload.data.role || 'Student';
    },
    removeUserData: (state, action) => {
      state.userData = {};
      state.userToken = null;
      state.academicYear = '';
      state.currentYear = null;
      state.role = '';
    },
  },
});

export const { setUserData, removeUserData } = userSlice.actions;

// export const selectUserData = (state) => state.user.userId;

export default userSlice.reducer;
