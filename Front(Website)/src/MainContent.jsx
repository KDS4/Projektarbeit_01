import React from 'react';
import { Box, Typography, CircularProgress, Card, CardContent } from '@mui/material';
import { Timechart } from './Timechart';
import { Lokalisation } from './Lokalisation';

export const MainContent = ({ 
  chartData, 
  locationData, 
  statistik,
  loading, 
  selectedLocation 
}) => {
  
  if (loading) {
    return (
      <Box className="mainArea" sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh'
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Lade Daten...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="mainArea" sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Passanten Dashboard
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Standort: {selectedLocation === 'all' ? 'Alle Standorte' : selectedLocation}
      </Typography>

      {/* Statistik-Karten */}
      {statistik && (
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Gesamt</Typography>
              <Typography variant="h4">{statistik.gesamt}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Durchschnitt</Typography>
              <Typography variant="h4">{statistik.durchschnitt}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Maximum</Typography>
              <Typography variant="h4">{statistik.maximum}</Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Charts */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Zeitverlauf</Typography>
            <Timechart data={chartData} />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Standort-Vergleich</Typography>
            <Lokalisation data={locationData} />
          </CardContent>
        </Card>
      </Box>

      {/* Daten-Anzahl */}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {chartData.length} Einträge geladen
      </Typography>
    </Box>
  );
};