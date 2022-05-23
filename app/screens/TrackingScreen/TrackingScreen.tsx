import { View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Colors, ComponentsStyle } from "style";
import { Icon, Text, Input, Button } from "components";
import imagePath from 'constant/imagePath';
// import styles from 'components/Text/styles';
import { vw, vh } from "react-native-css-vh-vw";
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { navigate } from "navigation";
import { hasPath } from 'ramda';
import CalendarPicker from 'react-native-calendar-picker';
import { Calendar } from 'react-native-calendars';
import moment from "moment"

function TrackingScreen() {

    const { width, height } = Dimensions.get('window');
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [currentYear, setCurrentYear] = useState('');
    const [days, setDays]: any = useState();

    useEffect(() => {
        const current = moment().format("YYYY")
        console.log("current year", current)
        setCurrentYear(current)
        markedDays()
    }, [])

    const onDateChange = (date, type) => {
        //function to handle the date change
        if (type === 'END_DATE') {
            setSelectedEndDate(date);
        } else {
            setSelectedEndDate(null);
            setSelectedStartDate(date);
        }
    };

    const navigation = useNavigation();
    const navigator = navigate(navigation);

    const WorkInClick = () => {
        navigator.trackingWorkInfoScreen()

    }

    const markedDays = () => {
        let year = new Date().getFullYear()
        let month = new Date().getMonth()

        console.log(year)
        console.log(month)

        let current = {
            [`${year}-01-01`]: {
                selected: true, customStyles: {
                    container: {
                        height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

                    },
                    text: {
                        color: 'transparent',
                    }
                }
            }
        }
        console.log("current.....", current)
        setDays(current)
    }
    return (
        <ImageBackground source={imagePath["background"]} style={styles.imageBackground} >

            <TouchableOpacity onPress={() => navigator.goBack()} style={[styles.goBack, {
                paddingHorizontal: 16,
                marginTop: 60
            }]}>
                <MaterialIcons name="arrow-back" color={Colors.blue} size={24} />
            </TouchableOpacity>
            <Text.Header style={{ marginBottom: 26 }}>{"Work Info"}</Text.Header>

            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />

            <ScrollView>
                {/* <View style={{ flex: 1 }}> */}

                <View style={{ marginTop: vh(1) }}>
                    <Text.Header>{`${new Date().getFullYear()}`}</Text.Header>

                    {/* <Text.Header>{`${new Date().getMonth()}`}</Text.Header> */}

                </View>
                {/* Jan feb */}
                <View style={{ flexDirection: 'row' }}>

                    {/* Jan */}
                    <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>

                        <View>
                            <Calendar

                                current={`${new Date().getFullYear()}-01-01`}
                                hideExtraDays
                                disableAllTouchEventsForDisabledDays
                                firstDay={1}
                                markingType={'custom'}
                                dayShape="square"
                                date='hide'
                                monthFormat={'MMM'}
                                hideDayNames={true}

                                // markedDates={{
                                //     '2022-01-01': {
                                //         customStyles: {
                                //             container: {
                                //                 backgroundColor: 'green',
                                //                 height: 22, width: 22, borderRadius: 5
                                //             },
                                //             text: {
                                //                 color: 'black',
                                //                 fontWeight: 'bold',
                                //                 justifyContent: 'center'

                                //             },
                                //         },
                                //     },
                                //     '2022-01-02': {
                                //         selected: true, customStyles: {
                                //             container: {
                                //                 height: 15, width: 15, borderRadius: 5, backgroundColor: '#1973B0'

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
                                //     }, '2022-01-29': {
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

                                style={{
                                    // height: vw(35),
                                    // width: vw(35),
                                    width: width * 0.45,
                                    height: height * 0.45,
                                    // height: 200,
                                    // width: 200,

                                    backgroundColor: 'transparent',
                                }}
                                theme={{
                                    // textDayFontSize: 10,
                                    calendarBackground: 'transparent',
                                    monthTextColor: 'white',
                                    textDayStyle: {
                                        height: 15,
                                        width: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        alignSelf: 'center',

                                    },
                                    dayTextColor: 'transparent',
                                    backgroundColor: 'transparent'
                                }}
                                hideArrows={true}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* Feb */}
                    <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>

                        <View>
                            <Calendar

                                current={`${new Date().getFullYear()}-02-01`}
                                hideExtraDays
                                disableAllTouchEventsForDisabledDays
                                firstDay={1}
                                markingType={'custom'}
                                dayShape="square"
                                date='hide'
                                monthFormat={'MMM'}
                                hideDayNames={true}


                                style={{

                                    width: width * 0.45,
                                    height: height * 0.45,
                                    backgroundColor: 'transparent',
                                }}
                                theme={{
                                    // textDayFontSize: 10,
                                    calendarBackground: 'transparent',
                                    monthTextColor: 'white',
                                    textDayStyle: {
                                        height: 15,
                                        width: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        alignSelf: 'center',

                                    },
                                    dayTextColor: 'transparent',
                                    backgroundColor: 'transparent'
                                }}
                                hideArrows={true}
                            />
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', marginTop: vh(-10) }}>

                    {/* march */}
                    <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>

                        <View>
                            <Calendar

                                current={`${new Date().getFullYear()}-03-01`}
                                hideExtraDays
                                disableAllTouchEventsForDisabledDays
                                firstDay={1}
                                markingType={'custom'}
                                dayShape="square"
                                date='hide'
                                monthFormat={'MMM'}
                                hideDayNames={true}


                                style={{

                                    width: width * 0.45,
                                    height: height * 0.45,
                                    backgroundColor: 'transparent',
                                }}
                                theme={{
                                    // textDayFontSize: 10,
                                    calendarBackground: 'transparent',
                                    monthTextColor: 'white',
                                    textDayStyle: {
                                        height: 15,
                                        width: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        alignSelf: 'center',

                                    },
                                    dayTextColor: 'transparent',
                                    backgroundColor: 'transparent'
                                }}
                                hideArrows={true}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* April */}
                    <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>

                        <View>
                            <Calendar

                                current={`${new Date().getFullYear()}-04-01`}
                                hideExtraDays
                                disableAllTouchEventsForDisabledDays
                                firstDay={1}
                                markingType={'custom'}
                                dayShape="square"
                                date='hide'
                                monthFormat={'MMM'}
                                hideDayNames={true}


                                style={{

                                    width: width * 0.45,
                                    height: height * 0.45,
                                    backgroundColor: 'transparent',
                                }}
                                theme={{
                                    // textDayFontSize: 10,
                                    calendarBackground: 'transparent',
                                    monthTextColor: 'white',
                                    textDayStyle: {
                                        height: 15,
                                        width: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        alignSelf: 'center',

                                    },
                                    dayTextColor: 'transparent',
                                    backgroundColor: 'transparent'
                                }}
                                hideArrows={true}
                            />
                        </View>
                    </TouchableOpacity>

                </View>

                {/* may june */}
                <View style={{ flexDirection: 'row', marginTop: vh(-10) }}>

                    {/* may */}
                    <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>

                        <View>
                            <Calendar

                                current={`${new Date().getFullYear()}-05-01`}
                                hideExtraDays
                                disableAllTouchEventsForDisabledDays
                                firstDay={1}
                                markingType={'custom'}
                                dayShape="square"
                                date='hide'
                                monthFormat={'MMM'}
                                hideDayNames={true}


                                style={{

                                    width: width * 0.45,
                                    height: height * 0.45,
                                    backgroundColor: 'transparent',
                                }}
                                theme={{
                                    // textDayFontSize: 10,
                                    calendarBackground: 'transparent',
                                    monthTextColor: 'white',
                                    textDayStyle: {
                                        height: 15,
                                        width: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        alignSelf: 'center',

                                    },
                                    dayTextColor: 'transparent',
                                    backgroundColor: 'transparent'
                                }}
                                hideArrows={true}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* June */}
                    <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>

                        <View>
                            <Calendar

                                current={`${new Date().getFullYear()}-06-01`}
                                hideExtraDays
                                disableAllTouchEventsForDisabledDays
                                firstDay={1}
                                markingType={'custom'}
                                dayShape="square"
                                date='hide'
                                monthFormat={'MMM'}
                                hideDayNames={true}


                                style={{

                                    width: width * 0.45,
                                    height: height * 0.45,
                                    backgroundColor: 'transparent',
                                }}
                                theme={{
                                    // textDayFontSize: 10,
                                    calendarBackground: 'transparent',
                                    monthTextColor: 'white',
                                    textDayStyle: {
                                        height: 15,
                                        width: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        alignSelf: 'center',

                                    },
                                    dayTextColor: 'transparent',
                                    backgroundColor: 'transparent'
                                }}
                                hideArrows={true}
                            />
                        </View>
                    </TouchableOpacity>

                </View>

                {/* july Aug */}

                <View style={{ flexDirection: 'row', marginTop: vh(-10) }}>

                    {/* may */}
                    <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>

                        <View>
                            <Calendar

                                current={`${new Date().getFullYear()}-07-01`}
                                hideExtraDays
                                disableAllTouchEventsForDisabledDays
                                firstDay={1}
                                markingType={'custom'}
                                dayShape="square"
                                date='hide'
                                monthFormat={'MMM'}
                                hideDayNames={true}


                                style={{

                                    width: width * 0.45,
                                    height: height * 0.45,
                                    backgroundColor: 'transparent',
                                }}
                                theme={{
                                    // textDayFontSize: 10,
                                    calendarBackground: 'transparent',
                                    monthTextColor: 'white',
                                    textDayStyle: {
                                        height: 15,
                                        width: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        alignSelf: 'center',

                                    },
                                    dayTextColor: 'transparent',
                                    backgroundColor: 'transparent'
                                }}
                                hideArrows={true}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* June */}

                    <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>

                        <View>
                            <Calendar

                                current={`${new Date().getFullYear()}-08-01`}
                                hideExtraDays
                                disableAllTouchEventsForDisabledDays
                                firstDay={1}
                                markingType={'custom'}
                                dayShape="square"
                                date='hide'
                                monthFormat={'MMM'}
                                hideDayNames={true}


                                style={{

                                    width: width * 0.45,
                                    height: height * 0.45,
                                    backgroundColor: 'transparent',
                                }}
                                theme={{
                                    // textDayFontSize: 10,
                                    calendarBackground: 'transparent',
                                    monthTextColor: 'white',
                                    textDayStyle: {
                                        height: 15,
                                        width: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        alignSelf: 'center',

                                    },
                                    dayTextColor: 'transparent',
                                    backgroundColor: 'transparent'
                                }}
                                hideArrows={true}
                            />
                        </View>
                    </TouchableOpacity>

                </View>


                {/* sep oct */}

                <View style={{ flexDirection: 'row', marginTop: vh(-10) }}>

                    {/* sep */}
                    <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>

                        <View>
                            <Calendar

                                current={`${new Date().getFullYear()}-09-01`}
                                hideExtraDays
                                disableAllTouchEventsForDisabledDays
                                firstDay={1}
                                markingType={'custom'}
                                dayShape="square"
                                date='hide'
                                monthFormat={'MMM'}
                                hideDayNames={true}


                                style={{

                                    width: width * 0.45,
                                    height: height * 0.45,
                                    backgroundColor: 'transparent',
                                }}
                                theme={{
                                    // textDayFontSize: 10,
                                    calendarBackground: 'transparent',
                                    monthTextColor: 'white',
                                    textDayStyle: {
                                        height: 15,
                                        width: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        alignSelf: 'center',

                                    },
                                    dayTextColor: 'transparent',
                                    backgroundColor: 'transparent'
                                }}
                                hideArrows={true}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* oct */}
                    <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>

                        <View>
                            <Calendar

                                current={`${new Date().getFullYear()}-10-01`}
                                hideExtraDays
                                disableAllTouchEventsForDisabledDays
                                firstDay={1}
                                markingType={'custom'}
                                dayShape="square"
                                date='hide'
                                monthFormat={'MMM'}
                                hideDayNames={true}


                                style={{

                                    width: width * 0.45,
                                    height: height * 0.45,
                                    backgroundColor: 'transparent',
                                }}
                                theme={{
                                    // textDayFontSize: 10,
                                    calendarBackground: 'transparent',
                                    monthTextColor: 'white',
                                    textDayStyle: {
                                        height: 15,
                                        width: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        alignSelf: 'center',

                                    },
                                    dayTextColor: 'transparent',
                                    backgroundColor: 'transparent'
                                }}
                                hideArrows={true}
                            />
                        </View>
                    </TouchableOpacity>

                </View>

                {/* nov dec */}

                <View style={{ flexDirection: 'row', marginTop: vh(-10) }}>

                    {/* nov */}

                    <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>

                        <View>
                            <Calendar

                                current={`${new Date().getFullYear()}-11-01`}
                                hideExtraDays
                                disableAllTouchEventsForDisabledDays
                                firstDay={1}
                                markingType={'custom'}
                                dayShape="square"
                                date='hide'
                                monthFormat={'MMM'}
                                hideDayNames={true}


                                style={{

                                    width: width * 0.45,
                                    height: height * 0.45,
                                    backgroundColor: 'transparent',
                                }}
                                theme={{
                                    // textDayFontSize: 10,
                                    calendarBackground: 'transparent',
                                    monthTextColor: 'white',
                                    textDayStyle: {
                                        height: 15,
                                        width: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        alignSelf: 'center',

                                    },
                                    dayTextColor: 'transparent',
                                    backgroundColor: 'transparent'
                                }}
                                hideArrows={true}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* dec */}
                    <TouchableOpacity onPress={() => navigator.trackingWorkInfoScreen()}>

                        <View>
                            <Calendar

                                current={`${new Date().getFullYear()}-12-01`}
                                hideExtraDays
                                disableAllTouchEventsForDisabledDays
                                firstDay={1}
                                markingType={'custom'}
                                dayShape="square"
                                date='hide'
                                monthFormat={'MMM'}
                                hideDayNames={true}


                                style={{

                                    width: width * 0.45,
                                    height: height * 0.45,
                                    backgroundColor: 'transparent',
                                }}
                                theme={{
                                    // textDayFontSize: 10,
                                    calendarBackground: 'transparent',
                                    monthTextColor: 'white',
                                    textDayStyle: {
                                        height: 15,
                                        width: 15,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        alignSelf: 'center',

                                    },
                                    dayTextColor: 'transparent',
                                    backgroundColor: 'transparent'
                                }}
                                hideArrows={true}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <View style={{

                bottom: 0,
                position: 'absolute',
                marginBottom: vh('3'),
                marginHorizontal: vh('1')

            }}>
                <View
                    style={{

                        borderBottomColor: 'black',
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: vh(2) }}>
                        <View style={{ height: vh(2), width: vw(4), backgroundColor: '#1DAEFF' }}></View>
                        <Text.TagTitle style={{ fontSize: 13, left: 5 }}>20 hard days</Text.TagTitle>

                    </View>
                </View>


            </View>


        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        flexDirection: 'column',

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
        height: 15, width: 15, borderRadius: 5, backgroundColor: '#b75310'

    }
});

export default TrackingScreen

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