import React, { useEffect, useState, Suspense } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tickets from "./Tickets";
import Faq from "./Faq";

import { useDispatch, useSelector } from "react-redux";
import { loadIssuesList } from "../redux/Action/action";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Support = () => {
  const topBar = new CustomEvent("topBar", {
    detail: {
      bar: true,
      route: "support",
      search: false,
    },
  });
  document.dispatchEvent(topBar);

  let dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    dispatch(loadIssuesList());
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#F5F5F5", paddingTop: "16px" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          marginTop: "76px",
          backgroundColor: "white",
          marginLeft: "16px",
          marginRight: "16px",
          borderRadius: "10px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Tickets" {...a11yProps(0)} />
          <Tab label="FAQs" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Tickets />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Faq />
      </TabPanel>
    </Box>
  );
};

export default Support;



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