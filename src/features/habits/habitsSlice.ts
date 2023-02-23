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
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<CreateHabit>) => {
      state.habits.push({
        id: uuid.v4().toString(),
        createdDate: new Date().toISOString(),
        ...action.payload,
      });
    },
    editHabit: (
      state,
      action: PayloadAction<{id: string; createHabit: CreateHabit}>,
    ) => {
      const id = state.habits.findIndex(
        element => element.id === action.payload.id,
      );
      state.habits[id] = {...state.habits[id], ...action.payload.createHabit};
    },
    removeHabit: (state, action: PayloadAction<string>) => {
      state.habits.filter(element => element.id !== action.payload);
    },
  },
});

export const {addHabit} = habitsSlice.actions;

export default habitsSlice.reducer;
