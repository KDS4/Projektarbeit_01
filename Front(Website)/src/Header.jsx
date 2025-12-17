import { Typography, Box } from "@mui/material";

export const Header = () => (
  <div className="header">
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="h4" sx={{ color: "black", fontWeight: 'bold' }}>
        WID-WEBAPP
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "gray" }}>
        Passanten-Analyse Bahnhofstrasse Zürich
      </Typography>
    </Box>
  </div>
);