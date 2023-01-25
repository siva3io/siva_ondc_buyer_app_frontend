import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
//import { fetchIstData } from "../../redux/Action/FetchIstDataAction";
//import { deleteIstbyId } from "../../redux/Action/DeleteIstByIdAction";


export default function Tag({
    badgeColor,
    badgeContent,
    size
}) {
    return (




        <Box
            style={{
                alignItems: "center",
                display: "flex",
                fontSize: "12px"

            }}
        >
            <Box style={{
                background: `${badgeColor}`,
                padding: size=="small"?"4px 8px":"6px 10px",
                borderRadius: "4px",

            }}>
                <p style={{

                    color: " rgb(255, 255, 255)",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    letterSpacing: "0.4px",
                    lineHeight: "14px",
                    margin: "0px",
                    textAlign: "center",



                }}>{badgeContent}</p>
            </Box>
        </Box>








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