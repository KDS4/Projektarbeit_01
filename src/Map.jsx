import {
  MapContainer,
  TileLayer,
  Marker,
  GeoJSON,
  Popup,
  CircleMarker,
} from "react-leaflet";
import { Button } from "@mui/material";

import data from "./assets/4.5_week.geojson.json";
import plate_boundaries from "./assets/plate_boundaries.geojson.json";

export const Map = ({ size, setFocussedEarthquake }) => {
  const earthquakes = data.features;

  return (
    <MapContainer
      center={[47.5, 7.5]}
      zoom={2}
      style={{ height: "95vh", width: "100%" }}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <GeoJSON data={plate_boundaries} />

      {earthquakes.map((d, i) => (
        <CircleMarker
          key={i}
          center={[d.geometry.coordinates[1], d.geometry.coordinates[0]]}
          radius={d.properties.mag ** size}
          pathOptions={{ color: "#fd0000" }}
        >
          <Popup>
            <div style={{ textAlign: "center" }}>
              {d.properties.title} <br />
              <Button
                onClick={() => setFocussedEarthquake(d)}
                variant="outlined"
                size="small"
                color="success"
              >
                Fokussieren
              </Button>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};
