import React, { Component } from "react";

import Button from "./../Button";

import styles, { iconColor } from "./styles";

type Props = {};
export default class LocationButton extends Component<Props> {

  _onPress() {
    navigator.geolocation.getCurrentPosition(
      initialPosition => {
        this.props.onGetCoords(
          initialPosition.coords.latitude,
          initialPosition.coords.longitude
        );
      },
      error => {
        alert(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <Button
        containerStyle={this.props.style}
        iconType="font-awesome"
        iconName="location-arrow"
        iconColor={iconColor}
        styles={styles}
        onPress={this._onPress.bind(this)}
      />
    );
  }
}
