import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ListMenu from "./Menu";



function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowdata,
        rowDataSelected,
        setNumSelected, numberSelected,
        rowCount,
        onRequestSort,
    } = props;
   
    useEffect(() => {
        setNumSelected(numSelected)
        console.log(numberSelected, "numberSelected")
    }, [numSelected])

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all desserts",
                        }}
                    />
                </TableCell>
                {props.headCells?.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                    >
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

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
        >
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function LocationsTable({ locations_data, totalRows, setNumSelected, numberSelected, rowdata, headCells,
    rowDataSelected, setParams, localId, handleChangePage, handleChangeRowsPerPage, page, rowsPerPage, enablepagination, customOptions }) {


    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [dense, setDense] = React.useState(false);
    const [anchorEl1, setAnchorEl1] = React.useState(null);

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
                        background: "#E7F0FD"
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


    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ width: "100%" }}>
                    <Paper sx={{ width: "100%" }}>
                        <TableContainer sx={{ minHeight: "78vh" }}>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={dense ? "small" : "medium"}
                            >
                                <EnhancedTableHead
                                    headCells={headCells}
                                    setNumSelected={setNumSelected}
                                    numberSelected={numberSelected}
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    //  onSelectAllClick={handleSelectAllClick}
                                    //  onRequestSort={handleRequestSort}
                                    rowCount={locations_data && locations_data.length}
                                />
                                <TableBody>
                                    {
                                        locations_data && locations_data.length > 0 ? (
                                            locations_data.map((row, index) => {
                                                // const isItemSelected = isSelected(row.id);
                                                const labelId = `enhanced-table-checkbox-${index}`;
                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                       // aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.id}
                                                      //  selected={isItemSelected}
                                                      >
                                                        <>
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                onClick={(event) => {
                                                                    // setProductTemplateId(row.product_template_id);
                                                                     handleClick(event, row.id);
                                                                }}
                                                                color="primary"
                                                                // checked={isItemSelected}
                                                                inputProps={{
                                                                    "aria-labelledby": labelId,
                                                                }}
                                                                sx={{
                                                                    color: "#001661",
                                                                    padding: "5px!important",
                                                                }}
                                                            />
                                                            </TableCell>

                                                            {
                                                                headCells.map((keysdata, index) => {
                                                                    return (
                                                                        <>



                                                                            {keysdata['key'] === 'action' &&
                                                                                <TableCell>
                                                                                    <ListMenu customOptions={customOptions} id={row && row['id']}></ListMenu>
                                                                                </TableCell>
                                                                            }

                                                                            {keysdata['key'] !== "action" &&
                                                                                <>
                                                                                    {keysdata['key'] !== "action" &&
                                                                                        <TableCell>
                                                                                            {row && row[keysdata['key']]}
                                                                                        </TableCell>
                                                                                    }

                                                                                </>

                                                                            }
                                                                        </>

                                                                    )
                                                                })
                                                            }
                                                        </>

                                                    </TableRow>

                                                )
                                            })) : (
                                            <Box
                                                style={{
                                                    width: "max-content",
                                                }}
                                            >
                                                No data found
                                            </Box>
                                        )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {enablepagination &&
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                component="div"
                                count={totalRows}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        }
                    </Paper>
                </Box>
            </ThemeProvider>
        </>
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