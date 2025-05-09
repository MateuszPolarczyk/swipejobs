import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import { RootStackParamList } from "./types";

import JobDetailsScreen from "../screens/JobDetails/JobDetails";
import NotFound from "../screens/NotFound/NotFound";

export const SCREENS = {
  MAIN_TABS: "MainTabs",
  JOB_DETAILS: "JobDetails",
  NOT_FOUND: "NotFound",
} as const;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => (
  <Stack.Navigator
    initialRouteName={SCREENS.MAIN_TABS}
    screenOptions={{ headerShown: false, gestureEnabled: true }}
  >
    <Stack.Screen name={SCREENS.MAIN_TABS} component={TabNavigator} />
    <Stack.Screen name={SCREENS.JOB_DETAILS} component={JobDetailsScreen} />
    <Stack.Screen name={SCREENS.NOT_FOUND} component={NotFound} />
  </Stack.Navigator>
);

export default RootStackNavigator;
