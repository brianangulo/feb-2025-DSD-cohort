import DashboardIcon from "@mui/icons-material/Dashboard";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ReportIcon from "@mui/icons-material/Report";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Divider, Drawer, IconButton, List } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";

//fully expanded sidebar width
const DRAWER_WIDTH = 240;

const SideNavigation = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("details")) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [location]);

  const handleExpandCollapse = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? DRAWER_WIDTH : 64,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? DRAWER_WIDTH : 64,
          overflowX: "hidden",
          transition: "width 0.3s",
          boxShadow: "2px 5px 10px #4527a0",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "flex-end" : "center",
          p: 1,
        }}
      >
        <IconButton onClick={handleExpandCollapse}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        <NavItem
          to="/dashboard"
          text="Dashboard"
          icon={<DashboardIcon sx={{ color: "#4527a0" }} />}
          open={open}
        />
        <NavItem
          to="/access-control"
          text="Access Control"
          icon={<LockIcon sx={{ color: "#4527a0" }} />}
          open={open}
        />
        <NavItem
          to="/complaints"
          text="Complaints"
          icon={<ReportIcon sx={{ color: "#4527a0" }} />}
          open={open}
        />
        <NavItem
          to="/settings"
          text="Account Settings"
          icon={<SettingsIcon sx={{ color: "#4527a0" }} />}
          open={open}
        />
      </List>
      <Divider />
      <List>
        <NavItem
          to="/logout"
          text="Log out"
          icon={<LogoutIcon sx={{ color: "#CA3433" }} />}
          open={open}
        />
      </List>
    </Drawer>
  );
};

export default SideNavigation;
