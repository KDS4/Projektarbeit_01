import { useState } from "react";
import { Header } from "./Header";

import { Map } from "./Map";
import "./App.css";
import "leaflet/dist/leaflet.css";
import data from "./assets/4.5_week.geojson.json";
import { Sidebar } from "./Sidebar";

function App() {
  const earthquakes = data.features;

  const [myMarker, setMyMarker] = useState({});
  console.log(myMarker);

  return (
    <div className="app">
      <Header />
      <Sidebar />
      <div className="mainArea">
        <Map
          earthquakes={earthquakes}
          setMyMarker={setMyMarker}
          myMarker={myMarker}
        />
      </div>
    </div>
  );
}

export default App;
