import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import "./matInput.css";

const MatFileUpload = (props) => {
  const [filename, setFilename] = useState("");
  const [focused, setFocused] = useState(false);
  const { label, FileName, FileAccept, FileMsg, errorMessage, onChange, id, disabled, ...FileProps } = props;

  return ( 
    <Box className="input_main_wrapper">
      <Box
        className="inputWrapper"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px",
          width: "97%",
          margin: "24px 0px",
        }}
      >
        <Box
          className="labelWrap"
          style={{ display: props?.label === "" && "none" }}
        >
          <Typography
            htmlFor={props?.label?.toLowerCase()?.split(" ")?.join("_")}
            className={props.disabled_y ? "label_disabled" : "label"}
            sx={{ color: "black" }}
          >
            {props?.label}{" "}
            {props.required ? <p className="product_required_mark">*</p> : null}
          </Typography>
        </Box>
        <Box className="input_wrap"> 
        <Button
        component="label"
        variant="outlined" className="btn_primary" 
        startIcon={<UploadFileIcon />}
        sx={{ marginRight: "1rem" }}>
        <span style={{textTransform:"capitalize"}}> {FileName} </span>
        <input type="file" accept={FileAccept} hidden onChange={onChange} />
        </Button>
         
        <Box style={{fontSize:14, color:"rgb(131 131 131)"}}>{FileMsg}</Box>

        </Box>
      </Box>
    </Box>
  );
};

export default MatFileUpload;
 
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