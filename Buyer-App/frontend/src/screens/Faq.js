import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

import "./Faq.css";
import OrderFaq from "../SubScreens/Faqs/OrderFaq";
import PaymentFaq from "../SubScreens/Faqs/PaymentFaq";
import FulfilmentFaq from "../SubScreens/Faqs/FulfilmentFaq";
import CancellationFaq from "../SubScreens/Faqs/CancellationFaq";

function handleClick(event) {
  event.preventDefault();
  // console.info('You clicked a breadcrumb.');
}

function Faq() {
  const [titleClick, setTitleClick] = useState("Order");

  const handleTitleClick = (title) => {
    setTitleClick(title);
  };

  return (
    <>
      <div className="store-Faq-allbody">
        <div className="store-Faq-Content">
          <div className="store-Faq-ContentSidebar">
            <div className="store-Faq-ContentSidebar_header">Topics</div>
            <hr style={{ margin: "20px", border: "0.8px solid #000000" }}></hr>
            <div className="store-Faq-ContentSidebar_names">
              <p
                className="store-Faq-p"
                style={titleClick == "Order" ? { background: "#F5F5F5" } : null}
                onClick={() => {
                  handleTitleClick("Order");
                }}
              >
                Order
              </p>
              <p
                className="store-Faq-p"
                style={
                  titleClick == "Payment" ? { background: "#F5F5F5" } : null
                }
                onClick={() => {
                  handleTitleClick("Payment");
                }}
              >
                Payment
              </p>
              <p
                className="store-Faq-p"
                style={
                  titleClick == "Cancellation"
                    ? { background: "#F5F5F5" }
                    : null
                }
                onClick={() => {
                  handleTitleClick("Cancellation");
                }}
              >
                Cancellation and Returns
              </p>
              <p
                className="store-Faq-p"
                style={
                  titleClick == "Fulfilment" ? { background: "#F5F5F5" } : null
                }
                onClick={() => {
                  handleTitleClick("Fulfilment");
                }}
              >
                Fulfillment
              </p>
            </div>
          </div>
          <div className="store-Faq-ContentMain">
            {titleClick == "Order" && <OrderFaq />}
            {titleClick == "Payment" && <PaymentFaq />}
            {titleClick == "Cancellation" && <CancellationFaq />}
            {titleClick == "Fulfilment" && <FulfilmentFaq />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Faq;


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