import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import './App.css';

const API_URL = 'http://localhost:8000/api';

function App() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [chartData, setChartData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);

  // Beim Start laden
  useEffect(() => {
    loadLocations();
    loadData();
  }, []);

  // Standorte laden
  const loadLocations = async () => {
    try {
      const response = await fetch(`${API_URL}/locations`);
      const data = await response.json();
      setLocations(['all', ...data.locations]);
    } catch (error) {
      console.error('Fehler beim Laden der Standorte:', error);
    }
  };

  // Daten laden
  const loadData = async () => {
    setLoading(true);
    
    try {
      // 1. Zeitreihen-Daten
      const timeseriesRes = await fetch(
        `${API_URL}/timeseries?location=${selectedLocation}`
      );
      const timeseriesData = await timeseriesRes.json();
      setChartData(timeseriesData);

      // 2. Standort-Vergleich
      const comparisonRes = await fetch(`${API_URL}/location-comparison`);
      const comparisonData = await comparisonRes.json();
      setLocationData(comparisonData);

      // 3. Statistiken
      const statsRes = await fetch(
        `${API_URL}/statistics?location=${selectedLocation}`
      );
      const statsData = await statsRes.json();
      setStatistics(statsData);

      // 4. Map-Daten
      const mapRes = await fetch(`${API_URL}/map-data`);
      const mapDataResult = await mapRes.json();
      setMapData(mapDataResult);
      
      console.log('Daten erfolgreich geladen');
      
    } catch (error) {
      console.error('Fehler beim Laden:', error);
      alert('Backend nicht erreichbar. Server auf Port 8000 gestartet?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <Sidebar 
          locations={locations}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          onLoadData={loadData}
        />
        <MainContent 
          chartData={chartData}
          locationData={locationData}
          mapData={mapData}
          statistics={statistics}
          loading={loading}
          selectedLocation={selectedLocation}
        />
      </div>
    </div>
  );
}

export default App;