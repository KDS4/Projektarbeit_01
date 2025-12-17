import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

export const Map = ({ data }) => {
  
  if (!data || data.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 300,
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        border: '1px dashed #ccc'
      }}>
        <Typography color="text.secondary">
          Keine Standort-Daten verfuegbar
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Standorte Uebersicht
      </Typography>
      
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {data.map((location, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ 
              height: '100%',
              border: '1px solid #e0e0e0',
              '&:hover': {
                boxShadow: 3,
                transform: 'translateY(-2px)',
                transition: 'all 0.2s'
              }
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {location.location_name}
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Erwachsene: <strong>{location.adults || 0}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Kinder: <strong>{location.children || 0}</strong>
                  </Typography>
                  <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                    Gesamt: <strong>{location.total || 0}</strong>
                  </Typography>
                </Box>

                {location.lat && location.lon && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                    Koordinaten: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
