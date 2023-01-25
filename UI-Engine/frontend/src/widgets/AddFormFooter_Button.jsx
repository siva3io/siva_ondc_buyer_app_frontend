import * as React from 'react';
import { Button } from "@mui/material";
import "./ViewBox.css";

export default function AddFormFooter_Button({ handleButtonClick, saveDraft, buttonLabel }) {
    return (
        <>
            <div className="locationDetailsMain" style={{ overflow: "hidden", width: "96.4%" }}>

                <Button variant="contained" className="btn_primary" onClick={(e) => { handleButtonClick("Save_Send"); }}
                    style={{ textTransform: "none", borderColor: "#ccc", float: 'right', marginLeft: 10, backgroundColor: "#416BFF", color: "#fff" }}>
                    {buttonLabel != undefined ? buttonLabel : "Save & Send"}
                </Button>

                {saveDraft == 'true' && (
                    <Button variant="contained" className="btn_primary" onClick={(e) => { handleButtonClick("Save_Draft"); }}
                        style={{ textTransform: "none", borderColor: "#ccc", float: 'right', marginLeft: 10, backgroundColor: "#fff", color: "#416BFF" }}>
                        Save Draft
                    </Button>
                )}

                <Button variant="contained" className="btn_primary" onClick={(e) => { handleButtonClick("Cancel"); }}
                    style={{ textTransform: "none", borderColor: "#ccc", float: 'right', marginLeft: 10, backgroundColor: "#fff", color: "#416BFF" }}>
                    Cancel
                </Button>

            </div>
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