import React, { useState } from "react";
//mui
import {
  styled,
  alpha,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  InputBase,
  MenuItem,
  Menu,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dropdown from "react-multilevel-dropdown";
import ReplayIcon from "@mui/icons-material/Replay";
import axios from "axios";
import fileDownload from "js-file-download";

import MatSelect from "./MatSelect";

export default function DynamicAppBar({
  dynamicAppBar,
  sortOptions,
  filterOptions,
  setFilterOptions,
  filterSearchItems,
  searchItems,
  searchOptions,
  searchType,
  setSearchType,
  buttons,
  download,
  download_link,
  leftText
}) {
  //search
  const [showSearchBox, setshowSearchBox] = useState(false);

  //sort
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  //view
  const isMenuOpen = Boolean(anchorEl);

  //filter
  const [filterMenu, setFilterMenu] = React.useState(null);
  const isFilterMenuOpen = Boolean(filterMenu);

  const handleSortMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  }; //filter

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  }; //view

  const handleFilterMenuOpen = event => {
    setFilterMenu(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenu(null);
    handleMenuClose();
    handleMobileMenuClose();
  };
  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {sortOptions.map(option => {
        if (option.subItems) {
          return (
            <Dropdown.Item>
              {option.label}
              <Box sx={{ flexGrow: 1 }} />
              <IconButton size="small" color="inherit">
                <KeyboardArrowRightIcon />
              </IconButton>
              <Dropdown.Submenu position="left">
                {option.subItems.map(subOption => (
                  <Dropdown.Item
                    onClick={() => {
                      option.func(subOption.key);
                    }}
                  >
                    {subOption.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Submenu>
            </Dropdown.Item>
          );
        } else {
          return (
            <Dropdown.Item onClick={option.func}>
              {option.label}
              <Box sx={{ flexGrow: 1 }} />
            </Dropdown.Item>
          );
        }
      })}
    </Menu>
  );

  const handleAccordianExpand = index => {
    const tempFilterOpts = [...filterOptions];
    tempFilterOpts.map((item, i) => {
      if (index !== i) {
        item.collapseState = false;
      }
    });
    tempFilterOpts[index].collapseState = !tempFilterOpts[index].collapseState;
    setFilterOptions(tempFilterOpts);
  };

  const handleClick = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then(res => {
        fileDownload(res.data, filename);
      });
  };

  const filterMenuId = "primary-search-account-menu-mobile";
  const renderFilterMenu = filterOptions => (
    <Menu
      anchorEl={filterMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={filterMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isFilterMenuOpen}
      onClose={handleFilterMenuClose}
    >
      {filterOptions.map((option, index) => {
        if (option.subMenu) {
          return (
            <Box>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ borderRadius: "0px" }}
                >
                  <IconButton size="large" color="inherit">
                    {option.icon}
                  </IconButton>
                  <Typography>{option.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Autocomplete
                    size="small"
                    disablePortal={false}
                    id="combo-box-demo"
                    options={option.subMenu}
                    onChange={(event, value) => {
                      console.log("onchange", event, value)
                      if (value == null) {
                        option.func("empty");
                      }
                      option.func(value && value.value);
                    }}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={`Search ${option.label.substring(0, 15)}...`}
                      />
                    )}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        }
        else if (option.label !== "Custom Filter") {
          return (
            <Box>
              <Accordion
                expanded={option.collapseState}
                onChange={() => handleAccordianExpand(index)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <IconButton size="large" color="inherit">
                    <FilterAltIcon />
                  </IconButton>
                  <Typography>{option.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    label="Search"
                    size="small"
                    onChange={event => {
                      const string = event.target.value;
                      filterSearchItems(string, option.value);
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        } else {
          return (
            <Box>
              <Accordion
                expanded={option.collapseState}
                onChange={() => handleAccordianExpand(index)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <IconButton size="large" color="inherit">
                    {option.icon}
                  </IconButton>
                  <Typography>{option.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    label="Search"
                    size="small"
                    onChange={event => {
                      const string = event.target.value;
                      filterSearchItems(string, option.value);
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        }
      })}
    </Menu>
  );

  //styling
  const theme = createTheme({
    components: {
      // Name of the component
      MuiPopover: {
        styleOverrides: {
          // Name of the slot
          paper: {
            // Some CSS
            overflow: "unset",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            paddingTop: "0px!important",
            paddingBottom: "0px!important",
            boxShadow: "0px 4px 8px rgb(0 0 0 / 10%)!important",
            backgroundColor: "#fff!important",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            padding: "8px",
            color: "#001661",
            ":hover": {
              backgroundColor: "rgba(239, 242, 254, 0.75)",
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          // Name of the slot
          content: {
            // Some CSS
            alignItems: "center",
            height: "20px",
            minHeight: "10px",
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            padding: "8px",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          // Name of the slot
          input: {
            // Some CSS
            marginTop: "4px",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          // Name of the slot
          list: {
            // Some CSS
            paddingTop: "0px",
            paddingBottom: "0px",
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            // borderBottomLeftRadius: "0px!important",
          },
        },
      },
    },
  });

  //render function
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar
          style={{
            minHeight: "60px",
            // marginBottom: "15px",
            // padding: "10px 8px",
            background: "#fff",
            borderBottom: "1px solid #B9B9B9",
            alignItems: "center",
          }}
        >

          {
            leftText ? (<>
            <div style={{ fontSize: "21px", fontWeight: "700px" }}>
              {leftText}
            </div>
            </>) : (<></>)
          }

          {dynamicAppBar.length === 0 ? (
            <>
              {buttons?.map(o => {
                if (o?.type == null)
                  return (
                    o?.flag === 1 && (
                      <Button
                        variant="contained"
                        className="btn_primary"
                        onClick={o?.handleButtonClick}
                        style={{ textTransform: "none", background: "#416BFF" }}
                      >
                        {o?.name}
                      </Button>
                    )
                  );
                else
                  return (
                    <div style={{ width: "200px" }}>
                      <MatSelect
                        data={o?.data}
                        value={o?.value}
                        onChange={o?.handleButtonClick}
                        placeholder="Select Level"
                      />
                    </div>
                  );
              })}
            </>
          ) : dynamicAppBar.length === 1 ? (
            <>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <ReplayIcon
                  onClick={e => searchItems("")}
                  sx={{ width: "32px", height: "32px", padding: "4px" }}
                />
              </IconButton>
            </>
          ) : dynamicAppBar.length > 1 ? (
            <>
              <Typography variant="h7" color={"orange"}>
                Bulk options currently not available!
              </Typography>
            </>
          ) : null}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Collapse orientation="horizontal" in={showSearchBox}>
                <Autocomplete
                  style={{ overflow: "hidden" }}
                  noOptionsText={""}
                  disableClearable={true}
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={searchOptions}
                  onChange={(e, value) => {
                    setSearchType(value ? value.value : "");
                  }}
                  sx={{ width: 300 }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Search"
                      onChange={event => {
                        const string = event.target.value.split(":")[1].trim();
                        searchItems(string);
                      }}
                    />
                  )}
                />
              </Collapse>

              {!showSearchBox
                ? searchItems && (
                  <SearchIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setshowSearchBox(true);
                    }}
                    sx={{ width: "32px", height: "32px", padding: "4px" }}
                  />
                )
                : searchItems && (
                  <CloseIcon
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    sx={{ width: "32px", height: "32px", padding: "4px" }}
                    onClick={() => {
                      setshowSearchBox(false);
                      searchItems("");
                    }}
                  />
                )}
            </Box>
            {filterOptions.length > 0 && (
              <IconButton
                size="large"
                color="inherit"
                onClick={handleFilterMenuOpen}
              >
                <FilterAltOutlinedIcon
                  sx={{ width: "32px", height: "32px", padding: "4px" }}
                />
              </IconButton>
            )}
            {sortOptions.length > 0 && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleSortMenuOpen}
                color="inherit"
              >
                <ImportExportIcon
                  sx={{ width: "32px", height: "32px", padding: "4px" }}
                />
              </IconButton>
            )}
            {download && (
              <a href={download_link}>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                // onClick={ ()=> handleClick (download_link,"")}
                >
                  <FileDownloadOutlinedIcon
                    sx={{ width: "32px", height: "32px", padding: "4px" }}
                  />
                </IconButton>
              </a>
            )}
          </Box>
        </Toolbar>
        <Box>{renderFilterMenu(filterOptions)}</Box>
        {renderMenu}
      </Box>
    </ThemeProvider>
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