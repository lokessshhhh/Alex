import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from 'expo-linking';
import AppStackNavigator from "./AppStackNavigator";

const prefix = Linking.makeUrl("/")

const App = (): React.ReactElement => {
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        ForgotPwdNew: 'ForgotPwdNew',
      }
    }
  }

  return (
    <NavigationContainer linking={linking}>
      <AppStackNavigator />
    </NavigationContainer>
  );
};

export default App;
