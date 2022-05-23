import React, { useEffect, useState } from "react";
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
import AnimatedLoader from "react-native-animated-loader";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ToggleSwitch from "toggle-switch-react-native";
import { color } from "@storybook/addon-knobs";
import SwitchToggle from "react-native-switch-toggle";
import { API, Auth, DataStore, Hub } from "aws-amplify";
import { Gravatar, GravatarApi } from "react-native-gravatar";
import UserAvatar from "react-native-user-avatar";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";
import { t } from "utils";
import axios from "axios";

import imagePath from "../../constant/imagePath";
import navigationOptions from "./ProfileScreen.navigationOptions";
import styles from "./ProfileScreen.styles";
import * as queries from "../../../src/graphql/queries";
import BaseURl from "constant/BaseURL";

const ProfileScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const [isOnNotification, setIsOnNotification] = useState(true);
  const [loading, setLoading] = React.useState(false);

  //main states
  const [userName, setUserName] = useState<string>("");
  const [registeredInfo, setRegisteredInfo] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const { userInfo } = useSelector((state) => state.saveUserReducer);
  const { language } = useSelector((state) => state.setLanguageReducer);
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      const user = await getUserByMail();
      if (!user) {
        //not registered yet to db
        setUserName(userInfo.preferred_username ? userInfo.preferred_username : userInfo.name);
      } else {
        setRegisteredInfo(user);
        if (user.avatar != null) {
          setAvatar(user.avatar);
        } else {
          setAvatar(null);
        }
        if (user.username != null) {
          setUserName(user.username);
        }
      }
    })();
  }, [isFocused]);

  const getUserByMail = async () => {
    const filter = {
      email: {
        eq: userInfo.email,
      },
    };
    const currentUser = await API.graphql({
      query: queries.listUsers,
      variables: { filter: filter },
    });
    const users = currentUser.data.listUsers.items;
    if (users.length > 0) {
      return users[0];
    } else {
      return false;
    }
  };


  const signOut = () => {
    Auth.signOut();
    setLoading(true);
  };

  Hub.listen("auth", async (data) => {
    console.log("event type:", data.payload.event);
    switch (data.payload.event) {
      case "signOut":
        setLoading(false);
        navigator.signOut();
        break;
      default:
        break;
    }
  });

  const renderLanguage = (language) => {
    switch (language) {
      case "en":
        return t("UI_ENGLISH_B");
      case "es":
        return t("UI_SPANISH_B");
      case "ru":
        return t("UI_RUSSIAN_B");
      case "fr":
        return t("UI_FRENCH_B");
      case "de":
        return t("UI_GERMAN_B");
      default:
        return "foo";
    }
  };
  if (registeredInfo != null)
    return (
      <ImageBackground source={imagePath["background"]} style={styles.imageBackground}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text.Header>{t("UI_PROFILE_L")}</Text.Header>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => navigator.openProfileEdit()}
                style={{ marginRight: 20 }}
              >
                <Icon name="Edit" width="24" height="24" fill="none" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => signOut()}>
                <AntDesign name={"logout"} size={24} color={Colors.blue} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.avatarName}>
            {avatar != null && <Image source={{ uri: avatar }} style={styles.avatar} />}

            {avatar == null &&
              userInfo.email.search("@gmail") != -1 && ( // if mail is gmail returns gravatar
                <Gravatar
                  options={{
                    email: userInfo.email,
                    parameters: { size: "200", d: "mm" },
                    secure: true,
                  }}
                  default={"wavatar"}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    marginRight: 16,
                  }}
                />
              )}
            {avatar == null && userInfo.email.search("@gmail") == -1 && (
              <UserAvatar
                size={80}
                name={userInfo.preferred_username}
                style={{ marginRight: 16 }}
              />
            )}

            <View style={styles.nameMail}>
              <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{userName}</Text.TagTitle>
              <Text.Tertiary>{userInfo.email}</Text.Tertiary>
            </View>
          </View>
          <View style={styles.navigators}>
            <TouchableOpacity
              style={styles.navigationBtn}
              onPress={() => navigator.openLanguageSetting()}
            >
              <View style={styles.buttonContainer}>
                <Text.Primary>{t("UI_LANGUAGE_L")}</Text.Primary>
                <View style={styles.btnLeft}>
                  <Text.Primary style={{ marginRight: 16 }}>
                    {renderLanguage(language)}
                  </Text.Primary>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    style={{ textAlignVertical: "center" }}
                    color={Colors.white}
                    size={14}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.navigationBtn}>
              <View style={styles.buttonContainer}>
                <Text.Primary>{t("UI_NOTIFICATION_L")}</Text.Primary>
                <View style={styles.btnLeft}>
                  <SwitchToggle
                    switchOn={isOnNotification}
                    onPress={() => {
                      setIsOnNotification(!isOnNotification);
                    }}
                    circleColorOff={Colors.blue}
                    circleColorOn={Colors.blue}
                    backgroundColorOn={Colors.btnBack}
                    backgroundColorOff={Colors.white1}
                    containerStyle={styles.switchToggleContainer}
                    circleStyle={styles.switchToggleCircle}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.navigationBtn}
              onPress={() => navigator.openPrivacyPolicy()}
            >
              <View style={styles.buttonContainer}>
                <Text.Primary>{t("UI_PRIVACY_POLICY_L")}</Text.Primary>
                <View style={styles.btnLeft}>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    style={{ textAlignVertical: "center" }}
                    color={Colors.white}
                    size={14}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navigationBtn}>
              <View style={styles.buttonContainer}>
                <Text.Primary>{t("UI_SEE_FAQ_L")}</Text.Primary>
                <View style={styles.btnLeft}>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    style={{ textAlignVertical: "center" }}
                    color={Colors.white}
                    size={14}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navigationBtn} onPress={() => navigator.openFeedback()}>
              <View style={styles.buttonContainer}>
                <Text.Primary>{t("UI_FEEDBACK_L")}</Text.Primary>
                <View style={styles.btnLeft}>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    style={{ textAlignVertical: "center" }}
                    color={Colors.white}
                    size={14}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <AnimatedLoader
          visible={loading}
          overlayColor="rgba(255,255,255,0)"
          source={require("../../../assets/loader.json")}
          animationStyle={{ width: 100, height: 100, top: -20 }}
          speed={1}
        />
      </ImageBackground>
    );
  else
    return (
      <ImageBackground source={imagePath["background"]} style={styles.imageBackground}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text.Header>{t("UI_PROFILE_L")}</Text.Header>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => navigator.openProfileEdit()}
                style={{ marginRight: 20 }}
              >
                <Icon name="Edit" width="24" height="24" fill="none" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => signOut()}>
                <AntDesign name={"logout"} size={24} color={Colors.blue} />
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.avatarName}> */}
          {/* {userInfo.email.search("@gmail") != -1 ? ( // if mail is gmail returns gravatar
              <Gravatar
                options={{
                  email: userInfo.email,
                  parameters: { size: "200", d: "mm" },
                  secure: true,
                }}
                default={"wavatar"}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  marginRight: 16,
                }}
              />
            ) : (
              <UserAvatar
                size={80}
                name={userInfo.preferred_username}
                style={{ marginRight: 16 }}
              />
            )}

            <View style={styles.nameMail}>
              <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{userName}</Text.TagTitle>
              <Text.Tertiary>{userInfo.email}</Text.Tertiary>
            </View> */}
          {/* </View> */}
          <View style={styles.navigators}>
            <TouchableOpacity
              style={styles.navigationBtn}
              onPress={() => navigator.openLanguageSetting()}
            >
              <View style={styles.buttonContainer}>
                <Text.Primary>{t("UI_LANGUAGE_L")}</Text.Primary>
                <View style={styles.btnLeft}>
                  <Text.Primary style={{ marginRight: 16 }}>{"English"}</Text.Primary>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    style={{ textAlignVertical: "center" }}
                    color={Colors.white}
                    size={14}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.navigationBtn}>
              <View style={styles.buttonContainer}>
                <Text.Primary>{t("UI_NOTIFICATION_L")}</Text.Primary>
                <View style={styles.btnLeft}>
                  <SwitchToggle
                    switchOn={isOnNotification}
                    onPress={() => {
                      setIsOnNotification(!isOnNotification);
                    }}
                    circleColorOff={Colors.blue}
                    circleColorOn={Colors.blue}
                    backgroundColorOn={Colors.btnBack}
                    backgroundColorOff={Colors.white1}
                    containerStyle={styles.switchToggleContainer}
                    circleStyle={styles.switchToggleCircle}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.navigationBtn}
              onPress={() => navigator.openPrivacyPolicy()}
            >
              <View style={styles.buttonContainer}>
                <Text.Primary>{t("UI_PRIVACY_POLICY_L")}</Text.Primary>
                <View style={styles.btnLeft}>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    style={{ textAlignVertical: "center" }}
                    color={Colors.white}
                    size={14}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navigationBtn}>
              <View style={styles.buttonContainer}>
                <Text.Primary>{"See FAQ"}</Text.Primary>
                <View style={styles.btnLeft}>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    style={{ textAlignVertical: "center" }}
                    color={Colors.white}
                    size={14}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navigationBtn} onPress={() => navigator.openFeedback()}>
              <View style={styles.buttonContainer}>
                <Text.Primary>{t("UI_FEEDBACK_L")}</Text.Primary>
                <View style={styles.btnLeft}>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    style={{ textAlignVertical: "center" }}
                    color={Colors.white}
                    size={14}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <AnimatedLoader
          visible={loading}
          overlayColor="rgba(255,255,255,0)"
          source={require("../../../assets/loader.json")}
          animationStyle={{ width: 100, height: 100, top: -20 }}
          speed={1}
        />
      </ImageBackground>
    );
};

ProfileScreen.navigationOptions = navigationOptions();

export default ProfileScreen;
