import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#171717",
        color: "#ffffff",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Smart Calculator
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flexWrap="wrap"
          >

            <Link
              href="mailto:ramya853144@gmail.com"
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#ffffff",
                "&:hover": {
                  color: "#d4d4d4",
                  textDecoration: "underline",
                },
              }}
            >
              <EmailIcon fontSize="small" />
              <Typography variant="body2">
                ramya853144@gmail.com
              </Typography>
            </Link>

            <Link
              href="tel:+919876543210"
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#ffffff",
                "&:hover": {
                  color: "#d4d4d4",
                  textDecoration: "underline",
                },
              }}
            >
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">
                +91 98765 43210
              </Typography>
            </Link>

            <Link
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#ffffff",
                "&:hover": {
                  color: "#d4d4d4",
                  textDecoration: "underline",
                },
              }}
            >
              <GitHubIcon fontSize="small" />
              <Typography variant="body2">
                GitHub
              </Typography>
            </Link>

            <Link
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#ffffff",
                "&:hover": {
                  color: "#d4d4d4",
                  textDecoration: "underline",
                },
              }}
            >
              <LinkedInIcon fontSize="small" />
              <Typography variant="body2">
                LinkedIn
              </Typography>
            </Link>

          </Stack>
        </Box>

        <Divider sx={{ borderColor: "#404040" }} />

        <Box
          sx={{
            py: 0.35,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: "#a3a3a3" }}>
            © {new Date().getFullYear()} Smart Calculator
          </Typography>

          <Typography variant="body2" sx={{ color: "#a3a3a3" }}>
            Developed by Ramyavignesh
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}