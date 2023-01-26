import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import {
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  Switch,
} from "@mui/material";
import moment from "moment";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandTable from "./ExpandTable";

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    IsCheckBoxShow,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead style={{ backgroundColor: "#e7f0fd" }}>
      <TableRow>
        {IsCheckBoxShow && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
              sx={{ color: "#001661", padding: "0px 6px" }}
            />
          </TableCell>
        )}
        {props.headCells?.map(headCell => (
          <TableCell key={headCell.id} style={{ whiteSpace: "nowrap" }}>
            {/* <div style={{ display: "flex", alignItems: "center" }}>
              {headCell.label}
              {headCell?.icon ? headCell?.icon : ""}
            </div> */}
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function DynamicTable({
  table_data,
  info,
  setParams,
  customOptions,
  setCustomOptions,
  handleChangeDyanmicAppBar,
  setId,
  headCells,
  enablepagination,
  IsCheckBoxShow = true,
  handelSelectonChange,
  differentId,
  userType,
  setTicketViewId,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(info?.page_no - 1);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const history = useNavigate();
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = table_data.map(n => n.id);
      handleChangeDyanmicAppBar(newSelecteds);
      setSelected(newSelecteds);
      return;
    }
    handleChangeDyanmicAppBar([]);
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    handleChangeDyanmicAppBar(newSelected);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setParams({
      limit: Number(info?.per_page),
      offset: Number(newPage + 1),
    });
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setParams({
      limit: Number(parseInt(event.target.value, 10)),
      offset: 0,
    });
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const datePipe = dateString => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const timeFormat = timeString => {
    return moment(timeString).format("hh:mm A");
  };

  function getJsonDataByKey(data, key) {
    if (!key.includes(".")) return data[key];
    var p = key.split(".")[0];
    var ndata = data[p];
    if (!ndata) return;
    var newkey = key
      .split(".")
      .filter((o, i) => i != 0)
      .join(".");
    return getJsonDataByKey(ndata, newkey);
  }

  //styling
  const theme = createTheme({
    components: {
      // Name of the component
      MuiTableCell: {
        styleOverrides: {
          root: {
            textAlign: "center",
            padding: "8px",
          },
          // Name of the slot
          head: {
            // Some CSS
            // overflow: "unset",
            fontSize: " 14px",
            fontFamily: "Poppins",
            color: "#001661",
            padding: "8px",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            // fontFamily: "Poppins",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            width: "100%!important",
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            width: "100%!important",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: "Poppins",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#416BFF",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
          },
        },
      },
      MuiTableRow: {
        // styleOverrides: {
        hover: {
          backgroundColor: "green",
        },
        // },
      },
    },
  });
  const handleselected = (index, issue_id) => {
    console.log("selected", index);
    setTicketViewId(issue_id);
    // history(`/bapcustomerSupport/viewTickets/${issue_id}`);
  };

  //render functions
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%" }}>
          <TableContainer sx={{ minHeight: "0vh" }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                headCells={headCells}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={table_data && table_data.length}
                IsCheckBoxShow={IsCheckBoxShow}
              />
              <TableBody>
                {table_data && table_data.length > 0 ? (
                  table_data.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        onClick={() => {
                          handleselected(index, row?.issue_id_crm_bap);
                        }}
                        style={{ cursor: userType ? "pointer" : "" }}
                      >
                        {IsCheckBoxShow && (
                          <TableCell padding="checkbox">
                            <Checkbox
                              onClick={event => {
                                setId(row.id);
                                handleClick(event, row.id);
                              }}
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              sx={{
                                color: "#001661",
                                padding: "5px!important",
                              }}
                            />
                          </TableCell>
                        )}
                        {headCells.map((keysdata, index) => {
                          return (
                            <>
                              {keysdata["type"] === "text" && (
                                <>
                                  <TableCell>
                                    {getJsonDataByKey(row, keysdata["key"])}
                                  </TableCell>
                                </>
                              )}

                              {keysdata["type"] === "date" && (
                                <>
                                  <TableCell>
                                    {row &&
                                      row[keysdata["key"]] &&
                                      datePipe(row[keysdata["key"]])}
                                  </TableCell>
                                </>
                              )}
                              {keysdata["type"] === "time" && (
                                <>
                                  <TableCell>
                                    {row &&
                                      row[keysdata["key"]] &&
                                      timeFormat(row[keysdata["key"]])}
                                  </TableCell>
                                </>
                              )}

                              {keysdata["type"] === "radio" && (
                                <>
                                  <TableCell>
                                    <input
                                      type="radio"
                                      name="rdb"
                                      onClick={e => {
                                        handelSelectonChange(
                                          keysdata["key"],
                                          row[keysdata["key"]]
                                        );
                                      }}
                                    ></input>
                                  </TableCell>
                                </>
                              )}

                              {keysdata["type"] === "status" && (
                                <>
                                  <TableCell>
                                    <span
                                      style={{
                                        color: "white",
                                        fontSize: "12px important",

                                        background:
                                          getJsonDataByKey(
                                            row,
                                            keysdata["key"]
                                          )?.toLowerCase() == "open" ||
                                          getJsonDataByKey(
                                            row,
                                            keysdata["key"]
                                          )?.toLowerCase() == "need more info"
                                            ? "#72AB3A"
                                            : getJsonDataByKey(
                                                row,
                                                keysdata["key"]
                                              )?.toLowerCase() == "close" ||
                                              getJsonDataByKey(
                                                row,
                                                keysdata["key"]
                                              )?.toLowerCase() == "resolve"
                                            ? "#FD7789"
                                            : getJsonDataByKey(
                                                row,
                                                keysdata["key"]
                                              )?.toLowerCase() == "escalated"
                                            ? "#1273de"
                                            : "",
                                        padding: "6px 8px",
                                        borderRadius: "25px",
                                      }}
                                      className="border_status"
                                    >
                                      {getJsonDataByKey(row, keysdata["key"])}
                                    </span>
                                  </TableCell>
                                </>
                              )}

                              {keysdata["type"] === "expand" && (
                                <>
                                  <TableCell>
                                    <ExpandMoreIcon />
                                  </TableCell>
                                </>
                              )}
                            </>
                          );
                        })}
                      </TableRow>
                    );
                  })
                ) : (
                  <Box className="nodata_text_list">No data found</Box>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {enablepagination && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={info?.total_rows}
              rowsPerPage={info?.per_page}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
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
