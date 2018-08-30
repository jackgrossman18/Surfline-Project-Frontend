import { createStore } from "redux";
import { feature } from "@turf/helpers";
import {
  UPDATE_BUOY,
  ADD_BOUNDS,
  SOCKET_OPEN,
  MAP_RENDER,
  SET_BUOY_FEATURE_MAP,
  UPDATE_BUOY_FEATURE
} from "./actionTypes";

const defaultState = {
  bounds: {},
  buoy: {},
  buoyFeaturesMap: {},
  buoyFeatures: {},
  webSocketConnected: false,
  mapRendered: false
};

function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_BOUNDS:
      state = Object.assign({}, state);
      state.bounds = action.payload;
      return state;
    case UPDATE_BUOY:
      let buoy = action.payload;
      // building geojson for layer manipulation
      let buoyFeature = {
        type: "Point",
        coordinates: [buoy.lon, buoy.lat]
      };
      buoyFeature = feature(buoyFeature, {
        name: buoy.name,
        height: buoy.height,
        period: buoy.period
      });

      state = Object.assign({}, state);
      // workaround for shallow checking...
      state.buoy = buoyFeature;
      return state;

    case SOCKET_OPEN:
      state = Object.assign({}, state);
      state.webSocketConnected = action.payload;
      return state;

    case MAP_RENDER:
      state = Object.assign({}, state);
      state.mapRendered = action.payload;
      return state;

    case SET_BUOY_FEATURE_MAP:
      state = Object.assign({}, state);
      state.buoyFeaturesMap = action.payload;
      return state;

    case UPDATE_BUOY_FEATURE:
      state = Object.assign({}, state);
      state.buoyFeatures[action.payload.name] = action.payload.layer;
      return state;

    default:
      return state;
  }
}
var store = createStore(rootReducer);

export default store;
