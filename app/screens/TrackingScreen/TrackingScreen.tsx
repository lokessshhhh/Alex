import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import React, { useEffect, useState, useRef } from "react";
import { Colors,  } from "style";
import { Icon, Text, } from "components";
import imagePath from "constant/imagePath";
// import styles from 'components/Text/styles';
import { vw, vh } from "react-native-css-vh-vw";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { navigate } from "navigation";
import { hasPath } from "ramda";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { Font } from "style";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BaseURl from "constant/BaseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";

function TrackingScreen() {
  const { width, height } = Dimensions.get("window");
  const [Hard, SetHard] = useState([]);
  const [Normal, SetNormal] = useState([]);
  const [Low, SetLow] = useState([]);
  const [selectedEndDate, setSelectedEndDate] = useState([
    `${new Date().getFullYear()}-01-01`,
    `${new Date().getFullYear()}-02-01`,
    `${new Date().getFullYear()}-03-01`,
    `${new Date().getFullYear()}-04-01`,
    `${new Date().getFullYear()}-05-01`,
    `${new Date().getFullYear()}-06-01`,
    `${new Date().getFullYear()}-07-01`,
    `${new Date().getFullYear()}-08-01`,
    `${new Date().getFullYear()}-09-01`,
    `${new Date().getFullYear()}-10-01`,
    `${new Date().getFullYear()}-11-01`,
    `${new Date().getFullYear()}-12-01`,
  ]);
  const [currentYear, setCurrentYear] = useState("");
  const [newDate, setnewDate] = useState({});

  useEffect(() => {
    const current = moment().format("YYYY");
    console.log("current year", current);
    setCurrentYear(current);
    mark();
  }, []);

  const navigation = useNavigation();
  const navigator = navigate(navigation);

  const JanPosition = async () => {
    await AsyncStorage.setItem("Date", JSON.stringify(selectedEndDate[0]));
  };
  const FebPosition = async () => {
    await AsyncStorage.setItem("Date", JSON.stringify(selectedEndDate[1]));
  };
  const MarPosition = async () => {
    await AsyncStorage.setItem("Date", JSON.stringify(selectedEndDate[2]));
  };
  const AprPosition = async () => {
    await AsyncStorage.setItem("Date", JSON.stringify(selectedEndDate[3]));
  };
  const MayPosition = async () => {
    await AsyncStorage.setItem("Date", JSON.stringify(selectedEndDate[4]));
  };
  const JunPosition = async () => {
    await AsyncStorage.setItem("Date", JSON.stringify(selectedEndDate[5]));
  };
  const JulPosition = async () => {
    await AsyncStorage.setItem("Date", JSON.stringify(selectedEndDate[6]));
  };
  const AugPosition = async () => {
    await AsyncStorage.setItem("Date", JSON.stringify(selectedEndDate[7]));
  };
  const SepPosition = async () => {
    await AsyncStorage.setItem("Date", JSON.stringify(selectedEndDate[8]));
  };
  const OctPosition = async () => {
    await AsyncStorage.setItem("Date", JSON.stringify(selectedEndDate[9]));
  };
  const NovPosition = async () => {
    await AsyncStorage.setItem("Date", JSON.stringify(selectedEndDate[10]));
  };

  const DecPosition = async () => {
    await AsyncStorage.setItem("Date", JSON.stringify(selectedEndDate[11]));
  };

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
                    "stylesheet.day.basic": {
                      base: {
                        height: 5,
                      },
                    },
                    text: {
                      height: 10,
                      width: 10,
                      backgroundColor: "#163861",
                      borderRadius: 2,
                      // borderWidth: 2,
                      borderColor: "transparent",
                      alignSelf: "center",
                      overflow: "hidden",
                    },
                  },
                })
              : item.totalTime < 8
              ? (NeWmark[item.date] = {
                  customStyles: {
                    "stylesheet.day.basic": {
                      base: {
                        height: 5,
                      },
                    },
                    text: {
                      height: 10,
                      width: 10,
                      backgroundColor: "#1973B0",
                      borderRadius: 2,
                      // borderWidth: 2,
                      borderColor: "transparent",
                      alignSelf: "center",
                      overflow: "hidden",
                    },
                  },
                })
              : item.totalTime > 8
              ? (NeWmark[item.date] = {
                  customStyles: {
                    "stylesheet.day.basic": {
                      base: {
                        height: 5,
                      },
                    },
                    text: {
                      height: 10,
                      width: 10,
                      backgroundColor: "#1DAEFF",
                      borderRadius: 2,
                      // borderWidth: 2,
                      borderColor: "transparent",
                      alignSelf: "center",
                      overflow: "hidden",
                    },
                  },
                })
              : null;
          });

          let hard = [];
          let normal = [];
          let low = [];
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
          console.log(NeWmark, "API Dates");
        })
        .catch((error) => {
          console.log(error, "======err==========");
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
            navigation.goBack();
            console.log('kokoko====');
            
            }}
            style={[styles.goBack, { paddingLeft: 15 }]}
          >
            <MaterialIcons name="arrow-back" color={Colors.blue} size={24} />
          </TouchableOpacity>
          <Text.Header style={{ marginBottom: 0, fontWeight: "900", paddingLeft: 15 }}>
            {"Work Info"}
          </Text.Header>
        </View>
        {/* line */}
        <View
          style={{
            marginTop: vh(0.5),
            marginBottom: 0,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              borderBottomColor: "#a09a9a",
              borderBottomWidth: 0.3,
              width: wp("100%"),
            }}
          />
        </View>
        <ScrollView
        contentContainerStyle={{paddingBottom:vh(30)}}
        // style={{ paddingBottom:vh(30)}}
        >
          <Text.Header
            style={{
              marginBottom: 0,
              fontWeight: "900",
              paddingLeft: 15,
              fontFamily: Font.FontFamily.Mulish,
            }}
          >
            {currentYear}
          </Text.Header>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <TouchableOpacity
              onPress={() => {
                JanPosition();
                navigator.trackingWorkInfoScreen();
              }}
            >
              <View>
                <Calendar
                  markedDates={newDate}
                  current={selectedEndDate[0]}
                  hideExtraDays
                  disableAllTouchEventsForDisabledDays
                  firstDay={1}
                  markingType={"custom"}
                  dayShape="square"
                  date="hide"
                  monthFormat={"MMM"}
                  hideDayNames={true}
                  style={{
                    width: width * 0.3,
                    // height: height * 0.35,
                    backgroundColor: "transparent",
                    marginHorizontal: width * 0.01,
                  }}
                  theme={{
                    todayTextColor: "transparent",
                    "stylesheet.calendar.header": {
                      monthText: {
                        fontFamily: Font.FontFamily.Mulish,
                        fontSize: 15,
                        fontWeight: "bold", // default is 300
                        color: "#fff", // default,
                        textTransform: "uppercase",
                      },
                    },
                    // textMonthFontFamily:Font.FontFamily.Mulish,
                    textMonthFontSize: 15,
                    textMonthFontWeight: "bold",
                    // textDayFontSize: 10,
                    "stylesheet.day.basic": {
                      base: {
                        height: 5,
                      },
                    },
                    calendarBackground: "transparent",
                    monthTextColor: "white",
                    textDayStyle: {
                      height: 10,
                      width: 10,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: "#163861",
                      alignSelf: "center",
                    },
                    dayTextColor: "transparent",
                    backgroundColor: "red",
                  }}
                  hideArrows={true}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                FebPosition();
                navigator.trackingWorkInfoScreen();
              }}
            >
              <View>
                <Calendar
                  markedDates={newDate}
                  current={selectedEndDate[1]}
                  hideExtraDays
                  disableAllTouchEventsForDisabledDays
                  firstDay={1}
                  markingType={"custom"}
                  dayShape="square"
                  date="hide"
                  monthFormat={"MMM"}
                  hideDayNames={true}
                  style={{
                    width: width * 0.3,
                    // height: height * 0.35,
                    backgroundColor: "transparent",
                    marginHorizontal: width * 0.01,
                  }}
                  theme={{
                    todayTextColor: "transparent",
                    "stylesheet.calendar.header": {
                      monthText: {
                        fontFamily: Font.FontFamily.Mulish,
                        fontSize: 15,
                        fontWeight: "bold", // default is 300
                        color: "#fff", // default,
                        textTransform: "uppercase",
                      },
                    },
                    // textMonthFontFamily:Font.FontFamily.Mulish,
                    textMonthFontSize: 15,
                    textMonthFontWeight: "bold",
                    // textDayFontSize: 10,
                    "stylesheet.day.basic": {
                      base: {
                        // width: 15,
                        height: 5,
                      },
                    },
                    calendarBackground: "transparent",
                    monthTextColor: "white",
                    textDayStyle: {
                      height: 10,
                      width: 10,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: "#163861",
                      alignSelf: "center",
                    },
                    dayTextColor: "transparent",
                    backgroundColor: "red",
                  }}
                  hideArrows={true}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                MarPosition();
                navigator.trackingWorkInfoScreen();
              }}
            >
              <View>
                <Calendar
                  markedDates={newDate}
                  current={selectedEndDate[2]}
                  hideExtraDays
                  disableAllTouchEventsForDisabledDays
                  firstDay={1}
                  markingType={"custom"}
                  dayShape="square"
                  date="hide"
                  monthFormat={"MMM"}
                  hideDayNames={true}
                  style={{
                    width: width * 0.3,
                    // height: height * 0.35,
                    backgroundColor: "transparent",
                    marginHorizontal: width * 0.01,
                  }}
                  theme={{
                    todayTextColor: "transparent",
                    "stylesheet.calendar.header": {
                      monthText: {
                        fontFamily: Font.FontFamily.Mulish,
                        fontSize: 15,
                        fontWeight: "bold", // default is 300
                        color: "#fff", // default,
                        textTransform: "uppercase",
                      },
                    },
                    // textMonthFontFamily:Font.FontFamily.Mulish,
                    textMonthFontSize: 15,
                    textMonthFontWeight: "bold",
                    // textDayFontSize: 10,
                    "stylesheet.day.basic": {
                      base: {
                        // width: 15,
                        height: 5,
                      },
                    },
                    calendarBackground: "transparent",
                    monthTextColor: "white",
                    textDayStyle: {
                      height: 10,
                      width: 10,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: "#163861",
                      alignSelf: "center",
                    },
                    dayTextColor: "transparent",
                    backgroundColor: "red",
                  }}
                  hideArrows={true}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <TouchableOpacity
              onPress={() => {
                AprPosition();
                navigator.trackingWorkInfoScreen();
              }}
            >
              <View>
                <Calendar
                  markedDates={newDate}
                  current={selectedEndDate[3]}
                  hideExtraDays
                  disableAllTouchEventsForDisabledDays
                  firstDay={1}
                  markingType={"custom"}
                  dayShape="square"
                  date="hide"
                  monthFormat={"MMM"}
                  hideDayNames={true}
                  style={{
                    width: width * 0.3,
                    // height: height * 0.35,
                    backgroundColor: "transparent",
                    marginHorizontal: width * 0.01,
                  }}
                  theme={{
                    todayTextColor: "transparent",
                    "stylesheet.calendar.header": {
                      monthText: {
                        fontFamily: Font.FontFamily.Mulish,
                        fontSize: 15,
                        fontWeight: "bold", // default is 300
                        color: "#fff", // default,
                        textTransform: "uppercase",
                      },
                    },
                    // textMonthFontFamily:Font.FontFamily.Mulish,
                    textMonthFontSize: 15,
                    textMonthFontWeight: "bold",
                    // textDayFontSize: 10,
                    "stylesheet.day.basic": {
                      base: {
                        // width: 15,
                        height: 5,
                      },
                    },
                    calendarBackground: "transparent",
                    monthTextColor: "white",
                    textDayStyle: {
                      height: 10,
                      width: 10,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: "#163861",
                      alignSelf: "center",
                    },
                    dayTextColor: "transparent",
                    backgroundColor: "red",
                  }}
                  hideArrows={true}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                MayPosition();
                navigator.trackingWorkInfoScreen();
              }}
            >
              <View>
                <Calendar
                  markedDates={newDate}
                  current={selectedEndDate[4]}
                  hideExtraDays
                  disableAllTouchEventsForDisabledDays
                  firstDay={1}
                  markingType={"custom"}
                  dayShape="square"
                  date="hide"
                  monthFormat={"MMM"}
                  hideDayNames={true}
                  style={{
                    width: width * 0.3,
                    // height: height * 0.35,
                    backgroundColor: "transparent",
                    marginHorizontal: width * 0.01,
                  }}
                  theme={{
                    todayTextColor: "transparent",
                    "stylesheet.calendar.header": {
                      monthText: {
                        fontFamily: Font.FontFamily.Mulish,
                        fontSize: 15,
                        fontWeight: "bold", // default is 300
                        color: "#fff", // default,
                        textTransform: "uppercase",
                      },
                    },
                    // textMonthFontFamily:Font.FontFamily.Mulish,
                    textMonthFontSize: 15,
                    textMonthFontWeight: "bold",
                    // textDayFontSize: 10,
                    "stylesheet.day.basic": {
                      base: {
                        // width: 15,
                        height: 5,
                      },
                    },
                    calendarBackground: "transparent",
                    monthTextColor: "white",
                    textDayStyle: {
                      height: 10,
                      width: 10,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: "#163861",
                      alignSelf: "center",
                    },
                    dayTextColor: "transparent",
                    backgroundColor: "red",
                  }}
                  hideArrows={true}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                JunPosition();
                navigator.trackingWorkInfoScreen();
              }}
            >
              <View>
                <Calendar
                  markedDates={newDate}
                  current={selectedEndDate[5]}
                  hideExtraDays
                  disableAllTouchEventsForDisabledDays
                  firstDay={1}
                  markingType={"custom"}
                  dayShape="square"
                  date="hide"
                  monthFormat={"MMM"}
                  hideDayNames={true}
                  style={{
                    width: width * 0.3,
                    // height: height * 0.35,
                    backgroundColor: "transparent",
                    marginHorizontal: width * 0.01,
                  }}
                  theme={{
                    todayTextColor: "transparent",
                    "stylesheet.calendar.header": {
                      monthText: {
                        fontFamily: Font.FontFamily.Mulish,
                        fontSize: 15,
                        fontWeight: "bold", // default is 300
                        color: "#fff", // default,
                        textTransform: "uppercase",
                      },
                    },
                    // textMonthFontFamily:Font.FontFamily.Mulish,
                    textMonthFontSize: 15,
                    textMonthFontWeight: "bold",
                    // textDayFontSize: 10,
                    "stylesheet.day.basic": {
                      base: {
                        // width: 15,
                        height: 5,
                      },
                    },
                    calendarBackground: "transparent",
                    monthTextColor: "white",
                    textDayStyle: {
                      height: 10,
                      width: 10,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: "#163861",
                      alignSelf: "center",
                    },
                    dayTextColor: "transparent",
                    backgroundColor: "red",
                  }}
                  hideArrows={true}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <TouchableOpacity
              onPress={() => {
                JulPosition();
                navigator.trackingWorkInfoScreen();
              }}
            >
              <View>
                <Calendar
                  markedDates={newDate}
                  current={selectedEndDate[6]}
                  hideExtraDays
                  disableAllTouchEventsForDisabledDays
                  firstDay={1}
                  markingType={"custom"}
                  dayShape="square"
                  date="hide"
                  monthFormat={"MMM"}
                  hideDayNames={true}
                  style={{
                    width: width * 0.3,
                    // height: height * 0.35,
                    backgroundColor: "transparent",
                    marginHorizontal: width * 0.01,
                  }}
                  theme={{
                    todayTextColor: "transparent",
                    "stylesheet.calendar.header": {
                      monthText: {
                        fontFamily: Font.FontFamily.Mulish,
                        fontSize: 15,
                        fontWeight: "bold", // default is 300
                        color: "#fff", // default,
                        textTransform: "uppercase",
                      },
                    },
                    // textMonthFontFamily:Font.FontFamily.Mulish,
                    textMonthFontSize: 15,
                    textMonthFontWeight: "bold",
                    // textDayFontSize: 10,
                    "stylesheet.day.basic": {
                      base: {
                        // width: 15,
                        height: 5,
                      },
                    },
                    calendarBackground: "transparent",
                    monthTextColor: "white",
                    textDayStyle: {
                      height: 10,
                      width: 10,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: "#163861",
                      alignSelf: "center",
                    },
                    dayTextColor: "transparent",
                    backgroundColor: "red",
                  }}
                  hideArrows={true}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                AugPosition();
                navigator.trackingWorkInfoScreen();
              }}
            >
              <View>
                <Calendar
                  markedDates={newDate}
                  current={selectedEndDate[7]}
                  hideExtraDays
                  disableAllTouchEventsForDisabledDays
                  firstDay={1}
                  markingType={"custom"}
                  dayShape="square"
                  date="hide"
                  monthFormat={"MMM"}
                  hideDayNames={true}
                  style={{
                    width: width * 0.3,
                    // height: height * 0.35,
                    backgroundColor: "transparent",
                    marginHorizontal: width * 0.01,
                  }}
                  theme={{
                    todayTextColor: "transparent",
                    "stylesheet.calendar.header": {
                      monthText: {
                        fontFamily: Font.FontFamily.Mulish,
                        fontSize: 15,
                        fontWeight: "bold", // default is 300
                        color: "#fff", // default,
                        textTransform: "uppercase",
                      },
                    },
                    // textMonthFontFamily:Font.FontFamily.Mulish,
                    textMonthFontSize: 15,
                    textMonthFontWeight: "bold",
                    // textDayFontSize: 10,
                    "stylesheet.day.basic": {
                      base: {
                        // width: 15,
                        height: 5,
                      },
                    },
                    calendarBackground: "transparent",
                    monthTextColor: "white",
                    textDayStyle: {
                      height: 10,
                      width: 10,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: "#163861",
                      alignSelf: "center",
                    },
                    dayTextColor: "transparent",
                    backgroundColor: "red",
                  }}
                  hideArrows={true}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                SepPosition();
                navigator.trackingWorkInfoScreen();
              }}
            >
              <View>
                <Calendar
                  markedDates={newDate}
                  current={selectedEndDate[8]}
                  hideExtraDays
                  disableAllTouchEventsForDisabledDays
                  firstDay={1}
                  markingType={"custom"}
                  dayShape="square"
                  date="hide"
                  monthFormat={"MMM"}
                  hideDayNames={true}
                  style={{
                    width: width * 0.3,
                    // height: height * 0.35,
                    backgroundColor: "transparent",
                    marginHorizontal: width * 0.01,
                  }}
                  theme={{
                    todayTextColor: "transparent",
                    "stylesheet.calendar.header": {
                      monthText: {
                        fontFamily: Font.FontFamily.Mulish,
                        fontSize: 15,
                        fontWeight: "bold", // default is 300
                        color: "#fff", // default,
                        textTransform: "uppercase",
                      },
                    },
                    // textMonthFontFamily:Font.FontFamily.Mulish,
                    textMonthFontSize: 15,
                    textMonthFontWeight: "bold",
                    // textDayFontSize: 10,
                    "stylesheet.day.basic": {
                      base: {
                        // width: 15,
                        height: 5,
                      },
                    },
                    calendarBackground: "transparent",
                    monthTextColor: "white",
                    textDayStyle: {
                      height: 10,
                      width: 10,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: "#163861",
                      alignSelf: "center",
                    },
                    dayTextColor: "transparent",
                    backgroundColor: "red",
                  }}
                  hideArrows={true}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <TouchableOpacity
              onPress={() => {
                OctPosition();
                navigator.trackingWorkInfoScreen();
              }}
            >
              <View>
                <Calendar
                  markedDates={newDate}
                  current={selectedEndDate[9]}
                  hideExtraDays
                  disableAllTouchEventsForDisabledDays
                  firstDay={1}
                  markingType={"custom"}
                  dayShape="square"
                  date="hide"
                  monthFormat={"MMM"}
                  hideDayNames={true}
                  style={{
                    width: width * 0.3,
                    // height: height * 0.35,
                    backgroundColor: "transparent",
                    marginHorizontal: width * 0.01,
                  }}
                  theme={{
                    todayTextColor: "transparent",
                    "stylesheet.calendar.header": {
                      monthText: {
                        fontFamily: Font.FontFamily.Mulish,
                        fontSize: 15,
                        fontWeight: "bold", // default is 300
                        color: "#fff", // default,
                        textTransform: "uppercase",
                      },
                    },
                    // textMonthFontFamily:Font.FontFamily.Mulish,
                    textMonthFontSize: 15,
                    textMonthFontWeight: "bold",
                    // textDayFontSize: 10,
                    "stylesheet.day.basic": {
                      base: {
                        // width: 15,
                        height: 5,
                      },
                    },
                    calendarBackground: "transparent",
                    monthTextColor: "white",
                    textDayStyle: {
                      height: 10,
                      width: 10,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: "#163861",
                      alignSelf: "center",
                    },
                    dayTextColor: "transparent",
                    backgroundColor: "red",
                  }}
                  hideArrows={true}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                NovPosition();
                navigator.trackingWorkInfoScreen();
              }}
            >
              <View>
                <Calendar
                  markedDates={newDate}
                  current={selectedEndDate[10]}
                  hideExtraDays
                  disableAllTouchEventsForDisabledDays
                  firstDay={1}
                  markingType={"custom"}
                  dayShape="square"
                  date="hide"
                  monthFormat={"MMM"}
                  hideDayNames={true}
                  style={{
                    width: width * 0.3,
                    // height: height * 0.35,
                    backgroundColor: "transparent",
                    marginHorizontal: width * 0.01,
                  }}
                  theme={{
                    todayTextColor: "transparent",
                    "stylesheet.calendar.header": {
                      monthText: {
                        fontFamily: Font.FontFamily.Mulish,
                        fontSize: 15,
                        fontWeight: "bold", // default is 300
                        color: "#fff", // default,
                        textTransform: "uppercase",
                      },
                    },
                    // textMonthFontFamily:Font.FontFamily.Mulish,
                    textMonthFontSize: 15,
                    textMonthFontWeight: "bold",
                    // textDayFontSize: 10,
                    "stylesheet.day.basic": {
                      base: {
                        // width: 15,
                        height: 5,
                      },
                    },
                    calendarBackground: "transparent",
                    monthTextColor: "white",
                    textDayStyle: {
                      height: 10,
                      width: 10,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: "#163861",
                      alignSelf: "center",
                    },
                    dayTextColor: "transparent",
                    backgroundColor: "red",
                  }}
                  hideArrows={true}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                DecPosition();
                navigator.trackingWorkInfoScreen();
              }}
            >
              <View>
                <Calendar
                  markedDates={newDate}
                  current={selectedEndDate[11]}
                  hideExtraDays
                  disableAllTouchEventsForDisabledDays
                  firstDay={1}
                  markingType={"custom"}
                  dayShape="square"
                  date="hide"
                  monthFormat={"MMM"}
                  hideDayNames={true}
                  style={{
                    width: width * 0.3,
                    // height: height * 0.35,
                    backgroundColor: "transparent",
                    marginHorizontal: width * 0.01,
                  }}
                  theme={{
                    todayTextColor: "transparent",
                    "stylesheet.calendar.header": {
                      monthText: {
                        fontFamily: Font.FontFamily.Mulish,
                        fontSize: 15,
                        fontWeight: "bold", // default is 300
                        color: "#fff", // default,
                        textTransform: "uppercase",
                      },
                    },
                    // textMonthFontFamily:Font.FontFamily.Mulish,
                    textMonthFontSize: 15,
                    textMonthFontWeight: "bold",
                    // textDayFontSize: 10,
                    "stylesheet.day.basic": {
                      base: {
                        // width: 15,
                        height: 5,
                      },
                    },
                    calendarBackground: "transparent",
                    monthTextColor: "white",
                    textDayStyle: {
                      height: 10,
                      width: 10,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: "#163861",
                      alignSelf: "center",
                    },
                    dayTextColor: "transparent",
                    backgroundColor: "red",
                  }}
                  hideArrows={true}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

     
      </SafeAreaView>
      <View
          style={{
            alignSelf: "center",
            position: "absolute",
            width: wp("100%"),
            bottom:0,
            backgroundColor: "#12061E",
            padding: 20,
            paddingTop: -20,
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
    // height: heightPercentageToDP("100%"),
    width: widthPercentageToDP("100%"),
    alignItems: "center",
    flex: 1,
  },
  container: {
    width: widthPercentageToDP("95%"),
  },
  goBack: {
    alignSelf: "flex-start",
    marginBottom: 16,
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
    borderRadius: 100,
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
  boxcontainer: {
    height: 15,
    width: 15,
    borderRadius: 5,
    backgroundColor: "#b75310",
  },
  CalenderWrapper: {
    height: 100,
    width: 200,
  },
  Textmargin: {
    paddingHorizontal: wp("5.5%"),
  },
});

