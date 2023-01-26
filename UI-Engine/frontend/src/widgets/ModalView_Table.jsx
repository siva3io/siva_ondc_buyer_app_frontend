import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import RemoteDynamicTable from './DynamicTable';
import "./table.css";

const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAllign: "center",
    padding: "36px",
    position: "absolute",
    justifyContent:"center", 
    background: "#FFFFFF",  
    borderRadius: "8px", 
    top: "17%",
    left: "21%", "borderColor":"initial"
};

const actionStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "24px",
    margin: "auto",
};

export default function ModalView_Table({  
    handleModalClose,
    modalOpen, 
    header,
    headCells,
    table_data, 
    customOptions,
    setCustomOptions,
    info,
    setParams,
    handleChangeDyanmicAppBar,
    setId,
    IsBouttonShow, 
    ButtonName,
    handleButtonClick,
    handelSelectonChange, 
}) {

// const headCells = [
// {
//     key: "sales_order_number",
//     numeric: true,
//     label: "sales order number",
//     type: "text"
// },
// {
//     key: "reference_number", 
//     numeric: true,
//     label: "reference number",
//     type: "text"
// },    
// ];
// const table_data = [
//     {  
//         "id":"1",
//         "sales_order_number": "SSO/2246", 
//         "reference_number": "Ref75/2246", 
//     },
//     { "id":"2",
//         "sales_order_number": "SSO/2222",  
//         "reference_number": "Ref77",  
//     },    
// ];
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalOpen}
                onClose={handleModalClose}
                closeAfterTransition 
            >
                <Fade in={modalOpen}>
                    <Box sx={style}>
                        <Box style={{
                                float: "right",
                                position: "absolute",
                                right: "20px",
                                top: "20px", cursor:"pointer"
                            }}>
                            <CloseIcon onClick={handleModalClose} />
                        </Box>                       
                        { 
                         <>
                            <div className="locationDetailsMain">
                                <div className="locationDetailForm">
                                    <div className="staticFormCard">
                                        <div className="staticFormCardTitle" style={{marginBottom:20}}>{header}                                       
                                        </div>
                                        <div className="ViewBoxBody scroll-table-container">                                        
                                             <RemoteDynamicTable
                                                table_data={table_data}
                                                headCells={headCells}   
                                                customOptions={customOptions}
                                                setCustomOptions={setCustomOptions}
                                                info={info}
                                                setParams={setParams}
                                                handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                                                setId={setId}
                                                enablepagination={true}
                                                IsCheckBoxShow={false}
                                                handelSelectonChange={handelSelectonChange}
                                            /> 
                                        </div>
                                        <div style={{display:"flex", justifyContent:"flex-end", width:"100%", backgroundColor:"rgb(255, 255, 255)", borderRadius:8, padding:"12px 18px"}}>
                                            { 
                                            IsBouttonShow &&
                                            <input type="button" value={ButtonName} onClick={(e) => { handleButtonClick(ButtonName); }} className="btn_primary" style={{float:"right", width:"15%"}}/>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>

                        }
                        
                    </Box>
                    {/* Ation buttons */}
                </Fade>
            </Modal>
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