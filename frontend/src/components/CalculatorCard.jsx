import { Card, CardActionArea, CardContent, Typography, Box } from "@mui/material";

export default function CalculatorCard({title, description, icon, onClick}) {
  return (
    <Card className="calculator-card" sx={{ width: "2cm", height: "2cm" }}>
      <CardActionArea
        onClick={onClick}
        aria-label={`Open ${title}`}
        sx={{ width: "100%", height: "100%" }}
      >
        <CardContent
          sx={{
            height: "100%",
            p: 0.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "&:last-child": { pb: 0.5 },
          }}
        >
          <Box sx={{ color: "primary.main", lineHeight: 1, "& svg": { fontSize: 22 } }}>{icon}</Box>
          <Typography
            component="span"
            sx={{
              mt: 0.5,
              width: "100%",
              fontSize: "0.62rem",
              fontWeight: 700,
              lineHeight: 1.1,
              textAlign: "center",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
