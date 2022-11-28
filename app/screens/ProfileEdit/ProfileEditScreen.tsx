import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View, Image, Dimensions } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import Modal from "react-native-modal";
import { vw, vh } from "react-native-css-vh-vw";
import { API, Auth } from "aws-amplify";
import Storage from "@aws-amplify/storage";
import { Gravatar, GravatarApi } from "react-native-gravatar";
import UserAvatar from "react-native-user-avatar";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ToggleSwitch from "toggle-switch-react-native";
import { color } from "@storybook/addon-knobs";
import SwitchToggle from "react-native-switch-toggle";
import { useSelector } from "react-redux";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Snackbar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";

// import { Users } from "../../../models";
import imagePath from "../../constant/imagePath";
import navigationOptions from "./ProfileEditScreen.navigationOptions";
import styles from "./ProfileEditScreen.styles";
//graphql
import * as queries from "../../../src/graphql/queries";
import * as mutations from "../../../src/graphql/mutations";
import * as subscriptions from "../../../src/graphql/subscriptions";

import BaseURl from "constant/BaseURL";

const ProfileEditScreen: NavStatelessComponent = () => {
  
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const deviceWidth = Dimensions.get("window").width;

  //main state
  const [emailAdd, setEmail] = useState<string>("");
  const [userProfile, setUserProfile] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userLastName, setUserLastName] = useState<string>("");
  const [oldPwd, setOldPwd] = useState<string>("");
  const [newPwd, setNewPwd] = useState<string>("");
  const [confirmPwd, setConfirmPwd] = useState<string>("");
  const [isOnNotification, setIsOnNotification] = useState(true);
  const [registeredInfo, setRegisteredInfo] = useState(null);
  const [avatar, setAvatar] = useState(null);

  //etc state
  const [snackBarVisiable, setSnackBarVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [messageStatus, setMessageStatus] = React.useState(1); // status 1: success, status 0: error
  const [loading, setLoading] = React.useState(false);
  const [percentage, setPercentage] = useState(0);

  //modal state
  const [imgChooseModal, setImgChooseModal] = React.useState(false);

  //redux
  const { userInfo } = useSelector((state) => state.saveUserReducer);

  useEffect(() => {
    userDetails();
  }, []);

  const userDetails = async () => {
    const token = await AsyncStorage.getItem("authToken");
    fetch(BaseURl + "auth/userDetails", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson,'======Res======');
        if (responseJson.code === 200) {
          setEmail(responseJson.data.email);
          setUserName(responseJson.data.name);
          setUserLastName(responseJson.data.userName);
          setUserProfile(responseJson.data.profileImage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //edit profile
  const editProfile = async () => {
    const token = await AsyncStorage.getItem("authToken");
    let filename = userProfile.split("/").pop();
    var formData = new FormData();
    formData.append("profileImage", {
      uri: userProfile,
      name: filename,
      type: "image/jpeg",
    });
    formData.append("name", userName);
    formData.append("userName", userLastName);
    formData.append("currentPassword", oldPwd);
    formData.append("newPassword", newPwd);
    console.log(formData);

    fetch(BaseURl + "auth/editProfile", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Response :", responseJson);
        if (responseJson.code === 200) {
          alert(responseJson.message);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  };
  const onNewFocus = () => {
    if (oldPwd.length < 8) {
      showToast("Confirm your old Password", 0);
      setNewPwd("");
      return;
    }
  };

  const onConfirmFocus = () => {
    if (oldPwd.length < 8) {
      showToast("Confirm your old Password", 0);
      setNewPwd("");
      return;
    }
    if (newPwd.length < 8) {
      showToast("Confirm your new Password", 0);
      setConfirmPwd("");
      return;
    }
  };

  const showToast = (message: string, status: number) => {
    setMessage(message);
    setMessageStatus(status);
    setSnackBarVisible(true);
    setTimeout(() => setSnackBarVisible(false), 2000);
  };

  //Image Upload by camera and local storage
  const fromGallery = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    setImgChooseModal(false);
    // handleImagePicked(result);
    console.log("resulltwdw", result);
    setUserProfile(result.uri);
  };

  const fromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
    });
    setImgChooseModal(false);
    // handleImagePicked(result);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={imagePath["background"]} style={styles.imageBackground} />
      <Snackbar
        visible={snackBarVisiable}
        onDismiss={() => setSnackBarVisible(false)}
        style={{
          backgroundColor:
            messageStatus == 1 ? "rgba(29, 174, 255, 0.5)" : "rgba(231, 76, 60, 0.5)",
          borderRadius: 16,
          marginHorizontal: 16,
          bottom: vh(10),
        }}
      >
        <AntDesign
          name={messageStatus == 1 ? "checkcircle" : "exclamationcircle"}
          size={20}
          color={messageStatus == 1 ? "rgba(46, 204, 113, 1)" : "rgba(255, 69, 58, 1)"}
          style={{ letterSpacing: 20 }}
        />
        <Text.Primary style={{ marginLeft: 20 }}>{message}</Text.Primary>
      </Snackbar>
      <View
        style={{
          position: "absolute",
          paddingHorizontal: 16,
          width: "100%",
          marginTop: 50,
        }}
      >
        <TouchableOpacity onPress={() => navigator.goBack()} style={[styles.goBack]}>
          <MaterialIcons name="arrow-back" color={Colors.blue} size={24} />
        </TouchableOpacity>
        <Text.Header style={{ marginBottom: 26 }}>{"Edit Profile"}</Text.Header>
        <View style={styles.avatarEdit}>
          {userProfile !== "" ? (
            <Image source={{ uri:userProfile }} style={styles.avatar} />
          ) : (
            <UserAvatar size={80} name={userInfo.preferred_username} style={styles.avatar} />
          )}
          <TouchableOpacity style={{ marginTop: -55 }} onPress={() => setImgChooseModal(true)}>
            <AntDesign name="camera" size={30} color={Colors.blue} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputs}>
          <Input
            value={userName}
            placeholder={"First Name"}
            onChangeText={(value) => setUserName(value)}
          />
          <Input
            value={userLastName}
            placeholder={"Last Name"}
            onChangeText={(value) => setUserLastName(value)}
          />

          <Input value={emailAdd} placeholder={"E-mail"} editable={false} />
          <Input
            value={oldPwd}
            placeholder={"Old Password"}
            type="password"
            onChangeText={(value) => setOldPwd(value)}
          />
          <Input
            value={newPwd}
            placeholder={"New Password"}
            type="password"
            onChangeText={(value) => setNewPwd(value)}
            onFocus={() => onNewFocus()}
          />
          <Input
            value={confirmPwd}
            placeholder={"Confirm New Password"}
            type="password"
            onChangeText={(value) => setConfirmPwd(value)}
            onFocus={() => onConfirmFocus()}
          />
        </View>
        <View style={{ alignSelf: "center", width: "100%", paddingTop: 20 }}>
          {/* <Button.Primary fullWidth={true} textType={"Primary"} onPress={() => saveProfile()}> */}
          <Button.Primary
            fullWidth={true}
            textType={"Primary"}
            onPress={() => {
              // saveProfile()
              editProfile();
            }}
          >
            <Text.TagTitle style={{ textTransform: "none", lineHeight: 24 }}>
              {"Save Profile"}
            </Text.TagTitle>
          </Button.Primary>
        </View>
      </View>

      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255,255,255,0)"
        source={require("../../../assets/loader.json")}
        animationStyle={{ width: 100, height: 100, top: -20 }}
        speed={1}
      />

      {/* ImageChoose Modal */}
      <Modal
        isVisible={imgChooseModal}
        swipeDirection="down"
        onSwipeComplete={() => setImgChooseModal(false)}
        onRequestClose={() => setImgChooseModal(false)}
        onBackdropPress={() => setImgChooseModal(false)}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0, marginBottom: 0 }}
      >
        <View
          style={[
            styles.modalContainer,
            {
              paddingVertical: 24,
              alignItems: "flex-start",
              marginHorizontal: 16,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            },
          ]}
        >
          <Text.ModalTitle style={{ marginBottom: 25, textAlign: "left" }}>
            {"Select to pick image."}
          </Text.ModalTitle>
          <View style={styles.imageChooseMethods}>
            <TouchableOpacity style={styles.imageChooseMethod} onPress={() => fromGallery()}>
              <Ionicons
                name={"image"}
                size={70}
                color={Colors.blue}
                style={{ textAlign: "center" }}
              />
              <Text.Tertiary style={{ textAlign: "center" }}>{"Gallery"}</Text.Tertiary>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageChooseMethod} onPress={() => fromCamera()}>
              <AntDesign
                name="camera"
                style={{ textAlign: "center" }}
                size={70}
                color={Colors.blue}
              />
              <Text.Tertiary style={{ textAlign: "center" }}>{"Camera"}</Text.Tertiary>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

ProfileEditScreen.navigationOptions = navigationOptions();

export default ProfileEditScreen;