export default TrackingScreen;

// IT WAS COMMENTED BEFORE ====================================================================

// markedDates={days}
// markedDates={{
//   [`${new Date().getFullYear()}-01-01`]: {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#070606",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   [`${new Date().getFullYear()}-01-02`]: {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#5d4d43",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },
//   "2022-01-03": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#163861",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-04": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-05": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#163861",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-06": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-07": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-08": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#163861",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-09": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-10": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-11": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-12": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-13": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-14": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-15": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-16": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#163861",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-17": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-18": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#163861",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-19": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },
//   "2022-01-20": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#163861",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },
//   "2022-01-21": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },
//   "2022-01-22": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },
//   "2022-01-23": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#163861",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },
//   "2022-01-24": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },
//   "2022-01-25": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },
//   "2022-01-26": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#163861",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },
//   "2022-01-27": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#1973B0",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },

//   "2022-01-28": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#163861",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },
//   "2022-01-29": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#163861",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },
//   "2022-01-30": {
//     selected: true,
//     customStyles: {
//       container: {
//         height: 15,
//         width: 15,
//         borderRadius: 5,
//         backgroundColor: "#163861",
//       },
//       text: {
//         color: "transparent",
//       },
//     },
//   },
// }}
// IT WAS COMMENTED BEFORE====================================================================

