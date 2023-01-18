import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {v4} from "uuid";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      const newTodo = {
        id: v4(),
        title: action.payload,
        completed: false,
      };
      state.push(newTodo);
    },
    remove:(state, action:PayloadAction<string>) => {
        return state.filter(x => x.id !== action.payload);
    }
  },
});

export default todoSlice.reducer;
export const { add, remove } = todoSlice.actions;
