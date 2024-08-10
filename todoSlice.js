import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {},
});

export const { actions, reducer: todoReducer } = todoSlice;
export default todoReducer;
