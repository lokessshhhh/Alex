import React, { useRef } from "react";
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
  FlatList
} from "react-native";
import Modal from "react-native-modal";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { vw, vh } from "react-native-css-vh-vw";
import { Snackbar } from "react-native-paper";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import imagesPath from "../../constant/imagePath";
import navigationOptions from "./MovieNewScreen.navigationOptions";
import styles from "./MovieNewScreen.styles";
import imagePath from "../../constant/imagePath";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import BaseURl from "constant/BaseURL";
import * as ImagePicker from "expo-image-picker";


const MovieNewScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const route = useRoute();
  const deviceWidth = Dimensions.get("window").width;
  // ModalVisible States
  const [modalCategory, setModalCategory] = React.useState(false);
  const [modalGenre, setModalGenre] = React.useState(false);
  const [modalGenreDetail, setModalGenreDetail] = React.useState(false);
  const [modalCast, setModalCast] = React.useState(false);
  const [modalNewActor, setModalNewActor] = React.useState(false);
  const [modalDelActor, setModalDelActor] = React.useState(false);
  const [modalTags, setModalTags] = React.useState(false);
  const [modalSimilarMovies, setModalSimilarMovies] = React.useState(false);
  const [modalSimilarDetail, setModalSimilarDetail] = React.useState(false);
  const [modalLogline, setModalLogline] = React.useState(false);
  const [modalLoglineInfo, setModalLoglineInfo] = React.useState(false);
  const [loglineData, setLoglineData] = React.useState<any>();
  const [genreData, setGenreData] = React.useState<any>();
  const [genre, setGenre] = React.useState('');
  const [genreArray, setGenreArray] = React.useState([]);
  const [movieData, setMovieData] = React.useState([]);
  //ImagePicker
  const [image, setImage] = React.useState<any>();
  //logline
  const [incident, setIncident] = React.useState("");
  const [protagonist, setProtagonist] = React.useState("");
  const [action, setAction] = React.useState("");
  const [antagonist, setAntagonist] = React.useState("");
  //New Actor
  const [actorName, setActorName] = React.useState("");
  const [heroName, setHeroName] = React.useState("");
  const [actorDescription, setActorDescription] = React.useState("");
  //tag
  const [tags, setTags] = React.useState([]);
  const [tagString, setTagString] = React.useState("");
  const [tagArray, setTagArray] = React.useState<any>();
  //title
  const [title, setTitle] = React.useState("");
  //tagline
  const [tagline, setTagLine] = React.useState("");
  //synopsis
  const [synopsis, setSynopsis] = React.useState("");
  //search states
  const [similarSearch, setSimilarSearch] = React.useState("");

  const filterSimilars = (list) => {
    return list.filter((listItem) =>
      listItem.movieTitle.toLowerCase().includes(similarSearch.toLowerCase())
    );
  };

  const DATA = [
    {

      name: 'Keano Reeves',
      subName: 'Hero: Jhone Wick',
      title: 'First Item',
    },
    {
      name: 'Laetitia Casta',
      subName: 'Hero: Jessica Jones',
      title: 'First Item',
    },
    {
      name: 'Laetitia Casta',
      subName: 'Hero: Not indicated',
      title: 'First Item',
    },
  ];


  //Similar Movies
  const movies = [
    {
      movieId: 1,
      movieTitle: "Journey to the center of the earth ",
      movieDesShort:
        "On a quest to find out what happened to his missing brother, a scientist, his...",
      movieThumb: "thumb7",
    },
    {
      movieId: 2,
      movieTitle: "Journey to the Mars",
      movieDesShort:
        "On a quest to find out what happened to his missing brother, a scientist, his...",
      movieThumb: "thumb8",
    },
    {
      movieId: 3,
      movieTitle: "Journey to the center of the earth ",
      movieDesShort:
        "On a quest to find out what happened to his missing brother, a scientist, his...",
      movieThumb: "thumb7",
    },
    {
      movieId: 4,
      movieTitle: "Journey to the Mars ",
      movieDesShort:
        "On a quest to find out what happened to his missing brother, a scientist, his...",
      movieThumb: "thumb8",
    },
    {
      movieId: 3,
      movieTitle: "Journey to the center of the earth ",
      movieDesShort:
        "On a quest to find out what happened to his missing brother, a scientist, his...",
      movieThumb: "thumb7",
    },
    {
      movieId: 4,
      movieTitle: "Journey to the Mars ",
      movieDesShort:
        "On a quest to find out what happened to his missing brother, a scientist, his...",
      movieThumb: "thumb8",
    },
  ];

  //Genres
  const genreModalList = [
    { name: "Comedy", image: "genre_comedy", number: 7 },
    { name: "Horror", image: "genre_horror", number: 0 },
    { name: "Thriller", image: "genre_thriller", number: 0 },
    { name: "Romance", image: "genre_romance", number: 0 },
    { name: "Action", image: "genre_action", number: 10 },
    { name: "Drama", image: "genre_drama", number: 0 },
    { name: "Mystery", image: "genre_mystery", number: 0 },
    { name: "Fantasy", image: "genre_fantasy", number: 0 },
    { name: "Adventure", image: "genre_adventure", number: 0 },
    { name: "Crime", image: "genre_crime", number: 2 },
    { name: "Animation", image: "genre_animation", number: 0 },
    { name: "Biography", image: "genre_biography", number: 0 },
    { name: "History", image: "genre_history", number: 0 },
    { name: "Family", image: "genre_family", number: 0 },
    { name: "Sci-FI", image: "genre_sci", number: 5 },
  ];

  //save movie
  const saveSimilarMovie = (name:any, poster:any ) => {
    let data = []
    data.push({"moviePoster": poster, "movieName": name})
    console.log(data)
    setMovieData(data)
  }
  //savelogline
  const saveLogline = () => {
    const logline = []
    logline.push({ incitingIncident: incident, protagonist: protagonist, Action: action, antagonist: antagonist })
    setModalLogline(false)
    console.log("-------Logline-------", logline)
    setLoglineData(logline)
  }

  // Movie details
  const saveMovieDetails = () => {
    const uriPart = image.split('.');
    const fileExtension = uriPart[uriPart.length - 1];
    let data = new FormData()
    data.append('type', title)
    data.append('movieBanner', {
      uri: image,
      name: `photo.${fileExtension}`,
      type: `image/${fileExtension}`
    });
    data.append('title', title)
    data.append('synopsis', synopsis)
    data.append('logline', loglineData)
    data.append('genres', genreData)
    data.append('tagline', tagline)
    data.append('tags', tagArray)
    data.append('actor', movieData)
    data.append('similarMovies', movieData)
    axios
    .post("http://localhost:8000/api/movies/basicDetails", )
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  //Actor details
  const saveNewActor = async () => {
    const token = await AsyncStorage.getItem('authToken')
    let actorData = new FormData();
    const uriPart = image.split('.');
    const fileExtension = uriPart[uriPart.length - 1];

    actorData.append('actorName', actorName);
    actorData.append('heroName', heroName);
    actorData.append('actorDescription', actorDescription);
    actorData.append('actorImage', {
      uri: image,
      name: `photo.${fileExtension}`,
      type: `image/${fileExtension}`
    });

    console.log("ActooorData-----", actorData, token);

    axios
      .post("http://localhost:8000/api/movies/actorDetails", actorData, {
        headers: {
          "x-access-token": `Bearer ${token}`,
          // "Authorization": `Bearer ${token}`,
          // "Accept": "multipart/form-data",
          // "Content-Type": "multipart/form-data",
        }
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  //NewActorApi
  const newActorApi = async () => {

    const token = await AsyncStorage.getItem('authToken')

    console.log("Tokenn", token)
    const uriPart = image.split('.');
    const fileExtension = uriPart[uriPart.length - 1];

    var actorData = new FormData();
    
    actorData.append('actorName', actorName);
    actorData.append('heroName', heroName);
    actorData.append('actorDescription', actorDescription);
    actorData.append('actorImage', {
      uri: image,
      name: `photo.${fileExtension}`,
      type: `image/${fileExtension}`
    });

    console.log("ActooorData-----", actorData);
    axios.post("http://localhost:8000/api/movies/actorDetails",actorData, {
      headers: {
        // "x-access-token": `Bearer ${token}`
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzg5MWE4YjI1NWJiMzJiMTQ0MzFjYyIsImVtYWlsIjoidGVzdDEwMDEuZGRzQGdtYWlsLmNvbSIsImlhdCI6MTY1MzI3NTI2NiwiZXhwIjozMzExNzM0NTMyfQ.FyIvihh84L1-VKuo0tDW7q3_d0_ACC9kSTdBr6N4iKQ'
      }
    }).then((response) => {
      console.log("responseeSucess", response)
      alert("sucesss")
    }).catch((err) => {
      console.log("Errorr", err)
      alert("ErrorrLog")
    })
    // } catch (err) {
    //   console.log("error1 : ", err);

    // }
    // try {

    //   axios({
    //     url: 'http://44.202.199.4:8000/api/movies/actorDetails',
    //     method: 'POST',
    //     headers: {
    //       Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzBiMDI2ZGNiMDRkNTRlYTY1YzQ3NyIsImVtYWlsIjoidGVzdDEwMDEuZGRzQGdtYWlsLmNvbSIsImlhdCI6MTY1MTU1MzgzMiwiZXhwIjozMzA4MjkxNjY0fQ.VpjeuzeFfrSCx9gje4FiS9_eQ0hJ_6C8pcz43p2ceGA"
    //     },
    //     data: actorData
    //   })
    //     .then(resp => {
    //       console.log("Toooossss", resp)
    //       alert("jbfgrjhbf")

    //     }
    //     )
    //     .catch(error => {
    //       alert("failedd")
    //       console.log("Tooooqwqwdwdw", error)
    //     });

    // } catch (error) {
    //   console.log("--------", error);
    // }

    // try {

    //   axios.post("http://44.202.199.4:8000/api/movies/actorDetails",
    //     actorData, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     },
    //   })
    //     .then((response) => {
    //       console.log("actordataThenResponse :", response)
    //       alert('sucess API')
    //     })
    //     .catch((error) => {
    //       console.log("errorActorData :", error)
    //       alert(error)

    //     })

    // } catch (error) {

    //   console.log("=====", error)

    // }


  }

  //save genre
  const saveGenreData = () => {
    let data = []
    data.push("Alien Invasion")
    setGenreArray(data)
  }

  const saveGenreObject = () => {
    let data = []
    data.push({ genre: genreArray })
    console.log(data)
    setGenreData(data)
    setModalGenre(false)
  }

  //savetag
  const saveTags = () => {
    setModalTags(false)
    let data = []
    tags.push(tagString)
    data.push({"tags": tags})
    console.log("-------Tags-------",  data)
    setTagArray(data)
  }


  const saveProject = () => {
    setSnackBarVisible(true);
    setTimeout(() => {
      setSnackBarVisible(false);
    }, 2000);
  };
  const [snackBarVisiable, setSnackBarVisible] = React.useState(false);

  //header animation
  const scrollPosition = useRef(new Animated.Value(0)).current;
  const minHeaderHeight = 30;
  const maxHeaderHeight = 100;
  const headerHeight = scrollPosition.interpolate({
    inputRange: [0, 500],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: "clamp",
  });
  const headerPositionX = scrollPosition.interpolate({
    inputRange: [0, 400],
    outputRange: [0, (30 * vw(100)) / 100],
    extrapolateLeft: "identity",
    extrapolateRight: "clamp",
  });
  const headerPositionY = scrollPosition.interpolate({
    inputRange: [0, 400],
    outputRange: [0, -50],
    extrapolateLeft: "identity",
    extrapolateRight: "clamp",
  });
  const fontsize = scrollPosition.interpolate({
    inputRange: [0, 400],
    outputRange: [34, 26],
    extrapolateLeft: "identity",
    extrapolateRight: "clamp",
  });


  //ImagePicker
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    setImage(result.uri);
    // if (!result.cancelled) {
    //   console.log("result Failed", result.uri)
    //   
    // }
  };


  return (
    <ScrollView style={{ backgroundColor: Colors.GradTop }}>
      <View style={styles.container}>
        <Animated.View
          style={{ width: "100%", marginTop: 50, marginBottom: 10, height: headerHeight }}
        >
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <MaterialIcons name="arrow-back" color={Colors.blue} size={20} />
          </TouchableOpacity>
          <Animated.View
            style={{
              marginTop: 15,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              transform: [{ translateX: headerPositionX }, { translateY: headerPositionY }],
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Animated.Text style={[styles.headerText, { fontSize: fontsize }]}>
                {"New "}
              </Animated.Text>
              <TouchableOpacity
                style={{ display: "flex", flexDirection: "row" }}
                onPress={() => setModalCategory(true)}
              >
                <Animated.Text
                  style={[styles.headerText, { fontSize: fontsize, color: Colors.blue }]}
                >
                  {"Movie "}
                </Animated.Text>
                <FontAwesome
                  name="caret-down"
                  size={20}
                  color={Colors.blue}
                  style={{ textAlignVertical: "center" }}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
        <ScrollView
          style={{ marginBottom: 16 }}
          contentInsetAdjustmentBehavior="automatic"
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollPosition } } }], {
            useNativeDriver: false,
          })}
        >
          <View style={styles.movieTitle}>
            <View style={styles.thumb}>
              <TouchableOpacity style={{ alignSelf: "center", paddingVertical: 26 }}>
                <Icon name="Thumb" width="24" height="24" fill="none" />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <Text.ParagraphTitle style={{ marginBottom: 8 }}>{"Title"}</Text.ParagraphTitle>
              <Input placeholder={"Enter text"}
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
          </View>
          <View>
            <View style={styles.contentItem}>
              <Text.ParagraphTitle style={{ marginBottom: 8 }}>{"Logline"}</Text.ParagraphTitle>
              <TextInput
                value=""
                placeholder={"Describe your question"}
                placeholderTextColor={Colors.white1}
                style={{
                  height: 80,
                  backgroundColor: Colors.inputBack,
                  padding: 16,
                  borderRadius: 8,
                  textAlignVertical: "top",
                }}
                numberOfLines={3}
                multiline={true}
                onTouchStart={() => setModalLogline(true)}
              />
            </View>

            <View style={styles.contentItem}>
              <Text.ParagraphTitle style={{ marginBottom: 8 }}>{"Tagline"}</Text.ParagraphTitle>
              <Input placeholder={"Enter text"}
                value={tagline}
                onChangeText={(text) => setTagLine(text)}
              />
            </View>

            <View style={styles.contentItem}>
              <Text.ParagraphTitle style={{ marginBottom: 8 }}>{"Synopsis"}</Text.ParagraphTitle>
              <TextInput
                value={synopsis}
                onChangeText={(text) => setSynopsis(text)}
                placeholder={"Describe your question"}
                placeholderTextColor={Colors.white1}
                style={{
                  height: 96,
                  backgroundColor: Colors.inputBack,
                  padding: 16,
                  borderRadius: 8,
                  textAlignVertical: "top",
                }}
                numberOfLines={3}
                multiline={true}
              />
            </View>

            <View style={{ marginTop: 24 }}>
              <Text.ParagraphTitle style={{ marginBottom: 8 }}>{"Genres"}</Text.ParagraphTitle>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity onPress={() => setModalGenre(true)}>
                  <Text.Primary style={styles.normalBtn}>{"Add"}</Text.Primary>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: 24 }}>
              <Text.ParagraphTitle style={{ marginBottom: 8 }}>{"Dream Cast"}</Text.ParagraphTitle>
              <View style={styles.cast}>
                <TouchableOpacity onPress={() => setModalCast(true)}>
                  <View style={styles.circleBtn}>
                    <MaterialCommunityIcons
                      name="plus"
                      size={40}
                      color={Colors.blue}
                      style={{ textAlign: "center", paddingVertical: 20 }}
                    />
                  </View>
                </TouchableOpacity>
                <Text.Primary style={{ textAlign: "center", marginTop: 5, color: Colors.blue }}>
                  {"Add"}
                </Text.Primary>
                <Text.Primary style={{ textAlign: "center", color: Colors.blue }}>
                  {"Actor"}
                </Text.Primary>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              {/* taagg */}


              <Text.TagTitle style={{ fontSize: 22, marginBottom: 7 }}>{"Tags"}</Text.TagTitle>
              <FlatList
                data={tags}
                horizontal
                renderItem={({ item, index }) => {
                  return (
                    <View style={{
                      flexDirection: 'row',
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      backgroundColor: "rgba(29, 174, 255, 0.15)",
                      borderRadius: 20,
                      color: Colors.blue,
                      alignItems: 'center',
                      bottom: 2
                    }} >
                      <Text.Primary>{item}</Text.Primary>
                      <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => {
                        console.log(index)
                        var r = tags.filter(i => i !== item)
                        setTags(r)
                      }}>
                        <AntDesign name="close" size={20} color={Colors.blue} />
                      </TouchableOpacity>

                    </View>

                  )
                }}
              />
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity onPress={() => setModalTags(true)}>
                  <Text.Primary style={styles.normalBtn}>{"Add"}</Text.Primary>

                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginBottom: 20, marginTop: 24 }}>
              <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>
                {"Similar Movies"}
              </Text.TagTitle>
              <View style={styles.cast}>
                <TouchableOpacity onPress={() => setModalSimilarMovies(true)}>
                  <View style={styles.roundBtn}>
                    <MaterialCommunityIcons
                      name="plus"
                      size={40}
                      color={Colors.blue}
                      style={{ textAlign: "center", paddingVertical: 30 }}
                    />
                  </View>
                </TouchableOpacity>
                <Text.Primary style={{ textAlign: "center", marginTop: 5, color: Colors.blue }}>
                  {"Add"}
                </Text.Primary>
                <Text.Primary style={{ textAlign: "center", color: Colors.blue }}>
                  {"Movie"}
                </Text.Primary>
              </View>
            </View>
          </View>
        </ScrollView>
        <Snackbar
          visible={snackBarVisiable}
          onDismiss={() => setSnackBarVisible(false)}
          style={{
            width: "100%",
            backgroundColor: "rgba(29, 174, 255, 0.15)",
            borderRadius: 16,
            marginLeft: 16,
            bottom: vh(10),
          }}
        >
          <AntDesign
            name={"checkcircle"}
            size={20}
            color={"rgba(46, 204, 113, 1)"}
            style={{ letterSpacing: 20 }}
          />
          <Text.Primary style={{ marginLeft: 20 }}>{"Project Saved"}</Text.Primary>
        </Snackbar>
        <View style={{ marginBottom: 16 }}>
          <Button.White
            onPress={() => saveProject()}
            textType={"Primary"}
            style={{
              alignItems: "center",
              height: 48,
              marginBottom: 20,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
          >
            <Text.TagTitle style={{ marginTop: -4, color: "rgba(255, 255, 255, 0.4)" }}>
              {"Save Project"}
            </Text.TagTitle>
          </Button.White>
        </View>
      </View>
      {/* CategoryModal */}
      <Modal
        isVisible={modalCategory}
        swipeDirection="down"
        onSwipeComplete={() => setModalCategory(false)}
        onRequestClose={() => setModalCategory(false)}
        onBackdropPress={() => setModalCategory(false)}
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
          <Text.ModalTitle style={{ marginBottom: 25 }}>{"Project Type"}</Text.ModalTitle>
          <TouchableOpacity style={styles.catBtnContainer} onPress={() => setModalCategory(false)}>
            <View style={styles.catBtnText}>
              <Text.Primary>{"Movie"}</Text.Primary>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.catBtnContainer} onPress={() => setModalCategory(false)}>
            <View style={styles.catBtnText}>
              <Text.Primary>{"Series"}</Text.Primary>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.catBtnContainer} onPress={() => setModalCategory(false)}>
            <View style={styles.catBtnText}>
              <Text.Primary>{"Book"}</Text.Primary>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* GenreModal */}
      <Modal
        isVisible={modalGenre}
        swipeDirection="down"
        onSwipeComplete={() => setModalGenre(false)}
        onRequestClose={() => setModalGenre(false)}
        onBackdropPress={() => setModalGenre(false)}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0, marginBottom: 0 }}
      >
        <View style={[styles.modalContainer, { height: vh(100) - 50, paddingBottom: 20 }]}>
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
          <TouchableOpacity style={styles.modalBackBtn} onPress={() => setModalGenre(false)}>
            <AntDesign name="close" size={20} color={Colors.blue} />
          </TouchableOpacity>
          <Text.ModalTitle style={{ marginBottom: 25 }}>{"Genre"}</Text.ModalTitle>
          <ScrollView style={{ width: "100%" }}>
            <View style={styles.genreList}>
              {genreModalList.map((genre, index) => (
                <TouchableOpacity
                  style={styles.genreBtnContainer}
                  onPress={() => {
                    console.log(index)
                    setGenre(genre.name)
                    setModalGenreDetail(true)
                  }}
                  key={index}
                >
                  <View style={styles.genreBtnContent}>
                    <View style={{ display: "flex", flexDirection: "row", alignSelf: "center" }}>
                      <Image source={imagePath[genre.image]} style={{ width: 32, height: 32 }} />
                      <Text.Primary style={{ textAlignVertical: "center", marginLeft: 8 }}>
                        {genre.name}
                      </Text.Primary>
                    </View>
                    {genre.number > 0 ? (
                      <View style={styles.genreBadge}>
                        <Text.Primary>{genre.number}</Text.Primary>
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <Button.Primary
            onPress={() => saveGenreObject()}
            textType={"Primary"}
            style={{ alignItems: "center" }}
          >
            <Text.TagTitle>{"Save"}</Text.TagTitle>
          </Button.Primary>
        </View>
        {/* SubGenre Modal */}
        <Modal
          isVisible={modalGenreDetail}
          onRequestClose={() => setModalGenreDetail(false)}
          onBackdropPress={() => setModalGenreDetail(false)}
          deviceWidth={deviceWidth}
          style={{ width: "100%", marginLeft: 0, marginBottom: 0, justifyContent: "flex-end" }}
        >
          <View style={[styles.modalContainer, { height: vh(100) - 50, paddingBottom: 20 }]}>
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
            <TouchableOpacity style={styles.modalBackBtn} onPress={() => setModalGenreDetail(false)}>
              <Ionicons name="arrow-back" size={20} color={Colors.blue} />
            </TouchableOpacity>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Image source={imagePath["genre_sci"]} style={{ width: 24, height: 24 }} />
              <Text.ModalTitle style={{ marginBottom: 25, marginLeft: 6 }}>
                {"Sci-Fi"}
              </Text.ModalTitle>
            </View>
            <ScrollView style={{ width: "100%" }}>
              <TouchableOpacity
                style={styles.catBtnContainer}
                onPress={() => setModalGenreDetail(false)}
              >
                <View style={styles.catBtnText}>
                  <Text.Primary>{"Alternative History"}</Text.Primary>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.catBtnContainer}
                onPress={() => {
                  saveGenreData()
                  setModalGenreDetail(false)
                }}
              >
                <View
                  style={[
                    styles.catBtnText,
                    { borderColor: Colors.btnBack, borderWidth: 1, backgroundColor: "rgba(0,0,0,0)" },
                  ]}
                >
                  <Text.Primary>{"Alien Invasion"}</Text.Primary>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.catBtnContainer}
                onPress={() => setModalGenreDetail(false)}
              >
                <View
                  style={[
                    styles.catBtnText,
                    { borderColor: Colors.btnBack, borderWidth: 1, backgroundColor: "rgba(0,0,0,0)" },
                  ]}
                >
                  <Text.Primary>{"Alien Invasion"}</Text.Primary>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.catBtnContainer}
                onPress={() => setModalGenreDetail(false)}
              >
                <View style={styles.catBtnText}>
                  <Text.Primary>{"Alternative History"}</Text.Primary>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.catBtnContainer}
                onPress={() => setModalGenreDetail(false)}
              >
                <View
                  style={[
                    styles.catBtnText,
                    { borderColor: Colors.btnBack, borderWidth: 1, backgroundColor: "rgba(0,0,0,0)" },
                  ]}
                >
                  <Text.Primary>{"Alien Invasion"}</Text.Primary>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.catBtnContainer}
                onPress={() => setModalGenreDetail(false)}
              >
                <View
                  style={[
                    styles.catBtnText,
                    { borderColor: Colors.btnBack, borderWidth: 1, backgroundColor: "rgba(0,0,0,0)" },
                  ]}
                >
                  <Text.Primary>{"Alien Invasion"}</Text.Primary>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.catBtnContainer}
                onPress={() => setModalGenreDetail(false)}
              >
                <View style={styles.catBtnText}>
                  <Text.Primary>{"Alternative History"}</Text.Primary>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.catBtnContainer}
                onPress={() => setModalGenreDetail(false)}
              >
                <View
                  style={[
                    styles.catBtnText,
                    { borderColor: Colors.btnBack, borderWidth: 1, backgroundColor: "rgba(0,0,0,0)" },
                  ]}
                >
                  <Text.Primary>{"Alien Invasion"}</Text.Primary>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.catBtnContainer}
                onPress={() => setModalGenreDetail(false)}
              >
                <View
                  style={[
                    styles.catBtnText,
                    { borderColor: Colors.btnBack, borderWidth: 1, backgroundColor: "rgba(0,0,0,0)" },
                  ]}
                >
                  <Text.Primary>{"Alien Invasion"}</Text.Primary>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.catBtnContainer}
                onPress={() => setModalGenreDetail(false)}
              >
                <View style={styles.catBtnText}>
                  <Text.Primary>{"Alternative History"}</Text.Primary>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.catBtnContainer}
                onPress={() => setModalGenreDetail(false)}
              >
                <View
                  style={[
                    styles.catBtnText,
                    { borderColor: Colors.btnBack, borderWidth: 1, backgroundColor: "rgba(0,0,0,0)" },
                  ]}
                >
                  <Text.Primary>{"Alien Invasion"}</Text.Primary>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.catBtnContainer}
                onPress={() => setModalGenreDetail(false)}
              >
                <View
                  style={[
                    styles.catBtnText,
                    { borderColor: Colors.btnBack, borderWidth: 1, backgroundColor: "rgba(0,0,0,0)" },
                  ]}
                >
                  <Text.Primary>{"Alien Invasion"}</Text.Primary>
                </View>
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity
              style={{ width: "100%", marginTop: 20 }}
              onPress={() => setModalGenreDetail(false)}
            >
              <View
                style={{
                  width: "100%",
                  backgroundColor: Colors.btnBack,
                  paddingVertical: 12,
                  borderRadius: 24,
                }}
              >
                <Text.TagTitle style={{ alignSelf: "center" }}>{"Back"}</Text.TagTitle>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </Modal>


      {/* dreamcast Modal */}
      <Modal
        isVisible={modalCast}
        onRequestClose={() => setModalCast(false)}
        onBackdropPress={() => setModalCast(false)}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0, marginBottom: 0, justifyContent: "flex-end" }}
      >
        <View style={[styles.modalContainer, { height: vh(100) - 50, paddingBottom: 40 }]}>
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

          <TouchableOpacity style={styles.modalBackBtn} onPress={() => setModalCast(false)}>
            <AntDesign name="close" size={20} color={Colors.blue} />
          </TouchableOpacity>

          <Text.ModalTitle style={{ marginBottom: 25 }}>{"Dream Cast"}</Text.ModalTitle>

          <TouchableOpacity style={styles.modalAddBtn} onPress={() => setModalNewActor(true)}>
            <AntDesign name="plus" size={20} color={Colors.blue} />
          </TouchableOpacity>

          {/* <ScrollView> */}

          <FlatList
            data={DATA}
            renderItem={
              ({ item }) => {
                return (
                  <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]}>
                    <ScrollView horizontal={true}>
                      <TouchableOpacity style={styles.castInfo}>
                        <Image
                          source={imagePath["avatar3"]}
                          style={{ width: 64, height: 64, borderRadius: 32, marginRight: 16 }}
                        />
                        <View style={{ display: "flex", flexDirection: "column" }}>
                          <Text.ParagraphTitle style={{ marginBottom: 8, fontWeight: "700" }}>
                            {/* {"Keano Reeves"} */}
                            {item.name}

                          </Text.ParagraphTitle>
                          <Text.Tertiary>{"Hero: John Wick"}</Text.Tertiary>
                        </View>
                      </TouchableOpacity>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => setModalNewActor(true)}>
                          <View style={styles.editCastBtn}>
                            <Icon name="Edit_white" width="24" height="24" fill="none" />
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalDelActor(true)}>
                          <View style={[styles.editCastBtn, { backgroundColor: "rgba(255, 69, 58, 1)" }]}>
                            <Feather name="trash-2" size={24} color={Colors.white} />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  </View>
                )
              }
            }
          />


          {/* <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]}>
              <ScrollView horizontal={true}>
                <View style={styles.castInfo}>
                  <Image
                    source={imagePath["avatar2"]}
                    style={{ width: 64, height: 64, borderRadius: 32, marginRight: 16 }}
                  />
                  <View>
                    <Text.ParagraphTitle style={{ marginBottom: 8, fontWeight: "700" }}>
                      {"Laetitia Casta"}
                    </Text.ParagraphTitle>
                    <Text.Tertiary>{"Hero: Jessica Jones"}</Text.Tertiary>
                  </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => setModalNewActor(true)}>
                    <View style={styles.editCastBtn}>
                      <Icon name="Edit_white" width="24" height="24" fill="none" />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setModalDelActor(true)}>
                    <View style={[styles.editCastBtn, { backgroundColor: "rgba(255, 69, 58, 1)" }]}>
                      <Feather name="trash-2" size={24} color={Colors.white} />
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>

            <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]}>
              <View
                style={[
                  styles.castInfo,
                  {
                    backgroundColor: Colors.transparent,
                    borderColor: Colors.btnBack,
                    borderWidth: 1,
                  },
                ]}
              >
                <Image
                  source={imagePath["avatar4"]}
                  style={{ width: 64, height: 64, borderRadius: 32, marginRight: 16 }}
                />
                <View style={{}}>
                  <Text.ParagraphTitle style={{ marginBottom: 8, fontWeight: "700" }}>
                    {"Margot Robbie"}
                  </Text.ParagraphTitle>
                  <Text.Tertiary>{"Hero: Not indicated"}</Text.Tertiary>
                </View>
              </View>
            </View> */}


          {/* </ScrollView> */}

          <Button.Primary
            onPress={() => setModalCast(false)}
            textType={"Primary"}
            style={{ alignItems: "center", position: 'absolute' }}
          >
            <Text.TagTitle>{"Attach Selected"}</Text.TagTitle>
          </Button.Primary>
        </View>
        {/* newActor Modal */}
        <Modal
          isVisible={modalNewActor}
          swipeDirection="down"
          onSwipeComplete={() => setModalNewActor(false)}
          onRequestClose={() => setModalNewActor(false)}
          onBackdropPress={() => setModalNewActor(false)}
          deviceWidth={deviceWidth}
          style={{ width: "100%", marginLeft: 0, marginBottom: 0, justifyContent: "flex-end" }}
        >
          <View style={[styles.modalContainer, { height: vh(100) - 50, paddingBottom: 40 }]}>
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

            <TouchableOpacity style={styles.modalBackBtn} onPress={() => {
              setModalNewActor(false)
              setActorName("")
              setActorDescription("")
              setHeroName("")
            }}>
              <Ionicons name="arrow-back" size={20} color={Colors.blue} />
            </TouchableOpacity>

            <Text.ModalTitle style={{ marginBottom: 25 }}>{"New Actor"}</Text.ModalTitle>

            <View style={{ height: vh(90) - 150 }}>
              <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]}>
                <View style={{ flex: 1, marginRight: 16 }}>
                  <Input
                    value={actorName}
                    onChangeText={(text) => setActorName(text)}
                    placeholder={"Actor's Name"} />
                </View>
                <TouchableOpacity
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: Colors.btnBack,
                    padding: 10,
                  }}
                  onPress={() => pickImage()} >
                  <Icon name="User" width={96} height={96} fill={"none"} />
                  {image && <Image source={{ uri: image }} style={{ width: 0, height: 0 }} />}

                </TouchableOpacity>

              </View>

              <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]}>
                <View style={{ flex: 1 }}>
                  <Input
                    value={heroName}
                    onChangeText={(text) => setHeroName(text)}
                    placeholder={"Hero's Name"} />
                </View>
              </View>

              <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]}>
                <TextInput
                  value={actorDescription}
                  onChangeText={(text) => setActorDescription(text)}
                  placeholder={"Ex killer, suffering after his daughter dies."}
                  placeholderTextColor={Colors.white1}
                  style={{
                    height: 160,
                    backgroundColor: Colors.inputBack,
                    padding: 16,
                    borderRadius: 8,
                    textAlignVertical: "top",
                    width: "100%",
                  }}
                  numberOfLines={3}
                  multiline={true}
                />
              </View>
            </View>

            <Button.Primary
              onPress={() => {
                saveNewActor()
                // newActorApi()
                // setActorName("")
                // setActorDescription("")
                // setHeroName("")
                setModalNewActor(false)
              }
              }
              textType={"Primary"}
              style={{ alignItems: "center" }}
            >
              <Text.TagTitle>{"Attach Selected"}</Text.TagTitle>
            </Button.Primary>
          </View>
        </Modal>
      </Modal>


      {/* delActor Modal */}
      <Modal
        isVisible={modalDelActor}
        swipeDirection="down"
        onSwipeComplete={() => setModalDelActor(false)}
        onRequestClose={() => setModalDelActor(false)}
        onBackdropPress={() => setModalDelActor(false)}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0, marginBottom: 0 }}
      >
        <View
          style={[
            styles.modalContainer,
            {
              height: 180,
              paddingVertical: 24,
              alignItems: "flex-start",
              marginHorizontal: 16,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            },
          ]}
        >
          <Text.ModalTitle style={{ marginBottom: 25, textAlign: "left" }}>
            <Feather name="trash-2" size={24} color={Colors.white} style={{ letterSpacing: 10 }} />
            {"Delete an Actor?"}
          </Text.ModalTitle>
          <Text.Tertiary style={{ marginBottom: 24 }}>
            {"Do you really want to delete “Actor_Name”?"}
          </Text.Tertiary>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignContent: "space-between",
            }}
          >
            <View style={{ width: (vw(100) - 64) / 2 - 8, marginRight: 16 }}>
              <Button.Primary
                onPress={() => setModalDelActor(false)}
                textType={"Primary"}
                style={{ alignItems: "center", height: 40, paddingVertical: 12 }}
              >
                <Text.Primary style={{ marginTop: -4 }}>{"Delete"}</Text.Primary>
              </Button.Primary>
            </View>

            <View style={{ width: (vw(100) - 64) / 2 - 8 }}>
              <Button.Black
                onPress={() => setModalDelActor(false)}
                textType={"Primary"}
                style={{
                  alignItems: "center",
                  height: 40,
                  paddingVertical: 12,
                  borderWidth: 0,
                  backgroundColor: Colors.btnBack,
                }}
              >
                <Text.Primary style={{ marginTop: -4 }}>{"Cancel"}</Text.Primary>
              </Button.Black>
            </View>
          </View>
        </View>
      </Modal>

      {/* Tags Modal */}
      <Modal
        isVisible={modalTags}
        swipeDirection="down"
        onSwipeComplete={() => setModalTags(false)}
        onRequestClose={() => setModalTags(false)}
        onBackdropPress={() => setModalTags(false)}
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
          <TouchableOpacity style={styles.modalBackBtn} onPress={() => setModalTags(false)}>
            <AntDesign name="close" size={20} color={Colors.blue} />
          </TouchableOpacity>
          <Text.ModalTitle style={{ marginBottom: 25 }}>{"Tags"}</Text.ModalTitle>
          <View style={{ width: "100%" }}>
            <Input value={tagString} onChangeText={(text) => setTagString(text)} placeholder={"Enter a tag"} />
          </View>
          <Button.Primary
            onPress={() => saveTags()}
            textType={"Primary"}
            style={{ alignItems: "center", marginTop: 16 }}
          >
            <Text.TagTitle>{"Attach a Tag"}</Text.TagTitle>
          </Button.Primary>
        </View>
      </Modal>

      {/* Similar Movies Modal */}
      <Modal
        isVisible={modalSimilarMovies}
        onRequestClose={() => setModalSimilarMovies(false)}
        onBackdropPress={() => setModalSimilarMovies(false)}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0, marginBottom: 0, justifyContent: "flex-end" }}
      >
        <View style={[styles.modalContainer, { height: vh(100) - 50, paddingBottom: 40 }]}>
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
          <TouchableOpacity
            style={styles.modalBackBtn}
            onPress={() => setModalSimilarMovies(false)}
          >
            <AntDesign name="close" size={20} color={Colors.blue} />
          </TouchableOpacity>
          <Text.ModalTitle style={{ marginBottom: 25 }}>{"Similar Movies"}</Text.ModalTitle>
          <TextInput
            style={styles.searchBar}
            placeholder={"Search..."}
            onChangeText={(search) => setSimilarSearch(search)}
            placeholderTextColor={Colors.white1}
          />
          {filterSimilars(movies).map((movie, index) => (
            <TouchableOpacity onPress={() => {
              saveSimilarMovie(movie.movieTitle, imagePath[movie.movieThumb])
              console.log(movie, imagePath[movie.movieThumb])
              }}>
              <View key={index} style={styles.similarMovie}>
                <Image
                  source={imagePath[movie.movieThumb]}
                  style={{ width: 80, height: 100, borderRadius: 16, marginRight: 16 }}
                />
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{ display: "flex", flexDirection: "row", marginBottom: 8 }}
                    onPress={() => setModalSimilarDetail(true)}
                  >
                    <Text.ParagraphTitle style={{ flex: 1 }}>{movie.movieTitle}</Text.ParagraphTitle>
                    <MaterialIcons
                      name={"keyboard-arrow-right"}
                      size={24}
                      color={Colors.white}
                      style={{ textAlignVertical: "center" }}
                    />
                  </TouchableOpacity>

                  <Text.Tertiary>{movie.movieDesShort}</Text.Tertiary>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* Similar Movie Detail Modal */}
      <Modal
        isVisible={modalSimilarDetail}
        onRequestClose={() => setModalSimilarDetail(false)}
        onBackdropPress={() => setModalSimilarDetail(false)}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0, marginBottom: 0, justifyContent: "flex-end" }}
      >
        <View style={[styles.modalContainer, { height: vh(100) - 50, paddingBottom: 40 }]}>
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
          <TouchableOpacity
            style={styles.modalBackBtn}
            onPress={() => setModalSimilarDetail(false)}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.blue} />
          </TouchableOpacity>

          <Text.ModalTitle style={{ marginBottom: 25 }}>{"Similar Movies"}</Text.ModalTitle>
          <ScrollView style={{ width: "100%", paddingBottom: 40 }}>
            <View style={[styles.similarMovie, { borderBottomWidth: 0 }]}>
              <Image
                source={imagePath["thumb7"]}
                style={{ width: 96, height: 120, borderRadius: 16, marginRight: 16 }}
              />
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={{ display: "flex", flexDirection: "row", marginBottom: 8 }}
                  onPress={() => setModalSimilarDetail(true)}
                >
                  <Text.ParagraphTitle style={{ flex: 1 }}>
                    {"Journey to the center of the earth "}
                  </Text.ParagraphTitle>
                </TouchableOpacity>

                <Text.Tertiary>
                  {"Fear your wishes come true and don’t trust anyone."}
                </Text.Tertiary>
              </View>
            </View>
            <View style={styles.contentItem}>
              <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Synopsis"}</Text.TagTitle>
              <Text.Tertiary>
                {
                  "Use filler text that has been edited for length and format to match the characteristics of real content as closely as possible..."
                }
              </Text.Tertiary>
              <Text.Tertiary style={{ color: Colors.blue }}>{"Show more"}</Text.Tertiary>
            </View>
            <View style={styles.contentItem}>
              <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Genres"}</Text.TagTitle>
              <ScrollView style={styles.genres} horizontal={true}>
                <View style={styles.genre}>
                  <Image source={imagePath["genre_comedy"]} style={{ width: 40, height: 40 }} />
                </View>
                <View style={styles.genre}>
                  <Image source={imagePath["genre_sci"]} style={{ width: 40, height: 40 }} />
                </View>
                <View style={styles.genre}>
                  <Image source={imagePath["genre_crime"]} style={{ width: 40, height: 40 }} />
                </View>
                <View style={styles.genre}>
                  <Image source={imagePath["genre_action"]} style={{ width: 40, height: 40 }} />
                </View>
              </ScrollView>
            </View>

            <View style={styles.contentItem}>
              <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Cast"}</Text.TagTitle>
              <ScrollView style={styles.casts} horizontal={true}>
                <View style={styles.cast}>
                  <Image
                    source={imagePath["avatar3"]}
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                  />
                  <Text.Primary style={{ textAlign: "center", marginTop: 10 }}>
                    {"Keanu Reeves"}
                  </Text.Primary>
                  <Text.Primary style={styles.castName}>{"John Wick"}</Text.Primary>
                </View>
                <View style={styles.cast}>
                  <Image
                    source={imagePath["avatar2"]}
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                  />
                  <Text.Primary style={{ textAlign: "center", marginTop: 10 }}>
                    {"Laetitia Casta"}
                  </Text.Primary>
                  <Text.Primary style={styles.castName}>{"Jessica Johns"}</Text.Primary>
                </View>
                <View style={styles.cast}>
                  <Image
                    source={imagePath["avatar3"]}
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                  />
                  <Text.Primary style={{ textAlign: "center", marginTop: 10 }}>
                    {"Keanu Reeves"}
                  </Text.Primary>
                  <Text.Primary style={styles.castName}>{"John Wick"}</Text.Primary>
                </View>
                <View style={styles.cast}>
                  <Image
                    source={imagePath["avatar2"]}
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                  />
                  <Text.Primary style={{ textAlign: "center", marginTop: 10 }}>
                    {"Laetitia Casta"}
                  </Text.Primary>
                  <Text.Primary style={styles.castName}>{"Jessica Johns"}</Text.Primary>
                </View>
                <View style={styles.cast}>
                  <Image
                    source={imagePath["avatar3"]}
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                  />
                  <Text.Primary style={{ textAlign: "center", marginTop: 10 }}>
                    {"Keanu Reeves"}
                  </Text.Primary>
                  <Text.Primary style={styles.castName}>{"John Wick"}</Text.Primary>
                </View>
                <View style={styles.cast}>
                  <Image
                    source={imagePath["avatar2"]}
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                  />
                  <Text.Primary style={{ textAlign: "center", marginTop: 10 }}>
                    {"Laetitia Casta"}
                  </Text.Primary>
                  <Text.Primary style={styles.castName}>{"Jessica Johns"}</Text.Primary>
                </View>
              </ScrollView>
            </View>

            <View style={styles.contentItem}>
              <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Writer"}</Text.TagTitle>
              <ScrollView style={styles.genres} horizontal={true}>
                <View
                  style={[
                    styles.genre,
                    { backgroundColor: Colors.btnBack, paddingHorizontal: 4, borderRadius: 14 },
                  ]}
                >
                  <Image
                    source={imagePath["avatar5"]}
                    style={{ width: 24, height: 24, borderRadius: 12 }}
                  />
                  <Text.Primary
                    style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
                  >
                    {"Dan Hernandez"}
                  </Text.Primary>
                </View>

                <View
                  style={[
                    styles.genre,
                    { backgroundColor: Colors.btnBack, paddingHorizontal: 4, borderRadius: 14 },
                  ]}
                >
                  <Image
                    source={imagePath["avatar"]}
                    style={{ width: 24, height: 24, borderRadius: 12 }}
                  />
                  <Text.Primary
                    style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
                  >
                    {"Julia Ellei"}
                  </Text.Primary>
                </View>

                <View
                  style={[
                    styles.genre,
                    { backgroundColor: Colors.btnBack, paddingHorizontal: 4, borderRadius: 14 },
                  ]}
                >
                  <Image
                    source={imagePath["avatar8"]}
                    style={{ width: 24, height: 24, borderRadius: 12 }}
                  />
                  <Text.Primary
                    style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
                  >
                    {"Rob Letterman"}
                  </Text.Primary>
                </View>

                <View
                  style={[
                    styles.genre,
                    { backgroundColor: Colors.btnBack, paddingHorizontal: 4, borderRadius: 14 },
                  ]}
                >
                  <Image
                    source={imagePath["avatar6"]}
                    style={{ width: 24, height: 24, borderRadius: 12 }}
                  />
                  <Text.Primary
                    style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
                  >
                    {"Derek Connolly"}
                  </Text.Primary>
                </View>
              </ScrollView>
            </View>

            <View style={styles.contentItem}>
              <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Tags"}</Text.TagTitle>
              <ScrollView style={styles.genres} horizontal={true}>
                <View
                  style={[
                    styles.genre,
                    { backgroundColor: Colors.btnBack, paddingHorizontal: 4, borderRadius: 14 },
                  ]}
                >
                  <Text.Primary
                    style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
                  >
                    {"Comedy"}
                  </Text.Primary>
                </View>
                <View
                  style={[
                    styles.genre,
                    { backgroundColor: Colors.btnBack, paddingHorizontal: 4, borderRadius: 14 },
                  ]}
                >
                  <Text.Primary
                    style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
                  >
                    {"Caps"}
                  </Text.Primary>
                </View>
                <View
                  style={[
                    styles.genre,
                    { backgroundColor: Colors.btnBack, paddingHorizontal: 4, borderRadius: 14 },
                  ]}
                >
                  <Text.Primary
                    style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
                  >
                    {"Thriller"}
                  </Text.Primary>
                </View>
                <View
                  style={[
                    styles.genre,
                    { backgroundColor: Colors.btnBack, paddingHorizontal: 4, borderRadius: 14 },
                  ]}
                >
                  <Text.Primary
                    style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
                  >
                    {"Fantasy"}
                  </Text.Primary>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
          <Button.Primary
            onPress={() => setModalSimilarDetail(false)}
            textType={"Primary"}
            style={{ alignItems: "center", marginTop: 20 }}
          >
            <Text.TagTitle>{"Attach Selected"}</Text.TagTitle>
          </Button.Primary>
        </View>
      </Modal>

      {/* Logline Modal */}
      <Modal
        isVisible={modalLogline}
        onRequestClose={() => setModalLogline(false)}
        onBackdropPress={() => setModalLogline(false)}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0, marginBottom: 0, justifyContent: "flex-end" }}
      >
        <View style={[styles.modalContainer, { height: vh(100) - 50, paddingBottom: 40 }]}>
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
          <TouchableOpacity style={styles.modalBackBtn} onPress={() => setModalLogline(false)}>
            <AntDesign name="close" size={20} color={Colors.blue} />
          </TouchableOpacity>

          <Text.ModalTitle style={{ marginBottom: 25 }}>{"Logline"}</Text.ModalTitle>

          <TouchableOpacity style={styles.modalAddBtn} onPress={() => setModalLoglineInfo(true)}>
            <Feather name="info" size={20} color={Colors.blue} />
          </TouchableOpacity>
          <ScrollView style={{ width: "100%", paddingBottom: 40 }}>
            <View style={styles.contentItem}>
              <Text.ParagraphTitle style={{ marginBottom: 8, color: "rgba(235, 152, 78, 1)" }}>
                {"Inciting Incident"}
              </Text.ParagraphTitle>
              <TextInput
                value={incident}
                onChangeText={(text) => setIncident(text)}
                placeholder={"Enter your text here"}
                placeholderTextColor={Colors.white1}
                style={{
                  color: 'white',
                  height: 120,
                  backgroundColor: Colors.inputBack,
                  padding: 16,
                  borderRadius: 8,
                  textAlignVertical: "top",
                }}
                numberOfLines={3}
                multiline={true}
              />
            </View>
            <View style={styles.contentItem}>
              <Text.ParagraphTitle style={{ marginBottom: 8, color: "rgba(125, 189, 232, 1)" }}>
                {"Protagonist"}
              </Text.ParagraphTitle>
              <TextInput
                value={protagonist}
                onChangeText={(text) => setProtagonist(text)}
                placeholder={"Enter your text here"}
                placeholderTextColor={Colors.white1}
                style={{
                  color: 'white',

                  height: 120,
                  backgroundColor: Colors.inputBack,
                  padding: 16,
                  borderRadius: 8,
                  textAlignVertical: "top",
                }}
                numberOfLines={3}
                multiline={true}
              />
            </View>

            <View style={styles.contentItem}>
              <Text.ParagraphTitle style={{ marginBottom: 8, color: "rgba(185, 138, 204, 1)" }}>
                {"Action"}
              </Text.ParagraphTitle>
              <TextInput
                value={action}
                onChangeText={(text) => setAction(text)}
                placeholder={"Enter your text here"}
                placeholderTextColor={Colors.white1}
                style={{
                  color: 'white',

                  height: 120,
                  backgroundColor: Colors.inputBack,
                  padding: 16,
                  borderRadius: 8,
                  textAlignVertical: "top",
                }}
                numberOfLines={3}
                multiline={true}
              />
            </View>

            <View style={styles.contentItem}>
              <Text.ParagraphTitle style={{ marginBottom: 8, color: "rgba(236, 112, 99, 1)" }}>
                {"Antagonist"}
              </Text.ParagraphTitle>
              <TextInput
                value={antagonist}
                onChangeText={(text) => setAntagonist(text)}
                placeholder={"Enter your text here"}
                placeholderTextColor={Colors.white1}
                style={{
                  color: 'white',

                  height: 120,
                  backgroundColor: Colors.inputBack,
                  padding: 16,
                  borderRadius: 8,
                  textAlignVertical: "top",
                }}
                numberOfLines={3}
                multiline={true}
              />
            </View>
          </ScrollView>
          <Button.Primary
            onPress={() => saveLogline()}
            textType={"Primary"}
            style={{ alignItems: "center", marginTop: 20 }}
          >
            <Text.TagTitle>{"save Logline"}</Text.TagTitle>
          </Button.Primary>
        </View>
      </Modal>

      {/* delActor Modal */}
      <Modal
        isVisible={modalLoglineInfo}
        swipeDirection="down"
        onSwipeComplete={() => setModalLoglineInfo(false)}
        onRequestClose={() => setModalLoglineInfo(false)}
        onBackdropPress={() => setModalLoglineInfo(false)}
        deviceWidth={deviceWidth}
        style={{ width: "100%", marginLeft: 0, marginBottom: -100 }}
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
          <Text.ParagraphTitle
            style={{
              marginBottom: 25,
              textAlign: "left",
              textAlignVertical: "center",
            }}
          >
            <Feather
              name="info"
              size={24}
              color={Colors.white}
              style={{ letterSpacing: 10, lineHeight: 30 }}
            />
            {"Logline Formula"}
          </Text.ParagraphTitle>
          <TouchableOpacity
            onPress={() => setModalLoglineInfo(false)}
            style={{ position: "absolute", top: 16, right: 16 }}
          >
            <AntDesign name="closecircle" size={24} color={Colors.white1} />
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignContent: "space-between",
            }}
          >
            <View style={[styles.loglineInfo, { backgroundColor: "rgba(230, 126, 34, 0.3)" }]}>
              <Text.Primary style={{ color: "rgba(235, 152, 78, 1)", textAlign: "center" }}>
                {"Inciting Incident"}
              </Text.Primary>
            </View>
            <Text.ParagraphTitle
              style={{
                textAlign: "center",
                marginVertical: 12,
                color: "rgba(255, 255, 255, 0.6)",
                fontWeight: "300",
              }}
            >
              {"+"}
            </Text.ParagraphTitle>
            <View style={[styles.loglineInfo, { backgroundColor: "rgba(52, 152, 219, 0.3)" }]}>
              <Text.Primary style={{ color: "rgba(125, 189, 232, 1)", textAlign: "center" }}>
                {"Protagonist"}
              </Text.Primary>
            </View>
            <Text.ParagraphTitle
              style={{
                textAlign: "center",
                marginVertical: 12,
                color: "rgba(255, 255, 255, 0.6)",
                fontWeight: "300",
              }}
            >
              {"+"}
            </Text.ParagraphTitle>
            <View style={[styles.loglineInfo, { backgroundColor: "rgba(155, 89, 182, 0.3)" }]}>
              <Text.Primary style={{ color: "rgba(185, 138, 204, 1)", textAlign: "center" }}>
                {"Action"}
              </Text.Primary>
            </View>
            <Text.ParagraphTitle
              style={{
                textAlign: "center",
                marginVertical: 12,
                color: "rgba(255, 255, 255, 0.6)",
                fontWeight: "300",
              }}
            >
              {"+"}
            </Text.ParagraphTitle>
            <View style={[styles.loglineInfo, { backgroundColor: "rgba(231, 76, 60, 0.3)" }]}>
              <Text.Primary style={{ color: "rgba(236, 112, 99, 1)", textAlign: "center" }}>
                {"Antagonist"}
              </Text.Primary>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
};

MovieNewScreen.navigationOptions = navigationOptions();

export default MovieNewScreen;
