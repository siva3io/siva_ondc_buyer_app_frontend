import React, { useState, useEffect, useRef } from "react";
import "./AdminDashboard.css";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import DoublePieChart from "../Components/SellersPieChart";
import AdminGraph from "../Components/AdminGraph";
import CircleIcon from "@mui/icons-material/Circle";
import ProductCards from "../Components/ProductCards";

function AdminDashboard() {
  const TicketArray = [
    {
      day: "Today",
      Ticket: [
        {
          TicketNo: "Ticket Number 1",
          Description: "Ticket Description",
          time: "00:00 AM",
        },
        {
          TicketNo: "Ticket Number 2",
          Description: "Ticket Description",
          time: "00:00 AM",
        },
        {
          TicketNo: "Ticket Number 3",
          Description: "Ticket Description",
          time: "00:00 AM",
        },
        {
          TicketNo: "Ticket Number 4",
          Description: "Ticket Description",
          time: "00:00 AM",
        },
      ],
    },
    {
      day: "Yesterday",
      Ticket: [
        {
          TicketNo: "Ticket Number 1",
          Description: "Ticket Description",
          time: "00:00 AM",
        },
        {
          TicketNo: "Ticket Number 2",
          Description: "Ticket Description",
          time: "00:00 AM",
        },
      ],
    },
  ];

  const GraphData = [
    {
      Title: "Total No. of Orders",
      OrderNumber: "27365",
      color: "#FD7789",
    },
    {
      Title: "Total No. of Orders Fulfilled",
      OrderNumber: "8734",
      color: "#A35599",
    },
    {
      Title: "Total No. of Orders Cancelled",
      OrderNumber: "34",
      color: "#72AB3A",
    },
  ];

  let sidel = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <div className="bap_ad-allbody">
        <div className="bap_ad-gridbody">
          <div className="bap_ad-gridbody1">
            <div className="bap_ad-Orderdetails-seller">
              <div className="bap_ad-Orderdetails">
                <div className="bap_ad-Orderdetails-Header">Order Details</div>
                <div className="bap_ad-Orderdetails-graphData">
                  <div className="bap_ad-Orderdetails-graph">
                    <AdminGraph />
                  </div>
                  <div className="bap_ad-Orderdetails-data">
                    <div className="bap_ad-dashboard_goals_tags_container">
                      {GraphData.map(grh => (
                        <>
                          <CircleIcon
                            sx={{ color: `${grh.color}` }}
                            fontSize="smallest"
                            className="bap_ad-icon_dashboard_goals_icon1"
                          />
                          <span className="bap_ad-dashboard_goals_tags">
                            {grh.Title}
                          </span>
                          <div className="bap_ad-Orderdetails-dataNumb">
                            {grh.OrderNumber}
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                {/* <hr></hr>
                            <div className="ad-Orderdetails-daysReport">
                                <div className="ad-Orderdetails-days">Last 30 days</div>
                                <div className="ad-Orderdetails-report">OVERALL REPORT {">"}</div>
                            </div> */}
              </div>

              <div className="bap_ad-sellers">
                <div className="bap_ad-sellers-heading">Buyers</div>
                <div>
                  {" "}
                  <DoublePieChart
                    achieved={28}
                    unachieved_color={"#416BFF"}
                    achieved_color={"#72AB3A"}
                  />
                </div>
              </div>
            </div>
            <div className="bap_ad-pendingPayments">
              <div className="bap_ad-pendingPayments-Header">
                Pending Payments
              </div>
              <div className="bap_ad-pendingPayments-gridcards">
                <div className="bap_pl-gridcards11">
                  <div className="bap_pl-gridcards">
                    {sidel?.map(i => {
                      return <ProductCards />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bap_ad-gridbody2">
            <div className="bap_ad-gridbody2-Heading">Tickets</div>
            {TicketArray.map(item => (
              <>
                <div className="bap_ad-gridbody2-Heading1">{item?.day}</div>
                {item?.Ticket.map(item1 => (
                  <>
                    <div className="bap_ad-gridbody2-ContentCard">
                      <div className="bap_ad-gridbody2-ContentCard-img">
                        <LocalActivityOutlinedIcon />
                      </div>
                      <div className="bap_ad-gridbody2-ContentCard-content">
                        <div className="bap_ad-gridbody2-ContentCard-heading">
                          {item1?.TicketNo}
                        </div>
                        <div className="bap_ad-gridbody2-ContentCard-dsc">
                          {item1?.Description}
                        </div>
                      </div>
                      <div className="bap_ad-gridbody2-ContentCard-time">
                        {item1?.time}
                      </div>
                    </div>
                    <hr style={{ width: "90%", background: "#E7E0EC" }} />
                  </>
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
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
