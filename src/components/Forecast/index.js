import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

type Props = {};
export default class Forecast extends Component<Props> {
  render() {
    return (
      <View style={styles.forecast}>
        <Text style={{ color: "#FFFFFF", fontSize: 72 }}>
          {this.props.temp}°{this.props.units == 0 ? "F" : "C"}
        </Text>
        <Text style={{ color: "#FFFFFF", fontSize: 32 }}>
          {this.props.main}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({ forecast: { alignItems: "center" } });
