import React, { useEffect } from "react";
//mui
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 48;

export default function ListMenu({ customOptions, id, row }) {
  console.log(customOptions, "Customoption");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (row?.status?.lookup_code == "CANCELLED") {
    customOptions = customOptions.filter((o) => o?.label != "Cancel");
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon style={{ color: "#416BFF" }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 4.5,
            height: "fitContent",
            width: "20ch",
          },
        }}
        closeAfterTransition
      >
        {customOptions.map(
          (option) =>
            option?.flag === 1 && (
              <MenuItem
                key={option.label}
                selected={option === "Pyxis"}
                onClick={() => {
                  if (
                    option.label == "View Product" ||
                    option.label == "Edit Product Template" ||
                    option.label == "Edit Product Variant"
                  ) {
                    option.func(row?.product_template_id,row);
                  } else {
                    option.func(row?.id,row);
                  }
                  handleClose();
                }}
              >
                {option.label}
              </MenuItem>
            )
        )}
      </Menu>
    </div>
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