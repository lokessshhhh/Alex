import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Amplify, { Auth, Hub } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

import { navigate } from "navigation";
import { Colors } from "style";

import RootNavigator from "./RootNavigator";
import GuideNavigator from "./GuideNavigator";
import FeedbackScreen from "../../screens/Feedback";
import PrivacyPolicyScreen from "../../screens/PrivacyPolicy";
import LanguageSettingScreen from "../../screens/LanguageSetting";
import ProfileEditScreen from "../../screens/ProfileEdit";
import NewMovieNavigator from "./MainNavigators/NewMovieNavigator";
import EditMovieNavigator from "./MainNavigators/EditMovieNavigator";
import MovieSceneScreen from "../../screens/MovieScene";
import BookSceneScreen from "../../screens/BookScene";
import EditBookNavigator from "./MainNavigators/EditBookNavigator";
import NewBookNavigator from "./MainNavigators/NewBookNavigator";
import SeriesSceneScreen from "../../screens/SeriesScene";
import EditSeriesNavigator from "./MainNavigators/EditSeriesNavigator";
import NewSeriesNavigator from "./MainNavigators/NewSeriesNavigator";
// import AWSConfig from "../../../src/aws-exports";
import ForgotPwdNewScreen from "../../screens/ForgotPwdNew";
import ForgotPwdScreen from "../../screens/ForgotPwd";
import SignUpScreen from "../../screens/SignUp";
import SignInOtherScreen from "../../screens/SignInOther";
import SignInScreen from "../../screens/SignIn";
import TrackingScreen from "../../screens/TrackingScreen";
import TrackingWorkInfo from "../../screens/TrackingworkInfo"
// Amplify.configure(AWSConfig);


const AppStack = createStackNavigator();

const AppStackNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  Auth.currentAuthenticatedUser()
    .then((data) => {
      if (data.attributes.email) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    })
    .catch((err) => {
      console.log("error", err);
      setIsAuthenticated(false);
    });
  return isAuthenticated === false ? (
    <AppStack.Navigator
      screenOptions={{
        headerStyle: { elevation: 0 },
        cardStyle: { backgroundColor: Colors.transparent },
        headerShown: false,
      }}
    >
      <AppStack.Screen
        name="GuideStack"
        options={{ headerShown: false }}
        component={GuideNavigator}
      />

      <AppStack.Screen
        name="TrackingScreen"
        options={{ headerShown: false }}
        // options={TrackingScreen.navigationOptions}
        component={TrackingScreen}
      />

      <AppStack.Screen
        name="TrackingWorkInfo"
        options={{ headerShown: false }}
        component={TrackingWorkInfo}
      />

      <AppStack.Screen name="AppStack" options={{ headerShown: false }} component={RootNavigator} />
      <AppStack.Screen
        name="ProfileEdit"
        options={ProfileEditScreen.navigationOptions}
        component={ProfileEditScreen}
      />
      <AppStack.Screen
        name="LanguageSetting"
        options={LanguageSettingScreen.navigationOptions}
        component={LanguageSettingScreen}
      />
      <AppStack.Screen
        name="PrivacyPolicy"
        options={PrivacyPolicyScreen.navigationOptions}
        component={PrivacyPolicyScreen}
      />
      <AppStack.Screen
        name="Feedback"
        options={FeedbackScreen.navigationOptions}
        component={FeedbackScreen}
      />
      <AppStack.Screen
        name="NewMovie"
        options={{ headerShown: false }}
        component={NewMovieNavigator}
      />
      <AppStack.Screen
        name="EditMovie"
        options={{ headerShown: false }}
        component={EditMovieNavigator}
      />
      <AppStack.Screen
        name="MovieScene"
        options={{ headerShown: false }}
        component={MovieSceneScreen}
      />
      <AppStack.Screen
        name="NewSeries"
        options={{ headerShown: false }}
        component={NewSeriesNavigator}
      />
      <AppStack.Screen
        name="EditSeries"
        options={{ headerShown: false }}
        component={EditSeriesNavigator}
      />
      <AppStack.Screen
        name="SeriesScene"
        options={{ headerShown: false }}
        component={SeriesSceneScreen}
      />
      <AppStack.Screen
        name="NewBook"
        options={{ headerShown: false }}
        component={NewBookNavigator}
      />
      <AppStack.Screen
        name="EditBook"
        options={{ headerShown: false }}
        component={EditBookNavigator}
      />
      <AppStack.Screen
        name="BookScene"
        options={{ headerShown: false }}
        component={BookSceneScreen}
      />


      <AppStack.Screen
        name="SignInScreen"
        options={SignInScreen.navigationOptions}
        component={SignInScreen}
      />
      <AppStack.Screen
        name="SignInOther"
        options={SignInOtherScreen.navigationOptions}
        component={SignInOtherScreen}
      />
      <AppStack.Screen
        name="SignUp"
        options={SignUpScreen.navigationOptions}
        component={SignUpScreen}
      />
      <AppStack.Screen
        name="ForgotPwd"
        options={ForgotPwdScreen.navigationOptions}
        component={ForgotPwdScreen}
      />
      <AppStack.Screen
        name="ForgotPwdNew"
        options={ForgotPwdNewScreen.navigationOptions}
        component={ForgotPwdNewScreen}
      />
    </AppStack.Navigator>
  ) : (
    <AppStack.Navigator
      screenOptions={{
        headerStyle: { elevation: 0 },
        cardStyle: { backgroundColor: "transparent", opacity: 1 },
        headerShown: false,
        animationEnabled: false,
      }}
    // detachInactiveScreens={false}
    >
      <AppStack.Screen name="AppStack" options={{ headerShown: false }} component={RootNavigator} />

      <AppStack.Screen
        name="ProfileEdit"
        options={ProfileEditScreen.navigationOptions}
        component={ProfileEditScreen}
      />
      <AppStack.Screen
        name="LanguageSetting"
        options={LanguageSettingScreen.navigationOptions}
        component={LanguageSettingScreen}
      />
      <AppStack.Screen
        name="PrivacyPolicy"
        options={PrivacyPolicyScreen.navigationOptions}
        component={PrivacyPolicyScreen}
      />
      <AppStack.Screen
        name="Feedback"
        options={FeedbackScreen.navigationOptions}
        component={FeedbackScreen}
      />
      <AppStack.Screen
        name="NewMovie"
        options={{ headerShown: false }}
        component={NewMovieNavigator}
      />
      <AppStack.Screen
        name="EditMovie"
        options={{ headerShown: false }}
        component={EditMovieNavigator}
      />
      <AppStack.Screen
        name="MovieScene"
        options={{ headerShown: false }}
        component={MovieSceneScreen}
      />
      <AppStack.Screen
        name="NewSeries"
        options={{ headerShown: false }}
        component={NewSeriesNavigator}
      />
      <AppStack.Screen
        name="EditSeries"
        options={{ headerShown: false }}
        component={EditSeriesNavigator}
      />
      <AppStack.Screen
        name="SeriesScene"
        options={{ headerShown: false }}
        component={SeriesSceneScreen}
      />
      <AppStack.Screen
        name="NewBook"
        options={{ headerShown: false }}
        component={NewBookNavigator}
      />
      <AppStack.Screen
        name="EditBook"
        options={{ headerShown: false }}
        component={EditBookNavigator}
      />
      <AppStack.Screen
        name="BookScene"
        options={{ headerShown: false }}
        component={BookSceneScreen}
      />
      <AppStack.Screen
        name="SignInScreen"
        options={SignInScreen.navigationOptions}
        component={SignInScreen}
      />
      <AppStack.Screen
        name="SignInOther"
        options={SignInOtherScreen.navigationOptions}
        component={SignInOtherScreen}
      />
      <AppStack.Screen
        name="SignUp"
        options={SignUpScreen.navigationOptions}
        component={SignUpScreen}
      />
      <AppStack.Screen
        name="ForgotPwd"
        options={ForgotPwdScreen.navigationOptions}
        component={ForgotPwdScreen}
      />
      <AppStack.Screen
        name="ForgotPwdNew"
        options={ForgotPwdNewScreen.navigationOptions}
        component={ForgotPwdNewScreen}
      />


    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
