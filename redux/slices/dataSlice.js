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
});

export const { updateData, returnData } = dataSlice.actions;
export default dataSlice.reducer;