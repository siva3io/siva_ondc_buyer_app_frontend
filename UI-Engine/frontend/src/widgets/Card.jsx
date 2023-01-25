import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard({Image, Name, buttonlist, handleButtonClick}) {
  return (
    <Card sx={{ width: 280 }}>
      <CardActionArea style={{marginTop:10}}>
        <CardMedia style={{padding:20, borderRadius:13}}
          component="img"
          height="200"  
          image={Image}
          alt={Name}
          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        />
        <CardContent style={{textAlign: 'center'}}>
          <Typography variant="h5" component="div">
            {Name}
          </Typography> 
        </CardContent>
      </CardActionArea>
      <CardActions style={{display:"flex", alignItems:"center", gap:"18px", marginLeft:"20%", marginBottom:10}}>
      {
       buttonlist && buttonlist.map((item, key)=>  
        <Button key={key} size="small" variant={item.variant} 
          onClick={(e) => {
            handleButtonClick(item);
          }}>
            {item.name}
        </Button>        
       )} 
      </CardActions>
    </Card>
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