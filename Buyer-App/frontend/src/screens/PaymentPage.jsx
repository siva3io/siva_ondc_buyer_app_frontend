import React, { useEffect, useState, Suspense } from "react";
import "./Payments.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { data } from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Product_confirm_API,
  Razorpay_Create_order,
  Razorpay_Callback,
  Product_Multi_confirm_API,
} from "../redux/Action/action";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

import BASE_API_SOURCE from "../baseurl";

export default function PaymentPage() {
  const topBar = new CustomEvent("topBar", {
    detail: {
      bar: true,
      route: "payment",
      search: false,
    },
  });
  document.dispatchEvent(topBar);

  let history = useHistory();

  const [localData, setlocalData] = React.useState("");

  const [prepaid, setprepaid] = React.useState(true);

  const [addressData, setaddressData] = useState({});

  React.useEffect(() => {
    function handleResize() {
      if (JSON.parse(localStorage.getItem("address_details")) != null) {
        setaddressData(JSON.parse(localStorage.getItem("address_details")));
      }

      if (JSON.parse(localStorage.getItem("init_data")) != null) {
        setlocalData(JSON.parse(localStorage.getItem("init_data")));
        let localCartItems = JSON.parse(localStorage.getItem("CartProducts"));
        localCartItems &&
          localCartItems.length > 0 &&
          localCartItems[0].map(e => {
            if (
              e["@ondc/org/available_on_cod"] &&
              e["@ondc/org/available_on_cod"].toString() == "true"
            ) {
              setcodNotAvailable(true);
            }
          });
      }
    }
    window.addEventListener("localfetchInitData", handleResize);

    return () => {
      window.removeEventListener("localfetchInitData", handleResize);
    };
  });

  // console.log("localData", localData);

  const CartProducts = JSON.parse(localStorage.getItem("CartProducts"));
  const CartItemDetails = CartProducts[1];
  const payLoadItemDetails = CartProducts[0];

  let cal = 0.0;
  CartItemDetails.forEach(
    o =>
      (cal =
        cal +
        parseFloat(o?.price) * o?.quantity +
        parseFloat(o?.delivery_charges) +
        parseFloat(o?.packing_charges) +
        parseFloat(o?.tax) +
        parseFloat(o?.convFee))
  );

  const [totalAmount, settotalAmount] = useState(cal);

  let dispatch = useDispatch();

  function handleClick(paymentType) {
    // console.log("localData", localData);
    setonConfirmClick(true);

    var confirm_payload = localData.map(item => {
      console.log("item", item);
      let tempPayment = item?.message?.order?.payment;
      if (paymentType == "prepaid") {
        tempPayment["status"] = "PAID";
        tempPayment["type"] = "ON-ORDER";
      }

      let tempItems = item?.message?.order?.items
        ? item?.message?.order?.items
        : [];

      for (let index = 0; index < tempItems.length; index++) {
        tempItems[index]["provider"] = {
          id: item?.message?.order?.provider?.id,
          locations: [item?.message?.order?.provider_location?.id],
        };
        tempItems[index]["bpp_id"] = item?.context?.bpp_id;
        tempItems[index]["bpp_url"] = item?.context?.bpp_uri;
      }

      return {
        context: {
          transaction_id: item?.context?.transaction_id,
          bpp_uri: item?.context?.bpp_uri,
          bpp_id: item?.context?.bpp_id,
          city: item?.context?.city,
        },
        message: {
          items: tempItems,
          fulfillments: item?.message?.order?.fulfillments,
          billing_info: item?.message?.order?.billing,
          delivery_info: item?.message?.order?.delivery,
          payment: tempPayment,
          quote: item?.message?.order?.quote,
          tags: item?.message?.order?.tags,
        },
      };
    });

    const id = toast.loading("Order Confirming...");
    dispatch(
      Product_Multi_confirm_API(confirm_payload, id, function (resp) {
        resp.map((item, index) => {
          if (item?.message?.ack?.status === "ACK") {
            const source = new EventSource(
              `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${item?.context?.message_id}`
            );
            source.addEventListener("open", () => {
              console.log("SSE opened confirm!");
            });

            source.addEventListener("on_confirm", e => {
              const data = JSON.parse(e.data);
              toast.update(id, {
                render: "Order Confirmed!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
              });

              if (resp.length == index + 1) {
                localStorage.removeItem("CartProducts");
                history.push("/storeFront/orders");
                setonConfirmClick(false);
              }

              source.close();
            });

            source.addEventListener("error", e => {
              // console.error("Error: ", e);
              toast.update(id, {
                render: "Something went wrong",
                type: "error",
                isLoading: false,
                autoClose: 2000,
              });
              setonConfirmClick(false);
            });

            return () => {
              source.close();
            };
          } else {
            toast.update(id, {
              render: "Something went wrong",
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });
          }
        });
      })
    );
  }

  //#region Razorpay Payment Gateway Integration
  function loadScript(src) {
    return new Promise(resolve => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  function handleClick_Razorpay_Create_order() {
    const transaction_id = localData[0]?.context?.transaction_id;
    let TotalAmt = CartItemDetails.reduce(function (prev, current) {
      return (
        prev +
        current.price * current.quantity +
        parseFloat(current.tax) +
        parseFloat(current.delivery_charges) +
        parseFloat(current.packing_charges)
      );
    }, 0);
    var data = {
      amount: TotalAmt * 100,
      transaction_id: transaction_id,
    };
    dispatch(
      Razorpay_Create_order(data, function (resp) {
        if (resp?.status) {
          displayRazorpay(
            resp?.data?.amount,
            resp?.data?.currency,
            resp?.data?.id,
            transaction_id
          );
        }
      })
    );
  }

  async function displayRazorpay(amount, currency, order_id, transaction_id) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const options = {
      key: "rzp_test_7j8mgteNJ5UFmN", // Enter the Key ID generated from the Dashboard
      amount: amount * 100,
      currency: currency,
      name: addressData?.Name,
      description: "Test Transaction",
      //image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          transaction_id: transaction_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: order_id,
          razorpaySignature: response.razorpay_signature,
        };
        dispatch(
          Razorpay_Callback(data, function (resp) {
            if (resp.status) {
              toast.success("Payment Successful!", {
                toastId: "Payment Successful!",
                autoClose: 2000,
              });
              handleClick("prepaid");
            }
          })
        );
      },
      prefill: {
        name: addressData?.Name,
        email: addressData?.email,
        contact: addressData?.phone_number,
      },
      notes: {
        address: addressData?.address_line_1,
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  //#endregion Razorpay Payment Gateway Integration

  const [onConfirmClick, setonConfirmClick] = useState(false);

  const [codNotAvailable, setcodNotAvailable] = useState(false);

  // const initData = JSON.parse(localStorage.getItem("init_data"));
  // const codAvailable = initData?.message?.order?.payment?.type;
  console.log(codNotAvailable, "codddddd");

  return (
    <div className="content_box">
      <div className="left_content_box">
        <div className="store_left_content_form">
          {CartItemDetails &&
            CartItemDetails.map(o => {
              return (
                <>
                  <table style={{ marginTop: "0px", marginBottom: "30px" }}>
                    <tr>
                      <td>
                        <h2>{o?.name}</h2>
                        <tr>
                          <td> Qty: {o?.quantity} </td>
                        </tr>
                        {/* <br /> */}
                        {/* {o?.seller_name} */}
                      </td>
                      <td>{o?.price}</td>
                    </tr>
                    <tr>
                      <td>Delivery Charges</td>
                      <td>{o?.delivery_charges}</td>
                    </tr>
                    <tr>
                      <td>Packing Charges</td>
                      <td>{o?.packing_charges}</td>
                    </tr>
                    <tr>
                      <td>Tax</td>
                      <td>{o?.tax}</td>
                    </tr>
                    <tr>
                      <td>Convenience Fee</td>
                      <td>{o?.convFee}</td>
                    </tr>
                  </table>
                </>
              );
            })}

          <div className="store_total_wrapper">
            <>
              <table style={{ marginTop: "0px", marginBottom: "30px" }}>
                <tr>
                  <td>
                    <h2>Total Price : </h2>
                  </td>
                  <td>{totalAmount?.toFixed(2)}</td>
                </tr>
              </table>
            </>
          </div>

          <div className="buttons_wrapper">
            <div className="radio_wrapper">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="prepaid"
                >
                  {codNotAvailable && (
                    <FormControlLabel
                      value="pod"
                      control={<Radio />}
                      label="Pay on Delivery"
                      onClick={() => {
                        setprepaid(false);
                      }}
                    />
                  )}
                  <FormControlLabel
                    value="prepaid"
                    control={<Radio />}
                    label="Prepaid"
                    onClick={() => {
                      setprepaid(true);
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="order_button">
              {prepaid ? (
                <Button
                  onClick={() => {
                    handleClick_Razorpay_Create_order();
                  }}
                  // disabled={prepaid ? false : true}
                  // style={{
                  //   backgroundColor: prepaid ? "#001661" : "grey",
                  //   color: prepaid ? "white" : "",
                  // }}
                  variant="contained"
                  disabled={localData === "" || onConfirmClick ? true : false}
                  style={{
                    backgroundColor:
                      localData === "" || onConfirmClick ? "grey" : "#001661",
                  }}
                >
                  Pay Amount
                </Button>
              ) : (
                <Button
                  // disabled={true}
                  disabled={localData === "" || onConfirmClick ? true : false}
                  style={{
                    backgroundColor:
                      localData === "" || onConfirmClick ? "grey" : "#001661",
                  }}
                  variant="contained"
                  onClick={() => {
                    handleClick("cod");
                    // localStorage.setItem("CartProducts", [[], []]);
                    // localStorage.removeItem("CartProducts");
                  }}
                >
                  Place Order
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="right_content_box">
        <img src="https://dev-api.eunimart.com/files/images/paymentPage.png" />
      </div>
    </div>
  );
}



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