import React from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const Sidebar = ({ 
  standorte = [], 
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
      <h2 style={{ marginBottom: '20px' }}>Filter</h2>
      
      {/* Standort-Auswahl */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Standort</InputLabel>
        <Select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          label="Standort"
        >
          <MenuItem value="all">Alle Standorte</MenuItem>
          {standorte.filter(s => s !== 'all').map(standort => (
            <MenuItem key={standort} value={standort}>
              {standort}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Laden-Button */}
      <Button 
        variant="contained" 
        fullWidth 
        onClick={onLoadData}
        sx={{ 
          backgroundColor: '#1976d2',
          '&:hover': { backgroundColor: '#1565c0' }
        }}
      >
        🔄 Daten laden
      </Button>
    </Box>
  );
};