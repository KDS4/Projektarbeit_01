import React from 'react';
import { Box, Typography, CircularProgress, Grid, Card, CardContent } from '@mui/material';
import { Timechart } from './Timechart';
import { Lokalisation } from './Lokalisation';
import { StatisticsCards } from './Statistik';
import { Map } from './Map';

export const MainContent = ({ 
  chartData, 
  locationData,
  mapData,
  statistics,
  loading, 
  selectedLocation 
}) => {
  
  if (loading) {
    return (
      <Box className="mainArea" sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
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

      {statistics && (
        <StatisticsCards data={[{
          hour: '',
          count: statistics.total,
          age_group: 'Alle',
          location_name: selectedLocation
        }]} />
      )}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Zeitverlauf - Erwachsene vs Kinder
              </Typography>
              <Timechart data={chartData} />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Standort-Vergleich
              </Typography>
              <Lokalisation data={locationData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Map data={mapData} />
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        {chartData.length} Eintraege geladen
      </Typography>
    </Box>
  );
};