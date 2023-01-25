import React, { useEffect, useState } from "react";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "./HelpPopup.css";

import ModalViewV2 from "../screens/Model2";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch, useSelector } from "react-redux";

const HelpPopup = ({
  show,
  setShow,
  setOrderPage,
  grievanceCategories,
  setselectedCategory,
}) => {
  const handleClose = () => {
    setShow(false);
  };

  const openIssueFunction = (param) => {
    setShow(false);
    setOrderPage(false);
    setselectedCategory(param);
  };
  const issues = [];

  grievanceCategories &&
    grievanceCategories.map((o) => {
      !issues.includes(o.category) && issues.push(o.category);
    });
  return (
    <>
      <div></div>
      {show && (
        <div className="whole_modal">
          <ModalViewV2
            modalTitle={"Support"}
            handleModalClose={handleClose}
            modalOpen={show}
            // actionBtns={["Cancel", "Confirm"]}
            modalContentStyleHeight={"100%"}
            modalContentStyleWidth={"auto"}
            styleLeft={"calc(50% - 700px/2)"}
            styleHeight={"auto"}
            mainWidth={"750px"}
            modalContentStylePadding={"16px"}
            // height={"500px"}
          >
            <div className="store_helppopup_data_div">
              <div className="store_helppopup_title_div">Issue Regarding</div>
              <div className="store_helppopup_issues_div">
                {issues.map((o) => {
                  return (
                    <div className="store_helppopup_issues_each_div">
                      <div>{o} regarding issue</div>
                      <div
                        className="store_helppopup_open_icon"
                        onClick={() => {
                          openIssueFunction(o);
                        }}
                      >
                        <ChevronRightIcon />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ModalViewV2>
        </div>
      )}
      {/* <ToastContainer /> */}
    </>
  );
};

export default HelpPopup;


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