// IT WAS COMMENTED BEFORE====================================================================

// markedDates={days}
// markedDates={{
//     [`${new Date().getFullYear()}-01-01`]: {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#070606'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },
//
//     [`${new Date().getFullYear()}-01-02`]: {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#5d4d43'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },
//     '2022-01-03': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#163861'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-04': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-05': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#163861'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-06': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-07': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-08': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#163861'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-09': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-10': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-11': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-12': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-13': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-14': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-15': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-16': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#163861'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-17': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-18': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#163861'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-19': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },
//     '2022-01-20': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#163861'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },
//     '2022-01-21': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },
//     '2022-01-22': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },
//     '2022-01-23': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#163861'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },
//     '2022-01-24': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },
//     '2022-01-25': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },
//     '2022-01-26': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#163861'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },
//     '2022-01-27': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

//     '2022-01-28': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#163861'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },
//     '2022-01-29': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#163861'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },
//     '2022-01-30': {
//         selected: true, customStyles: {
//             container: {
//                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#163861'

//             },
//             text: {
//                 color: 'transparent',
//             }
//         }
//     },

// }}

// IT WAS COMMENTED BEFORE====================================================================

// <View style={{ flexDirection: "row", marginTop: vh(-10) }}>
// {/* march */}
// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
//   <View>
//     <Calendar
//       current={`${new Date().getFullYear()}-03-01`}
//       hideExtraDays
//       disableAllTouchEventsForDisabledDays
//       firstDay={1}
//       markingType={"custom"}
//       dayShape="square"
//       date="hide"
//       monthFormat={"MMM"}
//       hideDayNames={true}
//       style={{
//         width: width * 0.45,
//         height: height * 0.45,
//         backgroundColor: "transparent",
//         // marginLeft:width * 0.02
//       }}
//       theme={{
//         // textDayFontSize: 10,
//         calendarBackground: "transparent",
//         monthTextColor: "white",
//         textDayStyle: {
//           height: 15,
//           width: 15,
//           borderRadius: 5,
//           borderWidth: 2.5,
//           borderColor: "#163861",
//           alignSelf: "center",
//         },
//         dayTextColor: "transparent",
//         backgroundColor: "transparent",
//       }}
//       hideArrows={true}
//     />
//   </View>
// </TouchableOpacity>

