import {
  Card, CardContent, Typography, FormControl, InputLabel, 
  Select, MenuItem, Button, Box, CircularProgress, Divider
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocationOn, CalendarToday, Analytics } from "@mui/icons-material";

export const Sidebar = ({ 
  selectedLocation,
  setSelectedLocation,
  selectedTimeRange,
  setSelectedTimeRange,
  availableLocations,
  onFetchData,
  loading
}) => {

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleDateChange = (field, value) => {
    setSelectedTimeRange(prev => ({
      ...prev,
      [field]: value ? value.toISOString().split('T')[0] : ''
    }));
  };

  return (
    <div className="aside">
      <aside>
        <Card sx={{ mb: 2 }} elevation={2}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">
                Standort-Filter
              </Typography>
            </Box>
            
            <FormControl fullWidth>
              <InputLabel>Standort auswählen</InputLabel>
              <Select
                value={selectedLocation}
                label="Standort auswählen"
                onChange={handleLocationChange}
              >
                <MenuItem value="all">
                  <Typography>Alle Standorte</Typography>
                </MenuItem>
                
                {availableLocations.map((location) => (
                  <MenuItem 
                    key={location.location_id} 
                    value={location.location_id.toString()}
                  >
                    {location.location_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        <Card sx={{ mb: 2 }} elevation={2}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarToday sx={{ mr: 1, color: 'secondary.main' }} />
              <Typography variant="h6">
                Zeitraum-Filter
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <DatePicker
                label="Startdatum"
                value={selectedTimeRange.start ? new Date(selectedTimeRange.start) : null}
                onChange={(value) => handleDateChange('start', value)}
                format="dd.MM.yyyy"
                slotProps={{ 
                  textField: { 
                    fullWidth: true,
                    variant: "outlined"
                  } 
                }}
              />
              
              <DatePicker
                label="Enddatum"
                value={selectedTimeRange.end ? new Date(selectedTimeRange.end) : null}
                onChange={(value) => handleDateChange('end', value)}
                format="dd.MM.yyyy"
                slotProps={{ 
                  textField: { 
                    fullWidth: true,
                    variant: "outlined"
                  } 
                }}
              />
            </Box>
          </CardContent>
        </Card>

        <Card elevation={3}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Analytics sx={{ mr: 1, color: 'success.main' }} />
              <Typography variant="h6">
                Datenanalyse
              </Typography>
            </Box>
            
            <Button 
              variant="contained" 
              fullWidth 
              onClick={onFetchData}
              disabled={loading}
              sx={{ 
                mb: 2,
                py: 1.5,
                borderRadius: 2
              }}
              startIcon={loading ? <CircularProgress size={16} /> : <Analytics />}
            >
              {loading ? 'Daten werden geladen...' : 'Analyse starten'}
            </Button>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ 
              backgroundColor: 'info.light', 
              p: 2, 
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'info.main'
            }}>
              <Typography variant="subtitle2" color="info.dark" gutterBottom>
                <strong>Forschungsfrage:</strong>
              </Typography>
              <Typography variant="body2" color="info.dark">
                Wann und wo gibt es die meisten Kinder und Erwachsene 
                an der Zürcher Bahnhofstrasse?
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
};