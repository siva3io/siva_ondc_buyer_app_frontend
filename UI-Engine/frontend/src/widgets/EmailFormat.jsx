import { Icon } from "@material-ui/core";
import React from "react";
import "./EmailFormat.css";
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import PrintIcon from '@mui/icons-material/Print';

const EmailFormat = (props) => {
  return (
    <div
      className="email-format"
    >
     {/*  <div className={props.card ? "labelWrap_card1" : "labelWrap1"}>
        <label
          htmlFor={props.label.toLowerCase().split(" ").join("_")}
          className={props.disabled_y ? "label_disabled1" : "label1"}
        >
          {props.label}
        </label>
      </div> */}
     
     
        {props.icon && props.icon==="mail" &&  <MailIcon /> }
        {props.icon && props.icon==="phone" &&  <PhoneIcon />}
        {props.icon && props.icon==="fax" &&  <PrintIcon />}
     
  


        <span className="email-icons">{props.text}</span>
      
    </div>
  );
};

export default EmailFormat;


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