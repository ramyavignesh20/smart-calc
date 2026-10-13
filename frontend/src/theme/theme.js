import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    mode: "light",
    primary: { main: "#171717", dark: "#000000", light: "#404040", contrastText: "#ffffff" },
    secondary: { main: "#737373", dark: "#525252", light: "#a3a3a3", contrastText: "#ffffff" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
    text: { primary: "#171717", secondary: "#737373" },
    divider: "#e5e5e5",
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h4: { fontWeight: 700, letterSpacing: "-0.035em" },
    h5: { fontWeight: 700, letterSpacing: "-0.025em" },
    h6: { fontWeight: 650, letterSpacing: "-0.015em" },
    button: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, textTransform: "none", fontWeight: 600, boxShadow: "none" },
        contained: {
          "&:hover": { boxShadow: "none", backgroundColor: "#404040" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 16, boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiTextField: {
      defaultProps: { size: "medium" },
    },
  },
});
