import { Button } from '@mui/material';
import React from 'react'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
export default function FileDownload({
    label, value, name
}) {
    console.log(label, value, name)

    const handleDownload =() =>{
    // var FileSaver = require('file-saver');
    // var blob = new Blob(value?.data, {type: "text/plain;charset=utf-8"});
    // FileSaver.saveAs(blob, "hello world.txt");

    const linkSource = `data:${value?.type};base64,${value?.data}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = value?.name;
  downloadLink.click();
    }


    return (
        <>
        <div style={{width:"100%",display:"flex"}}>

            <div style={{width:"40%"}}>{label}</div>
            <Button
                                        variant="contained"
                                        startIcon={<CloudDownloadIcon />}
                                        onClick={() => { console.log("download",value);handleDownload() }}
                                        style={{ textTransform: "none", background: "#416BFF",width:"40%" }}
                                        >
                                        Download
                                    </Button>
                                        </div>
        </>
    )
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