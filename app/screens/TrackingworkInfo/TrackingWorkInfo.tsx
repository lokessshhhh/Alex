import { View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react';
import { Colors, ComponentsStyle } from "style";
import { Icon, Text, Input, Button } from "components";
import imagePath from 'constant/imagePath';
// import styles from 'components/Text/styles';
import { vw, vh } from "react-native-css-vh-vw";
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { navigate } from "navigation";
import { hasPath } from 'ramda';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


// TrackingWorkInfo
function TrackingWorkInfo() {

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const navigation = useNavigation();
    const navigator = navigate(navigation);


    const WorkInClick = () => {
        navigator.trackingWorkInfoScreen()

    }

    return (
        <ImageBackground source={imagePath["background"]} style={styles.imageBackground} >

            <ScrollView style={styles.container}>

                <TouchableOpacity onPress={() => navigator.trackingScreen()} style={[styles.goBack]}>
                    <MaterialIcons name="arrow-back" color={Colors.blue} size={24} />
                </TouchableOpacity>
                <Text.Header style={{ marginBottom: 26, fontWeight: '900' }}>{"Work Info"}</Text.Header>


                {/* S M T W T F S */}
                <View style={{ flexDirection: 'row', flex: 1, left: vw(6) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 7 }}>
                        <Text.ParagraphTitle style={{ fontSize: vh(1.7) }}>S</Text.ParagraphTitle>
                        {/* <View style={{ height: vh(2), width: vw(4), backgroundColor: '#163861' }}></View> */}

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 7 }}>
                        <Text.ParagraphTitle style={{ fontSize: vh(1.7) }}>M</Text.ParagraphTitle>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 7 }}>
                        <Text.ParagraphTitle style={{ fontSize: vh(1.7) }}>T</Text.ParagraphTitle>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 7 }}>
                        <Text.ParagraphTitle style={{ fontSize: vh(1.7) }}>W</Text.ParagraphTitle>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 7 }}>
                        <Text.ParagraphTitle style={{ fontSize: vh(1.7) }}>T</Text.ParagraphTitle>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 7 }}>
                        <Text.ParagraphTitle style={{ fontSize: vh(1.7) }}>F</Text.ParagraphTitle>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 7 }}>
                        <Text.ParagraphTitle style={{ fontSize: vh(1.7) }}>S</Text.ParagraphTitle>

                    </View>
                </View>


                {/* line */}
                <View style={{
                    marginTop: vh(1),
                    marginBottom: 0,
                    flex: 1
                }}>
                    <View
                        style={{
                            borderBottomColor: '#a09a9a',
                            borderBottomWidth: 0.3,
                        }}
                    />
                </View>

                <CalendarList

                    style={{
                        // marginTop: vh(20),
                        // borderWidth: 1,
                        borderColor: 'transparent',
                        height: vh(65),
                    }}

                    theme={{
                        // textDayFontSize: 10,
                        calendarBackground: 'transparent',
                        monthTextColor: '#ffffff',
                        dayTextColor: 'transparent', textDayStyle: {
                            height: 15,
                            width: 15,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: 'gray',
                            alignSelf: 'center',

                        },
                        backgroundColor: 'transparent'
                    }}

                    current={`${new Date().getFullYear()}-01-01`}

                    // Callback which gets executed when visible months change in scroll view. Default = undefined
                    onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={0}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={12}
                    // Enable or disable scrolling of calendar list
                    scrollEnabled={true}
                    // Enable or disable vertical scroll indicator. Default = false
                    showScrollIndicator={true}
                    //Day hide
                    hideDayNames={true}
                    //   hideDayNames={true}
                    monthFormat={'MMM'}
                    // Enable paging on horizontal, default = false
                    pagingEnabled={true}
                    // Set custom calendarWidth.
                    calendarWidth={300}
                    //   monthTextColor= 'white'

                    markingType={'custom'}

                // markedDates={{

                //     '2022-04-01': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-02': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1DAEFF' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-03': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-04': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-05': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-06': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-07': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-08': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-09': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-10': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-11': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-12': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-13': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-14': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-15': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-16': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-17': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-18': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-19': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-20': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-21': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-22': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-23': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-24': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-25': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-26': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-27': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-28': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-29': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-04-30': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },


                //     //2


                //     '2022-05-01': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-02': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1DAEFF' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-03': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-04': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-05': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-06': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-07': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-08': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-09': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-10': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-11': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-12': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-13': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-14': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-15': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-16': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-17': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-18': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-19': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-20': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-21': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-22': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-23': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-24': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-25': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-26': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-27': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-28': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-29': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#1973B0' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                //     '2022-05-30': {
                //         customStyles: {
                //             container: { height: 32, width: 30, borderRadius: 8, backgroundColor: '#163861' },
                //             text: { color: 'white', fontWeight: 'bold' }
                //         }
                //     },
                // }}

                />


                <View style={{
                    marginTop: vh(1),
                    marginBottom: 0,
                    flex: 1
                }}>
                    <View
                        style={{
                            borderBottomColor: '#a09a9a',
                            borderBottomWidth: 1,
                        }}
                    ></View>

                    <View style={{ flexDirection: 'row', flex: 1, marginTop: vh(1) }}>
                        <Text.TagTitle style={{ fontSize: vh(2) }}>95 edits in the last year</Text.TagTitle>
                        <Text.TagTitle style={{ fontSize: 10, left: vw(10), color: '#1DAEFF' }}>Learn how we count edits
                        </Text.TagTitle>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 2 }}>
                            <View style={{ height: vh(2), width: vw(4), backgroundColor: '#163861' }}></View>
                            <Text.TagTitle style={{ fontSize: 13, left: 5 }}>136 low days</Text.TagTitle>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 2 }}>
                            <View style={{ height: vh(2), width: vw(4), backgroundColor: '#1973B0' }}></View>
                            <Text.TagTitle style={{ fontSize: 13, left: 5 }}>69 normal days</Text.TagTitle>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ height: vh(2), width: vw(4), backgroundColor: '#1DAEFF' }}></View>
                            <Text.TagTitle style={{ fontSize: 13, left: 5 }}>20 hard days</Text.TagTitle>

                        </View>
                    </View>


                </View>


            </ScrollView>
        </ImageBackground>

    )
}


const styles = StyleSheet.create({
    imageBackground: {
        height: vh(100),
    },
    container: {
        paddingHorizontal: 16,
        marginTop: 60,

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
});

export default TrackingWorkInfo;





{/* <ImageBackground source={imagePath["background"]} style={styles.imageBackground}>
<ScrollView style={styles.container}>
  <TouchableOpacity onPress={() => navigator.goBack()} style={styles.goBack}>
    <MaterialIcons name="arrow-back" color={Colors.blue} size={24} />
  </TouchableOpacity>
  <Text.Header style={{ marginBottom: 26 }}>{t("UI_FEEDBACK_L")}</Text.Header> */}