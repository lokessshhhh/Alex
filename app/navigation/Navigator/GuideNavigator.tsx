import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ComponentsStyle } from "style";

import GuideScreen from "../../screens/Guide";

const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
  ...ComponentsStyle.transitionBetweenScreenPresets,
};

const GuideNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { elevation: 0 },
        cardStyle: { backgroundColor: "#000" },
      }}
    >
      <Stack.Screen name="Guide" component={GuideScreen} options={screenOptions} />
    </Stack.Navigator>
  );
};

export default GuideNavigator;
