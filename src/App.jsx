import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

import { Map } from "./Map";
import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  const [focussedEarthquake, setFocussedEarthquake] = useState({});
  const [size, setSize] = useState(1);
  console.log(focussedEarthquake);

  return (
    <div className="app">
      <Header />
      <Sidebar earthquake={focussedEarthquake} size={size} setSize={setSize} />
      <div className="mainArea">
        <Map
          size={size}
          setSize={setSize}
          setFocussedEarthquake={setFocussedEarthquake}
        />
      </div>
    </div>
  );
}

export default App;
