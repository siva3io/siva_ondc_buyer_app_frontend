import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "../../screens/Faq.css";

function PaymentFaq() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="#001661" href="/">
      FAQs
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="#001661"
      // href="/material-ui/getting-started/installation/"
      // onClick={handleClick}
    >
      Topics
    </Link>,
    <Typography key="3" color="#001661">
      Payment
    </Typography>,
  ];

  const accordianArray = [
    {
      title: "Can I pay for orders using CoD?",
      content:
        "Yes, you can pay for orders using CoD if the specific product or the seller offers CoD. Before proceeding to checkout you will be able to identify if the product is available for CoD",
      content2: "",
      Accimage: "frontendsrcAssetsImagesRectangle 2735.jpg",
    },
    {
      title: "Can I use coupons when placing an order?",
      content:
        "As of now the buyer app does not support using/applying coupons to get discounts on orders since the app is built on the recently launched ONDC protocol and is still evolving. In the near future, there are plans for introducing coupons and offers.",
      content2: "",
      Accimage: "frontendsrcAssetsImagesRectangle 2735.jpg",
    },
  ];

  return (
    <>
      <div className="store-Faq-ContentMain_breadcrumbs">
        {/* <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" color="#001661" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs> */}
      </div>
      <div className="store-Faq-ContentMain_Header">Payments</div>
      <div className="store-Faq-ContentMain_accordian">
        {accordianArray.map((acc) => (
          <Accordion>
            <AccordionSummary
              sx={{ height: "70px" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{ fontWeight: "500", color: "#5D5D5D", fontSize: "17px" }}
              >
                {acc.title}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography sx={{ fontSize: "15px", color: "#5D5D5D" }}>
                <div className="store-Faq-acc1">{acc.content2}</div>
                <div className="store-Faq-acc">
                  <div className="store-Faq-acc_content">{acc.content}</div>
                  {/* <div className="store-Faq-Faq-acc_image">
                    <img
                      style={{ width: "95%", height: "auto", margin: "10px" }}
                      src="https://static.vecteezy.com/system/resources/previews/006/091/020/original/sample-stamp-in-rubber-style-red-round-grunge-sample-sign-rubber-stamp-on-white-illustration-free-vector.jpg"
                    ></img>
                  </div> */}
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
}

export default PaymentFaq;


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