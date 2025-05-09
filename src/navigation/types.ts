import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  JobDetails: { id: string; workerId: string };
  NotFound: undefined;
};

export type MainTabParamList = {
  Jobs: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
