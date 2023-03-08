import {Habit} from '../types/habit';

export const countCompletedHabits = (habits: Habit[]) => {
  return habits.filter(habit => habit.isCompleted === true).length;
};
