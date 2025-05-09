import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "./types";

import { THEME } from "../theme";
import Ionicons from "@expo/vector-icons/Ionicons";

import JobsScreen from "../screens/Jobs/Jobs";
import Profile from "../screens/Profile/Profile";

export const TAB_SCREENS = {
  JOBS: "Jobs",
  PROFILE: "Profile",
} as const;

const tabIcons = {
  [TAB_SCREENS.JOBS]: "briefcase-outline",
  [TAB_SCREENS.PROFILE]: "person-outline",
} as const;

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: THEME.colors.accent,
      tabBarInactiveTintColor: THEME.colors.primary,
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        elevation: 0,
        borderWidth: 0,
      },
    }}
  >
    <Tab.Screen
      name={TAB_SCREENS.JOBS}
      component={JobsScreen}
      options={{
        title: TAB_SCREENS.JOBS,
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={tabIcons[TAB_SCREENS.JOBS]}
            size={size}
            color={color}
          />
        ),
        tabBarAccessibilityLabel: "Jobs Screen",
      }}
    />
    <Tab.Screen
      name={TAB_SCREENS.PROFILE}
      component={Profile}
      options={{
        title: TAB_SCREENS.PROFILE,
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={tabIcons[TAB_SCREENS.PROFILE]}
            size={size}
            color={color}
          />
        ),
        tabBarAccessibilityLabel: "Profile Screen",
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
