import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./ViewBox.css";

export default function BasicButton({ type, text, width, onClick }) {
  return (
    <>
     <div className="locationDetailsMain" style={{ overflow: "hidden", width: "96.5%" }}>
      <Button className="btn_primary"
        style={{ width: width, textTransform: "none", borderColor: "#ccc", float: 'right', marginLeft: 10, backgroundColor: "#416BFF", color: "#fff"}}         
        onClick={(e) => { onClick(text); }}
        variant={type}
      >
        {text}
      </Button>
      </div>
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