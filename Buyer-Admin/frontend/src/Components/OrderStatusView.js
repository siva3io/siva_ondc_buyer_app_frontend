import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Tab } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import OrderDetails from "./tab-data/OrderDetails";
import { loadOrderStatusData, loadSalesDataById } from "../redux/action";
import OrderDetails from "./OrderDetails";

function OrderStatusView(props) {
  const location = useLocation();
  const Id = props?.id;
  const [value, setValue] = React.useState("1");
  const [params, setParams] = useState({
    limit: 1000,
    offset: 1,
    filters: null,
    sort: null,
  });

  // userType.find(o => o.lookup_code === "BAP_ADMIN").id

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let dispatch = useDispatch();
  const { salesdata, orderstatusdata } = useSelector(state => state.data);
  useEffect(() => {
    dispatch(loadOrderStatusData(params));
    dispatch(loadSalesDataById(Id));
  }, []);
  let ordersdatanew = orderstatusdata.find(o => o.id === Id);

  //styling
  const theme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          scroller: {
            background: "#fff",
          },
        },
      },
      MuiTabPanel: {
        styleOverrides: {
          root: {
            padding: "0px",
          },
        },
      },
    },
  });

  //render function
  return (
    // console.log("salesdata data 33", salesdata) ||
    <ThemeProvider theme={theme}>
      {salesdata && (
        <Box sx={{ background: "#F9F9F9", padding: "8px", minHeight: "100vh" }}>
          <Box
            className="bundleViewHeader"
            sx={{
              background: "#fff",
              p: 2,
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          >
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                props?.setOrderStatusViewId("");
              }}
            >
              {" "}
              Back
            </span>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "33px" }} fontFamily={"Poppins"}>
                {ordersdatanew?.id}
              </Typography>
              <IconButton>
                <MoreVertOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <TabList onChange={handleChange}>
                <Tab label="Order Details" value="1" />
              </TabList>
            </Box>
            <Box className="bundleViewContent">
              <TabPanel value="1">
                <OrderDetails data={ordersdatanew} edit={true} />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      )}
    </ThemeProvider>
  );
}

export default OrderStatusView;

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
