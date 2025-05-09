import { StatusBar, SafeAreaView, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigator from "./navigation/RootStackNavigator";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="black"
          translucent={false}
        />
        {Platform.OS === "ios" && (
          <SafeAreaView style={{ backgroundColor: "black" }} />
        )}
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;
