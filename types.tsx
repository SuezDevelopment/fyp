/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthScreen from './screens/Auth';
import Community from './screens/Community/Index';
import Result from './screens/Election/Result';
import Vote from './components/election/Vote';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}


export type RootStackParamList = {
  FeaturedCommunity: undefined;
  FeaturedElection: undefined;
  Annoucement: undefined;
  Vote: undefined;
  Result: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  WelcomeScreen: undefined;
  Landing: undefined;
  Auth: undefined;
  Admin: undefined;
  User: undefined;
  Invite: undefined;
  Members: undefined;
  CommunityPoll: undefined;
  MemberProfile: undefined;
  CommunityChat: undefined;
  Modal: undefined;
  NotFound: undefined;
  AdminDashboard: undefined;
  AdminMembers: undefined;
  AdminAnnoucement: undefined;
  AdminAuth: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Election: undefined;
  Community: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
