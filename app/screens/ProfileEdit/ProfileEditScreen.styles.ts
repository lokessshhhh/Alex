import { StyleSheet } from "react-native";
import { vw, vh } from "react-native-css-vh-vw";

import { Colors, Font, Layout } from "style";

const styles = StyleSheet.create({
  imageBackground: {
    height: vh(100),
  },
  container: {
    height: vh(100),
  },
  goBack: {
    flex: 1,
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
});

export default styles;