// {/* April */}
// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
//   <View>
//     <Calendar
//       current={`${new Date().getFullYear()}-04-01`}
//       hideExtraDays
//       disableAllTouchEventsForDisabledDays
//       firstDay={1}
//       markingType={"custom"}
//       dayShape="square"
//       date="hide"
//       monthFormat={"MMM"}
//       hideDayNames={true}
//       style={{
//         width: width * 0.45,
//         height: height * 0.45,
//         backgroundColor: "transparent",
//         marginLeft: width * 0.02,
//       }}
//       theme={{
//         // textDayFontSize: 10,
//         calendarBackground: "transparent",
//         monthTextColor: "white",
//         textDayStyle: {
//           height: 15,
//           width: 15,
//           borderRadius: 5,
//           borderWidth: 2.5,
//           borderColor: "#163861",
//           alignSelf: "center",
//         },
//         dayTextColor: "transparent",
//         backgroundColor: "transparent",
//       }}
//       hideArrows={true}
//     />
//   </View>
// </TouchableOpacity>
// </View>

// {/* may june */}
// <View style={{ flexDirection: "row", marginTop: vh(-10) }}>
// {/* may */}
// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
//   <View>
//     <Calendar
//       current={`${new Date().getFullYear()}-05-01`}
//       hideExtraDays
//       disableAllTouchEventsForDisabledDays
//       firstDay={1}
//       markingType={"custom"}
//       dayShape="square"
//       date="hide"
//       monthFormat={"MMM"}
//       hideDayNames={true}
//       style={{
//         width: width * 0.45,
//         height: height * 0.45,
//         backgroundColor: "transparent",
//       }}
//       theme={{
//         // textDayFontSize: 10,
//         calendarBackground: "transparent",
//         monthTextColor: "white",
//         textDayStyle: {
//           height: 15,
//           width: 15,
//           borderRadius: 5,
//           borderWidth: 2.5,
//           borderColor: "#163861",
//           alignSelf: "center",
//         },
//         dayTextColor: "transparent",
//         backgroundColor: "transparent",
//       }}
//       hideArrows={true}
//     />
//   </View>
// </TouchableOpacity>

