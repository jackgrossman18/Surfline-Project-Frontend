import JSON_RPC from "./json-rpc";
import { UPDATE_BUOY, SOCKET_OPEN } from "./actionTypes";

// guide used for singleton https://stackoverflow.com/questions/26205565/converting-singleton-js-objects-to-use-es6-classes/26227662#26227662
const singelton = Symbol();
const singeltonEnforcer = Symbol();

class Worker {
  constructor(enforcer) {
    if (enforcer !== singeltonEnforcer) {
      throw new Error("cannot construct singleton");
    }
  }

  static get instance() {
    if (!this[singelton]) {
      this[singelton] = new Worker(singeltonEnforcer);
    }
    return this[singelton];
  }

  init(store) {
    this._store = store;
    this._ws = this._initWebSocket();
  }
  _initWebSocket() {
    var store = this._store;
    var ws = new WebSocket("ws://localhost:8080/outBuoy");

    ws.onopen = function(event) {
      store.dispatch({ type: SOCKET_OPEN, payload: true });
    };

    ws.onmessage = function(event) {
      var message = JSON.parse(event.data);
      if (message.method === "buoyNotification") {
        var buoy = message.params;
        store.dispatch({
          type: UPDATE_BUOY,
          payload: buoy
        });
      }
    };
    return ws;
  }
  // borrowed from provided example :)
  uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  setNewBuoys(bounds) {
    var subBuoysRequest = JSON_RPC.buildRequest(
      "subscribeToBuoys",
      bounds,
      this.uuid()
    );
    subBuoysRequest = JSON.stringify(subBuoysRequest);
    this._ws.send(subBuoysRequest);
  }
}

export default Worker;
