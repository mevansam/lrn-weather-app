import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { ParallaxImage } from 'react-native-snap-carousel';
import styles, { checkMarkAttribs } from './styles';

import PropTypes from 'prop-types';

type Props = {};
export default class SliderEntry extends Component<Props> {

  static propTypes = {
    index: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    style: PropTypes.object,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
    onSelect: PropTypes.func
  };

  constructor(props) {
    super(props);

    const { index, data: { title }, style } = this.props;

    this.state = {}
    this.even = (index + 1) % 2 === 0

    this.imageStyle = [
      styles.imageContainer,
      this.even ? styles.imageContainerEven : {}
    ];
    if (!title) {
      this.imageStyle = this.imageStyle.concat(styles.imageContainerBottom);
    }
    if (this.even) {
      this.imageStyle = this.imageStyle.concat([styles.imageContainerEven]);
    }

    this.viewStyle = this.imageStyle.slice();
    this.textStyle = [
      styles.textContainer,
      this.even ? styles.textContainerEven : {}
    ];

    if (style) {
      this.viewStyle = this.viewStyle.concat(style);
      this.textStyle = this.textStyle.concat(style);

      if (title) {
        this.viewStyle = this.viewStyle.concat({ borderBottomWidth: 0 });
        this.textStyle = this.textStyle.concat({ borderTopWidth: 0 });
      }
    }
  }

  get image() {
    const { data: { uri }, parallax, parallaxProps } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: uri }}
        containerStyle={this.imageStyle}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={this.even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
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
    const { data: { title, subtitle, selected } } = this.props;

    const titleText = title ? (
      <View style={this.textStyle}>
        <Text
          style={[styles.title, this.even ? styles.titleEven : {}]}
          numberOfLines={2}
        >
          {title.toUpperCase()}
        </Text>
        {subtitle ? (
          <Text
            style={[styles.subtitle, this.even ? styles.subtitleEven : {}]}
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
              ? (<View style={[styles.radiusMask, this.even ? styles.radiusMaskEven : {}]} />)
              : false
          }
        </View>

        {titleText}

        {selected ? (
          <Icon type='font-awesome' name="check-square-o"
            color={checkMarkAttribs.color}
            size={checkMarkAttribs.size}
            containerStyle={styles.checkMark}
          />
        ) : false}
      </TouchableOpacity >
    );
  }
}
