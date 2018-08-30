# Surfline Project Frontend

### Surfline Buoy Map

This map is intended to show incoming data from buoys in the Pacific Ocean. 

#### Buoys
The buoys are stylized to represent Surfline's condition rating system.
![Buoy Map](https://user-images.githubusercontent.com/25868208/44828118-5f9fc700-abe4-11e8-81f1-f1478420c7ab.png)

#### Buoy Info
The buoys are clickable. Upon being clicked, they will display buoy info pertaining to the current swell conditions
![Buoy Popup](https://user-images.githubusercontent.com/25868208/44828196-c02f0400-abe4-11e8-9cf3-b02788c16fd4.png)

#### Buoy Rendering
As the user interacts with the webmap, each zoom action will load the buoys that reside within the current map bounds. As you can see, once the map bounds are at an extent that contains the 'West Oregon' buoy, it will be rendered and styled.
![Buoy Rendering](https://user-images.githubusercontent.com/25868208/44828246-05ebcc80-abe5-11e8-9c21-263223c7c9c1.png)


### Functionality

At a high level, the front end of this application receives information from the 'outBuoy' websocket housed within the backend, and renderes it on a map as a geoJson. A geoJson was implemented instead of a marker because it is much easier to alter the state of the geoJson layer with redux. The webmap recieves the buoy data, renders an icon, updates an icon when more current data is recieved, then deletes the old data that it has replaced. This is an important feature of the app as it prevents the map from rendering an inordinant amount of icons on top of one another as data streams in to the front end.

#### Worker 

The worker file uses the same json-rpc formatting that I created for the backend, to open a websocket and recieve incoming messages. It also, uses the redux store that i've created in my store.js file to deliver a payload of buoys once the websocket is open, sending buoy notifications. This file also allows for the map to look for buoys that fall within the current bound extent of the webmap window.

#### Store

The store file uses redux to manage the state of the map throughout the frontend. The key features are listed below

* Add bounds to the map "ADD_BOUNDS"
* Feed in the buoys "UPDATE_BUOYS"
* Confirm an open socket within the active state "SOCKET_OPEN"
* Confirm a rendered map with the active state "MAP_RENDERED"
* Add a geojson to the map, enabling buoys to be added, updated and deleted "SET_BUOY_FEATURE_MAP"
* Add add features to that enabled geojson, adding, updating and deleting them when appropriate "UPDATE_BUOY_FEATURE_MAP"

#### Action Types

The action types file allows for the redux cases to be called elsewhere

#### Action Creators 

The action creators allow for dispatch methods to be called within the BuoyMap component file

#### Helper

The helper file allows for geojson marker icons to be styled and represent the current conditions at that location

#### Buoy Map

The buoy map does several important things in addition to rendering the map and the geojson features. It uses Redux dispatch and selector methods to dispatch the map bounds, add new buoys, update buoys, and delete stale buoys
