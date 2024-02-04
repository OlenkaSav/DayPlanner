import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
  },
  reducers: {
    updateData: (state, action) => {
      state.items = action.payload;
    },
    returnData: (state) => state,
  },
    clearData: (state) => {
      state.items = [];
    },
});

export const { updateData, returnData, clearData } = dataSlice.actions;
export default dataSlice.reducer;