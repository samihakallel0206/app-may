import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    type: 'success', // success, error, warning
    show: false
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || 'success';
      state.show = true;
    },
    clearNotification: (state) => {
      state.show = false;
      state.message = '';
    },
    showSuccess: (state, action) => {
      state.message = action.payload;
      state.type = 'success';
      state.show = true;
    },
    showError: (state, action) => {
      state.message = action.payload;
      state.type = 'error';
      state.show = true;
    },
    showWarning: (state, action) => {
      state.message = action.payload;
      state.type = 'warning';
      state.show = true;
    }
  }
});

export const { 
  showNotification, 
  clearNotification, 
  showSuccess, 
  showError, 
  showWarning 
} = notificationSlice.actions;

export default notificationSlice.reducer;