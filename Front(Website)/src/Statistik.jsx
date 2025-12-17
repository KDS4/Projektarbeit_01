import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { PeopleAlt, ChildCare, TrendingUp, AccessTime, LocationOn, Insights 
} from "@mui/icons-material";

export const StatisticsCards = ({ data }) => {
  
  const calculateStats = () => {
    if (!data || data.length === 0) {
      return {
        totalAdults: 0,
        totalChildren: 0,
        peakHour: 'N/A',
        childrenPercentage: 0,
        totalLocations: 0,
        avgPerHour: 0
      };
    }

    const adults = data.filter(d => d.age_group === 'Erwachsene');
    const children = data.filter(d => d.age_group === 'Kinder');
    
    const totalAdults = adults.reduce((sum, d) => sum + d.count, 0);
    const totalChildren = children.reduce((sum, d) => sum + d.count, 0);
    
    const hourlyTotals = {};
    data.forEach(d => {
      const hour = new Date(d.hour).getHours();
      hourlyTotals[hour] = (hourlyTotals[hour] || 0) + d.count;
    });
    
    const peakHour = Object.keys(hourlyTotals).reduce((a, b) => 
      hourlyTotals[a] > hourlyTotals[b] ? a : b, '0'
    );
    
    const total = totalAdults + totalChildren;
    const childrenPercentage = total > 0 
      ? (totalChildren / total * 100).toFixed(1)
      : 0;

    const uniqueHours = [...new Set(data.map(d => d.hour))].length;
    const avgPerHour = uniqueHours > 0 ? Math.round(total / uniqueHours) : 0;

    return {
      totalAdults,
      totalChildren,
      peakHour: `${peakHour}.00 Uhr`,
      childrenPercentage,
      totalLocations: [...new Set(data.map(d => d.location_name))].length,
      avgPerHour
    };
  };

  const stats = calculateStats();

  const cards = [
    {
      title: 'Erwachsene Total',
      value: stats.totalAdults.toLocaleString('de-CH'),
      icon: <PeopleAlt />,
      color: '#1f77b4',
      description: 'Erwachsene Passanten'
    },
    {
      title: 'Kinder Total',
      value: stats.totalChildren.toLocaleString('de-CH'),
      icon: <Child />,
      color: '#ff7f0e',
      description: 'Kinder Passanten'
    },
    {
      title: 'Stosszeit',
      value: stats.peakHour,
      icon: <AccessTime />,
      color: '#2ca02c',
      description: 'Höchste Passanten-Frequenz'
    },
    {
      title: 'Kinder-Anteil',
      value: `${stats.childrenPercentage}%`,
      icon: <TrendingUp />,
      color: '#d62728',
      description: 'Anteil Kinder an Gesamtpassanten'
    },
    {
      title: 'Ø pro Stunde',
      value: stats.avgPerHour.toLocaleString('de-CH'),
      icon: <Insights />,
      color: '#9467bd',
      description: 'Durchschnittliche Passanten/Stunde'
    },
    {
      title: 'Standorte',
      value: stats.totalLocations,
      icon: <LocationOn />,
      color: '#8c564b',
      description: 'Anzahl erfasste Standorte'
    }
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
          <Card sx={{ 
            height: '100%',
            background: `linear-gradient(135deg, ${card.color}15, ${card.color}05)`,
            border: `1px solid ${card.color}30`,
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 3
            }
          }}>
            <CardContent sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              textAlign: 'center',
              py: 2
            }}>
              <Box sx={{ 
                color: card.color, 
                mb: 1,
                fontSize: 32
              }}>
                {card.icon}
              </Box>
              
              <Typography variant="h5" sx={{ 
                color: card.color,
                fontWeight: 'bold',
                mb: 0.5
              }}>
                {card.value}
              </Typography>
              
              <Typography variant="subtitle2" color="text.primary" sx={{ mb: 0.5 }}>
                {card.title}
              </Typography>
              
              <Typography variant="caption" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};