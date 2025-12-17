import { VegaLite } from 'react-vega';
import { Box, Typography } from '@mui/material';

export const TimeSeriesChart = ({ data }) => {
  
  if (!data || data.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 200,
        backgroundColor: 'grey.50',
        borderRadius: 1
      }}>
        <Typography variant="body1" color="text.secondary">
          Keine Zeitreihen-Daten verfügbar
        </Typography>
      </Box>
    );
  }

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Passanten-Zeitreihe nach Altersgruppen',
    width: 600,
    height: 400,
    data: { values: data },
    mark: { 
      type: 'line', 
      point: {
        filled: true,
        size: 60
      },
      tooltip: true,
      strokeWidth: 3
    },
    encoding: {
      x: {
        field: 'hour',
        type: 'temporal',
        title: 'Uhrzeit',
        axis: { 
          format: '%H:%M',
          labelAngle: -45,
          grid: true
        }
      },
      y: {
        field: 'count',
        type: 'quantitative',
        title: 'Durchschnittliche Anzahl Passanten',
        axis: { grid: true },
        scale: { zero: true }
      },
      color: {
        field: 'age_group',
        type: 'nominal',
        title: 'Altersgruppe',
        scale: {
          domain: ['Erwachsene', 'Kinder'],
          range: ['#1f77b4', '#ff7f0e']
        },
        legend: {
          orient: 'top-right',
          title: 'Altersgruppe'
        }
      },
      tooltip: [
        { field: 'hour', type: 'temporal', format: '%H:%M', title: 'Uhrzeit' },
        { field: 'age_group', type: 'nominal', title: 'Altersgruppe' },
        { field: 'count', type: 'quantitative', title: 'Anzahl Passanten' }
      ]
    },
    config: {
      axis: {
        labelFontSize: 11,
        titleFontSize: 12
      },
      legend: {
        labelFontSize: 11,
        titleFontSize: 12
      }
    }
  };

  return (
    <Box sx={{ width: '100%', overflow: 'auto' }}>
      <VegaLite 
        spec={spec} 
        actions={{
          export: true,
          source: false,
          compiled: false,
          editor: false
        }}
      />
    </Box>
  );
};