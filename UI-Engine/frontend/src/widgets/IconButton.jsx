import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function IconButton({ type, icon, iconPosition ,name, callingFunction}) {
    return (
        <>
            {
                iconPosition == "left" && (
                    <Button variant={type} startIcon={icon} onClick={callingFunction} className="btn_primary"
                    style={{ textTransform: "none", background: "#416BFF" }}>
                        {name}
                    </Button>
                )
            }

            {
                iconPosition == "right" && (
                    <Button variant={type} endIcon={icon} onClick={callingFunction} className="btn_primary"
                    style={{ textTransform: "none", background: "#416BFF" }}>
                        {name}
                    </Button>
                )
            }

{
                iconPosition != "right" && iconPosition != "left" &&(
                    <Button variant={type}  onClick={callingFunction} className="btn_primary"
                    style={{ textTransform: "none", background: "#416BFF" }}>
                        {name}
                    </Button>
                )
            }

        </>
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