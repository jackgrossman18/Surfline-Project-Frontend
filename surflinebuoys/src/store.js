import { createStore } from "redux";
import {
  UPDATE_BUOY,
  ADD_BOUNDS,
  SOCKET_OPEN,
  MAP_RENDER
} from "./actionTypes";

const defaultState = {
  bounds: {},
  buoys: {},
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
      // workaround for shallow checking...
      state = JSON.parse(JSON.stringify(Object.assign({}, state)));
      state.buoys = Object.assign(state.buoys, buoy);
      return state;
    case SOCKET_OPEN:
      state = Object.assign({}, state);
      state.webSocketConnected = action.payload;
      return state;
    case MAP_RENDER:
      state = Object.assign({}, state);
      state.mapRendered = action.payload;
      return state;
    default:
      return state;
  }
}
var store = createStore(rootReducer);

export default store;
