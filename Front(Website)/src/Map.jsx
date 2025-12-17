import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export const Map = ({ 
  locationData,
  selectedLocation,
  onLocationSelect,
  timeRange
}) => {
  
  const [mapCenter] = useState([47.3769, 8.5417]);
  const [mapZoom] = useState(15);

  const getMarkerSize = (pedestrianCount) => {
    const baseSize = 10;
    const scaleFactor = Math.log10(pedestrianCount + 1) * 5;
    return Math.max(baseSize, Math.min(50, baseSize + scaleFactor));
  };

  const getMarkerColor = (childPercentage) => {
    if (childPercentage > 20) return '#ff4444';
    if (childPercentage > 10) return '#ffaa00';
    return '#4444ff';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 0, height: '100%' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'grey.200' }}>
          <Typography variant="h6">
            🗺️ Standort-Übersicht Bahnhofstrasse
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Marker-Größe = Passanten-Anzahl | Farbe = Kinder-Anteil
          </Typography>
        </Box>

        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: 'calc(100% - 80px)', width: '100%' }}
        >
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {locationData && locationData.map((location, index) => {
            const totalPedestrians = location.adult_count + location.child_count;
            const childPercentage = totalPedestrians > 0 
              ? (location.child_count / totalPedestrians) * 100 
              : 0;
            
            return (
              <CircleMarker
                key={location.location_id || index}
                center={[location.latitude, location.longitude]}
                radius={getMarkerSize(totalPedestrians)}
                pathOptions={{ 
                  color: getMarkerColor(childPercentage),
                  fillColor: getMarkerColor(childPercentage),
                  fillOpacity: 0.7,
                  weight: 2
                }}
                eventHandlers={{
                  click: () => onLocationSelect && onLocationSelect(location.location_id)
                }}
              >
                <Popup>
                  <Box sx={{ minWidth: 200 }}>
                    <Typography variant="h6" gutterBottom>
                      {location.location_name}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={`👥 ${totalPedestrians} Passanten`} 
                        color="primary" 
                        size="small" 
                        sx={{ mr: 1, mb: 1 }}
                      />
                      <Chip 
                        label={`👶 ${childPercentage.toFixed(1)}% Kinder`} 
                        color="secondary" 
                        size="small"
                        sx={{ mb: 1 }}
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      Erwachsene: {location.adult_count}<br />
                      Kinder: {location.child_count}
                    </Typography>

                    {onLocationSelect && (
                      <Box sx={{ mt: 2 }}>
                        <button
                          onClick={() => onLocationSelect(location.location_id)}
                          style={{
                            background: '#1976d2',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          🎯 Standort fokussieren
                        </button>
                      </Box>
                    )}
                  </Box>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        <Box sx={{ 
          position: 'absolute', 
          bottom: 16, 
          right: 16, 
          backgroundColor: 'rgba(255,255,255,0.9)',
          p: 1,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'grey.300'
        }}>
          <Typography variant="caption" component="div">
            <strong>Legende:</strong><br />
            🔵 Wenig Kinder (&lt;10%)<br />
            🟠 Mittlerer Anteil (10-20%)<br />
            🔴 Viele Kinder (&gt;20%)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
