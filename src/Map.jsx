import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";

export const Map = ({ earthquakes, setMyMarker }) => {
  return (
    <MapContainer
      center={[47.5, 7.5]}
      zoom={10}
      style={{ height: "95vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {earthquakes.map((d) => (
        <CircleMarker
          radius={d.properties.mag ** 2}
          center={[d.geometry.coordinates[0], d.geometry.coordinates[1]]}
        >
          <Popup>
            <div style={{ textAlign: "center" }}>
              {d.properties.title} <br />
              <button onClick={() => setMyMarker(d)}>Details</button>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};
