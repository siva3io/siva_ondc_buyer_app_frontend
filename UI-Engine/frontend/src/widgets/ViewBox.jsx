import * as React from 'react';
import { Box, Typography, Card, CardActions, CardContent, Button, TextareaAutosize  } from "@mui/material";
import LabeledText from './LabeledText';
import ViewBox_File_Download from './ViewBox_File_Download';
import View_Checkbox from './View_Checkbox';
import "./ViewBox.css";

export default function ViewBox({ view_data, header }) {
    return ( 
        <>
            <div className="locationDetailsMain">
                <div className="locationDetailForm">
                    <div className="staticFormCard">
                        <div className="staticFormCardTitle">{header}</div>
                        <div className="product-staticFormCardForm">
                            {view_data.map((field) => {
                                const val = field.label;
                                const typ = field.type;
                                return (typ === "input" || typ === "text") ? (
                                    <LabeledText
                                        card
                                        label={field.label}
                                        text={field.text ? field.text : "--"}
                                        disabled_y={true}
                                    />
                                    ) : typ === "dropdown" ? (
                                        <> 
                                       <LabeledText
                                        card
                                        label={field?.label?.replace('Select ', '')?.replace('select ', '')}
                                        text={field?.text?.label}
                                        disabled_y={true}
                                        />
                                        </>
                                    ) : typ === "checkbox" ? (
                                        <> 
                                       <View_Checkbox
                                        label={field.label}
                                        text={field.text}
                                        data_type={field?.data_type}/>
                                        </>
                                    ) 
                                    : typ === "file" ? (
                                    <> 
                                   <ViewBox_File_Download 
                                    label={field.label}
                                    text={field.text ? field.text : "--"}
                                    data_type={field?.data_type}/>
                                    </>) : typ === "card" ? (
                                    <> 
                                    <Card sx={{ minWidth: "100%", border:"1px solid cornflowerblue", borderRadius:2 }}>
                                    <CardContent>
                                       <div style={{ fontSize: 18, fontWeight:"600", marginBottom:25}}  >
                                        {field.label}
                                       </div>
                                       {
                                        field.value.map((sub_field) => ( 
                                            <div style={{width:"100%", padding: '18px'}}>
                                                <div style={{width:"40%", float:"left"}}>
                                                <strong style={{fontSize:14, color:"rgb(100 98 98)"}}>{sub_field.label}</strong>
                                                </div>
                
                                                <div style={{width:"60%", float:"left"}}>
                                                <label style={{fontSize:14, color:"rgb(159 152 152)", width:"60%"}}>{sub_field.value}</label>
                                                </div><br></br>
                                            </div>    
                                    ))}
                                    </CardContent>                   
                                  </Card>
                                  </>
                                  )  
                                : (
                                    <></>
                                );
                            })}
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