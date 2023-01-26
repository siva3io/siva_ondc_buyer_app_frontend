import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
 
export default function BasicBreadcrumbs({data, handleLinkClick}) {
  return ( 
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {
          data && data.map((item, index)=>  
           (index < (data.length - 1)
           ?
            <Link key={index} underline="hover" color="inherit" onClick={(e) => { handleLinkClick(item); }} style={{cursor:'pointer', textDecoration: 'none'}}>
            {item.breadcrumb}
            </Link>
            :
            <Typography key={index} color="text.primary" style={{ backgroundColor: '#f9f9f9' }}>{item.breadcrumb}</Typography>
            )
         )}  
      </Breadcrumbs> 
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