import React from "react";
import "./LabeledText.css";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TextField from "@mui/material/TextField";
import { Box, Link  } from "@mui/material";
import Typography from "@mui/material/Typography";

const ViewBox_File_Download = (props) => { 
  return (
    <Box className="labeledTextWrapper">
      <Box className={props.card ? "labelWrap_card" : "labelWrap"}>
        <Typography
          htmlFor={props.label.toLowerCase().split(" ").join("_")}
          className={props.disabled_y ? "commonlabel_disabled" : "Commonlabel"}
        >
          {props.label}
        </Typography>
      </Box>
      
      <Link download={props?.label?.toLowerCase()?.split(" ")?.join("_") + '.'+ props?.data_type?.split("/")?.pop()} href={'data:application/octet-stream;base64,'+ props.text}>
        <FileDownloadIcon/>
      </Link>
      
    </Box>
  );
};

export default ViewBox_File_Download;


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