import {
  ADD_BOUNDS,
  MAP_RENDER,
  SET_BUOY_FEATURE_MAP,
  UPDATE_BUOY_FEATURE
} from "./actionTypes";

export function setBounds(bounds) {
  return {
    type: ADD_BOUNDS,
    payload: bounds
  };
}

export function setMapRender() {
  return {
    type: MAP_RENDER,
    payload: true
  };
}

export function setBuoyFeaturesMap(featureGroup) {
  return {
    type: SET_BUOY_FEATURE_MAP,
    payload: featureGroup
  };
}

export function updateBuoyFeatures(name, layer) {
  return {
    type: UPDATE_BUOY_FEATURE,
    payload: {
      name: name,
      layer: layer
    }
  };
}
