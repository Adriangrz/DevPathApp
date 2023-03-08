import {Todo} from '../types/todo';

export const countCompletedTodos = (todos: Todo[]) => {
  return todos.filter(todo => todo.isCompleted === true).length;
};
