import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ToggleSwitch from "toggle-switch-react-native";
import { color } from "@storybook/addon-knobs";
import SwitchToggle from "react-native-switch-toggle";
import { useDispatch, useSelector } from "react-redux";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";
import { t } from "utils";
import axios from "axios";
import imagePath from "../../constant/imagePath";
import navigationOptions from "./LanguageSettingScreen.navigationOptions";
import styles from "./LanguageSettingScreen.styles";
import { setLanguage } from "../../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageSettingScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const [userName, setUserName] = useState<string>("");
  const [isOnNotification, setIsOnNotification] = useState(true);

  const dispatch = useDispatch();
  const SetLanguageDispatch = (language) => dispatch(setLanguage(language));
  const { language } = useSelector((state) => state.setLanguageReducer);
  const set_language = (language) => {
    SetLanguageDispatch(language);
    setLanguageApi()
    navigator.goBack();

  };

  const setLanguageApi = async () => {
    // navigator.openMainPage()
    let token = await AsyncStorage.getItem('authToken')
    // token= JSON.stringify(token)
    console.log("54y5", token)


    axios.post("http://localhost:8000/api/auth/language", language, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    },
    )
      .then((response) => {
        console.log("response :", response)
        alert("sucess")

      })
      .catch((error) => {
        console.log("errorInCatch :", error)
        alert(error)

      })

  };

  return (
    <ImageBackground source={imagePath["background"]} style={styles.imageBackground}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => {
          setLanguageApi()
          navigator.goBack()
        }} style={styles.goBack}>
          <MaterialIcons name="arrow-back" color={Colors.blue} size={24} />
        </TouchableOpacity>
        <Text.Header style={{ marginBottom: 26 }}>{t("UI_LANGUAGE_L")}</Text.Header>
        <View style={styles.inputs}>
          <Input value="" placeholder={t("UI_SEARCH_I")} />
        </View>
        <View style={styles.languages}>
          <TouchableOpacity style={styles.navigationBtn} onPress={() => set_language("es")}>
            <View style={styles.buttonContainer}>
              <Text.Primary>{t("UI_SPANISH_B")}</Text.Primary>
              {language == "es" && (
                <View style={styles.btnLeft}>
                  <AntDesign
                    name="check"
                    style={{ textAlignVertical: "center" }}
                    color={Colors.white}
                    size={24}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationBtn} onPress={() => set_language("en")}>
            <View style={styles.buttonContainer}>
              <Text.Primary>{t("UI_ENGLISH_B")}</Text.Primary>
              {language == "en" && (
                <View style={styles.btnLeft}>
                  <AntDesign
                    name="check"
                    style={{ textAlignVertical: "center" }}
                    color={Colors.white}
                    size={24}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationBtn} onPress={() => set_language("ru")}>
            <View style={styles.buttonContainer}>
              <Text.Primary>{t("UI_RUSSIAN_B")}</Text.Primary>
              {language == "ru" && (
                <View style={styles.btnLeft}>
                  <AntDesign
                    name="check"
                    style={{ textAlignVertical: "center" }}
                    color={Colors.white}
                    size={24}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationBtn} onPress={() => set_language("fr")}>
            <View style={styles.buttonContainer}>
              <Text.Primary>{t("UI_FRENCH_B")}</Text.Primary>
              {language == "fr" && (
                <View style={styles.btnLeft}>
                  <AntDesign
                    name="check"
                    style={{ textAlignVertical: "center" }}
                    color={Colors.white}
                    size={24}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationBtn} onPress={() => set_language("de")}>
            <View style={styles.buttonContainer}>
              <Text.Primary>{t("UI_GERMAN_B")}</Text.Primary>
              {language == "de" && (
                <View style={styles.btnLeft}>
                  <AntDesign
                    name="check"
                    style={{ textAlignVertical: "center" }}
                    color={Colors.white}
                    size={24}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

LanguageSettingScreen.navigationOptions = navigationOptions();

export default LanguageSettingScreen;
