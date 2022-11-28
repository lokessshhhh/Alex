import { StyleSheet } from "react-native";
import { vw, vh } from "react-native-css-vh-vw";

import { Colors, Font, Layout } from "style";

const styles = StyleSheet.create({
  imageBackground: {
    // height: vh(100),
    width: vw(100)
  },
  container: {
    // height: vh(100),
    flex:1
  },
  logoContainer: {
    position: "absolute",
    top: vh(15),
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  logoText: {
    marginTop: 24,
  },

  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 16,
  },
  bottomLine1: {
    marginBottom: 24,
    textAlign: "center",
  },
  transparentBtn: {
    color: Colors.blue,
  },
  transparentBtnContainer: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  loginBtnContainer: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
  },
});

export default styles;
