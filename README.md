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

The worker file
