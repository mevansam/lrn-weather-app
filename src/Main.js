import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Icon } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen'

import LocalStorage from "./lib/persistance/LocalStorage"
import MutableImage from "./lib/presentation/MutableImage"

import Options from "./screens/options"
import Backdrop from "./components/Backdrop";
import Forecast from "./components/Forecast";
import OptionsButton from "./components/OptionsButton";
import LocationButton from "./components/LocationButton";
import textStyles from "./styles/typography.js";

import OpenWeatherMap from "./lib/data/OpenWeatherAPI";

import { viewportWidth, viewportHeight, statusBarHeight, colors } from "./styles/common"

type Props = {};
export default class WeatherApp extends Component<Props> {
  constructor(props) {
    super(props);

    this.store = new LocalStorage("@SmarterWeather");
    this.store.registerNotificationHandler("UnitType", this.onUnitChange.bind(this));

    this.state = {
      zip: null,
      units: null,
      forecast: null,
      showOptions: false
    };

    this.image = new MutableImage(require("./images/flowers.png"));
    this.image.setPersistanceTarget("MainBackdrop", this.store);

    this.coords = null
  }

  async componentDidMount() {
    // Initialize persisted state
    await this.store.init();

    zip = this.store.getItem("zip")
    if (zip != null) {
      this._getForecastForZip(zip)
    } else {
      // Force update of view
      this.setState({})
    }

    SplashScreen.hide();
  }

  onUnitChange(key, value, action) {

    if (this.coords) {

      const { lat, lon } = this.coords

      OpenWeatherMap.fetchLatLonForecast(value, lat, lon).then(forecast => {
        this.setState({ zip: null, units: value, forecast: forecast });
      });

    } else {

      const zip = this.store.getItem("zip");

      if (zip) {
        OpenWeatherMap.fetchZipForecast(value, zip).then(forecast => {
          this.setState({ zip: zip, units: value, forecast: forecast });
        });
      }
    }
  }

  _getForecastForZip = zip => {
    // Persist zip code
    this.store.setItem("zip", zip)

    this.coords = null;

    unitType = this.store.getItem("UnitType") || 0
    OpenWeatherMap.fetchZipForecast(unitType, zip).then(forecast => {
      this.setState({ zip: zip, units: unitType, forecast: forecast });
    });
  };

  _getForecastForCoords = (lat, lon) => {

    this.coords = { lat: lat, lon: lon };

    unitType = this.store.getItem("UnitType") || 0
    OpenWeatherMap.fetchLatLonForecast(unitType, lat, lon).then(forecast => {
      this.setState({ zip: null, units: unitType, forecast: forecast });
    });
  };

  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    this._getForecastForZip(zip);
  };

  _showOptions = (visible) => {
    this.refs.options.loadState();
    this.setState({ showOptions: visible });
  }

  render() {
    let content = null;
    if (this.state.forecast !== null) {
      content = (
        <View style={styles.row}>
          <Forecast
            main={this.state.forecast.main}
            temp={this.state.forecast.temp}
            units={this.state.units}
          />
        </View>
      );
    }

    return (
      <Backdrop
        image={this.image}>

        <Options
          ref={"options"}
          store={this.store}
          isVisible={() => {
            return this.state.showOptions;
          }}
          onClose={() => {
            this._showOptions(false);
          }}
        />

        <View style={styles.forecastOverlay}>

          <View style={[styles.row, { paddingTop: 22 }]}>

            <OptionsButton
              style={styles.optionsButton}
              onOpen={() => {
                this._showOptions(true);
              }} />

            <Text style={textStyles.mainText}>
              Forecast for
            </Text>

            <View style={styles.zipContainer}>
              <TextInput
                placeholder="zip"
                value={this.state.zip}
                style={[textStyles.mainText, styles.zipCode]}
                onSubmitEditing={this._handleTextChange}
                underlineColorAndroid="transparent"
              />
            </View>

            <LocationButton
              style={styles.locationButton}
              onGetCoords={this._getForecastForCoords} />

          </View>

          {content}

        </View>

        {this.state.showOptions ? (
          <View style={styles.modalBackground} />
        ) : false}

      </Backdrop>
    );
  }
}

const styles = StyleSheet.create({
  forecastOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingBottom: 10
  },
  modalBackground: {
    backgroundColor: "rgba(0,0,0,0.7)",
    width: viewportWidth,
    height: viewportHeight,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  optionsButton: {
    width: 35,
    height: 35,
    position: "absolute",
    top: statusBarHeight,
    left: 8,
    bottom: 0,
    right: 0
  },
  locationButton: {
    width: 35,
    height: 35,
    position: "absolute",
    top: statusBarHeight,
    left: viewportWidth - 28,
    bottom: 0,
    right: 0
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    padding: 5
  },
  zipContainer: {
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    marginLeft: 5,
    width: 75,
    height: textStyles.baseFontSize * 1.5,
    justifyContent: "flex-end"
  },
  zipCode: { flex: 1, textAlign: "center" }
});
