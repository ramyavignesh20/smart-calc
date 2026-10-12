import {
  Box,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import BrandLogo from "./BrandLogo";

const profileKey = "calculatorContactProfile";
const profile = {
  name: "Ramyavignesh",
  email: "ramya853144@gmail.com",
  phone: "9876543210",
};

function readGithubProfile() {
  const savedProfile = JSON.parse(localStorage.getItem(profileKey) || "{}");
  return savedProfile.github ?? "";
}

function githubProfileUrl(value) {
  const profile = value.trim();
  if (/^https:\/\/github\.com\/[\w-]+\/?$/.test(profile)) return profile;
  if (/^[\w-]+$/.test(profile)) return `https://github.com/${profile}`;
  return "";
}

export default function Footer() {
  const github = readGithubProfile();
  const githubUrl = githubProfileUrl(github);

  return (
    <Box component="footer" sx={{ bgcolor: "primary.dark", color: "white", px: 2, py: 2.5 }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <BrandLogo footer />
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            © {new Date().getFullYear()} {profile.name}
          </Typography>
        </Box>
        <Stack direction="row" flexWrap="wrap" gap={2} alignItems="center">
          <Typography variant="body2">
            Email: <Link color="inherit" href={`mailto:${profile.email}`}>{profile.email}</Link>
          </Typography>
          <Typography variant="body2">
            Phone: <Link color="inherit" href={`tel:${profile.phone}`}>{profile.phone}</Link>
          </Typography>
          <Typography variant="body2">
            GitHub:{" "}
            {githubUrl ? (
              <Link color="inherit" href={githubUrl} target="_blank" rel="noreferrer">
                {github}
              </Link>
            ) : "Not provided"}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
