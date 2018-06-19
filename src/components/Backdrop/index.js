import React, { Component } from "react";
import { ImageBackground } from "react-native";

import styles from "./styles";

type Props = {};
export default class Backdrop extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = { image: this.props.image };
    this.props.image.setUpdateCallback(uri => {
      this.setState({});
    })
  }

  render() {
    return (
      <ImageBackground
        style={styles.backdrop}
        source={this.state.image.getUri()}
        resizeMode="cover"
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}
