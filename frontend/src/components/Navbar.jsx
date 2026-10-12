import { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import BrandLogo from "./BrandLogo";

const drawerWidth = 260;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, changeLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const closeSidebar = () => {
    setMobileOpen(false);
    setDesktopOpen(false);
  };
  const links = [
    { label: t("dashboard"), path: "/dashboard", icon: <DashboardIcon /> },
    { label: t("history"), path: "/history", icon: <HistoryIcon /> },
  ];

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ px: 2 }}>
        <BrandLogo />
        <IconButton
          aria-label="Close sidebar"
          onClick={() => setDesktopOpen(false)}
          sx={{ ml: "auto", display: { xs: "none", md: "inline-flex" } }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1.5, py: 2 }}>
        {links.map(({ label, path, icon }) => (
          <ListItemButton
            key={path}
            selected={location.pathname === path}
            onClick={() => {
              navigate(path);
              closeSidebar();
            }}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List sx={{ px: 1.5, py: 1.5 }}>
        <ListItemButton
          onClick={() => {
            changeLanguage(language === "en" ? "ta" : "en");
            closeSidebar();
          }}
          sx={{ borderRadius: 2, mb: 0.5 }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}><LanguageIcon /></ListItemIcon>
          <ListItemText primary={language === "en" ? "தமிழ்" : "English"} />
        </ListItemButton>
        <ListItemButton onClick={logout} sx={{ borderRadius: 2 }}>
          <ListItemIcon sx={{ minWidth: 40 }}><LogoutIcon /></ListItemIcon>
          <ListItemText primary={t("logout")} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      {desktopOpen && <Box component="nav" className="desktop-sidebar" sx={{ width: drawerWidth, flexShrink: 0 }}>
        <Drawer
          variant="permanent"
          open
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: 1,
              borderColor: "divider",
              bgcolor: "background.paper",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>}
      {!desktopOpen && (
        <IconButton
          aria-label="Open sidebar"
          onClick={() => setDesktopOpen(true)}
          className="desktop-sidebar-reopen"
          sx={{
            display: { xs: "none", md: "inline-flex" },
            position: "fixed",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            top: 12,
            left: 12,
            bgcolor: "background.paper",
            boxShadow: 2,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <AppBar position="fixed" className="mobile-sidebar-bar">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
            <MenuIcon />
          </IconButton>
          <Box sx={{ ml: 1 }}><BrandLogo /></Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "background.paper",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
