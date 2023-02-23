import {Tag} from './tag';

export type CreateHabit = {
  name: string;
  tags: Tag[];
  isCompleted: boolean;
};

export type Habit = {
  id: string;
  name: string;
  createdDate: string;
  tags: Tag[];
  isCompleted: boolean;
};
