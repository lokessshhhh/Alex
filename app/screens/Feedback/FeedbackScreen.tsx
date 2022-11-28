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
  TextInput,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { vw, vh } from "react-native-css-vh-vw";

import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ToggleSwitch from "toggle-switch-react-native";
import { color } from "@storybook/addon-knobs";
import SwitchToggle from "react-native-switch-toggle";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";
import { t } from "utils";

import imagePath from "../../constant/imagePath";
import navigationOptions from "./FeedbackScreen.navigationOptions";
import styles from "./FeedbackScreen.styles";
import axios from "axios";
import BaseURl from "constant/BaseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FeedbackScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);

  const [userName, setUserName] = useState<string>("");
  const [Ticket, setTicket] = useState<string>(t("FEEDBACK_TYPE_FEEDBACK_B"));
  const [qsn, setqsn] = useState<string>("");
  const [desqsn, setdesqsn] = useState<string>("");

  const [isOnNotification, setIsOnNotification] = useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const deviceWidth = Dimensions.get("window").width;

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const SaveFeedBack = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const data = {
      feedbackType: Ticket,
      question: qsn,
      questionDescription: desqsn,
    };
    console.log(data, "==data===");
    qsn === "" && desqsn === ""
      ? alert("please enter your question")
      : desqsn.length < 20
      ? alert("Question description length must be minimum 20")
      : axios
          .post(BaseURl + "feedback/sendDetails", data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            alert(response.data.message);
            console.log(response, "===res===");
          })
          .catch((err) => {
            console.log(err, "===err====");
          });
  };

  return (
    <ImageBackground source={imagePath["background"]} style={styles.imageBackground}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => navigator.goBack()} style={styles.goBack}>
          <MaterialIcons name="arrow-back" color={Colors.blue} size={24} />
        </TouchableOpacity>
        <Text.Header style={{ marginBottom: 26 }}>{t("UI_FEEDBACK_L")}</Text.Header>
        <View style={styles.ticketType}>
          <TouchableOpacity style={styles.navigationBtn} onPress={() => openModal()}>
            <View style={styles.buttonContainer}>
              <Text.Primary>{t("FEEDBACK_TYPE_L")}</Text.Primary>
              <Text.Secondary style={styles.btnLeft}>
                {Ticket === t("FEEDBACK_TYPE_FEEDBACK_B")
                  ? t("FEEDBACK_TYPE_FEEDBACK_B")
                  : Ticket === t("FEEDBACK_TYPE_FEATURE_REQUEST_B")
                  ? t("FEEDBACK_TYPE_FEATURE_REQUEST_B")
                  : Ticket === t("FEEDBACK_TYPE_ISSUE_B")
                  ? t("FEEDBACK_TYPE_ISSUE_B")
                  : t("FEEDBACK_TICKET_TYPE_L")}
              </Text.Secondary>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.feedbackContainer}>
          <Input
            onChangeText={(value) => setqsn(value)}
            value={qsn}
            placeholder={t("FEEDBACK_WRITE_QUESTION_I")}
          />

          <TextInput
            value={desqsn}
            onChangeText={(value) => setdesqsn(value)}
            placeholder={t("FEEDBACK_DESCRIBE_QUESTION_I")}
            placeholderTextColor={Colors.white1}
            style={{
              color: "white",
              height: 160,
              backgroundColor: Colors.inputBack,
              padding: 16,
              borderRadius: 8,
              textAlignVertical: "top",
            }}
            numberOfLines={4}
            multiline={true}
          />
        </View>

        <Button.Primary
          onPress={() => {
            console.log("===okok===");
            SaveFeedBack();
          }}
          fullWidth={true}
          textType={"Primary"}
          style={{ position: "absolute", bottom: vh(-42) }}
        >
          <Text.TagTitle style={{ textTransform: "none", lineHeight: 24 }}>
            {t("FEEDBACK_SEND_MESSAGE_B")}
          </Text.TagTitle>
        </Button.Primary>
      </ScrollView>

      <Modal
        isVisible={modalVisible}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0, marginBottom: 0, justifyContent: "flex-end" }}
      >
        <View style={styles.modalContainer}>
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor: Colors.white,
              opacity: 0.3,
              marginTop: 8,
              marginBottom: 18,
            }}
          ></View>
          <Text.ModalTitle style={{ marginBottom: 25 }}>
            {t("FEEDBACK_TICKET_TYPE_L")}
          </Text.ModalTitle>
          <TouchableOpacity
            style={styles.navigationBtn}
            onPress={() => {
              closeModal();
              setTicket(t("FEEDBACK_TYPE_FEEDBACK_B"));
            }}
          >
            <View style={styles.buttonContainer}>
              <Text.Primary>{t("FEEDBACK_TYPE_FEEDBACK_B")}</Text.Primary>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationBtn}
            onPress={() => {
              closeModal();
              setTicket(t("FEEDBACK_TYPE_FEATURE_REQUEST_B"));
            }}
          >
            <View style={styles.buttonContainer}>
              <Text.Primary>{t("FEEDBACK_TYPE_FEATURE_REQUEST_B")}</Text.Primary>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationBtn}
            onPress={() => {
              closeModal();
              setTicket(t("FEEDBACK_TYPE_ISSUE_B"));
            }}
          >
            <View style={styles.buttonContainer}>
              <Text.Primary>{t("FEEDBACK_TYPE_ISSUE_B")}</Text.Primary>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </ImageBackground>
  );
};

FeedbackScreen.navigationOptions = navigationOptions();

export default FeedbackScreen;
