import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
  FlatList,
  KeyboardAvoidingView,
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
import { vw, vh } from "react-native-css-vh-vw";
import { Snackbar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";

import BaseURl from "constant/BaseURL";
import imagesPath from "../../constant/imagePath";
import navigationOptions from "./BookNewScreen.navigationOptions";
import styles from "./BookNewScreen.styles";
import imagePath from "../../constant/imagePath";
import { text } from "@storybook/addon-knobs";
import axios from "axios";

const BookNewScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const route = useRoute<any>();
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

  const [similarBookData, setSimilarBookData] = React.useState([]);
  const [similarBooks, setSimilarBooks] = React.useState([]);
  const [bookData, setBookData] = React.useState([]);
  const [bookBanner, setBookBanner] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tagLine, setTagLine] = React.useState("");
  const [synopsis, setSynopsis] = React.useState("");
  const [type, settype] = React.useState("Book");
  //logline
  const [incident, setIncident] = React.useState("");
  const [protagonist, setProtagonist] = React.useState("");
  const [action, setAction] = React.useState("");
  const [antagonist, setAntagonist] = React.useState("");
  const [loglineData, setLoglineData] = React.useState([]);
  const [logLine, setLogLine] = React.useState([]);
  //genres
  const [genreData, setGenreData] = React.useState([]);
  const [subGenre, setSubGenre] = React.useState([]);
  const [selectedSubGenre, setSelectedSubGenre] = React.useState([]);
  const [genreIndex, setGenreIndex] = React.useState([]);
  const [singleGenre, setSingleGenre] = React.useState<any>();
  const [genre, setGenre] = React.useState([]);

  //New Actor
  const [actorName, setActorName] = React.useState("");
  const [heroName, setHeroName] = React.useState("");
  const [actorDescription, setActorDescription] = React.useState("");
  const [actorData, setActorData] = React.useState([]);
  const [actorDataList, setActorDataList] = React.useState([""]);
  const [actorImage, setActorImage] = React.useState("");
  const [actorIndex, setActorIndex] = React.useState([]);
  const [selectedActor, setSelectedActor] = React.useState([]);
  //tag
  const [tags, setTags] = React.useState([]);
  const [tagString, setTagString] = React.useState("");
  const [tagArray, setTagArray] = React.useState([""]);
  // Simialr Books
  const [singlebook, setsinglebook] = React.useState([]);

  //search states
  const [similarSearch, setSimilarSearch] = React.useState("");
  const [genreModalList, setGenreModalList] = React.useState([
    {
      name: "Fantasy",
      image: "genre_fantasy",
      number: 0,
      subGenre: [
        "Alternate History",
        "Children's Story",
        "Comedy",
        "Contemporary",
        "Dark Fantasy",
        "Fairy Tale",
        "Fantasy of Manners",
        "Heroic",
        "High Fantasy",
        "Historical",
        "Low Fantasy",
        "Magical Realism",
        "Mythic",
        "Superhero",
        "Sword and Sorcery",
        "Urban",
        "Young Adult",
      ],
    },
    {
      name: "Horror",
      image: "genre_horror",
      number: 0,
      subGenre: [
        "Body Horror",
        "Comedy",
        "Creepy Kids",
        "Extreme Horror",
        "Gothic",
        "Hauntings",
        "Historical",
        "Lovecraftian",
        "Man-Made",
        "Monsters",
        "Mythic",
        "Occult",
        "Psychic Abilities",
        "Psychological",
        "Quiet Horror",
        "Young Adult",
      ],
    },
    {
      name: "Mystery",
      image: "genre_mystery",
      number: 0,
      subGenre: [
        "Amateur Sleuth",
        "Bumbling Detective",
        "Caper",
        "Child in Peril",
        "Children's Story",
        "Cozy",
        "Culinary",
        "Disabled",
        "Doctor Detective",
        "Furry Sleuth",
        "Hardboiled",
        "Historical",
        "Howdunit",
        "Legal",
        "Locked Room",
        "Multicultural and Diverse",
        "Paranormal",
        "Police Procedural",
        "Private Detective",
        "Whodunit",
        "Woman in Peril",
        "Young Adult",
      ],
    },
    {
      name: "Romance",
      image: "genre_rommance",
      number: 0,
      subGenre: [
        "Billionaires",
        "Comedy",
        "Contemporary",
        "Fantasy Romance",
        "Gothic",
        "Historical",
        "Holidays",
        "Inspirational",
        "Military",
        "Paranormal",
        "Regency",
        "Romantic Suspense",
        "Science Fiction Romance",
        "Sports",
        "Time Travel",
        "Western Romance",
        "Young Adult",
      ],
    },
    {
      name: "Science Fictio",
      image: "genre_fiction",
      number: 0,
      subGenre: [
        "Aliens",
        "Alternate History",
        "Alternate/Parallel Universe",
        "Apocalyptic/Post-Apocalyptic",
        "Biopunk",
        "Children's Story",
        "Colonization",
        "Comedy",
        "Cyberpunk",
        "Dying Earth",
        "Dystopia",
        "Galactic Empire",
        "Generation Ship",
        "Hard Science Fiction",
        "Immortality",
        "Lost Worlds",
        "Military",
        "Mind Transfer",
        "Mundane Science Fiction",
        "Mythic",
        "Nanopunk",
        "Robots/A.I.",
        "Science Fantasy",
        "Science Horror",
        "Slipstream",
        "Soft Science Fiction",
        "Space Exploration",
        "Space Opera",
        "SpyFi",
        "Steampunk",
        "Time Travel",
        "Utopia",
        "Young Adult",
      ],
    },
    {
      name: "Thriller and Suspense",
      image: "genre_thriller",
      number: 0,
      subGenre: [
        "Action",
        "Comedy",
        "Conspiracy",
        "Crime",
        "Disaster",
        "Espionage",
        "Forensic",
        "Historical",
        "Legal",
        "Medical",
        "Military",
        "Mystery Thriller",
        "Paranormal",
        "Political",
        "Psychological",
        "Religious",
        "Technothriller",
        "Young Adult",
      ],
    },
    {
      name: "Western",
      image: "genre_fantasy",
      number: 0,
      subGenre: [
        "Bounty Hunters",
        "Cattle Drive",
        "Children's Story",
        "Comedy",
        "Gold Rush",
        "Gunfighters",
        "Land Rush",
        "Lawmen",
        "Mountain Men",
        "Outlaws",
        "Prairie Settlement",
        "Revenge",
        "Wagon Train",
        "Young Adult",
      ],
    },
  ]);
  const filterSimilars = (list) => {
    return list.filter((listItem) =>
      listItem.movieTitle.toLowerCase().includes(similarSearch.toLowerCase())
    );
  };
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
    outputRange: [0, (28 * vw(100)) / 100],
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

  useEffect(() => {
    bookDetails();
    saveLogline();
  }, []);

  const saveLogline = () => {
    const logline = {
      logline: {
        incitingIncident: incident,
        protagonist: protagonist,
        Action: action,
        antagonist: antagonist,
      },
    };
    setModalLogline(false);
    console.log("-------Logline-------", logline);
    incident === "" && protagonist === "" && action === "" && antagonist === ""
      ? setLoglineData(logline)
      : setLoglineData(logline);
    setLogLine(incident + " " + protagonist + " " + action + " " + antagonist);
  };

  const saveSimilarBooks = (name: any, poster: any) => {
    let movie = [];
    movie.push({ bookPoster: poster, bookName: name });
    let data = { similarBooks: movie };
    setSimilarBooks(data);
    console.log(data, "===data===");
    movie ? setBookData(movie) : setBookData([""]);
    Toast.show("Book Added.", { duration: Toast.durations.LONG });
    setModalSimilarMovies(false);
  };

  const saveTags = () => {
    setModalTags(false);
    let data = { tags: tags };
    tags.push(tagString);
    console.log("-------Tags-------", data);
    setTagArray(data);
    setTagString("");
  };

  const saveGeneres = () => {
    genreModalList.findIndex((object) => {
      if (object.name === singleGenre.name) {
        object.number = selectedSubGenre.length;
        console.log(object.number);
      }
    });

    let data = {};
    let allGenre = [];
    data[singleGenre.name] = selectedSubGenre;
    console.log(data, "======---------", selectedSubGenre.length);
    allGenre.push(data);
    if (genreData.length === 0) {
      setGenreData(allGenre);
    } else {
      setGenreData((prevState) => [...prevState, data]);
    }
    setModalGenreDetail(false);
    setGenreIndex([]);
    setSelectedSubGenre([]);
  };

  const saveGenreData = (item, index) => {
    if (genreIndex.length > 0) {
      if (genreIndex.includes(index)) {
        let removeIndex = genreIndex.filter((i) => i !== index);
        let remove = selectedSubGenre.filter((i) => i !== item);
        setGenreIndex(removeIndex);
        setSelectedSubGenre(remove);
      } else {
        setGenreIndex((prevState: any) => [...prevState, index]);
        setSelectedSubGenre((prevState: any) => [...prevState, item]);
      }
    } else {
      setGenreIndex((prevState: any) => [...prevState, index]);
      setSelectedSubGenre((prevState: any) => [...prevState, item]);
    }
  };

  const pickMovieBanner = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (modalNewActor) {
      setActorImage(result.uri);
    } else {
      setBookBanner(result.uri);
    }
  };

  const selectActors = (item, index) => {
    if (actorIndex.length > 0) {
      if (actorIndex.includes(index)) {
        let removeIndex = actorIndex.filter((i) => i !== index);
        let remove = selectedActor.filter((i) => i.actorId !== item.actorId);
        console.log(remove);
        setActorIndex(removeIndex);
        setSelectedActor(remove);
      } else {
        setActorIndex((prevState: any) => [...prevState, index]);
        setSelectedActor((prevState: any) => [...prevState, item]);
      }
    } else {
      setActorIndex((prevState: any) => [...prevState, index]);
      setSelectedActor((prevState: any) => [...prevState, item]);
    }
  };

  const saveNewActor = async () => {
    const token = await AsyncStorage.getItem("authToken");
    var formData = new FormData();
    let filename = actorImage.split("/").pop();

    formData.append("actorName", actorName);
    formData.append("heroName", heroName);
    formData.append("actorDescription", actorDescription);
    formData.append("actorImage", {
      uri: actorImage,
      name: filename,
      type: "image/jpeg",
    });

    fetch(BaseURl + "movies/actorDetails", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.code === 200) {
          let data = [];
          alert(responseJson.message);
          data.push(responseJson.data);
          console.log("=====================", actorData);
          if (actorData.length === 0) {
            setActorData(data);
          } else {
            setActorData((prevState) => [...prevState, responseJson.data]);
          }
          setActorName("");
          setActorDescription("");
          setHeroName("");
          setActorImage("");
          setModalNewActor(false);
        } else {
          alert(responseJson.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bookDetails = async () => {
    const token = await AsyncStorage.getItem("authToken");

    fetch(BaseURl + "books/bookDetails", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Existing Actors: ", responseJson.data, "===end====");

        setSimilarBookData(responseJson.data);
        // console.log(responseJson);
        // if (responseJson.code === 200) {

        //   // let data = [];
        //   // let movies = [];
        //   // responseJson.data.map((item) => {
        //   //   // item.actors.map(actor => {
        //   //   //   data.push(actor)
        //   //   //   if (actorData.length === 0) { setActorData(data) }
        //   //   //   else { setActorData(prevState => [...prevState, actor]) }
        //   //   // })
        //   //   item.similarBooks.map((movie) => {
        //   //     console.log("------------", movie);
        //   //     movies.push(movie);
        //   //   });
        //   // });
        //   // setSimilarBookData(movies);
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveBookDetails = async () => {
    if (bookBanner === "" || null) {
      alert("Please Select BookBanner");
    } else if (title === "" || null) {
      alert("Please Add title");
    } else {
      const token = await AsyncStorage.getItem("authToken");

      const uriPart = bookBanner.split(".");
      const fileExtension = uriPart[uriPart.length - 1];
      const genres = { genres: genreData };

      let formData = new FormData();
      formData.append("type", type);
      formData.append(
        type === "Movie"
          ? "movieBanner"
          : type === "Book"
          ? "bookBanner"
          : type === "Serial"
          ? "seriesBanner"
          : "",
        {
          uri: bookBanner,
          name: `photo.${fileExtension}`,
          type: `image/${fileExtension}`,
        }
      );
      formData.append("title", title);
      formData.append("synopsis", synopsis);
      formData.append("logline", JSON.stringify(loglineData));
      formData.append("genres", JSON.stringify(genres));
      formData.append("tagline", tagLine);
      formData.append("tags", JSON.stringify(tagArray));
      formData.append("actors", JSON.stringify(actorDataList));
      formData.append(
        type === "Movie"
          ? "similarMovies"
          : type === "Book"
          ? "similarBooks"
          : type === "Serial"
          ? "similarSeries"
          : "",
        JSON.stringify(similarBooks)
      );

      console.log("formData", formData);

      if (type === "Movie") {
        fetch(BaseURl + "movies/basicDetails", {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log("responseJson  ", responseJson);
            alert(responseJson.message);
            navigation.goBack();
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (type === "Book") {
        fetch(BaseURl + "books/basicDetails", {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log("responseJson  ", responseJson);
            alert(responseJson.message);
            navigation.goBack();
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (type === "Serial") {
        fetch(BaseURl + "series/basicDetails", {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log("responseJson  ", responseJson);
            if (responseJson.code === 200) {
              alert(responseJson.message);
              navigation.goBack();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const getSignleMovie = async (id) => {
    // setSpinner(true)
    
    const token = await AsyncStorage.getItem("authToken");

    axios({
      method: "get",
      url: BaseURl + "books/singleBook/" + id,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.data, "===Single movie end===");

        setsinglebook(resposeJson.data.data);
        setTimeout(() => {
          console.log(singlebook, "===statedata===");
        }, 2000);

        // setScreenPlay(resposeJson.data.data.screenPlay)
        // setSpinner(false)
      })
      .catch((err) => {
        // setSpinner(false)
        console.log(err);
      });
  };

  const searchText = (e) => {
    let text = e.toLowerCase();
    let trucks = similarBookData;
    let filteredName = trucks.filter((item) => {
      return !item.title || item.title === "" ? null : item.title.toLowerCase().match(text);
    });
    if (!text || text === "") {
      bookDetails();
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      console.log("no data");
    } else if (Array.isArray(filteredName)) {
      setSimilarBookData(filteredName);
    }
  };

  const removeGenre = (item) => {
    let data = genre.filter((oldGen) => oldGen !== item);
    setGenre(data);
  };

  const removeActor = (item) => {
    let data = selectedActor.filter((actor) => actor.actorId !== item.actorId);
    setSelectedActor(data);
    // setModalRemoveCast(true)
  };

  const removeBook = (item) => {
    let data = bookData.filter((movie) => movie._id !== item._id);
    setBookData(data);
    // setModalRemoveMovie(true)
  };

  return (
    <View style={{ flex: 1 }}>
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
                    {"Books "}
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
          <Animated.ScrollView
            style={{ marginBottom: 16 }}
            contentInsetAdjustmentBehavior="automatic"
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollPosition } } }], {
              useNativeDriver: false,
            })}
          >
            <View style={styles.movieTitle}>
              <TouchableOpacity onPress={() => pickMovieBanner()} style={styles.thumb}>
                {bookBanner ? (
                  <Image source={{ uri: bookBanner }} style={{ flex: 1, borderRadius: 16 }} />
                ) : (
                  <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                    <Icon name="Thumb" width="24" height="24" fill="none" />
                  </View>
                )}
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Text.ParagraphTitle style={{ marginBottom: 8 }}>{"Title"}</Text.ParagraphTitle>
                <Input
                  placeholder={"Enter text"}
                  value={title}
                  onChangeText={(text) => setTitle(text)}
                />
              </View>
            </View>
            <View>
              <View style={styles.contentItem}>
                <Text.ParagraphTitle style={{ marginBottom: 8 }}>{"Logline"}</Text.ParagraphTitle>
                <TextInput
                  value={incident === "" && protagonist === "" && action === "" && antagonist === "" ? "" : logLine}
                  placeholder={"Describe your question"}
                  placeholderTextColor={Colors.white1}
                  style={{
                    color: "#fff",
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
                <Input
                  placeholder={"Enter text"}
                  value={tagLine}
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
                    color: "#fff",
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
              
                <ScrollView
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    // marginVertical: 10,
                    paddingVertical: 10,
                  }}
                  horizontal={true}
                >
                    <View style={{ display: "flex", flexDirection: "row" }}>
                  <TouchableOpacity style={styles.normalBtn} onPress={() => setModalGenre(true)}>
                    <Text.Primary style={{ color: Colors.blue }}>{"Add"}</Text.Primary>
                  </TouchableOpacity>
                </View>
                  {genre
                    ? genre.map((genre, index) => (
                        <View style={styles.genre} key={index}>
                          <Text.Primary
                            style={{
                              lineHeight: Font.FontLineHeight.Tertiary,
                              marginHorizontal: 8,
                            }}
                          >
                            {Object.keys(genre)}
                          </Text.Primary>
                          <TouchableOpacity
                            onPress={() => removeGenre(genre)}
                            style={{ position: "absolute", top: -5, right: -4 }}
                          >
                            <View
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: "rgba(255, 69, 58, 1)",
                                padding: 2,
                                borderRadius: 10,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Ionicons name="ios-close" size={16} color={Colors.white} />
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))
                    : null}
                </ScrollView>
              </View>

              <View style={{ marginTop: 24 }}>
                <Text.ParagraphTitle style={{ marginBottom: 8 }}>
                  {"Dream Cast"}
                </Text.ParagraphTitle>
              
                <ScrollView
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingVertical: 10,
                  }}
                  horizontal={true}
                >
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
                  {selectedActor
                    ? selectedActor.map((dreamcast, index) => (
                        <View style={styles.cast} key={index}>
                          <Image
                            source={{ uri: dreamcast.actorImage }}
                            style={{ width: 80, height: 80, borderRadius: 40 }}
                          />
                          <Text.Primary style={{ textAlign: "center", marginTop: 10 }}>
                            {dreamcast.actorName}
                          </Text.Primary>
                          <Text.Primary style={styles.castName}>{dreamcast.heroName}</Text.Primary>
                          <TouchableOpacity
                            onPress={() => removeActor(dreamcast)}
                            style={{ position: "absolute", top: 4, right: 4 }}
                          >
                            <View
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: "rgba(255, 69, 58, 1)",
                                padding: 2,
                                borderRadius: 10,
                              }}
                            >
                              <Ionicons name="ios-close" size={16} color={Colors.white} />
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))
                    : null}
                </ScrollView>
              </View>

              <View style={{ marginTop: 24 }}>
                <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Tags"}</Text.TagTitle>
                <FlatList
                  data={tags}
                  horizontal
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          backgroundColor: "rgba(29, 174, 255, 0.15)",
                          borderRadius: 20,
                          alignItems: "center",
                          bottom: 2,
                        }}
                      >
                        <Text.Primary>{item}</Text.Primary>
                        <TouchableOpacity
                          style={{ marginLeft: 5 }}
                          onPress={() => {
                            console.log(index);
                            var r = tags.filter((i) => i !== item);
                            setTags(r);
                          }}
                        >
                          <AntDesign name="close" size={20} color={Colors.blue} />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => setModalTags(true)}>
                    <Text.Primary style={[styles.normalBtn, { overflow: "hidden" }]}>
                      {"Add"}
                    </Text.Primary>
                  </TouchableOpacity>
                </View>
              </View>
{/* 
              <View style={{ marginBottom: 20, marginTop: 24 }}>
                <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>
                  {"Similar Books"}
                </Text.TagTitle>

                <ScrollView
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    // marginVertical: 10,
                    paddingVertical: 10,
                  }}
                  horizontal={true}
                >
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
                  {bookData
                    ? bookData.map((item, index) => (
                        <View style={[styles.cast, { marginTop: 6 }]} key={index}>
                          <Image
                            source={{ uri: item.bookPoster }}
                            style={{ width: 80, height: 100, borderRadius: 16 }}
                          />
                          <Text.Primary style={{ textAlign: "center", marginTop: 10 }}>
                            {item.bookName}
                          </Text.Primary>
                          <TouchableOpacity
                            onPress={() => removeBook(item)}
                            style={{ position: "absolute", top: -5, right: -4 }}
                          >
                            <View
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: "rgba(255, 69, 58, 1)",
                                padding: 2,
                                borderRadius: 10,
                              }}
                            >
                              <Ionicons name="ios-close" size={16} color={Colors.white} />
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))
                    : null}
                </ScrollView>
              </View> */}
            </View>
          </Animated.ScrollView>
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
        </View>
        {/* CategoryModal */}
        <Modal
          isVisible={modalCategory}
          swipeDirection="down"
          onSwipeComplete={() => setModalCategory(false)}
          onBackdropPress={() => setModalCategory(false)}
          onRequestClose={() => setModalCategory(false)}
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
            <TouchableOpacity
              style={styles.catBtnContainer}
              onPress={() => {
                settype("Movie");
                setModalCategory(false);
              }}
            >
              <View style={styles.catBtnText}>
                <Text.Primary>{"Movie"}</Text.Primary>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.catBtnContainer}
              onPress={() => {
                settype("Serial");
                setModalCategory(false);
              }}
            >
              <View style={styles.catBtnText}>
                <Text.Primary>{"Series"}</Text.Primary>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.catBtnContainer}
              onPress={() => {
                settype("Book");
                setModalCategory(false);
              }}
            >
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
          onBackdropPress={() => setModalGenre(false)}
          onRequestClose={() => setModalGenre(false)}
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
                      let data = { name: genre.name, image: genre.image };
                      setSingleGenre(data);
                      setSubGenre(genre.subGenre);
                      setModalGenreDetail(true);
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
              onPress={() => {
                if (genreData.length > 0) {
                  if (genre.length > 0) {
                    genre.findIndex((object) => {
                      genreData.findIndex((obj) => {
                        if (Object.keys(object).toString() == Object.keys(obj).toString()) {
                          console.log("object", Object.keys(object).toString());
                          let newstate = genre.filter(
                            (item) => Object.keys(item).toString() !== Object.keys(obj).toString()
                          );
                          newstate.push(obj);
                          console.log(newstate);
                          setGenre(newstate);
                        } else {
                          setGenre((prevState) => [...prevState, obj]);
                        }
                      });
                    });
                  } else {
                    setGenre(genreData);
                  }
                  Toast.show("Genres Added.", { duration: Toast.durations.LONG });
                }
                setModalGenre(false);
                console.log(genre, "=====only genre=====");
              }}
              // onPress={() => {
              //   console.log("=====DOne=====")
              //   if (genreData.length > 0) {
              //     Toast.show("Genres Added.", { duration: Toast.durations.LONG, })
              //   }
              //   setModalGenre(false)
              // }}
              textType={"Primary"}
              style={{ alignItems: "center" }}
            >
              <Text.TagTitle>{"Save"}</Text.TagTitle>
            </Button.Primary>
          </View>
          {/* SubGenre Modal */}
          <Modal
            isVisible={modalGenreDetail}
            onBackdropPress={() => setModalGenreDetail(false)}
            onRequestClose={() => setModalGenreDetail(false)}
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
              <TouchableOpacity
                style={styles.modalBackBtn}
                onPress={() => setModalGenreDetail(false)}
              >
                <Ionicons name="arrow-back" size={20} color={Colors.blue} />
              </TouchableOpacity>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Image
                  source={singleGenre ? imagePath[singleGenre.image] : null}
                  style={{ width: 24, height: 24 }}
                />
                <Text.ModalTitle style={{ marginBottom: 25, marginLeft: 6 }}>
                  {singleGenre ? singleGenre.name : null}
                </Text.ModalTitle>
              </View>
              <ScrollView style={{ width: "100%" }}>
                {subGenre.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.catBtnContainer}
                    onPress={() => saveGenreData(item, index)}
                  >
                    <View style={styles.catBtnText}>
                      <Text.Primary>{item}</Text.Primary>
                      {genreIndex.map((i) =>
                        i === index ? (
                          <Image source={imagePath["check"]} style={{ width: 24, height: 24 }} />
                        ) : null
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={{ width: "100%", marginTop: 20 }}
                onPress={() => saveGeneres()}
              >
                <View
                  style={{
                    width: "100%",
                    backgroundColor: Colors.btnBack,
                    paddingVertical: 12,
                    borderRadius: 24,
                  }}
                >
                  <Text.TagTitle style={{ alignSelf: "center" }}>{"Save"}</Text.TagTitle>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </Modal>

        {/* dreamcast Modal */}
        <Modal
          isVisible={modalCast}
          swipeDirection="down"
          onBackdropPress={() => setModalCast(false)}
          onRequestClose={() => setModalCast(false)}
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
            <ScrollView>
              {actorData
                ? actorData.map((item, index) => (
                    <View
                      style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]}
                      key={index}
                    >
                      <ScrollView horizontal={true}>
                        <TouchableOpacity
                          style={styles.castInfo}
                          onPress={() => selectActors(item, index)}
                        >
                          <Image
                            source={{ uri: item.actorImage }}
                            style={{ width: 64, height: 64, borderRadius: 32, marginRight: 16 }}
                          />
                          <View style={{ display: "flex", flexDirection: "column" }}>
                            <Text.ParagraphTitle style={{ marginBottom: 8, fontWeight: "700" }}>
                              {item.actorName}
                            </Text.ParagraphTitle>
                            <Text.Tertiary>{`Hero: ${item.heroName}`}</Text.Tertiary>
                          </View>
                          {actorIndex.map((i) =>
                            i === index ? (
                              <Image
                                source={imagePath["check"]}
                                style={{ width: 24, height: 24, marginLeft: 20 }}
                              />
                            ) : null
                          )}
                        </TouchableOpacity>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <TouchableOpacity onPress={() => setModalNewActor(true)}>
                            <View style={styles.editCastBtn}>
                              <Icon name="Edit_white" width="24" height="24" fill="none" />
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => setModalDelActor(true)}>
                            <View
                              style={[
                                styles.editCastBtn,
                                { backgroundColor: "rgba(255, 69, 58, 1)" },
                              ]}
                            >
                              <Feather name="trash-2" size={24} color={Colors.white} />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </ScrollView>
                    </View>
                  ))
                : null}
            </ScrollView>
            <Button.Primary
              onPress={() => {
                if (selectedActor.length > 0) {
                  Toast.show("Actors Added.", { duration: Toast.durations.LONG });
                  let data = { actors: selectedActor };
                  setActorDataList(data);
                  console.log(Object.assign(data));
                }
                setModalCast(false);
              }}
              textType={"Primary"}
              style={{ alignItems: "center" }}
            >
              <Text.TagTitle>{"Attach Selected"}</Text.TagTitle>
            </Button.Primary>
          </View>
          {/* newActor Modal */}
          <Modal
            isVisible={modalNewActor}
            swipeDirection="down"
            onSwipeComplete={() => setModalNewActor(false)}
            onBackdropPress={() => setModalNewActor(false)}
            onRequestClose={() => setModalNewActor(false)}
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

              <TouchableOpacity style={styles.modalBackBtn} onPress={() => setModalNewActor(false)}>
                <Ionicons name="arrow-back" size={20} color={Colors.blue} />
              </TouchableOpacity>

              <Text.ModalTitle style={{ marginBottom: 25 }}>{"New Actor"}</Text.ModalTitle>

              <View style={{ height: vh(90) - 150 }}>
                <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]}>
                  <View style={{ flex: 1, marginRight: 16 }}>
                    <Input
                      value={actorName}
                      onChangeText={(text) => setActorName(text)}
                      placeholder={"Actor's Name"}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: Colors.btnBack,
                    }}
                    onPress={() => pickMovieBanner()}
                  >
                    {actorImage ? (
                      <Image
                        source={{ uri: actorImage }}
                        style={{ flex: 1, borderRadius: 22 }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={{ padding: 10 }}>
                        <Icon name="User" width={96} height={96} fill={"none"} />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>

                <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]}>
                  <View style={{ flex: 1 }}>
                    <Input
                      value={heroName}
                      onChangeText={(text) => setHeroName(text)}
                      placeholder={"Hero's Name"}
                    />
                  </View>
                </View>

                <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]}>
                  <TextInput
                    value={actorDescription}
                    onChangeText={(text) => setActorDescription(text)}
                    placeholder={"Ex killer, suffering after his daughter dies."}
                    placeholderTextColor={Colors.white1}
                    style={{
                      color: "#fff",
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
                onPress={() => saveNewActor()}
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
          onBackdropPress={() => setModalDelActor(false)}
          onRequestClose={() => setModalDelActor(false)}
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
              <Feather
                name="trash-2"
                size={24}
                color={Colors.white}
                style={{ letterSpacing: 10 }}
              />
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
          onBackdropPress={() => setModalTags(false)}
          onRequestClose={() => setModalTags(false)}
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
              <Input
                value={tagString}
                onChangeText={(text) => setTagString(text)}
                placeholder={"Enter a tag"}
              />
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

        {/* Similar Books Modal */}
        <Modal
          isVisible={modalSimilarMovies}
          onBackdropPress={() => setModalSimilarMovies(false)}
          onRequestClose={() => setModalSimilarMovies(false)}
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
              onPress={() => {
                setModalSimilarMovies(false)
               

              }}
            >
              <AntDesign name="close" size={20} color={Colors.blue} />
            </TouchableOpacity>
            <Text.ModalTitle style={{ marginBottom: 25 }}>{"Similar Books"}</Text.ModalTitle>
            <TextInput
              style={styles.searchBar}
              placeholder={"Search..."}
              onChangeText={(e) => searchText(e)}
              placeholderTextColor={Colors.white1}
            />
            <ScrollView style={{ width: "100%" }}>
              {similarBookData
                ? similarBookData.map((movie, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        saveSimilarBooks(movie.title, movie.bookBanner);
                      }}
                    >
                      <View key={index} style={styles.similarMovie}>
                        <Image
                          source={{ uri: movie.bookBanner }}
                          style={{ width: 80, height: 100, borderRadius: 16, marginRight: 16 }}
                        />
                        <View style={{ flex: 1 }}>
                          <TouchableOpacity
                            style={{ display: "flex", flexDirection: "row", marginBottom: 8 }}
                            onPress={() => {
                              setModalSimilarDetail(true)
                              getSignleMovie(movie._id);
                            }}
                          >
                            <Text.ParagraphTitle style={{ flex: 1 }}>
                              {movie.title}
                            </Text.ParagraphTitle>
                            <MaterialIcons
                              name={"keyboard-arrow-right"}
                              size={24}
                              color={Colors.white}
                              style={{ textAlignVertical: "center" }}
                            />
                          </TouchableOpacity>
                          <Text.Tertiary>{movie.tagline}</Text.Tertiary>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                : null}
            </ScrollView>
          </View>

          <Modal
          isVisible={modalSimilarDetail}
          onBackdropPress={() => setModalSimilarDetail(false)}
          onRequestClose={() => setModalSimilarDetail(false)}
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

            <Text.ModalTitle style={{ marginBottom: 25 }}>{"Similar Books"}</Text.ModalTitle>
            <ScrollView style={{ width: "100%", paddingBottom: 40 }}>
              <View style={[styles.similarMovie, { borderBottomWidth: 0 }]}>
                <Image
                      source={{ uri: singlebook.bookBanner }}
                      style={{ width: 96, height: 120, borderRadius: 16, marginRight: 16 }}
                />
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{ display: "flex", flexDirection: "row", marginBottom: 8 }}
                    onPress={() => setModalSimilarDetail(true)}
                  >
                    <Text.ParagraphTitle style={{ flex: 1 }}>
                      {singlebook.title}
                    </Text.ParagraphTitle>
                  </TouchableOpacity>

                  <Text.Tertiary>
                  {singlebook.tagline}</Text.Tertiary>
                </View>
              </View>
              <View style={styles.contentItem}>
                <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>
                  {"Synopsis"}
                </Text.TagTitle>
                <Text.Tertiary>
                {singlebook.synopsis}

                </Text.Tertiary>
                <Text.Tertiary style={{ color: Colors.blue }}>{"Show more"}</Text.Tertiary>
              </View>
              <View style={styles.contentItem}>
                <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Genres"}</Text.TagTitle>
                <ScrollView style={styles.genres} horizontal={true}>
                {singlebook.genres ? singlebook.genres.map((genre, index) => (
                <View style={styles.genre} key={index}>
                  <Text.Primary
                    style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
                  >
                    {Object.keys(genre)}
                  </Text.Primary>
                </View>
              )) : null}
                </ScrollView>
              </View>

              <View style={styles.contentItem}>
                <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Cast"}</Text.TagTitle>
                <ScrollView style={styles.casts} horizontal={true}>
                {singlebook.actors ? singlebook.actors.map((dreamcast, index) => (
                <View style={styles.cast} key={index}>
                  <Image
                    source={dreamcast.actorImage ? { uri: dreamcast.actorImage } : imagePath[dreamcast.avatar]}
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                  />
                  <Text.Primary style={{ textAlign: "center", marginTop: 10 }}>
                    {dreamcast.actorName}
                  </Text.Primary>
                  <Text.Primary style={styles.castName}>{dreamcast.heroName}</Text.Primary>
                </View>
              )) : null}
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
                {singlebook.tags ? singlebook.tags.map((tag, index) => (
                <View style={styles.genre} key={index}>
                  <Text.Primary
                    style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
                  >
                    {tag}
                  </Text.Primary>
                </View>
              )) : null}
                </ScrollView>
              </View>
            </ScrollView>
            <Button.Primary
              onPress={() => {
                saveSimilarBooks(singlebook.title, singlebook.bookBanner);
                  setModalSimilarMovies(false);
                setModalSimilarDetail(false)
              }}
              textType={"Primary"}
              style={{ alignItems: "center", marginTop: 20 }}
            >
              <Text.TagTitle>{"Attach Selected"}</Text.TagTitle>
            </Button.Primary>
          </View>
        </Modal>

        </Modal>

        {/* Similar Movie Detail Modal */}
      

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
            <KeyboardAvoidingView
              behavior="padding"
              style={{ width: "100%" }}
              contentContainerStyle={{ paddingBottom: vh(60) }}
            >
              <ScrollView
                keyboardShouldPersistTaps={"handled"}
                contentContainerStyle={{ paddingBottom: vh(10) }}
              >
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
                      color: "#fff",
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
                      color: "#fff",
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
                      color: "#fff",
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
                      color: "#fff",
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
            </KeyboardAvoidingView>
            <Button.Primary
              onPress={() => saveLogline()}
              textType={"Primary"}
              style={{ alignItems: "center", marginTop: 20, position: "absolute", bottom: vh(10) }}
            >
              <Text.TagTitle>{"Save Logline"}</Text.TagTitle>
            </Button.Primary>
          </View>
        </Modal>

        {/* delActor Modal */}
        <Modal
          isVisible={modalLoglineInfo}
          swipeDirection="down"
          onSwipeComplete={() => setModalLoglineInfo(false)}
          onBackdropPress={() => setModalLoglineInfo(false)}
          onRequestClose={() => setModalLoglineInfo(false)}
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
      <View style={{ backgroundColor: Colors.GradTop }}>
        <Button.White
          onPress={() => saveBookDetails()}
          textType={"Primary"}
          style={{
            alignItems: "center",
            height: 48,
            width: "90%",
            alignSelf: "center",
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
  );
};

BookNewScreen.navigationOptions = navigationOptions();

export default BookNewScreen;
