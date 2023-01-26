import React,{useState} from "react";
import Select from './MatSelect';
import Input from './MatInput';
import Label from './LabeledText';
import {
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  Switch,
} from "@mui/material";

import "../index.css";

export default function AddForm_Table({
  header,
  table_data=[],
  headCells=[{
    key: "product_SKU", 
    label: "Product SKU",
    type: "select"
  }],
  handelInputChange,
  renderFooter=()=> <div>footer</div>
}) {
    return (
      <div className="locationDetailsMain">
      <div className="locationDetailForm">
          <div className="staticFormCard">
              <div className="staticFormCardTitle">{header}</div>
              <div className="ViewBoxBody">      
                <Table>
                  <TableHead>
                    <TableRow>
                    {headCells?.map((headCell) => (
                      <TableCell className="text-center">
                        {headCell.label}
                      </TableCell>
                    ))} 
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                  table_data && 
                    table_data.map((row, idx) => (
                      <TableRow id={`addr${idx}`} key={idx}>
                      {
                      headCells.map((keysdata, index) =>  ( 
                          <TableCell>
                            {keysdata['type'] === 'select' &&
                                <Select disabled={keysdata['disabled']} data={keysdata['data']} label={null} value={keysdata["key"].toString().includes('.') ? (row[keysdata["key"].split(".")[0]]?.[keysdata["key"].split(".")[1]]) : row[keysdata["key"]]} onChange={(e, v, r) => {handelInputChange(keysdata.key, v, idx);}}/>
                                ||
                                keysdata['type'] === 'label' && <span>{row[keysdata["key"]]}</span> /*<Label label="" text={row[keysdata["key"]]}/>*/ ||

                                keysdata['type'] === 'view' && keysdata.renderView(row)
                                ||
                                <Input label="" type={keysdata['type']} value={keysdata["key"].toString().includes('.') ? (row[keysdata["key"].split(".")[0]]?.[keysdata["key"].split(".")[1]]) : row[keysdata["key"]]} onChange={(e) => {handelInputChange(keysdata.key, e.target.value, idx);}}/>
                            }
                          </TableCell>
                        ))
                      }
                      </TableRow>
                    ))
                  }
                  </TableBody>
                </Table>
               
              {renderFooter()} 
            
              </div>
           </div>
       </div>
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