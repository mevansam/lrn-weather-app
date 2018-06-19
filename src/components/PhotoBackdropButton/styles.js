import { StyleSheet } from "react-native";

import { colors } from './../../styles/common';

const height = 40
const borderRadius = 5

export const textColor = colors.white

export default StyleSheet.create({
  container: {
    height: height,
    borderRadius: borderRadius
  },
  button: {
    backgroundColor: colors.darkGray,
    height: height,
    width: 200,
    paddingLeft: 25,
    borderRadius: borderRadius,
  },
  text: {
    fontSize: 14,
    color: textColor,
    textAlign: "right",
    paddingTop: 10,
    paddingLeft: 5
  }
});
