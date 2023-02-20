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

export type PrivateTabParamList = {
  HabitsScreen: undefined;
};

export type PrivateTabScreenProps<T extends keyof PrivateTabParamList> =
  BottomTabScreenProps<PrivateTabParamList, T>;

export type ScreenPrivateRouteProps<T extends keyof PrivateTabParamList> =
  RouteProp<PrivateTabParamList, T>;
