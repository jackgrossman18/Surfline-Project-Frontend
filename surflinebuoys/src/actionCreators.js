import { ADD_BOUNDS, MAP_RENDER } from "./actionTypes";

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
