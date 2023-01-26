import React, { useState } from "react";
import LabeledText from './LabeledText';
import "./ViewBox.css";
import Table_Simple from './Table_Simple';

export default function ViewBox({header, headCells, table_data, IsBouttonShow, ButtonName, handleButtonClick, handelEstimated_Cost_RadionButtononChange}) {
    
//  const headCells = [
//   {
//     key: "sales_order_number",
//     numeric: true,
//     label: "sales order number",
//     type: "text"
//   },
//   {
//     key: "reference_number", 
//     numeric: true,
//     label: "reference number",
//     type: "text"
//   },  
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
        <>
            <div className="locationDetailsMain">
                <div className="locationDetailForm">
                    <div className="staticFormCard">
                        <div className="staticFormCardTitle">{header}
                        { IsBouttonShow &&
                         <input type="button" value={ButtonName} onClick={(e) => { handleButtonClick(ButtonName); }} className="btn_primary" style={{float:"right", width:"7%"}}/>
                        }
                        </div>
                        <div className="ViewBoxBody">
                        <Table_Simple
                            table_data={table_data}
                            headCells={headCells}  
                            handelEstimated_Cost_RadionButtononChange = {handelEstimated_Cost_RadionButtononChange} 
                            />
                        </div>
                    </div>
                </div>
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