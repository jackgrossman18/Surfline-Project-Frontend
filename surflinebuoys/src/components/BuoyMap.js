import React, { Component } from "react";
import { connect } from "react-redux";
import Worker from "../worker";
import PropTypes from "prop-types";
import { setBounds, setMapRender } from "../actionCreators";
import L from "leaflet";
import "../App.css";

var worker = Worker.instance;

class BuoyMap extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    _setBounds: PropTypes.func.isRequired,
    buoys: PropTypes.object.isRequired
  };

  componentDidMount() {
    var baseLayer = L.tileLayer(
      "https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFja2dyb3NzbWFuIiwiYSI6ImNpbWZqeG1hMjAxcHl2Y202cmhlZGRjYXcifQ.1-so8LElW5dTGT5o941u1w",
      {
        attribution:
          "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
      }
    );
    this.map = L.map("map", { layers: [baseLayer] });
    this.map.fitBounds([[33, -121], [34, -117]]);
    worker.setNewBuoys(this.buildBounds(this.map.getBounds()));
    this.map.on("zoomend", () => {
      worker.setNewBuoys(this.buildBounds(this.map.getBounds()));
    });
  }
  componentDidUpdate() {
    if (this.props.hasOwnProperty("buoys")) {
      Object.keys(this.props.buoys).forEach(buoyName => {
        var buoy = this.props.buoys[buoyName];
        if (buoy.height < 4 && buoy.period < 4) {
          return L.marker([buoy.lat, buoy.lon], { icon: redBuoy })
            .bindPopup(
              `<h1>${buoyName.replace(/_|-/g, " ").toUpperCase()}</h1>\n
              <p class="popText">Conditions:</p>\n
              <p id="poor" >Poor</p>\n 
              <p class="popText">Swell Height:</p>\n
              <p class="info">${buoy.height} feet </p>\n
              <p class="popText">Swell Period:</p>\n
              <p class="info">${buoy.period} seconds </p>
              <div>`
            )
            .openPopup()
            .addTo(this.map);
        } else if (
          buoy.height > 4 &&
          buoy.height < 12 &&
          buoy.period > 4 &&
          buoy.period < 12
        ) {
          return L.marker([buoy.lat, buoy.lon], { icon: blueBuoy })
            .bindPopup(
              `<h1>${buoyName.replace(/_|-/g, " ").toUpperCase()}</h1>\n
              <p class="popText">Conditions:</p>\n
              <p id="fair" >Fair</p>\n 
              <p class="popText">Swell Height:</p>\n
              <p class="info">${buoy.height} feet </p>\n
              <p class="popText">Swell Period:</p>\n
              <p class="info"> ${buoy.period} seconds </p>`
            )
            .openPopup()
            .addTo(this.map);
        } else {
          return L.marker([buoy.lat, buoy.lon], { icon: greenBuoy })
            .bindPopup(
              `<h1>${buoyName.replace(/_|-/g, " ").toUpperCase()}</h1>\n
              <p class="popText">Conditions:</p>\n
              <p id="good" >Good</p>\n 
              <p class="popText">Swell Height:</p>\n
              <p class="info">${buoy.height} feet </p>\n
              <p class="popText">Swell Period:</p>\n
              <p class="info"> ${buoy.period} seconds </p>`
            )
            .openPopup()
            .addTo(this.map);
        }
      });
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
    buoys: state.buoys,
    webSocketConnected: state.webSocketConnected,
    mapRendered: state.mapRendered
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
    }
  };
};

const redBuoy = L.divIcon({
  className: "newBuoy",
  html: `<i style="color:#561713" class="fa fa-flag fa-6 aria-hidden="true"></i>`,
  iconAnchor: [0, -5]
});

const blueBuoy = L.divIcon({
  className: "newBuoy",
  html: `<i style="color:#5aa5f5" class="fa fa-flag fa-6 aria-hidden="true"></i>`,
  iconAnchor: [0, -5]
});

const greenBuoy = L.divIcon({
  className: "newBuoy",
  html: `<i style="color:#66d253" class="fa fa-flag fa-6 aria-hidden="true"></i>`,
  iconAnchor: [0, -5]
});

export default connect(
  selector,
  dispatcher
)(BuoyMap);
