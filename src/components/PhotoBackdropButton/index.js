import React, { Component } from "react";
import { Image, CameraRoll } from "react-native";

import Button from "./../Button";

import styles, { textColor } from "./styles";

type Props = {};
export default class PhotoBackdropButton extends Component<Props> {

  constructor(props) {
    super(props);
    this.image = this.props.image
  }

  _onPress() {
    CameraRoll.getPhotos({ first: 1 }).then(data => {
      this.image.setUri({ uri: data.edges[0].node.image.uri });
    }, error => {
      console.warn(error);
    });
  }

  render() {
    return (
      <Button
        iconType="font-awesome"
        iconName="file-photo-o"
        iconColor={textColor}
        label="Change Backdrop"
        styles={styles}
        onPress={this._onPress.bind(this)}
      />
    );
  }
}
