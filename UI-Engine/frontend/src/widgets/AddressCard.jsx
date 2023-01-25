import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import "./EmailFormat.css";



export default function AddressCard({ head, icon, address1, address2, city, state, country }) {


    return (
        <div className='address'>
            <div className='address-head'>{head}</div>
            <div className='addresscard-top'>
                <div className='addresscard-icon'>
                    {icon}
                </div>
                <div className='addresscard-text'>
                    <p>{address1}</p>
                    <p>{address2}</p>
                    <p>{city}</p>
                    <p>{state}</p>
                    <p>{country}</p>
                </div>
            </div>
        </div>
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