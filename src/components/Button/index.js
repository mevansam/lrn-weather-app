import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

import styles from "./styles";

type Props = {};
export default class Button extends Component<Props> {

  render() {

    const { containerStyle, iconType, iconName, iconColor, label } = this.props

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.container, this.props.styles.container, containerStyle]}
        onPress={this.props.onPress}>
        <View style={[styles.button, this.props.styles.button]}>

          {iconType ? (
            <Icon type={iconType} name={iconName} color={iconColor} />
          ) : false}

          {label ? (
            <Text style={[styles.text, this.props.styles.text]}>
              {label}
            </Text>
          ) : false}

        </View>
      </TouchableOpacity>
    );
  }
}
