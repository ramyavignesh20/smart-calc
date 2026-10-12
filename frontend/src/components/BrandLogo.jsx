import { Box, Typography } from "@mui/material";

export default function BrandLogo({ footer = false }) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1.25 }}>
      <Box
        component="img"
        src="/calculator-logo.svg"
        alt=""
        aria-hidden="true"
        sx={{ width: 38, height: 38, flexShrink: 0 }}
      />
      <Typography
        variant={footer ? "body1" : "h6"}
        component="span"
        sx={{ fontWeight: 700, color: "inherit" }}
      >
        Smart Calculator
      </Typography>
    </Box>
  );
}
