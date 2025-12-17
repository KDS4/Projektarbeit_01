import React from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

export const Sidebar = ({ 
  locations = [], 
  selectedLocation, 
  setSelectedLocation, 
  onLoadData 
}) => {
  return (
    <Box className="sidebar" sx={{ 
      width: 280, 
      padding: 3, 
      backgroundColor: '#f5f5f5',
      borderRight: '1px solid #ddd'
    }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Filter
      </Typography>
      
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Standort</InputLabel>
        <Select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          label="Standort"
        >
          <MenuItem value="all">Alle Standorte</MenuItem>
          {locations.filter(loc => loc !== 'all').map(location => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button 
        variant="contained" 
        fullWidth 
        onClick={onLoadData}
        sx={{ 
          backgroundColor: '#1976d2',
          '&:hover': { backgroundColor: '#1565c0' }
        }}
      >
        Daten laden
      </Button>

      <Box sx={{ mt: 3, p: 2, backgroundColor: '#fff', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Wähle einen Standort aus und klicke auf "Daten laden" um die Statistiken zu aktualisieren.
        </Typography>
      </Box>
    </Box>
  );
};