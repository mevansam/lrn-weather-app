import { StyleSheet } from "react-native";

import { colors } from './../../styles/common';

export default StyleSheet.create({
  container: {
    flexDirection: "column",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  border: {
    borderWidth: 2,
    borderColor: colors.blue
  },
  content: {
    backgroundColor: colors.white,
    marginTop: 22,
    borderWidth: 4,
    borderColor: colors.mattBlue
  },
  title: {
    backgroundColor: colors.mattBlue,
    flexDirection: "row"
  },
  closeButton: {
    width: 26,
    height: 26,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  titleText: {
    color: colors.white,
    fontFamily: "Lato-Bold",
    fontSize: 18,
    textAlign: "center",
    flex: 1,
    paddingTop: 2,
    paddingBottom: 6
  },
  innerContent: {
    flexDirection: "row",
    alignItems: "center"
  },
  optionDescText: {
    color: colors.darkGray,
    fontFamily: "Lato",
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
  },
  radioButton: {
    backgroundColor: colors.white,
    borderWidth: 0
  }
});
