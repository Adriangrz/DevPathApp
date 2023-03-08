import {Habit} from '../types/habit';

export const filterHabitsByIsCompleted = (
  habits: Habit[],
  isCompleted: boolean,
) => {
  return habits.filter(element => element.isCompleted === isCompleted);
};
