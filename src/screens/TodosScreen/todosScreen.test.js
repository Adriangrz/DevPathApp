import '@testing-library/jest-native/extend-expect';

import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react-native';
import {Provider} from 'react-redux';

import {TodosScreen} from './TodosScreen';
import {ThemeProvider} from '../../providers/ThemeProvider';
import {createStore} from '../../app/configureStore';
import {AddTodoScreen} from '../AddTodoScreen';

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

const createInitialTodos = amount => {
  let initialTodos = Array.from(Array(amount).keys());
  return initialTodos.map((element, index) => {
    index++;
    return {
      id: index.toString(),
      name: `test${index}`,
      createdDate: Date.now().toLocaleString(),
      tags: [],
      isCompleted: false,
    };
  });
};

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();
const mockedNavigation = {
  navigate: mockedNavigate,
  goBack: mockedGoBack,
};

describe('Todos Screen', () => {
  test('press on todo should change state to completed/not completed', async () => {
    const reduxStore = createStore({
      todosReducer: {todos: createInitialTodos(1)},
    });
    render(
      <ThemeProvider>
        <Provider store={reduxStore}>
          <TodosScreen />
        </Provider>
      </ThemeProvider>,
    );

    const todosScreen = await screen.findByTestId('todos-screen');

    expect(todosScreen).toBeTruthy();

    const todosCheckbox = await screen.findByTestId('todo-1-checkbox');

    fireEvent(todosCheckbox, 'onValueChange', true);

    expect(todosCheckbox.props.children.props.value).toEqual(true);
  });

  test('adding todo should change amount of todos and new todo appear at the bottom', async () => {
    const reduxStore = createStore({
      todosReducer: {todos: createInitialTodos(1)},
    });
    render(
      <ThemeProvider>
        <Provider store={reduxStore}>
          <TodosScreen navigation={mockedNavigation} />
        </Provider>
      </ThemeProvider>,
    );

    let todosScreen = await screen.findByTestId('todos-screen');

    expect(todosScreen).toBeTruthy();

    const amountOfTodosBeforeAdding = await (
      await screen.findAllByTestId('todo')
    ).length;

    fireEvent.press(screen.getByTestId('add-todo-btn'));

    expect(mockedNavigate).toHaveBeenCalled();

    render(
      <ThemeProvider>
        <Provider store={reduxStore}>
          <AddTodoScreen navigation={mockedNavigation} />
        </Provider>
      </ThemeProvider>,
    );

    const addTodoScreen = await screen.findByTestId('add-todo-screen');

    expect(addTodoScreen).toBeTruthy();

    await act(async () => {
      fireEvent.changeText(screen.getByTestId('name-input'), 'test15');
    });
    await act(async () => {
      fireEvent.changeText(screen.getByTestId('tag-input'), 'tag');
    });
    await act(async () => {
      fireEvent.press(screen.getByTestId('add-tag-btn'));
    });
    await act(async () => {
      fireEvent.press(screen.getByTestId('add-todo-btn'));
    });

    expect(mockedGoBack).toHaveBeenCalled();

    render(
      <ThemeProvider>
        <Provider store={reduxStore}>
          <TodosScreen navigation={mockedNavigation} />
        </Provider>
      </ThemeProvider>,
    );

    todosScreen = await screen.findByTestId('todos-screen');

    expect(todosScreen).toBeTruthy();

    const todosAfterAdding = await screen.findAllByTestId('todo');

    expect(todosAfterAdding).toHaveLength(amountOfTodosBeforeAdding + 1);
  });

  test('press on #200 todo in created list of 210 todos should change todo as completed/not completed', async () => {
    const reduxStore = createStore({
      todosReducer: {todos: createInitialTodos(210)},
    });
    render(
      <ThemeProvider>
        <Provider store={reduxStore}>
          <TodosScreen navigation={mockedNavigation} />
        </Provider>
      </ThemeProvider>,
    );
    const carousel = await screen.findByTestId('todos-list');

    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 1500,
        },
        contentSize: {
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          height: 100,
          width: 100,
        },
      },
    };
    fireEvent.scroll(carousel, eventData);

    const test200 = await screen.findByText('test200');
    expect(test200).toBeTruthy();

    const todoCheckbox = await screen.findByTestId('todo-200-checkbox');

    fireEvent(todoCheckbox, 'onValueChange', true);

    expect(todoCheckbox.props.children.props.value).toEqual(true);
  });
});
