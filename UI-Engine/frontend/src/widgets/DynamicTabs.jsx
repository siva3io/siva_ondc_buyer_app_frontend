import React, { useState, useEffect } from "react";
//mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";


export default function DynamicTabBar(props)
{
    const [value, setValue] = useState(props.bodys[0].value);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
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
      console.log(Array.isArray(props))
      if( Array.isArray(props.bodys) )
      {

    return(
        <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
            {  props.heads.map((tabs,i)=>{
              return (
              <Tab label={tabs.label} value={tabs.value} />
              )
            })
            }
              </TabList>
            </Box>
            <Box className="bundleViewContent">
            {props.bodys.map((data)=>{

              return(
              <TabPanel value={data.value}>
                {data.data}
              </TabPanel>

              )
            })
            }
            </Box>
          </TabContext>
    )
        }
        else{
            console.log(props,"asdfghj")
            return typeof(props)
        }
}

/*
 Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License v3.0 as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License v3.0 for more details.
 You should have received a copy of the GNU Lesser General Public License v3.0
 along with this program.  If not, see <https://www.gnu.org/licenses/lgpl-3.0.html/>.
*/