import React from "react";
import { Box } from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import moment from 'moment'

const OrdersInTickets = (props) => {
  let ordersData = props.ordersData;

  const { setorderbppId, setorderData } = props;

  const handleProductView = (o) => {
    props.setOrderPage(false);
    props.setselectedProduct(o);
    props.setselectedCategory(props.selectedCategory);
  };

  return (
    <Box sx={{ background: "#FFFFFF", cursor: "pointer" }}>
      <table style={{ marginTop: "0px", marginBottom: "30px" }}>
        {ordersData.map((o) => {
          return (
            <div
              onClick={() => {
                handleProductView(o);
                setorderbppId(o?.bppId);
                setorderData(o);
              }}
            >
              <tr>
                <td>
                  <div
                    style={{
                      display: "flex",
                      borderBottom: "1px solid",
                      width: "1400px",
                      paddingBottom: "10px",
                    }}
                  >
                    <img
                      src={
                        o?.items &&
                        o?.items.length > 0 &&
                        o?.items[0]?.descriptor?.images &&
                        o?.items[0]?.descriptor?.images.length > 0 &&
                        o?.items[0]?.descriptor?.images[0]
                      }
                      // alt="Avatar"
                      style={{
                        width: "55px",
                        borderRadius: "10px",
                        background: "#D9D9D9",
                        height: "60px",
                      }}
                    />
                    <div style={{ marginLeft: "15px", textAlign: "left" }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                        {o?.descriptor?.name}
                      </Typography>
                      <Typography sx={{ fontSize: "14px" }}>
                        Order ID: {o?.transactionId}
                      </Typography>
                      <Typography sx={{ fontSize: "14px" }}>
                        Delivered on  {moment(o?.createdAt).format("DD-MM-YYYY, hh:mm a")}
                      </Typography>
                    </div>
                  </div>
                </td>
                {/* <td style={{ verticalAlign: "middle" }}></td> */}
              </tr>
            </div>
          );
        })}
      </table>
    </Box>
  );
};

export default OrdersInTickets;



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