import React, { useEffect, useState } from "react";

import "./HelpPopup.css";

import ModalViewV2 from "../screens/Model2";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

const RefundPopup = ({ show, setShow }) => {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className="whole_modal">
          <ModalViewV2
            modalTitle={"Refund"}
            handleModalClose={handleClose}
            modalOpen={show}
            // actionBtns={["Cancel", "Confirm"]}
            // modalContentStyleHeight={"100%"}
            modalContentStyleWidth={"auto"}
            styleLeft={"calc(50% - 700px/2)"}
            styleHeight={"auto"}
            mainWidth={"530px"}
            modalContentStylePadding={"16px"}
            height={"165px"}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Refund Initiated Succefully!</Typography>
              <Typography>
                Refund will be credited within 3-4 business days
              </Typography>
            </div>
          </ModalViewV2>
        </div>
      )}
    </>
  );
};

export default RefundPopup;



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