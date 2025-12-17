import { 
  Box, Typography, Card, CardContent, Grid, 
  CircularProgress, Alert 
} from "@mui/material";
import { TimeSeriesChart } from "./TimeSeriesChart";
import { LocationComparisonChart } from "./LocationComparisonChart";
import { StatisticsCards } from "./StatisticsCards";
import { TrendingUp } from "@mui/icons-material";

export const MainContent = ({ 
  chartData,
  locationData,
  loading,
  selectedLocation,
  selectedTimeRange
}) => {

  if (loading) {
    return (
      <Box className="mainArea" sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%',
        flexDirection: 'column'
      }}>
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Analysiere Passantendaten...
        </Typography>
      </Box>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <Box className="mainArea" sx={{ p: 3 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          Keine Daten für die gewählten Filter verfügbar. 
          Bitte passen Sie Zeitraum oder Standort an.
        </Alert>
      </Box>
    );
  }

  return (
    <Box className="mainArea">
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <TrendingUp sx={{ mr: 1, fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" component="h1">
              Passanten-Analyse
            </Typography>
          </Box>
          
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Kinder vs. Erwachsene - Zeitliche und räumliche Verteilung
          </Typography>
          
          <Box sx={{ 
            backgroundColor: 'grey.50', 
            p: 2, 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'grey.200'
          }}>
            <Typography variant="body1" color="text.secondary">
              <strong>Aktuelle Filter:</strong><br />
              Zeitraum: {selectedTimeRange.start} bis {selectedTimeRange.end}<br />
              Standort: {selectedLocation === 'all' ? 'Alle Standorte' : selectedLocation}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StatisticsCards data={chartData} />
          </Grid>
          
          <Grid item xs={12} lg={8}>
            <Card elevation={2}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Zeitverlauf: Passanten nach Altersgruppen
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Durchschnittliche Anzahl Passanten pro Stunde
                </Typography>
                <TimeSeriesChart data={chartData} />
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <Card elevation={2}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Vergleich nach Standorten
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Gesamtanzahl im gewählten Zeitraum
                </Typography>
                <LocationComparisonChart data={locationData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};