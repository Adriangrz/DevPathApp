import {
  combineReducers,
  configureStore,
  PreloadedState,
  StateFromReducersMapObject,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import habitsReducer from '../features/habits/habitsSlice';
import todosReducer from '../features/todos/todosSlice';

const persistConfig = {
  key: 'TodosAndHabits',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  habitsReducer: habitsReducer,
  todosReducer: todosReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export type StateFromReducers = StateFromReducersMapObject<typeof reducers>;

export const createStore = (
  preloadedState?: PreloadedState<StateFromReducers>,
) =>
  configureStore({
    reducer: persistedReducer,
    preloadedState: preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

export const store = createStore();
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
