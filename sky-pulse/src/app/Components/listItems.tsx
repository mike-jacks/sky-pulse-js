import DashboardIcon from "@mui/icons-material/Dashboard";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component="a" href="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component="a" href="/About">
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItemButton>
    <ListItemButton component="a" href="/FAQ">
      <ListItemIcon>
        <HelpOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="FAQ" />
    </ListItemButton>
    <ListItemButton component="a" href="/Contact">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Contact Me" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (handleLogout: React.MouseEventHandler<HTMLAnchorElement>) => (
  <React.Fragment>
    <ListItemButton component="a" href="#" onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);
