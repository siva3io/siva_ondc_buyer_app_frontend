import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import OrderStatus from "../Components/OrderStatus";
import PayoutDetail from "../Components/PayoutDetail";
import { useNavigate } from "react-router-dom";
import "./BAPDashboardTabs.css";

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
        <div sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </div>
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

const BAPDashboardTabs = ({ tabValue }) => {
  const [value, setValue] = React.useState(tabValue);
  const history = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event, tabPath) => {
    history(`${tabPath}`);
  };

  return (
    <>
      <div className="BAP_DashboardTabs">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Order status"
            {...a11yProps(0)}
            onClick={e => {
              handleClick(e, "/baporderStatus");
            }}
          />
          <Tab
            label="Payout detail"
            {...a11yProps(1)}
            onClick={e => {
              handleClick(e, "/payoutDetail");
            }}
          />
          <Tab
            label="Customer support"
            {...a11yProps(2)}
            onClick={e => {
              handleClick(e, "/bapcustomerSupport");
            }}
          />
        </Tabs>
      </div>
      <div className="BAP_DashboardTabpanels">
        <TabPanel value={value} index={0}>
          <OrderStatus />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PayoutDetail />
        </TabPanel>
      </div>
    </>
  );
};

export default BAPDashboardTabs;
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
