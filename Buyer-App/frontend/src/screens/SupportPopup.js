import React, { useState, useEffect, useRef } from "react";
import ModalViewV2 from "./Model2";
import { useDispatch } from "react-redux";

const SupportPopup = (props) => {
  const { show, setShow, handleButtonClick, orderData, supportData } = props;

  const handleClose = () => {
    setShow(false);
  };
  const dispatch = useDispatch();

  const handleDelete = () => {
    setShow(false);
    handleButtonClick("cancel");
  };

  const supportlabel = {
    lineHeight: 2,
  };

  return (
    <>
      {show && (
        <div className="whole_modal">
          <ModalViewV2
            modalTitle={"Support"}
            handleModalClose={handleClose}
            handleDeleteProduct={handleDelete}
            modalOpen={show}
            modalContentStyleHeight={"100%"}
            modalContentStyleWidth={"auto"}
            styleLeft={"calc(50% - 800px/2)"}
            styleHeight={"calc(50% - 800px/2)"}
            mainWidth={"750px"}
            modalContentStylePadding={"20px"}
          >
            <div>
              <div style={supportlabel}>
                Phone No -{" "}
                <span className="support-value">
                  {supportData?.message?.phone}
                </span>
              </div>
              <div style={supportlabel}>
                Email Id - <span> {supportData?.message?.email}</span>
              </div>
              <div style={supportlabel}>
                URL - <span> {supportData?.message?.uri}</span>
              </div>
            </div>
          </ModalViewV2>
        </div>
      )}
    </>
  );
};

export default SupportPopup;


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