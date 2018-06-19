import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { ParallaxImage } from 'react-native-snap-carousel';
import styles, { checkMarkAttribs } from './styles';

import PropTypes from 'prop-types';

type Props = {};
export default class SliderEntry extends Component<Props> {

  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {}

    const { data: { title }, even, style } = this.props;

    this.imageStyle = [
      styles.imageContainer,
      even ? styles.imageContainerEven : {}
    ];
    if (!title) {
      this.imageStyle = this.imageStyle.concat(styles.imageContainerBottom);
    }
    if (even) {
      this.imageStyle = this.imageStyle.concat([styles.imageContainerEven]);
    }

    this.viewStyle = this.imageStyle.slice();
    this.textStyle = [
      styles.textContainer,
      even ? styles.textContainerEven : {}
    ]

    if (style) {
      this.viewStyle = this.viewStyle.concat(style);
      this.textStyle = this.textStyle.concat(style);

      if (title) {
        this.viewStyle = this.viewStyle.concat({ borderBottomWidth: 0 })
        this.textStyle = this.textStyle.concat({ borderTopWidth: 0 })
      }
    }
  }

  get image() {
    const { data: { uri }, parallax, parallaxProps, even } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: uri }}
        containerStyle={this.imageStyle}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
        <Image
          source={{ uri: uri }}
          style={styles.image}
        />
      );
  }

  _onPress() {
    const { data: { uri }, index } = this.props;
    this.props.onSelect(index, uri);
  }

  render() {
    const { data: { title, subtitle, selected }, even } = this.props;

    const titleText = title ? (
      <View style={this.textStyle}>
        <Text
          style={[styles.title, even ? styles.titleEven : {}]}
          numberOfLines={2}
        >
          {title.toUpperCase()}
        </Text>
        {subtitle ? (
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
            numberOfLines={2}
          >
            {subtitle}
          </Text>
        ) : false}
      </View>
    ) : false;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={this._onPress.bind(this)}
      >

        <View style={styles.shadow} />
        <View style={this.viewStyle}>
          {this.image}
          {
            titleText
              ? (<View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />)
              : false
          }
        </View>

        {selected ? (
          <Icon type='font-awesome' name="check-square-o"
            color={checkMarkAttribs.color}
            size={checkMarkAttribs.size}
            containerStyle={styles.checkMark}
          />
        ) : false}

        {titleText}
      </TouchableOpacity >
    );
  }
}
