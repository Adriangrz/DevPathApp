import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

import {CreateTodo, Todo} from '../../types/todo';

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

export const habitsSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<CreateTodo>) => {
      state.todos.push({
        id: uuid.v4().toString(),
        createdDate: new Date().toISOString(),
        ...action.payload,
      });
    },
    editTodo: (
      state,
      action: PayloadAction<{id: string; createTodo: CreateTodo}>,
    ) => {
      const id = state.todos.findIndex(
        element => element.id === action.payload.id,
      );
      state.todos[id] = {...state.todos[id], ...action.payload.createTodo};
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos.filter(element => element.id !== action.payload);
    },
  },
});

export const {addTodo, editTodo, removeTodo} = habitsSlice.actions;

export default habitsSlice.reducer;
