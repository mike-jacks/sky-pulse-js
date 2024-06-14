import DashboardIcon from "@mui/icons-material/Dashboard";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import Link from "next/link";

export const mainListItems = (
  <React.Fragment>
    <Link href="/" passHref>
      <ListItemButton component="a">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>
    <Link href="/About" passHref>
      <ListItemButton component="a">
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItemButton>
    </Link>
    <Link href="/FAQ" passHref>
      <ListItemButton component="a">
        <ListItemIcon>
          <HelpOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="FAQ" />
      </ListItemButton>
    </Link>
    <Link href="/Contact" passHref>
      <ListItemButton component="a">
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Contact Me" />
      </ListItemButton>
    </Link>
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