// {/* June */}
// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
//   <View>
//     <Calendar
//       current={`${new Date().getFullYear()}-06-01`}
//       hideExtraDays
//       disableAllTouchEventsForDisabledDays
//       firstDay={1}
//       markingType={"custom"}
//       dayShape="square"
//       date="hide"
//       monthFormat={"MMM"}
//       hideDayNames={true}
//       style={{
//         width: width * 0.45,
//         height: height * 0.45,
//         backgroundColor: "transparent",
//         marginLeft: width * 0.02,
//       }}
//       theme={{
//         // textDayFontSize: 10,
//         calendarBackground: "transparent",
//         monthTextColor: "white",
//         textDayStyle: {
//           height: 15,
//           width: 15,
//           borderRadius: 5,
//           borderWidth: 2.5,
//           borderColor: "#163861",
//           alignSelf: "center",
//         },
//         dayTextColor: "transparent",
//         backgroundColor: "transparent",
//       }}
//       hideArrows={true}
//     />
//   </View>
// </TouchableOpacity>
// </View>

// {/* july Aug */}

// <View style={{ flexDirection: "row", marginTop: vh(-10) }}>
// {/* may */}
// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
//   <View>
//     <Calendar
//       current={`${new Date().getFullYear()}-07-01`}
//       hideExtraDays
//       disableAllTouchEventsForDisabledDays
//       firstDay={1}
//       markingType={"custom"}
//       dayShape="square"
//       date="hide"
//       monthFormat={"MMM"}
//       hideDayNames={true}
//       style={{
//         width: width * 0.45,
//         height: height * 0.45,
//         backgroundColor: "transparent",
//       }}
//       theme={{
//         // textDayFontSize: 10,
//         calendarBackground: "transparent",
//         monthTextColor: "white",
//         textDayStyle: {
//           height: 15,
//           width: 15,
//           borderRadius: 5,
//           borderWidth: 2.5,
//           borderColor: "#163861",
//           alignSelf: "center",
//         },
//         dayTextColor: "transparent",
//         backgroundColor: "transparent",
//       }}
//       hideArrows={true}
//     />
//   </View>
// </TouchableOpacity>

