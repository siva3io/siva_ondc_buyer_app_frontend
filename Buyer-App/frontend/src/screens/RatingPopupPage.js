import React, { useEffect, useState } from "react";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "./CancelPopup.css";

import ModalViewV2 from "./Model2";
import HorizontalLinearStepper from "./HorizontalStepper";

const RatingPopup = props => {
  const {
    products,
    setproducts,
    show,
    setShow,
    ratingCategories,
    setratingCategories,
    feedbackCategories,
    setfeedbackCategories,
    orderData,
    feedbackUrl,
    setRatingvalue,
    setRatingcategory,
    setRatinggiven,
  } = props;

  const handleClose = () => {
    // console.log("closed");
    setShow(false);
    handleClearProductsReview();
  };

  const handleClearProductsReview = () => {
    let newproducts = products;

    newproducts["Review"] = [
      {
        lookup_id: "product",
        name: "Product Review",
        rating: 0,
        value: [
          {
            lookup_id: "checkbox",
            name: "checkboxques",
            questions: [],
          },
          {
            lookup_id: "radio",
            name: "radioques",
            questions: [],
          },
          {
            lookup_id: "text",
            name: "textques",
            questions: [],
          },
        ],
      },
      {
        lookup_id: "fulfillment",
        name: "Fulfillment Review",
        rating: 0,
        value: [
          {
            lookup_id: "checkbox",
            name: "checkboxques",
            questions: [],
          },
          {
            lookup_id: "radio",
            name: "radioques",
            questions: [],
          },
          {
            lookup_id: "text",
            name: "textques",
            questions: [],
          },
        ],
      },
      {
        lookup_id: "order",
        name: "Order Review",
        rating: 0,
        value: [
          {
            lookup_id: "checkbox",
            name: "checkboxques",
            questions: [],
          },
          {
            lookup_id: "radio",
            name: "radioques",
            questions: [],
          },
          {
            lookup_id: "text",
            name: "textques",
            questions: [],
          },
        ],
      },
      {
        lookup_id: "seller",
        name: "Seller Review",
        rating: 0,
        value: [
          {
            lookup_id: "checkbox",
            name: "checkboxques",
            questions: [],
          },
          {
            lookup_id: "radio",
            name: "radioques",
            questions: [],
          },
          {
            lookup_id: "text",
            name: "textques",
            questions: [],
          },
        ],
      },
      {
        lookup_id: "overall",
        name: "Overall Review",
        rating: 0,
        value: [
          {
            lookup_id: "checkbox",
            name: "checkboxques",
            questions: [],
          },
          {
            lookup_id: "radio",
            name: "radioques",
            questions: [],
          },
          {
            lookup_id: "text",
            name: "textques",
            questions: [],
          },
        ],
      },
    ];

    setproducts(newproducts);
    setfeedbackCategories([]);
    setratingCategories([]);
  };

  return (
    <>
      {show && (
        <div className="whole_modal">
          <ModalViewV2
            modalTitle={"Rating & Review"}
            handleModalClose={handleClose}
            modalOpen={show}
            modalContentStyleHeight={"100%"}
            modalContentStyleWidth={"auto"}
            styleLeft={"calc(50% - 500px/2)"}
            styleHeight={"auto"}
            mainWidth={"550px"}
            modalContentStylePadding={"20px"}
            height={"500px"}
          >
            {ratingCategories.length > 0 && feedbackCategories.length > 0 ? (
              <HorizontalLinearStepper
                steps={ratingCategories}
                setratingCategories={setratingCategories}
                feedbackCategories={feedbackCategories}
                setfeedbackCategories={setfeedbackCategories}
                products={products}
                setproducts={setproducts}
                feedbackUrl={feedbackUrl}
                handleModalClose={handleClose}
                handleClearProductsReview={handleClearProductsReview}
                transactionId={orderData?.transactionId}
                orderbppId={orderData?.context?.bpp_id}
                OrderbppUrl={orderData?.context?.bpp_uri}
                setRatingvalue={setRatingvalue}
                setRatingcategory={setRatingcategory}
                setRatinggiven={setRatinggiven}
              />
            ) : (
              <div
                className="spinner-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "inherit",
                }}
              >
                <div className="loading-spinner"></div>
              </div>
            )}
          </ModalViewV2>
        </div>
      )}
      {/* <ToastContainer /> */}
    </>
  );
};

export default RatingPopup;


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