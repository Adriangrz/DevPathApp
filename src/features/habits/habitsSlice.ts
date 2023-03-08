import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

import {CreateHabit, Habit} from '../../types/habit';

export interface HabitsState {
  habits: Habit[];
}

const initialState: HabitsState = {
  habits: [],
};

export const habitsSlice = createSlice({
  name: 'habitsReducer',
  initialState: initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<CreateHabit>) => {
      state.habits.push({
        id: uuid.v4().toString(),
        createdDate: new Date().toISOString(),
        ...action.payload,
      });
    },
    editHabit: (state, action: PayloadAction<Habit>) => {
      const id = state.habits.findIndex(
        element => element.id === action.payload.id,
      );
      state.habits[id] = action.payload;
      return state;
    },
    removeHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(
        element => element.id !== action.payload,
      );
      return state;
    },
  },
});

export const {addHabit, editHabit, removeHabit} = habitsSlice.actions;

export default habitsSlice.reducer;
