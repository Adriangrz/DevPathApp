import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type PublicStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type PublicStackScreenProps<T extends keyof PublicStackParamList> =
  NativeStackScreenProps<PublicStackParamList, T>;

export type ScreenPublicRouteProps<T extends keyof PublicStackParamList> =
  RouteProp<PublicStackParamList, T>;

export type HabitsStackParamList = {
  Habits: undefined;
  AddHabitScreen: undefined;
  HabitScreen: undefined;
};

export type TodosStackParamList = {
  Todos: undefined;
  AddTodoScreen: undefined;
  TodoScreen: undefined;
};

export type HabitsStackScreenProps<T extends keyof HabitsStackParamList> =
  BottomTabScreenProps<HabitsStackParamList, T>;

export type HabitsScreenRouteProps<T extends keyof HabitsStackParamList> =
  RouteProp<HabitsStackParamList, T>;

export type TodosStackScreenProps<T extends keyof TodosStackParamList> =
  BottomTabScreenProps<TodosStackParamList, T>;

export type PrivateTabParamList = {
  HabitsStack: HabitsStackParamList;
  TodosStack: TodosStackParamList;
  Settings: undefined;
};

export type PrivateTabScreenProps<T extends keyof PrivateTabParamList> =
  BottomTabScreenProps<PrivateTabParamList, T>;

export type ScreenPrivateRouteProps<T extends keyof PrivateTabParamList> =
  RouteProp<PrivateTabParamList, T>;
