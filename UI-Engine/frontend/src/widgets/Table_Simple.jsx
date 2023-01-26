import React, { useState } from "react";
import ListMenu from "./Menu";
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


function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    //onRequestSort,
  } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

  return (
    <TableHead style={{backgroundColor:"#e7f0fd"}}>
      <TableRow>       
        {props.headCells?.map((headCell) => (
          <TableCell key={headCell.id}>
            {headCell.label}
          </TableCell>
        ))} 
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  //onRequestSort: PropTypes.func.isRequired,
  //onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function Table_Simple({
  table_data,
  customOptions,  
  headCells, 
  handelEstimated_Cost_RadionButtononChange
}) {

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]); 
  const [dense, setDense] = React.useState(false); 
 
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
 
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

  //render functions
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%" }}>
          <TableContainer class="table-responsive"
        //   sx={{ minHeight: "20vh" }}
          >
            <Table className="table"
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                headCells={headCells}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}               
                rowCount={table_data && table_data.length}
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
                        selected={isItemSelected}> 
                        {
                          headCells.map((keysdata, index) => {
                            return (
                              <>
                                {keysdata['type'] === 'action' &&
                                  <TableCell>
                                    <ListMenu
                                      customOptions={customOptions}
                                      id={row.id}                                     
                                    />
                                  </TableCell>
                                }
                                {keysdata['type'] === "text" &&
                                  <>
                                    <TableCell>
                                      {
                                        keysdata['count'] ?
                                          row && (row[keysdata["key"].split(".")[0]]?.[keysdata["key"].split(".")[1]]) : row[keysdata["key"]]
                                      }
                                    </TableCell>
                                  </>
                                }
                                {keysdata['type'] === "date" &&
                                  <>
                                    <TableCell>
                                      {row && (row[keysdata["key"]]) && datePipe(row[keysdata["key"]])}
                                    </TableCell>

                                  </>
                                }
                                 {keysdata['type'] === "radio" &&
                                  <>
                                    <TableCell>
                                      <input type="radio" name="rdb" onClick={(e) => { handelEstimated_Cost_RadionButtononChange(row && (row[keysdata["key"]])) }}></input>
                                    </TableCell>

                                  </>
                                }
                              </>
                            )
                          })
                        }

                      </TableRow>
                    );
                  })
                ) : (
                  <Box className="nodata_text_list">No data found</Box>
                )
                }

              </TableBody>
            </Table>
          </TableContainer>           
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