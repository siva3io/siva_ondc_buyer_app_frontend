import React, { useState } from "react";
import { Box, TextField, Typography, TextareaAutosize } from "@mui/material";
import "./matInput.css";

const MatTextArea = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

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
          <Typography
            htmlFor={props.label.toLowerCase().split(" ").join("_")}
            className={props.disabled_y ? "label_disabled" : "label"}
            sx={{ color: "black" }}
          >
            {props.label}{" "}
            {props.required ? <p className="product_required_mark">*</p> : null}
          </Typography>
        </Box>
        <Box className="input_wrap">
            <TextareaAutosize className="clstextarea"
                id="standard-name" minRows={props.rows}
                onChange={onChange}
                value={props.value}
                placeholder={props.placeholder}
                style={{ width: "90%" }}/> 
        </Box>
      </Box>
    </Box>
  );
};

export default MatTextArea;


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