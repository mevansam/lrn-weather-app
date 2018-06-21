import React, { Component } from "react";
import { View, Modal, TouchableHighlight, Text, CameraRoll } from "react-native";
import { Icon, ButtonGroup, CheckBox, Divider } from 'react-native-elements';

import CloseButton from "./../../components/CloseButton";
import PhotoChooser from "./../../components/PhotoChooser";

import { sliderHeight } from "./../../components/SliderEntry/styles"
import { viewportWidth } from './../../styles/common';
import { colors } from './../../styles/common';
import styles from "./styles";

import { webPhotos } from "./data"

const catalogTypes = ["cameraRoll", "webPhotos"]

type Props = {};
export default class Options extends Component<Props> {

  constructor(props) {
    super(props);

    this.store = this.props.store;
    this.reloadCatalog = false;

    this.state = {
      photoCatalogType: 0,
      unitType: 0
    }
  }

  async componentDidMount() {
    await this.store.init();
    this.loadState();
  }

  loadState() {
    this.setState({
      photoCatalogType: this.store.getItem("PhotoCatalogType") || 0,
      unitType: this.store.getItem("UnitType") || 0
    });
  }

  async reloadComponent() {
    // This allows a component refresh event
    // to be sent from the render() method 
    // to reload the photo catalog.
    setTimeout(() => {
      this.setState({})
    }, 1);
  }

  updatePhotoCatalog(updateFunc) {

    backdropImage = this.store.getItem("MainBackdrop")
    if (backdropImage) {
      backdropImageUri = backdropImage.uri
    }

    if (this.state.photoCatalogType == 0) {

      CameraRoll.getPhotos({
        first: 20
      }).then(data => {

        var photos = data.edges.map(edge => {
          imageUri = edge.node.image.uri;
          return {
            uri: imageUri,
            selected: (backdropImage && imageUri == backdropImageUri)
          };
        })

        updateFunc(photos);
      }, error => {
        console.warn(error);
      });

    } else {

      var photos = webPhotos.map(photo => {
        imageUri = photo.uri
        return {
          uri: imageUri,
          selected: (backdropImage && imageUri == backdropImageUri),
          title: photo.title,
          subtitle: photo.subtitle
        };
      })

      updateFunc(photos);
    }
  }

  onChoosePhoto(index, uri) {
    this.store.setItem("PhotoCatalogType", this.state.photoCatalogType)
    this.store.setItem("MainBackdrop", { uri: uri })
  }

  _setPhotoCatalogType = (selectedIndex) => {
    this.reloadCatalog = true
    this.setState({ photoCatalogType: selectedIndex });
  }

  _setUnitType = (selectedIndex) => {
    this.store.setItem("UnitType", selectedIndex)
    this.setState({ unitType: selectedIndex });
  }

  render() {
    const isVisible = this.props.isVisible()

    showCatalog = !this.reloadCatalog
    if (!showCatalog) {
      this.reloadComponent()
    }
    this.reloadCatalog = false

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible} >

        <View style={[styles.container, styles.content]}>

          <View style={styles.title}>
            <Text style={styles.titleText}>OPTIONS</Text>
            <CloseButton
              style={styles.closeButton}
              onClose={() => {
                this.props.onClose();
              }}
            />
          </View>

          <View style={[styles.innerContent, { marginTop: 20, marginBottom: 10 }]}>
            <Text style={[styles.optionDescText, { textAlign: "center", }]}>SELECT BACKDROP PHOTO</Text>
          </View>

          <View
            style={[
              styles.innerContent,
              {
                height: sliderHeight,
                backgroundColor: colors.darkGray,
                overflow: "hidden"
              }]}>

            {showCatalog ? (
              < PhotoChooser
                sliderWidth={viewportWidth - 8}
                style={{ borderWidth: 1, borderColor: colors.black }}
                data={this.updatePhotoCatalog.bind(this)}
                onSelect={this.onChoosePhoto.bind(this)} />
            ) : false}
          </View>

          <View style={[styles.innerContent, { marginTop: 10, marginBottom: 10 }]}>
            <View style={{ flex: 1 }} />
            <ButtonGroup
              selectedIndex={this.state.photoCatalogType}
              buttons={['Camera Roll', 'Web Photos']}
              buttonStyle={{ backgroundColor: colors.lightGray }}
              textStyle={{ color: colors.white }}
              selectedButtonStyle={{ backgroundColor: colors.mattBlue }}
              selectedTextStyle={{ color: colors.white }}
              containerStyle={{ width: 200, height: 25 }}
              onPress={this._setPhotoCatalogType}
            />
            <View />
            <View style={{ flex: 1 }} />
          </View>

          <Divider style={{ backgroundColor: colors.darkGray }} />

          <View style={[styles.innerContent, { marginTop: 10, marginBottom: 10 }]}>
            <View style={{ flex: 1 }} />
            <Text style={[styles.optionDescText, { textAlign: "right" }]}>UNITS</Text>
            <View style={{ flexDirection: "column" }}>
              <CheckBox
                left
                title='Fahrenheit'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.unitType == 0}
                checkedColor={colors.mattBlue}
                containerStyle={[styles.radioButton, { margin: 0, padding: 5 }]}
                onPress={() => {
                  this._setUnitType(0);
                }}
              />
              <CheckBox
                left
                title='Celcius'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.unitType == 1}
                checkedColor={colors.mattBlue}
                containerStyle={[styles.radioButton, { margin: 0, padding: 5 }]}
                onPress={() => {
                  this._setUnitType(1)
                }}
              />
            </View>
            <View style={{ flex: 1 }} />
          </View>

          <Divider style={{ backgroundColor: colors.darkGray }} />

        </View>
      </ Modal >
    );
  }
}
