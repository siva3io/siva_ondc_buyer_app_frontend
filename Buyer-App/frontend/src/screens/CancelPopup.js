import React, { useState, useEffect, useRef } from "react";

import "./CancelPopup.css";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import {
  loadOrders,
  load_cancellation_reasons,
  partialUpdateOrderApi,
  partialCancelUpdateApi,
} from "../redux/Action/action";

import ModalViewV2 from "./Model2";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
import MatSelect from "Remote/MatDropDown";
import { Button } from "@mui/material";

import BASE_API_SOURCE from "../baseurl";

const dropdown_styles = {
  width: "700px",
  textOverflow: "ellipsis",
  whiteSpace: "normal",
  borderBottom: "1px solid #eee",
  padding: " 15px 10px",
  cursor: "pointer",
  color: " #606161",
  fontSize: "16px",
};

const productNameStyle = {
  color: "#606161",
  fontSize: " 18px",
  fontWeight: "500",
  margin: "0",
  // width: "90%",
};

const CancelPopup = props => {
  const { show, setShow, handleButtonClick, setReason, orderData } = props;
  const [selectedProducts, setselectedProducts] = useState(false);
  const { cancellationReasonsData } = useSelector(state => state.data);

  const handleClose = () => {
    setItemsToCancel([]);
    // props.reset_OrderData(orderData?.id);
    setShow(false);
  };

  const dispatch = useDispatch();

  const handleDelete = () => {
    if (selectedProducts) {
      let tempItems = ItemsToCancel.map(item => {
        return {
          id: item?.id,
          quantity: {
            count: item?.quantity,
          },
          tags: {
            update_type: "cancel",
            reason_code: mainData?.cancellation_reason,
          },
        };
      });

      let payload = {
        context: {
          transaction_id: orderData?.transactionId,
          bpp_id: orderData?.context?.bpp_id,
          bpp_uri: orderData?.context?.bpp_uri,
        },
        message: {
          order: {
            id: orderData?.id,
            provider: orderData?.provider,
            items: tempItems,
          },
        },
      };

      // console.log("payload",payload);

      // dispatch(partialUpdateOrderApi(payload, "partialCancel"));

      // setTimeout(() => {
      //   dispatch(loadOrders());
      // }, 500);

      dispatch(
        partialCancelUpdateApi(payload, function (resp) {
          // console.log("resp", resp);
          if (resp?.message?.ack?.status === "ACK") {
            const id = toast.loading("Selected Items Cancelling...");

            const source = new EventSource(
              `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${resp?.context?.message_id}`
            );

            source.addEventListener("open", () => {
              console.log("SSE opened!");
            });

            source.addEventListener("on_update", e => {
              const data = JSON.parse(e.data);

              toast.update(id, {
                render: "Selected items cancelled!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
              });
              dispatch(loadOrders());
              setShow(false);

              source.close();
            });

            source.addEventListener("error", e => {
              toast.update(id, {
                render: "Something went wrong",
                type: "error",
                isLoading: false,
                autoClose: 2000,
              });
            });

            return () => {
              source.close();
            };
          } else {
            toast.error("Something went wrong", {
              autoClose: 2000,
            });
          }
        })
      );
    } else {
      handleButtonClick("cancel");
    }
    setShow(false);
  };

  useEffect(() => {
    dispatch(load_cancellation_reasons());
  }, []);

  const handleChange = (value, type) => {
    if (type == "selected") {
      setselectedProducts(true);
    } else if (type == "complete") {
      setselectedProducts(false);
    }
  };

  const [mainData, setMainData] = useState({});

  const [ItemsToCancel, setItemsToCancel] = useState([]);

  const handelSelectonChange = (key, value) => {
    console.log("key", key, "value", value);

    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);

    setReason(value?.id);
  };

  const handleCheckBoxChange = itemId => {
    if (ItemsToCancel.find(o => o?.id == itemId) != null) {
      setItemsToCancel(ItemsToCancel.filter(o => o?.id != itemId));
    } else {
      setItemsToCancel([...ItemsToCancel, { id: itemId, quantity: 0 }]);
    }
  };

  const btn_decrement = itemId => {
    let tempItemsToCancel = ItemsToCancel.map(o => {
      if (o?.id == itemId) {
        o.quantity -= 1;
      }
      return o;
    });
    setItemsToCancel(tempItemsToCancel);
  };

  const btn_increment = itemId => {
    let tempItemsToCancel = ItemsToCancel.map(o => {
      if (o?.id == itemId) {
        o.quantity += 1;
      }
      return o;
    });
    setItemsToCancel(tempItemsToCancel);
  };

  return (
    <>
      {show && (
        <div className="whole_modal">
          <ModalViewV2
            modalTitle={"Cancel order"}
            handleModalClose={handleClose}
            handleDeleteProduct={handleDelete}
            modalOpen={show}
            actionBtns={
              !selectedProducts ||
              (ItemsToCancel?.length > 0 &&
                ItemsToCancel.some(e => e.quantity >= 1))
                ? ["Cancel", "Confirm"]
                : ["Cancel"]
            }
            modalContentStyleHeight={"100%"}
            modalContentStyleWidth={"auto"}
            styleLeft={"calc(50% - 800px/2)"}
            styleHeight={"auto"}
            mainWidth={"750px"}
            modalContentStylePadding={"20px"}
          >
            <div style={{ alignItems: "left" }}>
              <div
                style={{
                  display: "flex",
                  padding: "10px",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      disabled={orderData?.items?.some(o => {
                        return (
                          o["@ondc/org/cancellable"] &&
                          o["@ondc/org/cancellable"].toString() == "false"
                        );
                      })}
                      value="female"
                      control={<Radio />}
                      label="Cancel Complete Order"
                      onChange={value => {
                        handleChange(value, "complete");
                      }}
                    />
                    {console.log("items quantity", orderData)}
                    {orderData?.items.length > 0 &&
                      orderData?.items[0].quantity.count > 1 && (
                        <FormControlLabel
                          // disabled={orderData?.items.length == 1 ? true : false}
                          value="male"
                          control={<Radio />}
                          label="Partial Cancellation"
                          onChange={value => {
                            handleChange(value, "selected");
                          }}
                        />
                      )}
                  </RadioGroup>
                </FormControl>
              </div>
              {selectedProducts && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <div
                  // style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <FormGroup>
                      {orderData?.items?.map((item, index) => {
                        return (
                          item["@ondc/org/cancellable"] &&
                          item["@ondc/org/cancellable"].toString() == "true" &&
                          item?.tags?.status != "Cancelled" && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: 2,
                              }}
                            >
                              <FormControlLabel
                                control={<Checkbox />}
                                label={`${item?.descriptor?.name}  (Qty: ${item?.quantity?.count})`}
                                onChange={() => {
                                  handleCheckBoxChange(item?.id);
                                }}
                              />
                              {ItemsToCancel.find(o => o?.id == item.id) !=
                                null && (
                                <div className="pl-cart-allButton">
                                  <button
                                    disabled={
                                      ItemsToCancel.find(o => o?.id == item.id)
                                        ?.quantity <= 0
                                        ? true
                                        : false
                                    }
                                    style={{
                                      backgroundColor:
                                        ItemsToCancel.find(
                                          o => o?.id == item.id
                                        )?.quantity <= 0 && "dimgray",
                                    }}
                                    className={
                                      ItemsToCancel.find(o => o?.id == item.id)
                                        ?.quantity >= 0 && "pl-cart-minusButton"
                                    }
                                    onClick={() => btn_decrement(item?.id)}
                                  >
                                    -
                                  </button>
                                  <div style={{ marginTop: 6 }}>
                                    {
                                      ItemsToCancel.find(o => o?.id == item.id)
                                        ?.quantity
                                    }
                                  </div>
                                  <button
                                    disabled={
                                      ItemsToCancel.find(o => o?.id == item.id)
                                        ?.quantity >= item?.quantity?.count
                                        ? true
                                        : false
                                    }
                                    style={{
                                      backgroundColor:
                                        ItemsToCancel.find(
                                          o => o?.id == item.id
                                        )?.quantity >= item?.quantity?.count &&
                                        "dimgray",
                                    }}
                                    className={
                                      ItemsToCancel.find(o => o?.id == item.id)
                                        ?.quantity <= item?.quantity?.count &&
                                      "pl-cart-plusButton"
                                    }
                                    onClick={() => btn_increment(item?.id)}
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                              <div className="store_price_popup">
                                ₹
                                {/* {orderData?.quote?.breakup[index]?.price?.value} */}
                                {orderData?.quote?.price?.value}
                              </div>
                            </div>
                          )
                        );
                      })}
                    </FormGroup>

                    {/* <div className="store_price_popup">
                      ₹{orderData?.quote?.price?.value}
                    </div> */}
                  </div>
                </div>
              )}
              <MatSelect
                // style={{ height: "55px" }}
                disabled={false}
                data={cancellationReasonsData.map(o => {
                  return {
                    id: o.code,
                    label: o.reason,
                  };
                })}
                fieldKey="reasons"
                onChange={(e, value) => {
                  handelSelectonChange("cancellation_reason", value);
                }}
                placeholder="Select reason for cancellation"
              />
            </div>
          </ModalViewV2>
        </div>
      )}
    </>
  );
};

export default CancelPopup;


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