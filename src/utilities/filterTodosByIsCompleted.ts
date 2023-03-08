import {Todo} from '../types/todo';

export const filterTodosByIsCompleted = (
  todos: Todo[],
  isCompleted: boolean,
) => {
  return todos.filter(element => element.isCompleted === isCompleted);
};
