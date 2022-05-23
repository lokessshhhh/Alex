import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Font from "expo-font";
import { FormattedProvider } from "react-native-globalize";
// import Localization, { locale as localeExpo } from "expo-localization";
import { includes } from "ramda";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Sentry from "sentry-expo";
import { Provider, useSelector } from "react-redux";
import { enableScreens } from "react-native-screens";
import Amplify, { Auth, Hub } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import { PersistGate } from "redux-persist/integration/react";


/////////////////////////

import { navigate } from "navigation";
import { LocalizationContext } from "utils";

import AppNavigator from "./app/navigation/Navigator/AppNavigator";
import { store, persistor, RootState } from "./app/redux/store";
// import config from "./src/aws-exports";

// Amplify.configure(config);

const supportedLanguages: string[] = ["en", "fr", "de", "ru", "es"];
const defaultLanguage = "en";
const defaultLocale = "en-us";

const App: React.FC = () => {
  enableScreens();

  const { language } = useSelector((state: RootState) => {
    return state.setLanguageReducer;
  });
  let lang = language;

  if (!includes(language, supportedLanguages)) {
    lang = defaultLanguage;
  }
  console.log(lang);
  let local = "";
  switch (lang) {
    case "en":
      local = "en-US";
      break;
    case "es":
      local = "es-US";
      break;
    case "ru":
      local = "ru-RU";
      break;
    case "fr":
      local = "en-US";
      break;
    case "de":
      local = "en-US";
      break;
    default:
      local = "en-US";
      break;
  }
  console.log(local);
  const [ready, setReady] = useState(false);
  const [language_, setLanguage_] = useState(lang);
  const [locale, setLocale] = useState(local);
  console.log(locale);
  console.log(language_);
  useEffect(() => {
    Promise.all([
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialCommunityIcons.font,
        Mulish: require("./assets/fonts/Mulish.ttf"),
      }),
    ])
      .then(() => {
        setReady(true);
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Sentry.captureException(error);
      });
  }, []);

  let body = <View />;

  if (ready) {
    body = (
      <PersistGate loading={null} persistor={persistor}>
        <FormattedProvider locale={language_ || defaultLanguage}>
          <LocalizationContext.Provider
            value={{
              locale: locale,
              setLocale: setLocale,
              language: language_ || defaultLanguage,
              setLanguage: setLanguage_,
            }}
          >
            <AppNavigator />
          </LocalizationContext.Provider>
        </FormattedProvider>
      </PersistGate>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {body}
    </SafeAreaProvider>
  );
};
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
