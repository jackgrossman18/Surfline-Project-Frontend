import L from "leaflet";

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

export function buildPopUpConfig(properties) {
  let popUpConfig = {};
  if (properties.height < 4 && properties.period < 4) {
    popUpConfig.HTML = `<h1>${properties.name
      .replace(/_|-/g, " ")
      .toUpperCase()}</h1>\n
          <p class="popText">Conditions:</p>\n
          <p id="poor" >Poor</p>\n 
          <p class="popText">Swell Height:</p>\n
          <p class="info">${properties.height} feet </p>\n
          <p class="popText">Swell Period:</p>\n
          <p class="info">${properties.period} seconds </p>
          <div>`;
    popUpConfig.icon = redBuoy;
  } else if (
    properties.height > 4 &&
    properties.height < 12 &&
    properties.period > 4 &&
    properties.period < 12
  ) {
    popUpConfig.HTML = `<h1>${properties.name
      .replace(/_|-/g, " ")
      .toUpperCase()}</h1>\n
          <p class="popText">Conditions:</p>\n
          <p id="fair" >Fair</p>\n 
          <p class="popText">Swell Height:</p>\n
          <p class="info">${properties.height} feet </p>\n
          <p class="popText">Swell Period:</p>\n
          <p class="info"> ${properties.period} seconds </p>`;
    popUpConfig.icon = blueBuoy;
  } else {
    popUpConfig.HTML = `<h1>${properties.name
      .replace(/_|-/g, " ")
      .toUpperCase()}</h1>\n
          <p class="popText">Conditions:</p>\n
          <p id="good" >Good</p>\n 
          <p class="popText">Swell Height:</p>\n
          <p class="info">${properties.height} feet </p>\n
          <p class="popText">Swell Period:</p>\n
          <p class="info"> ${properties.period} seconds </p>`;
    popUpConfig.icon = greenBuoy;
  }
  return popUpConfig;
}