// {/* June */}

// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
//   <View>
//     <Calendar
//       current={`${new Date().getFullYear()}-08-01`}
//       hideExtraDays
//       disableAllTouchEventsForDisabledDays
//       firstDay={1}
//       markingType={"custom"}
//       dayShape="square"
//       date="hide"
//       monthFormat={"MMM"}
//       hideDayNames={true}
//       style={{
//         width: width * 0.45,
//         height: height * 0.45,
//         backgroundColor: "transparent",
//         marginLeft: width * 0.02,
//       }}
//       theme={{
//         // textDayFontSize: 10,
//         calendarBackground: "transparent",
//         monthTextColor: "white",
//         textDayStyle: {
//           height: 15,
//           width: 15,
//           borderRadius: 5,
//           borderWidth: 2.5,
//           borderColor: "#163861",
//           alignSelf: "center",
//         },
//         dayTextColor: "transparent",
//         backgroundColor: "transparent",
//       }}
//       hideArrows={true}
//     />
//   </View>
// </TouchableOpacity>
// </View>

// {/* sep oct */}

// <View style={{ flexDirection: "row", marginTop: vh(-10) }}>
// {/* sep */}
// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
//   <View>
//     <Calendar
//       current={`${new Date().getFullYear()}-09-01`}
//       hideExtraDays
//       disableAllTouchEventsForDisabledDays
//       firstDay={1}
//       markingType={"custom"}
//       dayShape="square"
//       date="hide"
//       monthFormat={"MMM"}
//       hideDayNames={true}
//       style={{
//         width: width * 0.45,
//         height: height * 0.45,
//         backgroundColor: "transparent",
//       }}
//       theme={{
//         // textDayFontSize: 10,
//         calendarBackground: "transparent",
//         monthTextColor: "white",
//         textDayStyle: {
//           height: 15,
//           width: 15,
//           borderRadius: 5,
//           borderWidth: 2.5,
//           borderColor: "#163861",
//           alignSelf: "center",
//         },
//         dayTextColor: "transparent",
//         backgroundColor: "transparent",
//       }}
//       hideArrows={true}
//     />
//   </View>
// </TouchableOpacity>

// {/* oct */}
// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
//   <View>
//     <Calendar
//       current={`${new Date().getFullYear()}-10-01`}
//       hideExtraDays
//       disableAllTouchEventsForDisabledDays
//       firstDay={1}
//       markingType={"custom"}
//       dayShape="square"
//       date="hide"
//       monthFormat={"MMM"}
//       hideDayNames={true}
//       style={{
//         width: width * 0.45,
//         height: height * 0.45,
//         backgroundColor: "transparent",
//         marginLeft: width * 0.02,
//       }}
//       theme={{
//         // textDayFontSize: 10,
//         calendarBackground: "transparent",
//         monthTextColor: "white",
//         textDayStyle: {
//           height: 15,
//           width: 15,
//           borderRadius: 5,
//           borderWidth: 1,
//           borderColor: "gray",
//           alignSelf: "center",
//         },
//         dayTextColor: "transparent",
//         backgroundColor: "transparent",
//       }}
//       hideArrows={true}
//     />
//   </View>
// </TouchableOpacity>
// </View>

