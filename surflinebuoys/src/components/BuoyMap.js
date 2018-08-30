import React, { Component } from "react";
import { connect } from "react-redux";
import Worker from "../worker";
import PropTypes from "prop-types";
import { buildPopUpConfig } from "../helpers";
import {
  setBounds,
  setMapRender,
  setBuoyFeaturesMap,
  updateBuoyFeatures
} from "../actionCreators";
import L from "leaflet";
import "../App.css";

var worker = Worker.instance;

class BuoyMap extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    _setBounds: PropTypes.func.isRequired,
    buoy: PropTypes.object.isRequired
  };

  componentDidMount() {
    var baseLayer = L.tileLayer(
      "https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFja2dyb3NzbWFuIiwiYSI6ImNpbWZqeG1hMjAxcHl2Y202cmhlZGRjYXcifQ.1-so8LElW5dTGT5o941u1w",
      {
        attribution:
          "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
      }
    );
    var _updateBuoyFeatures = this.props._updateBuoyFeatures;
    this.map = L.map("map", { layers: [baseLayer] });
    this.map.on("load", () => {
      var buoyFeaturesMap = L.geoJson([], {
        onEachFeature: function(feature, layer) {
          _updateBuoyFeatures(feature.properties.name, layer);
        },
        pointToLayer: function(feature, latlng) {
          var markerConfig = buildPopUpConfig(feature.properties);
          return L.marker(latlng, { icon: markerConfig.icon })
            .bindPopup(markerConfig.HTML)
            .openPopup();
        }
      });
      buoyFeaturesMap.addTo(this.map);
      this.props._setBuoyFeaturesMap(buoyFeaturesMap);
    });
    this.map.fitBounds([[33, -121], [34, -117]]);
    worker.setNewBuoys(this.buildBounds(this.map.getBounds()));
    this.map.on("zoomend", () => {
      worker.setNewBuoys(this.buildBounds(this.map.getBounds()));
    });
  }

  addNewBuoyFeature(newGeoJsonData) {
    this.props.buoyFeaturesMap.addData([newGeoJsonData]);
  }

  updateBuoyFeature(updatedGeoJsonData) {
    this.deleteBuoyFeature(updatedGeoJsonData); // Remove the old buoy layer.
    this.addNewBuoyFeature(updatedGeoJsonData); // Update buoy data
  }

  deleteBuoyFeature(deletedGeoJsonData) {
    var deletedFeature = this.props.buoyFeatures[
      deletedGeoJsonData.properties.name
    ];
    this.props.buoyFeaturesMap.removeLayer(deletedFeature);
  }

  componentDidUpdate() {
    if (Object.keys(this.props.buoy).length > 0) {
      var buoyName = this.props.buoy.properties.name;
      if (this.props.buoyFeatures.hasOwnProperty(buoyName)) {
        this.updateBuoyFeature(this.props.buoy);
      } else {
        this.addNewBuoyFeature(this.props.buoy);
      }
    }
  }

  buildBounds(bounds) {
    return {
      south: bounds.getSouth(),
      west: bounds.getWest(),
      north: bounds.getNorth(),
      east: bounds.getEast()
    };
  }

  render() {
    return <div id="map" />;
  }
}

const selector = state => {
  return {
    buoy: state.buoy,
    webSocketConnected: state.webSocketConnected,
    mapRendered: state.mapRendered,
    buoyFeaturesMap: state.buoyFeaturesMap,
    buoyFeatures: state.buoyFeatures
  };
};

const dispatcher = dispatch => {
  return {
    _setBounds: bounds => {
      bounds = {
        south: bounds.getSouth(),
        west: bounds.getWest(),
        north: bounds.getNorth(),
        east: bounds.getEast()
      };
      dispatch(setBounds(bounds));
    },

    _setMapRender: () => {
      dispatch(setMapRender());
    },

    _setBuoyFeaturesMap: buoyFeaturesMap => {
      dispatch(setBuoyFeaturesMap(buoyFeaturesMap));
    },

    _updateBuoyFeatures: (name, layer) => {
      dispatch(updateBuoyFeatures(name, layer));
    }
  };
};

export default connect(
  selector,
  dispatcher
)(BuoyMap);
