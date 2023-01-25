import React, { useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Typography, Autocomplete, TextField, Chip } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MatSelect(props) {
  let selectOptions = props.data ? props.data : [];
  console.log(selectOptions, "optionsss", props);

  const theme = createTheme({
    components: {
      // Name of the component
      MuiFormControl: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            // overflow: "unset",
            margin: "0px",
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
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px",
          width: "100%",
          // margin: "8px 0px",
        }}
      >
        {props.label && (
          <Box className="labelWrap">
            <Typography sx={{ color: "black" }}>{props.label} </Typography>
            {props.required ? <p className="product_required_mark">*</p> : null}
          </Box>
        )}

        <Box style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <FormControl sx={{ width: "100%" }}>
            <Stack spacing={1} sx={{ width: "100%" }}>
              <Autocomplete
                disableCloseOnSelect
                multiple
                size="small"
                id="tags-outlined"
                options={selectOptions}
                getOptionLabel={(option) => option.label}
                // defaultValue={[top100Films[1]]}
                onChange={props.onChange}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`Search ${props.label ?? ""}`}
                  />
                )}
              />
            </Stack>
          </FormControl>
        </Box>
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