// {/* nov dec */}

// <View style={{ flexDirection: "row", marginTop: vh(-10) }}>
// {/* nov */}

// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
//   <View>
//     <Calendar
//       current={`${new Date().getFullYear()}-11-01`}
//       hideExtraDays
//       disableAllTouchEventsForDisabledDays
//       firstDay={1}
//       markingType={"custom"}
//       dayShape="square"
//       date="hide"
//       monthFormat={"MMM"}
//       hideDayNames={true}
//       style={{
//         width: width * 0.45,
//         height: height * 0.45,
//         backgroundColor: "transparent",
//       }}
//       theme={{
//         // textDayFontSize: 10,
//         calendarBackground: "transparent",
//         monthTextColor: "white",
//         textDayStyle: {
//           height: 15,
//           width: 15,
//           borderRadius: 5,
//           borderWidth: 1,
//           borderColor: "gray",
//           alignSelf: "center",
//         },
//         dayTextColor: "transparent",
//         backgroundColor: "transparent",
//       }}
//       hideArrows={true}
//     />
//   </View>
// </TouchableOpacity>

// {/* dec */}
// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
//   <View>
//     <Calendar
//       current={`${new Date().getFullYear()}-12-01`}
//       hideExtraDays
//       disableAllTouchEventsForDisabledDays
//       firstDay={1}
//       markingType={"custom"}
//       dayShape="square"
//       date="hide"
//       monthFormat={"MMM"}
//       hideDayNames={true}
//       style={{
//         width: width * 0.45,
//         height: height * 0.45,
//         backgroundColor: "transparent",
//         marginLeft: width * 0.02,
//       }}
//       theme={{
//         // textDayFontSize: 10,
//         calendarBackground: "transparent",
//         monthTextColor: "white",
//         textDayStyle: {
//           height: 15,
//           width: 15,
//           borderRadius: 5,
//           borderWidth: 1,
//           borderColor: "gray",
//           alignSelf: "center",
//         },
//         dayTextColor: "transparent",
//         backgroundColor: "transparent",
//       }}
//       hideArrows={true}
//     />
//   </View>
// </TouchableOpacity>
// </View>

// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
// <View>
//   <Calendar
//     current={`${new Date().getFullYear()}-02-01`}
//     hideExtraDays
//     disableAllTouchEventsForDisabledDays
//     firstDay={1}
//     markingType={"custom"}
//     dayShape="square"
//     date="hide"
//     monthFormat={"MMM"}
//     hideDayNames={true}
//     style={{
//       width: width * 0.30,
//       // height: height * 0.35,
//       backgroundColor: "transparent",
//       marginLeft: width * 0.02,
//     }}
//     theme={{
//       // textDayFontSize: 10,
//       "stylesheet.day.basic": {
//         base: {
//           // width: 15,
//           height: 5,
//         },
//       },
//       calendarBackground: "transparent",
//       monthTextColor: "white",
//       textDayStyle: {
//         height: 10,
//         width: 10,
//         borderRadius: 2,
//         borderWidth: 2,
//         borderColor: "#163861",
//         alignSelf: "center",
//       },
//       dayTextColor: "transparent",
//       backgroundColor: "red",
//     }}
//     hideArrows={true}
//   />
// </View>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
// <View>
//   <Calendar
//     current={`${new Date().getFullYear()}-03-01`}
//     hideExtraDays
//     disableAllTouchEventsForDisabledDays
//     firstDay={1}
//     markingType={"custom"}
//     dayShape="square"
//     date="hide"
//     monthFormat={"MMM"}
//     hideDayNames={true}
//     style={{
//       // height: vw(35),
//       // width: vw(35),
//       width: width * 0.30,
//       // height: height * 0.45,
//       // height: 200,
//       // width: 200,

//       backgroundColor: "transparent",
//     }}
//     theme={{
//       // textDayFontSize: 10,
//       "stylesheet.day.basic": {
//         base: {
//           // width: 15,
//           height: 5,

//         },
//       },
//       calendarBackground: "transparent",
//       monthTextColor: "white",
//       textDayStyle: {
//         height: 10,
//         width: 10,
//         borderRadius: 2,
//         borderWidth: 2,
//         borderColor: "#163861",
//         alignSelf: "center",
//         marginHorizontal:10
//       },
//       dayTextColor: "transparent",
//       backgroundColor: "red",
//     }}
//     hideArrows={true}
//   />
// </View>
// </TouchableOpacity>
// </View>

// <View style={{ flexDirection: "row" }}>
// {/* Jan */}
// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
// <View>
//   <Calendar
//     current={`${new Date().getFullYear()}-04-01`}
//     hideExtraDays
//     disableAllTouchEventsForDisabledDays
//     firstDay={1}
//     markingType={"custom"}
//     dayShape="square"
//     date="hide"
//     monthFormat={"MMM"}
//     hideDayNames={true}
//     style={{
//       // height: vw(35),
//       // width: vw(35),
//       width: width * 0.30,
//       // height: height * 0.45,
//       // height: 200,
//       // width: 200,

//       backgroundColor: "transparent",
//     }}
//     theme={{
//       // textDayFontSize: 10,
//       "stylesheet.day.basic": {
//         base: {
//           // width: 15,
//           height: 5,

//         },
//       },
//       calendarBackground: "transparent",
//       monthTextColor: "white",
//       textDayStyle: {
//         height: 10,
//         width: 10,
//         borderRadius: 2,
//         borderWidth: 2,
//         borderColor: "#163861",
//         alignSelf: "center",
//         marginHorizontal:10
//       },
//       dayTextColor: "transparent",
//       backgroundColor: "red",
//     }}
//     hideArrows={true}
//   />
// </View>
// </TouchableOpacity>

// {/* Feb */}

// {/* <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
// <View>
//   <Calendar
//     theme={{
//       "stylesheet.day.basic": {
//         base: {
//           width: 5,
//           height: 10,
//         },
//       },
//     }}
//   />
// </View>
// </TouchableOpacity> */}

// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
// <View>
//   <Calendar
//     current={`${new Date().getFullYear()}-05-01`}
//     hideExtraDays
//     disableAllTouchEventsForDisabledDays
//     firstDay={1}
//     markingType={"custom"}
//     dayShape="square"
//     date="hide"
//     monthFormat={"MMM"}
//     hideDayNames={true}
//     style={{
//       width: width * 0.30,
//       // height: height * 0.35,
//       backgroundColor: "transparent",
//       marginLeft: width * 0.02,
//     }}
//     theme={{
//       // textDayFontSize: 10,
//       "stylesheet.day.basic": {
//         base: {
//           // width: 15,
//           height: 5,
//         },
//       },
//       calendarBackground: "transparent",
//       monthTextColor: "white",
//       textDayStyle: {
//         height: 10,
//         width: 10,
//         borderRadius: 2,
//         borderWidth: 2,
//         borderColor: "#163861",
//         alignSelf: "center",
//       },
//       dayTextColor: "transparent",
//       backgroundColor: "red",
//     }}
//     hideArrows={true}
//   />
// </View>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
// <View>
//   <Calendar
//     current={`${new Date().getFullYear()}-06-01`}
//     hideExtraDays
//     disableAllTouchEventsForDisabledDays
//     firstDay={1}
//     markingType={"custom"}
//     dayShape="square"
//     date="hide"
//     monthFormat={"MMM"}
//     hideDayNames={true}
//     style={{
//       // height: vw(35),
//       // width: vw(35),
//       width: width * 0.30,
//       // height: height * 0.45,
//       // height: 200,
//       // width: 200,

//       backgroundColor: "transparent",
//     }}
//     theme={{
//       // textDayFontSize: 10,
//       "stylesheet.day.basic": {
//         base: {
//           // width: 15,
//           height: 5,

//         },
//       },
//       calendarBackground: "transparent",
//       monthTextColor: "white",
//       textDayStyle: {
//         height: 10,
//         width: 10,
//         borderRadius: 2,
//         borderWidth: 2,
//         borderColor: "#163861",
//         alignSelf: "center",
//         marginHorizontal:10
//       },
//       dayTextColor: "transparent",
//       backgroundColor: "red",
//     }}
//     hideArrows={true}
//   />
// </View>
// </TouchableOpacity>
// </View>

// <View style={{ flexDirection: "row" }}>
// {/* Jan */}
// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
// <View>
//   <Calendar
//     current={`${new Date().getFullYear()}-07-01`}
//     hideExtraDays
//     disableAllTouchEventsForDisabledDays
//     firstDay={1}
//     markingType={"custom"}
//     dayShape="square"
//     date="hide"
//     monthFormat={"MMM"}
//     hideDayNames={true}
//     style={{
//       // height: vw(35),
//       // width: vw(35),
//       width: width * 0.30,
//       // height: height * 0.45,
//       // height: 200,
//       // width: 200,

//       backgroundColor: "transparent",
//     }}
//     theme={{
//       // textDayFontSize: 10,
//       "stylesheet.day.basic": {
//         base: {
//           // width: 15,
//           height: 5,

//         },
//       },
//       calendarBackground: "transparent",
//       monthTextColor: "white",
//       textDayStyle: {
//         height: 10,
//         width: 10,
//         borderRadius: 2,
//         borderWidth: 2,
//         borderColor: "#163861",
//         alignSelf: "center",
//         marginHorizontal:10
//       },
//       dayTextColor: "transparent",
//       backgroundColor: "red",
//     }}
//     hideArrows={true}
//   />
// </View>
// </TouchableOpacity>

// {/* Feb */}

// {/* <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
// <View>
//   <Calendar
//     theme={{
//       "stylesheet.day.basic": {
//         base: {
//           width: 5,
//           height: 10,
//         },
//       },
//     }}
//   />
// </View>
// </TouchableOpacity> */}

// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
// <View>
//   <Calendar
//     current={`${new Date().getFullYear()}-08-01`}
//     hideExtraDays
//     disableAllTouchEventsForDisabledDays
//     firstDay={1}
//     markingType={"custom"}
//     dayShape="square"
//     date="hide"
//     monthFormat={"MMM"}
//     hideDayNames={true}
//     style={{
//       width: width * 0.30,
//       // height: height * 0.35,
//       backgroundColor: "transparent",
//       marginLeft: width * 0.02,
//     }}
//     theme={{
//       // textDayFontSize: 10,
//       "stylesheet.day.basic": {
//         base: {
//           // width: 15,
//           height: 5,
//         },
//       },
//       calendarBackground: "transparent",
//       monthTextColor: "white",
//       textDayStyle: {
//         height: 10,
//         width: 10,
//         borderRadius: 2,
//         borderWidth: 2,
//         borderColor: "#163861",
//         alignSelf: "center",
//       },
//       dayTextColor: "transparent",
//       backgroundColor: "red",
//     }}
//     hideArrows={true}
//   />
// </View>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>
// <View>
//   <Calendar
//     current={`${new Date().getFullYear()}-09-01`}
//     hideExtraDays
//     disableAllTouchEventsForDisabledDays
//     firstDay={1}
//     markingType={"custom"}
//     dayShape="square"
//     date="hide"
//     monthFormat={"MMM"}
//     hideDayNames={true}
//     style={{
//       // height: vw(35),
//       // width: vw(35),
//       width: width * 0.30,
//       // height: height * 0.45,
//       // height: 200,
//       // width: 200,

//       backgroundColor: "transparent",
//     }}
//     theme={{
//       // textDayFontSize: 10,
//       "stylesheet.day.basic": {
//         base: {
//           // width: 15,
//           height: 5,

//         },
//       },
//       calendarBackground: "transparent",
//       monthTextColor: "white",
//       textDayStyle: {
//         height: 10,
//         width: 10,
//         borderRadius: 2,
//         borderWidth: 2,
//         borderColor: "#163861",
//         alignSelf: "center",
//         marginHorizontal:10
//       },
//       dayTextColor: "transparent",
//       backgroundColor: "red",
//     }}
//     hideArrows={true}
//   />
// </View>
// </TouchableOpacity>
