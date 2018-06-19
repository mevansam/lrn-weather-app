import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import SliderEntry from './../SliderEntry'
import { sliderWidth, itemWidth } from './../SliderEntry/styles';

import styles from "./styles";

type Props = {};
export default class PhotoChooser extends Component<Props> {

  constructor(props) {
    super(props);

    this.dataCallback = null

    switch (typeof props.data) {
      case "function":
        this.dataCallback = props.data
        break
      case "object":
        if (Array.isArray(props.data)) {
          break;
        }
      default:
        console.error("<PhotoChooser> data property should be an array of [ {uri, [title, subtitle, selected] } ] or a callback to a function that returns the same.")
    }

    this.state = {
      data: []
    };

    this.selectedIndex = -1
  }

  componentDidMount() {
    if (this.dataCallback) {

      this.dataCallback(data => {
        this.findSelectedIndex(data);
        this.setState({ data: data });
      });

    } else {
      this.findSelectedIndex(data)
      this.setState({ data: this.props.data });
    }
  }

  findSelectedIndex(data) {

    for (i = 0; i < data.length; i++) {
      if (data[i].selected) {
        break;
      }
    }
    this.selectedIndex = (i < data.length ? i : -1);
  }

  onSelect(index, uri) {

    data = this.state.data;
    if (this.selectedIndex != -1) {
      data[this.selectedIndex].selected = false;
    }
    this.selectedIndex = index;
    data[index].selected = true;

    this.props.onSelect(index, uri);
    this.setState({ data: data });
  }

  _renderItem({ item, index }, parallaxProps) {

    return (
      <SliderEntry
        data={item}
        index={index}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
        style={this.props.style}
        onSelect={this.onSelect.bind(this)}
      />
    );
  }

  render() {

    return (
      <Carousel
        ref={"carousel"}
        data={this.state.data}
        firstItem={this.selectedIndex == -1 ? 0 : this.selectedIndex}
        renderItem={this._renderItem.bind(this)}
        sliderWidth={this.props.sliderWidth || sliderWidth}
        itemWidth={itemWidth}
        hasParallaxImages={true}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
      />
    );
  }
}
