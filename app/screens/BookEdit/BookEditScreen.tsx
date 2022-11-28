import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  Platform 
} from "react-native";
import Modal from "react-native-modal";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { vw, vh } from "react-native-css-vh-vw";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Toast from 'react-native-root-toast';

import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { Icon, Text, Input, Button } from "components";
import { Colors, Font } from "style";

import BaseURl from "constant/BaseURL";
import imagesPath from "../../constant/imagePath";
import navigationOptions from "./BookEditScreen.navigationOptions";
import styles from "./BookEditScreen.styles";
import imagePath from "../../constant/imagePath";

const BookEditScreen: NavStatelessComponent = () => {
  
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
  const [modalRemoveGenre, setModalRemoveGenre] = React.useState(false);
  const [modalRemoveCast, setModalRemoveCast] = React.useState(false);
  const [modalRemoveTag, setModalRemoveTag] = React.useState(false);
  const [modalRemoveMovie, setModalRemoveMovie] = React.useState(false);
  //search states
  const [similarSearch, setSimilarSearch] = React.useState("");
  //Movie Data
  const [bookBanner, setBookBanner] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [logLine, setLogLine] = React.useState("");
  const [tagLine, setTagLine] = React.useState("");
  const [synopsis, setSynopsis] = React.useState("");
  const [genre, setGenre] = React.useState([]);
  const [actors, setActors] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [similarBook, setSimilarBook] = React.useState([]);
  //logline
  const [incident, setIncident] = React.useState("");
  const [protagonist, setProtagonist] = React.useState("");
  const [action, setAction] = React.useState("");
  const [antagonist, setAntagonist] = React.useState("");
  const [logLineData, setLogLineData] = React.useState<any>();
  const [oldlogLineData, setOldLogLineData] = React.useState<any>();
  //genre
  const [subGenre, setSubGenre] = React.useState([]);
  const [genreIndex, setGenreIndex] = React.useState([]);
  const [selectedSubGenre, setSelectedSubGenre] = React.useState([]);
  const [singleGenre, setSingleGenre] = React.useState<any>();
  const [genreData, setGenreData] = React.useState([]);
  //tags
  const [tag, setTag] = React.useState("");
  const [tagData, setTagData] = React.useState<any>();
  //New Actor
  const [actorName, setActorName] = React.useState("");
  const [heroName, setHeroName] = React.useState("");
  const [actorDescription, setActorDescription] = React.useState("");
  const [actorImage, setActorImage] = React.useState("");
  const [actorData, setActorData] = React.useState([]);
  const [actorIndex, setActorIndex] = React.useState([]);
  const [selectedActor, setSelectedActor] = React.useState([]);
  const [actorDataList, setActorDataList] = React.useState<any>();
  //similar movies
  const [allBooks, setAllBooks] = React.useState([]);
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
        "Young Adult"
      ]
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
        "Young Adult"
      ]
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
        "Young Adult"
      ]
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
        "Young Adult"
      ]
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
        "Young Adult"
      ]
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
        "Young Adult"
      ]
    }, {
      name: "Western",
      image: "genre_western",
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
        "Young Adult"
      ]
    }
  ]);

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

  useEffect(() => {
    getSignleBook()
    bookDetails()
  }, [])

  const editBookDetails = async () => {
    const token = await AsyncStorage.getItem('authToken')
    const uriPart = bookBanner.split('.');
    const fileExtension = uriPart[uriPart.length - 1];
    let Taglist = { tags: tags }
    let LoglineData = { logline: oldlogLineData }
    let Genres = { genres: genre }
    let Actors = { actors: actors }
    let Movies = { similarMovies: similarBook }
    let formData = new FormData()

    formData.append('bookId', route.params.id)
    formData.append("bookBanner", {
      uri: bookBanner,
      name: `photo.${fileExtension}`,
      type: `image/${fileExtension}`
    });
    formData.append('title', title)
    formData.append('synopsis', synopsis)
    formData.append('logline', logLineData === undefined ? JSON.stringify(LoglineData) : JSON.stringify(logLineData))
    formData.append('genres', JSON.stringify(Genres))
    formData.append('tagline', tagLine)
    formData.append('tags', JSON.stringify(Taglist))
    formData.append('actors', JSON.stringify(Actors))
    formData.append("similarBooks", JSON.stringify(Movies))

    console.log("formData", formData);
    fetch(BaseURl + 'books/editBookDetails', {
      method: 'post',
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson  ", responseJson)
        if (responseJson.code === 200) {
          navigation.goBack()
          alert(responseJson.message)
        } else {
          alert(responseJson.message)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const bookDetails = async () => {
    const token = await AsyncStorage.getItem('authToken')

    fetch(BaseURl + 'books/bookDetails', {
      method: 'get',
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.code === 200) {
          let data = []
          let movies = []
          responseJson.data.map(item => {
            item.actors.map(actor => {
              data.push(actor)
              if (actorData.length === 0) { setActorData(data) }
              else { setActorData(prevState => [...prevState, actor]) }
            })
            item.similarBooks.map(movie => {
              console.log("------------", movie)
              movies.push(movie)
            })
          })
          setAllBooks(movies)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getSignleBook = async () => {
    const token = await AsyncStorage.getItem('authToken')

    fetch(BaseURl + 'books/singleBook/' + route.params.id, {
      method: 'get',
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then((response) => response.json())
      .then((resposeJson) => {
        console.log("response data: ", resposeJson.data);
        if (resposeJson.code === 200) {
          setBookBanner(resposeJson.data.bookBanner)
          setTitle(resposeJson.data.title)
          setLogLine(Object.values(resposeJson.data.logline).toString().replaceAll(',', ' '))
          setOldLogLineData(resposeJson.data.logline)
          setTagLine(resposeJson.data.tagline)
          setSynopsis(resposeJson.data.synopsis)
          setGenre(resposeJson.data.genres)
          setActors(resposeJson.data.actors)
          setTags(resposeJson.data.tags)
          setSimilarBook(resposeJson.data.similarBooks)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const saveGenreData = (item, index) => {
    if (genreIndex.length > 0) {
      if (genreIndex.includes(index)) {
        let removeIndex = genreIndex.filter((i) => i !== index)
        let remove = selectedSubGenre.filter((i) => i !== item)
        setGenreIndex(removeIndex)
        setSelectedSubGenre(remove)
      } else {
        setGenreIndex((prevState: any) => [...prevState, index])
        setSelectedSubGenre((prevState: any) => [...prevState, item])
      }
    } else {
      setGenreIndex((prevState: any) => [...prevState, index])
      setSelectedSubGenre((prevState: any) => [...prevState, item])
    }
  }

  const saveGenreList = () => {
    if (genreData.length > 0) {
      if (genre.length > 0) {
        genre.findIndex(object => {
          genreData.findIndex(obj => {
            if (Object.keys(object).toString() == Object.keys(obj).toString()) {
              console.log("object", Object.keys(object).toString())
              let newstate = genre.filter(item => Object.keys(item).toString() !== Object.keys(obj).toString())
              newstate.push(obj)
              console.log(newstate)
              setGenre(newstate)
            } else {
              setGenre(prevState => [...prevState, obj])
            }
          })
        })
      } else {
        setGenre(genreData)
      }
      Toast.show("Genres Added.", { duration: Toast.durations.LONG, })
    }
    setModalGenre(false)
  }

  const saveGeneres = () => {
    genreModalList.findIndex(object => {
      if (object.name === singleGenre.name) {
        object.number = selectedSubGenre.length
        console.log(object.number)
      }
    });

    let data = {}
    let allGenre = []
    data[singleGenre.name] = selectedSubGenre
    console.log(data, '======---------', selectedSubGenre.length);
    allGenre.push(data)
    if (genreData.length === 0) { setGenreData(allGenre) }
    else { setGenreData(prevState => [...prevState, data]) }
    setModalGenreDetail(false)
    setGenreIndex([])
    setSelectedSubGenre([])
  }

  const removeGenre = (item) => {
    console.log(item)
    let data = genre.filter(oldGen => oldGen !== item)
    console.log(data)
    setGenre(data)
  }

  const selectActors = (item, index) => {
    if (actorIndex.length > 0) {
      if (actorIndex.includes(index)) {
        let removeIndex = actorIndex.filter((i) => i !== index)
        let remove = selectedActor.filter((i) => i.actorId !== item.actorId)
        console.log(remove)
        setActorIndex(removeIndex)
        setSelectedActor(remove)
      } else {
        setActorIndex((prevState: any) => [...prevState, index])
        setSelectedActor((prevState: any) => [...prevState, item])
      }
    } else {
      setActorIndex((prevState: any) => [...prevState, index])
      setSelectedActor((prevState: any) => [...prevState, item])
    }
  }

  const saveNewActor = async () => {
    const token = await AsyncStorage.getItem('authToken')
    var formData = new FormData();
    let filename = actorImage.split('/').pop();

    formData.append('actorName', actorName);
    formData.append('heroName', heroName);
    formData.append('actorDescription', actorDescription);
    formData.append('actorImage', {
      uri: actorImage,
      name: filename,
      type: "image/jpeg"
    });

    fetch(BaseURl + 'books/actorDetails', {
      method: 'post',
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.code === 200) {
          let data = []
          alert(responseJson.message)
          data.push(responseJson.data)
          console.log("=====================", actorData)
          if (actorData.length === 0) { setActorData(data) }
          else { setActorData(prevState => [...prevState, responseJson.data]) }
          setActorName("")
          setActorDescription("")
          setHeroName("")
          setActorImage("")
          setModalNewActor(false)
        } else {
          alert(responseJson.message)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const saveSimilarBooks = (name: any, poster: any) => {
    let book = []
    book.push({ bookPoster: poster, bookName: name })
    if (similarBook.length > 0) { setSimilarBook(prevState => [...prevState, { bookPoster: poster, bookName: name }]) }
    else { setSimilarBook(book) }
    setModalSimilarMovies(false)
  }

  const saveLogLine = () => {
    setModalLogline(false)
    let data = []
    data.push({ logline: { incitingIncident: incident, protagonist: protagonist, Action: action, antagonist: antagonist } })
    console.log(Object.assign({}, ...data));
    setLogLineData(Object.assign({}, ...data))
    setLogLine(incident + ' ' + protagonist + ' ' + action + ' ' + antagonist)
  }

  const removeBooks = (item) => {
    let data = similarBook.filter(movie => movie._id !== item._id)
    setSimilarBook(data)
    // setModalRemoveMovie(true)
  }

  const removeActor = (item) => {
    let data = actors.filter(actor => actor._id !== item._id)
    setActors(data)
    // setModalRemoveCast(true)
  }

  const removeTag = (item) => {
    let data = tags.filter(tag => tag !== item)
    setTags(data)
    // setModalRemoveTag(true)
  }

  const pickMovieBanner = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (modalNewActor) {
      setActorImage(result.uri)
    } else {
      setBookBanner(result.uri);
    }
  }

  return (
    <View style={{ backgroundColor: Colors.GradTop }}>
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
            <Animated.Text style={[styles.headerText, { fontSize: fontsize }]}>
              {"Edit Book"}
            </Animated.Text>
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
            <TouchableOpacity style={styles.thumb} onPress={() => pickMovieBanner()}>
              <Image
                source={bookBanner ? { uri: bookBanner } : imagePath["bookThumb"]}
                style={{ width: 80, height: 80, borderRadius: 16 }}
              />
              <TouchableOpacity
                style={{ alignSelf: "center", paddingVertical: 26, position: "absolute" }}
              >
                <Icon name="Thumb" width="24" height="24" fill="none" />
              </TouchableOpacity>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text.ParagraphTitle style={{ marginBottom: 8 }}>{"Title"}</Text.ParagraphTitle>
              <Input placeholder={"Enter Text"} value={title} onChangeText={(text) => setTitle(text)} />
            </View>
          </View>
          <View>
            <View style={styles.contentItem}>
              <Text.ParagraphTitle style={{ marginBottom: 8 }}>{"Logline"}</Text.ParagraphTitle>
              <TextInput
                value={logLine}
                placeholder={"Describe your question"}
                onChangeText={(text) => setLogLine(text)}
                placeholderTextColor={Colors.white1}
                style={{
                  backgroundColor: Colors.inputBack,
                  padding: 16,
                  borderRadius: 8,
                  textAlignVertical: "top",
                  color: Colors.white,
                  lineHeight: 24,
                }}
                numberOfLines={3}
                multiline={true}
                onTouchStart={() => setModalLogline(true)}
              />
            </View>

            <View style={styles.contentItem}>
              <Text.ParagraphTitle style={{ marginBottom: 8 }}>{"Tagline"}</Text.ParagraphTitle>
              <Input placeholder={"Enter text"} value={tagLine} onChangeText={(text) => setTagLine(text)} />
            </View>

            <View style={styles.contentItem}>
              <Text.ParagraphTitle style={{ marginBottom: 8 }}>{"Synopsis"}</Text.ParagraphTitle>
              <TextInput
                value={synopsis}
                onChangeText={(text) => setSynopsis(text)}
                placeholder={"Describe your question"}
                placeholderTextColor={Colors.white1}
                style={{
                  backgroundColor: Colors.inputBack,
                  padding: 16,
                  borderRadius: 8,
                  textAlignVertical: "top",
                  color: Colors.white,
                  lineHeight: 24,
                }}
                numberOfLines={3}
                multiline={true}
              />
            </View>

            <View style={{ marginTop: 24 }}>
              <Text.ParagraphTitle style={{ marginBottom: 8 }}>{"Genres"}</Text.ParagraphTitle>
              <ScrollView style={styles.genres} horizontal={true}>
                <TouchableOpacity
                  onPress={() => setModalGenre(true)}
                  style={{ marginRight: 16, marginTop: 6 }}
                >
                  <Text.Primary style={styles.normalBtn}>{"Add"}</Text.Primary>
                </TouchableOpacity>
                {genre ? genre.map((genre, index) => (
                  <View style={styles.genre} key={index}>
                    <Text.Primary
                      style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
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
                        }}
                      >
                        <Ionicons name="ios-close" size={16} color={Colors.white} />
                      </View>
                    </TouchableOpacity>
                  </View>
                )) : null}
              </ScrollView>
            </View>

            <View style={{ marginTop: 24 }}>
              <Text.ParagraphTitle style={{ marginBottom: 8 }}>{"Dream Cast"}</Text.ParagraphTitle>
              <ScrollView style={styles.casts} horizontal={true}>
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
                {actors ? actors.map((dreamcast, index) => (
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
                )) : null}
              </ScrollView>
            </View>

            <View style={{ marginTop: 24 }}>
              <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>{"Tags"}</Text.TagTitle>
              <ScrollView style={styles.genres} horizontal={true}>
                <View
                  style={{ display: "flex", flexDirection: "row", marginRight: 16, marginTop: 6 }}
                >
                  <TouchableOpacity onPress={() => setModalTags(true)}>
                    <Text.Primary style={styles.normalBtn}>{"Add"}</Text.Primary>
                  </TouchableOpacity>
                </View>
                {tags ? tags.map((tag, index) => (
                  <View style={styles.genre} key={index}>
                    <Text.Primary
                      style={{ lineHeight: Font.FontLineHeight.Tertiary, marginHorizontal: 8 }}
                    >
                      {tag}
                    </Text.Primary>
                    <TouchableOpacity
                      onPress={() => removeTag(tag)}
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
                )) : null}
              </ScrollView>
            </View>

            <View style={{ marginBottom: 20, marginTop: 24 }}>
              <Text.TagTitle style={{ fontSize: 22, marginBottom: 8 }}>
                {"Similar Books"}
              </Text.TagTitle>
              <ScrollView style={styles.genres} horizontal={true}>
                <View style={[styles.cast, { marginTop: 6 }]}>
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
                {similarBook ? similarBook.map((similarBooks, index) => (
                  <View style={[styles.cast, { marginTop: 6 }]} key={index}>
                    <Image
                      source={{ uri: similarBooks.bookPoster }}
                      style={{ width: 80, height: 100, borderRadius: 16 }}
                    />
                    <Text.Primary style={{ textAlign: "center", marginTop: 10 }}>
                      {similarBooks.bookName}
                    </Text.Primary>
                    <TouchableOpacity
                      onPress={() => removeBooks(similarBook)}
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
                )) : null}
              </ScrollView>
            </View>
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
        <View style={{ marginBottom: 16 }}>
          <Button.Primary
            onPress={() => editBookDetails()}
            textType={"Primary"}
            style={{ alignItems: "center", height: 48, marginBottom: 20 }}
          >
            <Text.TagTitle style={{ marginTop: -4 }}>{"Save Project"}</Text.TagTitle>
          </Button.Primary>
        </View>
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
                    let data = { name: genre.name, image: genre.image }
                    setSingleGenre(data)
                    setSubGenre(genre.subGenre)
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
            onPress={() => saveGenreList()}
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
            <TouchableOpacity style={styles.modalBackBtn} onPress={() => setModalGenreDetail(false)}>
              <Ionicons name="arrow-back" size={20} color={Colors.blue} />
            </TouchableOpacity>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Image source={singleGenre ? imagePath[singleGenre.image] : null} style={{ width: 24, height: 24 }} />
              <Text.ModalTitle style={{ marginBottom: 25, marginLeft: 6 }}>
                {singleGenre ? singleGenre.name : null}
              </Text.ModalTitle>
            </View>
            <ScrollView style={{ width: "100%" }}>
              {subGenre.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.catBtnContainer}
                  onPress={() => saveGenreData(item, index)}>
                  <View style={styles.catBtnText}>
                    <Text.Primary>{item}</Text.Primary>
                    {genreIndex.map((i) => i === index ? <Image source={imagePath["check"]} style={{ width: 24, height: 24 }} /> : null)}
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
            {actorData ? actorData.map((item, index) => (
              <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]} key={index}>
                <ScrollView horizontal={true} >
                  <TouchableOpacity style={styles.castInfo} onPress={() => selectActors(item, index)}>
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
                    {actorIndex.map((i) => i === index ? <Image source={imagePath["check"]} style={{ width: 24, height: 24, marginLeft: 20 }} /> : null)}
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
            )) : null}
          </ScrollView>
          <Button.Primary
            onPress={() => {
              let data = { actors: selectedActor }
              setActorDataList(data)
              console.log(Object.assign(data))
              selectedActor.map(item => {
                if (actors.length > 0) { setActors(prevState => [...prevState, item]) }
              })
              setModalCast(false)
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
                  <Input value={actorName} onChangeText={(text) => setActorName(text)} placeholder={"Actor's Name"} />
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
                  {actorImage
                    ? <Image source={{ uri: actorImage }} style={{ flex: 1, borderRadius: 22 }} />
                    : <View style={{ padding: 10 }}><Icon name="User" width={96} height={96} fill={"none"} /></View>
                  }
                </TouchableOpacity>
              </View>

              <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]}>
                <View style={{ flex: 1 }}>
                  <Input value={heroName} onChangeText={(text) => setHeroName(text)} placeholder={"Hero's Name"} />
                </View>
              </View>

              <View style={[styles.catBtnContainer, { display: "flex", flexDirection: "row" }]}>
                <TextInput
                  value={actorDescription}
                  onChangeText={(text) => setActorDescription(text)}
                  placeholder={"Ex killer, suffering after his daughter dies."}
                  placeholderTextColor={Colors.white1}
                  style={{
                    color: '#fff',
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
            <Input value={tag} onChangeText={(text) => setTag(text)} placeholder={"Enter a tag"} />
          </View>
          <Button.Primary
            onPress={() => {
              let data = []
              data.push(tag)
              setTags(prevState => [...prevState, tag])
              setModalTags(false)
            }}
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
            onPress={() => setModalSimilarMovies(false)}
          >
            <AntDesign name="close" size={20} color={Colors.blue} />
          </TouchableOpacity>
          <Text.ModalTitle style={{ marginBottom: 25 }}>{"Similar Books"}</Text.ModalTitle>
          <TextInput
            style={styles.searchBar}
            placeholder={"Search..."}
            onChangeText={(search) => setSimilarSearch(search)}
            placeholderTextColor={Colors.white1}
          />
          {allBooks ? allBooks.map((book, index) => (
            <TouchableOpacity onPress={() => saveSimilarBooks(book.bookName, book.bookPoster)}>
              <View key={index} style={styles.similarMovie}>
                <Image
                  source={{ uri: book.bookPoster }}
                  style={{ width: 80, height: 100, borderRadius: 16, marginRight: 16 }}
                />
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{ display: "flex", flexDirection: "row", marginBottom: 8 }}
                    onPress={() => setModalSimilarDetail(true)}
                  >
                    <Text.ParagraphTitle style={{ flex: 1 }}>{book.bookName}</Text.ParagraphTitle>
                    <MaterialIcons
                      name={"keyboard-arrow-right"}
                      size={24}
                      color={Colors.white}
                      style={{ textAlignVertical: "center" }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )) : null}
        </View>
      </Modal>

      {/* Similar Movie Detail Modal */}
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
        onBackdropPress={() => setModalLogline(false)}
        onRequestClose={() => setModalLogline(false)}
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
                  color: '#fff',
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
                  color: '#fff',
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
                  color: '#fff',
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
            <KeyboardAvoidingView
            // keyboardVerticalOffset={150}
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
            // style={{ flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.select({ ios: 150, android: 150 })}
            enabled={true}
          >
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
                  color: '#fff',
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
                </KeyboardAvoidingView>
        
          </ScrollView>
          <Button.Primary
            onPress={() => saveLogLine()}
            textType={"Primary"}
            style={{ alignItems: "center", marginTop: 20 }}
          >
            <Text.TagTitle>{"save Logline"}</Text.TagTitle>
          </Button.Primary>
        </View>
      </Modal>

      {/* LoglineInfo Modal */}
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

      {/* RemoveGenre Modal */}
      <Modal
        isVisible={modalRemoveGenre}
        swipeDirection="down"
        onSwipeComplete={() => setModalRemoveGenre(false)}
        onBackdropPress={() => setModalRemoveGenre(false)}
        onRequestClose={() => setModalRemoveGenre(false)}
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
          <View style={{ marginBottom: 25, display: "flex", flexDirection: "row" }}>
            <Icon name="Detach" width={24} height={24} fill="none" color={Colors.white} />
            <Text.ParagraphTitle style={{ marginLeft: 5, textAlignVertical: "top" }}>
              {"Detach Current Genre?"}
            </Text.ParagraphTitle>
          </View>
          <Text.Tertiary style={{ marginBottom: 24 }}>
            {"Do you really want to delete “current Genre”?"}
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
                onPress={() => setModalRemoveGenre(false)}
                textType={"Primary"}
                style={{ alignItems: "center", height: 40, paddingVertical: 12 }}
              >
                <Text.Primary style={{ marginTop: -4 }}>{"Detach"}</Text.Primary>
              </Button.Primary>
            </View>

            <View style={{ width: (vw(100) - 64) / 2 - 8 }}>
              <Button.Black
                onPress={() => setModalRemoveGenre(false)}
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

      {/* RemoveHero Modal */}
      <Modal
        isVisible={modalRemoveCast}
        swipeDirection="down"
        onSwipeComplete={() => setModalRemoveCast(false)}
        onBackdropPress={() => setModalRemoveCast(false)}
        onRequestClose={() => setModalRemoveCast(false)}
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
          <View style={{ marginBottom: 25, display: "flex", flexDirection: "row" }}>
            <Icon name="Detach" width={24} height={24} fill="none" color={Colors.white} />
            <Text.ParagraphTitle style={{ marginLeft: 5, textAlignVertical: "top" }}>
              {"Detach Current Hero?"}
            </Text.ParagraphTitle>
          </View>
          <Text.Tertiary style={{ marginBottom: 24 }}>
            {"Do you really want to delete “current Hero?"}
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
                onPress={() => setModalRemoveCast(false)}
                textType={"Primary"}
                style={{ alignItems: "center", height: 40, paddingVertical: 12 }}
              >
                <Text.Primary style={{ marginTop: -4 }}>{"Detach"}</Text.Primary>
              </Button.Primary>
            </View>

            <View style={{ width: (vw(100) - 64) / 2 - 8 }}>
              <Button.Black
                onPress={() => setModalRemoveCast(false)}
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

      {/* RemoveTag Modal */}
      <Modal
        isVisible={modalRemoveTag}
        swipeDirection="down"
        onSwipeComplete={() => setModalRemoveTag(false)}
        onRequestClose={() => setModalRemoveTag(false)}
        onBackdropPress={() => setModalRemoveTag(false)}
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
          <View style={{ marginBottom: 25, display: "flex", flexDirection: "row" }}>
            <Icon name="Detach" width={24} height={24} fill="none" color={Colors.white} />
            <Text.ParagraphTitle style={{ marginLeft: 5, textAlignVertical: "top" }}>
              {"Detach Current Tag?"}
            </Text.ParagraphTitle>
          </View>
          <Text.Tertiary style={{ marginBottom: 24 }}>
            {"Do you really want to delete “current Tag?"}
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
                onPress={() => setModalRemoveTag(false)}
                textType={"Primary"}
                style={{ alignItems: "center", height: 40, paddingVertical: 12 }}
              >
                <Text.Primary style={{ marginTop: -4 }}>{"Detach"}</Text.Primary>
              </Button.Primary>
            </View>

            <View style={{ width: (vw(100) - 64) / 2 - 8 }}>
              <Button.Black
                onPress={() => setModalRemoveTag(false)}
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

      {/* RemoveMovie Modal */}
      <Modal
        isVisible={modalRemoveMovie}
        swipeDirection="down"
        onSwipeComplete={() => setModalRemoveMovie(false)}
        onBackdropPress={() => setModalRemoveMovie(false)}
        onRequestClose={() => setModalRemoveMovie(false)}
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
          <View style={{ marginBottom: 25, display: "flex", flexDirection: "row" }}>
            <Icon name="Detach" width={24} height={24} fill="none" color={Colors.white} />
            <Text.ParagraphTitle style={{ marginLeft: 5, textAlignVertical: "top" }}>
              {"Detach Current Movie?"}
            </Text.ParagraphTitle>
          </View>
          <Text.Tertiary style={{ marginBottom: 24 }}>
            {"Do you really want to delete “current Movie?"}
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
                onPress={() => setModalRemoveMovie(false)}
                textType={"Primary"}
                style={{ alignItems: "center", height: 40, paddingVertical: 12 }}
              >
                <Text.Primary style={{ marginTop: -4 }}>{"Detach"}</Text.Primary>
              </Button.Primary>
            </View>

            <View style={{ width: (vw(100) - 64) / 2 - 8 }}>
              <Button.Black
                onPress={() => setModalRemoveMovie(false)}
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
    </View>
  );
};

BookEditScreen.navigationOptions = navigationOptions();

export default BookEditScreen;
