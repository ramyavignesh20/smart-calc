import { Card, CardActionArea, CardContent, Typography, Box } from "@mui/material";

export default function CalculatorCard({ title, description, icon, onClick }) {
  return (
    <Card className="calculator-card" sx={{ height: "100%" }}>
      <CardActionArea
        onClick={onClick}
        aria-label={`Open ${title}`}
        sx={{ width: "100%", height: "100%", borderRadius: "inherit" }}
      >
        <CardContent
          sx={{
            height: "100%",
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            "&:last-child": { pb: 2.5 },
          }}
        >
          <Box sx={{
            width: 44,
            height: 44,
            mb: 2.25,
            display: "grid",
            placeItems: "center",
            borderRadius: 2.5,
            color: "primary.main",
            backgroundColor: "#f5f5f5",
            lineHeight: 1,
            "& svg": { fontSize: 23 },
          }}>{icon}</Box>
          <Typography
            component="h2"
            variant="subtitle1"
            sx={{ fontWeight: 650, lineHeight: 1.35 }}
          >
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, lineHeight: 1.5 }}>
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
