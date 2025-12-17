import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import "./App.css";

function App() {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState({
    start: "2021-09-28",
    end: "2021-12-31"
  });
  const [chartData, setChartData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableLocations, setAvailableLocations] = useState([]);

  useEffect(() => {
    fetchAvailableLocations();
  }, []);

  const fetchAvailableLocations = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/locations');
      const data = await response.json();
      setAvailableLocations(data);
    } catch (error) {
      console.error('Fehler beim Laden der Standorte:', error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        location: selectedLocation,
        start_date: selectedTimeRange.start,
        end_date: selectedTimeRange.end
      });
      
      const response = await fetch(`http://localhost:8000/api/pedestrians?${params}`);
      const data = await response.json();
      setChartData(data.time_series);
      setLocationData(data.location_comparison);
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <Sidebar 
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
        availableLocations={availableLocations}
        onFetchData={fetchData}
        loading={loading}
      />
      <MainContent 
        chartData={chartData}
        locationData={locationData}
        loading={loading}
        selectedLocation={selectedLocation}
        selectedTimeRange={selectedTimeRange}
      />
    </div>
  );
}