import {Tag} from './tag';

export type CreateTodo = {
  name: string;
  tags: Tag[];
  isCompleted: boolean;
};

export type Todo = {
  id: string;
  name: string;
  createdDate: string;
  tags: Tag[];
  isCompleted: boolean;
};
