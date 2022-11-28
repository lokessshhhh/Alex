import { View, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "style";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Text } from "components";
import imagePath from "constant/imagePath";
import { vw, vh } from "react-native-css-vh-vw";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { navigate } from "navigation";
import { CalendarList } from "react-native-calendars";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BaseURl from "constant/BaseURL";

function TrackingWorkInfo({navigation}) {
  useEffect(() => {
    AsyncStorage.getItem("Date").then((value) => {
      console.log(value, "=======My Date======");
      SetCurrentDate(JSON.parse(value));
    });
    mark();
  }, []);

  const [Hard, SetHard] = useState([]);
  const [Normal, SetNormal] = useState([]);
  const [Low, SetLow] = useState([]);
  const [newDate, setnewDate] = useState({});
  const [CurrentDate, SetCurrentDate] = useState("");

  // const navigation = useNavigation();
  const navigator = navigate(navigation);
  

  const mark = async () => {
    
    await AsyncStorage.getItem("userId").then((value) => {
      console.log(value, "UserId");

      axios
        .get(BaseURl + "timetracking/totaltime/" + value)
        .then((response) => {
          let MyData = response.data.message.userTime;
          let NeWmark = {};

          MyData.map((item) => {
            item.totalTime < 4
              ? (NeWmark[item.date] = {
                  customStyles: {
                    container: {
                      height: 40,
                      width: 40,
                      borderRadius: 8,
                      backgroundColor: "#163861",
                      borderColor: "transparent",
                    },
                  },
                })
              : item.totalTime < 8
              ? (NeWmark[item.date] = {
                  customStyles: {
                    container: {
                      height: 40,
                      width: 40,
                      borderRadius: 8,
                      backgroundColor: "#1973B0",
                      borderColor: "transparent",
                    },
                  },
                })
              : item.totalTime > 8
              ? (NeWmark[item.date] = {
                  customStyles: {
                    container: {
                      height: 40,
                      width: 40,
                      borderRadius: 8,
                      backgroundColor: "#1DAEFF",
                      borderColor: "transparent",
                    },
                  },
                })
              : null;
          });
          let hard = [];
          let normal = [];
          let low = [];

          console.log(CurrentDate, "==========curreeent datee=========");

          MyData.map((item) => {
            if (item.totalTime < 4) {
              low.push(item.date);
            } else if (item.totalTime < 8) {
              normal.push(item.date);
            } else if (item.totalTime > 8) {
              hard.push(item.date);
            } else {
              null;
            }
          });
          SetHard(hard.length);
          SetNormal(normal.length);
          SetLow(low.length);
          setnewDate(NeWmark);
          console.log(NeWmark, "==API DATES==");
        })
        .catch((error) => {
          console.log(error, "==DATE API ERROR==");
        });
    });
  };

  return (
    <ImageBackground source={imagePath["background"]} style={styles.imageBackground}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            width: widthPercentageToDP("95%"),
            paddingLeft: widthPercentageToDP("1%"),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.replace('TrackingScreen');
              // navigator.trackingScreen();
            }}
            style={[styles.goBack]}
          >
            <MaterialIcons name="arrow-back" color={Colors.blue} size={24} />
          </TouchableOpacity>
          <Text.Header style={{ marginBottom: 17, fontWeight: "900" }}>{"Work Info"}</Text.Header>
        </View>

        {/* S M T W T F S */}
        <View
          style={{
            flexDirection: "row",
            marginRight: wp("1%"),
            width: widthPercentageToDP("100%"),
          }}
        >
          <Text.ParagraphTitle style={[styles.Textmargin, { fontSize: vh(1.8) }]}>
            S
          </Text.ParagraphTitle>
          <Text.ParagraphTitle style={[styles.Textmargin, { fontSize: vh(1.8) }]}>
            M
          </Text.ParagraphTitle>
          <Text.ParagraphTitle style={[styles.Textmargin, { fontSize: vh(1.8) }]}>
            T
          </Text.ParagraphTitle>
          <Text.ParagraphTitle style={[styles.Textmargin, { fontSize: vh(1.8) }]}>
            W
          </Text.ParagraphTitle>
          <Text.ParagraphTitle style={[styles.Textmargin, { fontSize: vh(1.8) }]}>
            T
          </Text.ParagraphTitle>
          <Text.ParagraphTitle style={[styles.Textmargin, { fontSize: vh(1.8) }]}>
            F
          </Text.ParagraphTitle>
          <Text.ParagraphTitle style={[styles.Textmargin, { fontSize: vh(1.8) }]}>
            S
          </Text.ParagraphTitle>
        </View>
        {/* line */}
        <View
          style={{
            marginTop: vh(0.8),
          }}
        >
          <View
            style={{
              borderBottomColor: "#a09a9a",
              borderBottomWidth: 0.3,
            }}
          />
        </View>
        <View
          style={{
            alignSelf: "center",
            width: widthPercentageToDP("90%"),
            marginHorizontal: widthPercentageToDP("0%"),
          }}
        >
          <CalendarList
            style={{
              borderColor: "transparent",
              marginBottom: vh(20),
              marginTop: 0,
              margin: -20,
              marginVertical: -40,
            }}
            theme={{
              todayTextColor: "red",
              "stylesheet.day.basic": {
                base: {
                  height: 40,
                  width: 40,
                  borderRadius: 8,
                  borderColor: "#163861",
                  overflow: "hidden",
                  borderWidth: 2,
                  // alignSelf: "center",
                },
              },
              textDayFontSize: 20,
              backgroundColor: "red",
              calendarBackground: "transparent",
              monthTextColor: "#ffffff",
              dayTextColor: "white",
              textMonthFontWeight: "bold",
              textMonthFontSize: 20,
              textDayStyle: {
                color: "white",
                fontWeight: "bold",
                borderRadius: 8,
                alignSelf: "center",
              },
            }}
            current={CurrentDate}
            key={CurrentDate}
            pastScrollRange={11}
            futureScrollRange={11}
            scrollEnabled={true}
            showScrollIndicator={true}
            hideDayNames={true}
            monthFormat={"MMM"}
            pagingEnabled={false}
            calendarWidth={200}
            markingType={"custom"}
            markedDates={newDate}
          />
        </View>
      </SafeAreaView>
      <View
        style={{
          alignSelf: "center",
          position: "absolute",
          width: wp("100%"),
          bottom: 0,
          backgroundColor: "rgba(18, 6, 30, 0.9)",
          padding: 20,
          paddingTop: 0,
          borderTopWidth: 0.8,
          borderColor: "#12061E",
        }}
      >
        <View style={{ flexDirection: "row", flex: 1, marginTop: vh(1) }}>
          <Text.TagTitle style={{ fontSize: vh(2) }}>95 edits in the last year</Text.TagTitle>
          <Text.TagTitle style={{ fontSize: 10, left: vw(5), color: "#1DAEFF" }}>
            Learn how we count edits
          </Text.TagTitle>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 2 }}>
            <View style={{ height: vh(2), width: vw(4), backgroundColor: "#163861" }}></View>
            <Text.TagTitle style={{ fontSize: 13, left: 5 }}>{Low} low days</Text.TagTitle>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 2 }}>
            <View style={{ height: vh(2), width: vw(4), backgroundColor: "#1973B0" }}></View>
            <Text.TagTitle style={{ fontSize: 13, left: 5 }}>{Normal} normal days</Text.TagTitle>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ height: vh(2), width: vw(4), backgroundColor: "#1DAEFF" }}></View>
            <Text.TagTitle style={{ fontSize: 13, left: 5 }}>{Hard} hard days</Text.TagTitle>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: widthPercentageToDP("100%"),
    alignItems: "center",
    flex: 1,
  },
  container: {
    height: heightPercentageToDP("100%"),

    width: widthPercentageToDP("95%"),
  },
  goBack: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 26,
  },
  avatarEdit: {
    marginBottom: 74,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 80,
    opacity: 0.5,
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
  },
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#12061E",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 16,
  },
  imageChooseMethods: {
    display: "flex",
    flexDirection: "row",
  },
  imageChooseMethod: {
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "column",
    marginVertical: 10,
    width: "50%",
  },
  Textmargin: {
    marginHorizontal: wp("5.2%"),
  },
});

export default TrackingWorkInfo;
