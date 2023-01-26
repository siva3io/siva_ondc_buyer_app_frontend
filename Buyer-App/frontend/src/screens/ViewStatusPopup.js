import { Autocomplete, Checkbox, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./ViewStatusPopup.css";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import ModalViewV2 from "./Model2";
const ViewStatusPopup = ({
  show,
  setShow,
  setBapId,
  setBapUri,
  // handleSubmitClick,
}) => {
  const handleClose = () => {
    setShow(false);
  };

  const openIssueFunction = (param) => {
    setShow(false);
    setOrderPage(false);
    setselectedCategory(param);
  };

  const handleDeleteProduct = () => {
    // console.log("handle prodd");
    setShow(false);
    // handleSubmitClick();
  };

  const handleInputChange = (key, value) => {
    // console.log(key, value);
    setBapId(value);
    setBapUri(assignTicketData?.bppId);
  };

  return (
    <>
      <div></div>
      {show && (
        <div className="whole_modal">
          <ModalViewV2
            modalTitle={"Status"}
            handleModalClose={handleClose}
            handleDeleteProduct={handleDeleteProduct}
            modalOpen={show}
            actionBtns={["Continue", "Cancel"]}
            modalContentStyleHeight={"100%"}
            modalContentStyleWidth={"auto"}
            styleLeft={"calc(50% - 700px/2)"}
            styleHeight={"auto"}
            mainWidth={"600px"}
            modalContentStylePadding={"16px"}
            height={"500px"}
          >
            <div>
              <div className="store_status_popup_title">Issue status</div>

              <div className="store_status_popup_description">
                <div className="store_status_description_each_div">
                  <div className="store_status_popup_left_side">
                    {" "}
                    Created Date & time
                  </div>
                  <div className="store_status_popup_right_side">
                    Created Date & time
                  </div>
                </div>
                <div className="store_status_description_each_div">
                  <div className="store_status_popup_left_side">
                    {" "}
                    Status Modified Date & time
                  </div>
                  <div className="store_status_popup_right_side">
                    Last updated date & time
                  </div>
                </div>
                <div className="store_status_description_each_div">
                  <div className="store_status_popup_left_side"> Modified by</div>
                  <div className="store_status_popup_right_side">
                    Application name
                  </div>
                </div>
                <div className="store_status_description_each_div">
                  <div className="store_status_popup_left_side">
                    {" "}
                    Name of the modifier
                  </div>
                  <div className="store_status_popup_right_side">
                    Name of the person who modified
                  </div>
                </div>
                <div className="store_status_description_each_div">
                  <div className="store_status_popup_left_side"> Email</div>
                  <div className="store_status_popup_right_side">email@email.com</div>
                </div>
                <div className="store_status_description_each_div">
                  <div className="store_status_popup_left_side"> Phone</div>
                  <div className="store_status_popup_right_side">+91 9*********</div>
                </div>
                <div className="store_status_description_each_div">
                  <div className="store_status_popup_left_side"> Address</div>
                  <div className="store_status_popup_right_side">
                    <p>Address line 1,2</p>
                    <p>Address Line 2 </p>
                    <p>City State</p>
                  </div>
                </div>
              </div>
            </div>
          </ModalViewV2>
        </div>
      )}
      {/* <ToastContainer /> */}
    </>
  );
};

export default ViewStatusPopup;


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