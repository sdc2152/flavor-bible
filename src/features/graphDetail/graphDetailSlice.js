import { createSlice } from "@reduxjs/toolkit";

const name = 'graphDetail';

const initialState = {
  sort: 'linksHighLow',
  group: 'link',
};

const graphDetailSlice = createSlice({
  name,
  initialState,
  reducers: {
    updateSort: (state, action) => {
      state.sort = action.payload
    },
    updateGroup: (state, action) => {
      state.group = action.payload
    },
  },
});

export const {
  updateSort,
  updateGroup,
} = graphDetailSlice.actions;

export const selectSort = (state) => state[name].sort;

export const selectGroup = (state) => state[name].group;

export default graphDetailSlice;

