import { Button } from "@mui/material";
import React from "react";
import "./ProductCards.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import pfImage from "../Assets/pfImage.jpg";

const ProductCards = () => {
  return (
    <>
      <div className="bap_ad-productCardbody">
        <div className="bap_ad-productCardbody-TopSection">
          <div className="bap_ad-productCard-Imgheading">
            <img
              className="bap_ad-productCard-img"
              src={pfImage}
              alt="alternatetext"
            />

            <div className="bap_ad-productCard-heading">
              <div className="bap_ad-productCard-headingtext1">
                Company Name
              </div>
              <div className="bap_ad-productCard-headingtext2">
                25/10/2021 00:00AM
              </div>
            </div>
          </div>
          <div>
            <div className="bap_ad-sellercard-chipstatusall">Recieved</div>
          </div>
        </div>
        <div className="bap_ad-productCard-pricebody">
          <div className="bap_ad-productCard-price">
            <div className="bap_ad-productCard-price2">Amount Pending</div>
            <div className="bap_ad-productCard-price1">₹2000.00</div>
          </div>
          <div className="bap_ad-productCard-cartButton">
            <div className="bap_ad-productCard-price2">Number of Orders</div>
            <div className="bap_ad-productCard-price1">20</div>
            {/* <Button
              className="bap_productCard-button1"
              variant="contained"
              style={{ width: "125px", maxHeight: "37px" }}
            >
              New Rate +
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCards;
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
