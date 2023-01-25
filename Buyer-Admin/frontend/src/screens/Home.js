import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import Signin from "./Signin";

const AdminDashboard = React.lazy(() => import("../screens/AdminDashboard"));
const OrderStatus = React.lazy(() => import("../Components/OrderStatus"));
const PayoutDetail = React.lazy(() => import("../Components/PayoutDetail"));
const OrderStatusView = React.lazy(() =>
  import("../Components/OrderStatusView")
);

var customWidth = "96.5vw";
const drawerWidth = 240;

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = theme => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [render, setRender] = React.useState(1);
  const [orderStatusViewId, setOrderStatusViewId] = React.useState("");
  const [isSignin, setIsSignIn] = React.useState(false);

  const sideNav = [
    {
      label: "Dashboard",
      icon: "https://dev-api.eunimart.com//files/icons/Dashboard.svg",
      value: 1,
    },
    {
      label: "Order Status",
      icon: "https://dev-api.eunimart.com//files/icons/orderStatus.svg",
      value: 2,
    },
    {
      label: "Payout Detail",
      icon: "https://dev-api.eunimart.com//files/icons/payoutDetails.svg",
      value: 3,
    },
  ];

  React.useEffect(() => {
    if (localStorage.getItem("user_data")) {
      setIsSignIn(true);
    }
  }, []);

  const handleDrawerOpen = () => {
    customWidth = "85vw";
    setOpen(true);
  };

  const handleDrawerClose = () => {
    customWidth = "96.5vw";
    setOpen(false);
  };

  return (
    <>
      {isSignin ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              {!open ? (
                <>
                  <IconButton onClick={handleDrawerOpen}>
                    <MenuIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? (
                      <ChevronRightIcon />
                    ) : (
                      <ChevronLeftIcon />
                    )}
                  </IconButton>
                </>
              )}
            </DrawerHeader>
            <Divider />
            <List>
              {sideNav.map((text, index) => (
                <ListItem
                  onClick={() => {
                    setRender(text?.value);
                  }}
                  key={text?.label}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <img src={text?.icon} />
                    </ListItemIcon>
                    <ListItemText
                      primary={text?.label}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <div style={{ width: customWidth }}>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Box
                style={{
                  width: "100%",
                  borderBottom: "1px solid grey",
                  background: "#ffffff",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  padding: "auto 10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                  width="100px"
                  height="50px"
                  style={{ marginLeft: "25px" }}
                />
                <LogoutIcon
                  onClick={() => {
                    localStorage.clear();
                    setIsSignIn(false);
                  }}
                  style={{
                    marginRight: "25px",
                    height: "50px",
                    width: "35px",
                    cursor: "pointer",
                  }}
                />
              </Box>
              {render == 1 ? (
                <>
                  <AdminDashboard />
                </>
              ) : render == 2 ? (
                <>
                  {orderStatusViewId?.length > 0 ? (
                    <OrderStatusView
                      id={orderStatusViewId}
                      setOrderStatusViewId={setOrderStatusViewId}
                    />
                  ) : (
                    <OrderStatus setOrderStatusViewId={setOrderStatusViewId} />
                  )}
                </>
              ) : render == 3 ? (
                <>
                  <PayoutDetail />
                </>
              ) : (
                <></>
              )}
            </React.Suspense>
          </div>
        </Box>
      ) : (
        <Signin setIsSignIn={setIsSignIn} />
      )}
    </>
  );
}
/*
 Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
