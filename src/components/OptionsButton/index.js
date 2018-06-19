import React, { Component } from "react";

import Button from "./../Button";

import styles, { iconColor } from "./styles";

type Props = {};
export default class OptionsButton extends Component<Props> {

  _onPress() {
    this.props.onOpen()
  }

  render() {
    return (
      <Button
        containerStyle={this.props.style}
        iconType="font-awesome"
        iconName="gear"
        iconColor={iconColor}
        styles={styles}
        onPress={this._onPress.bind(this)}
      />
    );
  }
}
