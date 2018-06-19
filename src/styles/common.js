/**
 * Common stylesheets and styling related constants
 */

import { StyleSheet, Dimensions, Platform } from "react-native";

export const IS_IOS = Platform.OS === "ios";
export const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

export const statusBarHeight = 22

export const colors = {
  white: "#FFFFFF",
  black: "#000000",

  blue: "#0000FF",
  mattBlue: "#0066CC",

  green: "#00FF00",
  mattGreen: "#009933",

  silver: "#C0C0C0",
  lightGray: "#D3D3D3",
  gray: "#808080",
  darkGray: "#A9A9A9",

  background1: "#B721FF",
  background2: "#21D4FD"
};
