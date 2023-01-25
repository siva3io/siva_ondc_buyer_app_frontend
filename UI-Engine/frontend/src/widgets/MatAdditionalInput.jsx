import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import "./matInput.css";

const MatAdditionalInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, disabled, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <Box className="input_main_wrapper">
      <Box
        className="inputWrapper"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px",
          width: "100%",
          margin: "8px 0px",
        }}
      >
        <Box
          className="labelWrap"
          style={{ display: props.label === "" && "none" }}
        >
          {/* <Typography
            htmlFor={props.label.toLowerCase().split(" ").join("_")}
            className={props.disabled_y ? "label_disabled" : "label"}
            sx={{ color: "black" }}
          >
            {props.label}{" "}
            {props.required ? <p className="product_required_mark">*</p> : null}
          </Typography> */}
          <TextField
            // sx={{ padding: "6.5px 0px" }}
            disabled={disabled}
            id="standard-name"
            // onChange={onChange}
            onChange={(event) => onChange(event, props.labelkey)}
            // onChange = {onweChange(props.label, props.labelvalue)}
            helperText={focused ? errorMessage : ""}
            placeholder={props.labelplaceholder}
            error={focused && errorMessage}
            {...inputProps}
            min={props && props.min}
            type={props.type ? props.type : "text"}
            autoComplete="off"
            onFocus={() =>
              inputProps.name === "confirmPassword" && setFocused(true)
            }
            onBlur={handleFocus}
            size="small"
            onInput={(e) => {
              if (props.type === "number") {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 12);
              }
              if (e.target.value.length === 0) {
                setFocused(true);
              }
            }}
          />
        </Box>
        <Box className="input_wrap">
          <TextField
            disabled={disabled}
            id="standard-name"
            // onChange={onChange}
            onChange={(event) => onChange(event, props.fieldkey)}
            helperText={focused ? errorMessage : ""}
            error={focused && errorMessage}
            {...inputProps}
            min={props && props.min}
            placeholder={props.fieldplaceholder}
            type={props.type ? props.type : "text"}
            autoComplete="off"
            onFocus={() =>
              inputProps.name === "confirmPassword" && setFocused(true)
            }
            onBlur={handleFocus}
            size="small"
            onInput={(e) => {
              if (props.type === "number") {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 12);
              }
              if (e.target.value.length === 0) {
                setFocused(true);
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MatAdditionalInput;

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
