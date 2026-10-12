import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    primary: { main: "#8895e4", dark: "#8895e4", light: "#8C9EFF" },
    secondary: { main: "#9580b8", light: "#f8f7fa" },
    background: { default: "#F5F3FF", paper: "#fcfafa" },
    text: { primary: "#1e254d", secondary: "#7f91f4" }
  },
  typography: { fontFamily: "Arial, sans-serif" },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, textTransform: "none", fontWeight: 600 }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 18 }
      }
    }
  }
});
