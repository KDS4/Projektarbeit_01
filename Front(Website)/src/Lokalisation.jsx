import { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import embed from 'vega-embed';

export const Lokalisation = ({ data }) => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (!data || data.length === 0 || !chartRef.current) return;

    const spec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'Passanten-Vergleich nach Standorten',
      width: 300,
      height: 400,
      data: { values: data },
      mark: { type: 'bar', tooltip: true },
      encoding: {
        y: {
          field: 'location_name',
          type: 'nominal',
          title: 'Standort',
          sort: { field: 'count', op: 'sum', order: 'descending' }
        },
        x: {
          field: 'count',
          type: 'quantitative',
          title: 'Anzahl Passanten'
        },
        color: {
          field: 'age_group',
          type: 'nominal',
          scale: {
            domain: ['Erwachsene', 'Kinder'],
            range: ['#1f77b4', '#ff7f0e']
          },
          legend: { title: 'Altersgruppe' }
        },
        tooltip: [
          { field: 'location_name', type: 'nominal', title: 'Standort' },
          { field: 'age_group', type: 'nominal', title: 'Altersgruppe' },
          { field: 'count', type: 'quantitative', title: 'Anzahl' }
        ]
      }
    };

    embed(chartRef.current, spec, { actions: false });
  }, [data]);
  
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
          Keine Standort-Daten verfügbar
        </Typography>
      </Box>
    );
  }

  return <Box ref={chartRef} sx={{ width: '100%' }} />;
};