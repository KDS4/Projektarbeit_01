import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { Box } from "@mui/material";

export const Sidebar = ({ earthquake, size, setSize }) => (
  <div className="aside">
    <aside>
      <Card sx={{ minWidth: 200 }}>
        <CardContent>
          <Typography variant="h6">Details:</Typography>
          <Typography sx={{ color: "text.primary" }} variant="body2">
            Stärke: {earthquake.properties?.mag ?? ""}
          </Typography>
          <Typography
            sx={{ color: "text.secondary", mb: 1.5 }}
            variant="caption"
            gutterBottom
          >
            Zeitpunkt:{" "}
            {earthquake.properties?.time
              ? new Date(earthquake.properties.time).toLocaleString()
              : ""}
          </Typography>
          <Typography variant="body2">
            Lage: {earthquake.properties?.place ?? ""}
            <br />
            Epizentrum: {earthquake.geometry?.coordinates?.[1] ?? ""}{" "}
            {earthquake.geometry?.coordinates?.[0] ?? ""}
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ width: 200, p: 2 }}>
        <Slider
          value={size}
          step={0.5}
          marks
          min={0.5}
          max={3}
          onChange={(e, newSize) => setSize(newSize)}
        />
      </Box>
    </aside>
  </div>
);
