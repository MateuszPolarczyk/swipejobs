import { StatusBar, SafeAreaView, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigator from "./navigation/RootStackNavigator";

import { Navbar } from "./components/Navbar/Navbar";

import { DataProvider } from "./context/DataContext";

const App = () => {
  return (
    <DataProvider>
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
          <Navbar />

          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </DataProvider>
  );
};

export default App;
