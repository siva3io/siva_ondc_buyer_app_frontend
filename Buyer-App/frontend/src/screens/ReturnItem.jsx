import React, { useEffect, useState, Suspense } from "react";
import ModalViewV2 from "./ModalViewV2";
import AddForm from "Remote/AddForm";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {
  loadOrders,
  partialUpdateOrderApi,
  loadAddresses,
  deleteAddress,
  updateAddress,
  addAddress,
  load_return_reasons,
  Event_Return_api,
} from "../redux/Action/action";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

import MatSelect from "Remote/MatDropDown";

const ReturnItem = (props) => {
  const topBar = new CustomEvent("topBar", {
    detail: {
      bar: true,
      route: "return",
      search: false,
    },
  });
  document.dispatchEvent(topBar);

  const [mainData, setMainData] = useState({});

  const [selectedProducts, setselectedProducts] = useState(false);

  const { id } = props;

  let history = useHistory();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAddresses());
    dispatch(loadOrders());
    dispatch(load_return_reasons());
  }, []);

  const [newlocationData, setnewlocationData] = useState({
    Name: "",
    phone_number: "",
    address_line_1: "",
    address_line_2: "",
    address_line_3: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    email: "",
  });

  const { ordersData, addressesData, returnReasonsData } = useSelector(
    (state) => state.data
  );

  const [orderData, setorderData] = useState();

  useEffect(() => {
    let tempData = ordersData && ordersData.find((o) => o?.id == id);
    setorderData(tempData);

    var newMainData = mainData;
    newMainData["address"] = tempData?.billing?.address;
    setMainData(newMainData);
  }, [ordersData]);

  const [showAddressCard, setshowAddressCard] = useState(false);
  const [selectedAddressCard, setselectedAddressCard] = useState(-1);

  const [update, setupdate] = useState(true);

  const [LocationForm, setLocationForm] = useState([
    {
      label: "Name",
      type: "input",
      key: "Name",
      required: true,
    },
    {
      label: "Mobile Number",
      type: "input",
      key: "phone_number",
      required: true,
      // defaultVal: {},
    },
    {
      label: "Address Line 1",
      type: "input",
      key: "address_line_1",
      required: true,
    },
    {
      label: "Address Line 2",
      type: "input",
      key: "address_line_2",
      required: true,
    },
    {
      label: "Address Line 3 (optional)",
      type: "input",
      key: "address_line_3",
    },
    {
      label: "Pincode",
      type: "input",
      key: "pincode",
    },
    {
      label: "Country",
      type: "input",
      key: "country",
      // defaultVal: {},
    },
    {
      label: "State",
      type: "input",
      key: "state",
      // defaultVal: {},
    },
    {
      label: "City/Town",
      type: "input",
      key: "city",
    },
    {
      label: "Email",
      type: "input",
      key: "email",
    },
  ]);

  const handelInputChange = (key, value) => {
    console.log("key", key, "value", value);
    setnewlocationData({ ...newlocationData, [key]: value });
    try {
      var newLocationForm = LocationForm.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setLocationForm(newLocationForm);
    } catch (e) {}
    // var newMainData = mainData;
    // newMainData[key] = value;
    // setMainData(newMainData);
  };

  const handleReturnClick = () => {
    if (selectedProducts) {
      let tempItems = ItemsToReturn.map((itemId) => {
        return {
          id: itemId,
          quantity: orderData?.items.find((e) => e?.id == itemId)?.quantity,
          tags: {
            update_type: "return",
            reason_code: mainData?.return_reason,
            ttl_approval: "PT24H",
            ttl_reverseqc: "P3D",
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

      dispatch(partialUpdateOrderApi(payload, "partialReturn"));
      history.push("/storeFront/orders");
    } else {
      // ------------------------------Complete Order Return temparary Implementation-------------
      let tempItems = orderData?.items.map((item) => {
        return {
          id: item?.id,
          quantity: item?.quantity,
          tags: {
            update_type: "return",
            reason_code: mainData?.return_reason?.id,
            ttl_approval: "PT24H",
            ttl_reverseqc: "P3D",
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

      dispatch(partialUpdateOrderApi(payload, "completeOrder"));
      history.push("/storeFront/orders");

      // ------------------------------Complete Order Return Later Implementation-------------
      // let return_payload = {
      //   context: {
      //     transaction_id: orderData?.transactionId,
      //     bpp_uri: orderData?.context?.bpp_uri,
      //     bpp_id: orderData?.context?.bpp_id,
      //   },
      //   message: {
      //     order_id: orderData?.id,
      //     return_reason_id: mainData?.return_reason?.id,
      //   },
      // };

      // dispatch(
      //   Event_Return_api(return_payload, function (resp) {
      //     if (resp?.message?.ack?.status === "ACK") {
      //       console.log("ACK cancel");
      //       const id = toast.loading("Return Request Sent...");
      //       const source = new EventSource(
      //         `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${resp?.context?.message_id}`
      //       );
      //       source.addEventListener("open", () => {
      //         console.log("SSE opened cancel!");
      //       });

      //       source.addEventListener("on_return", (e) => {
      //         const data = JSON.parse(e.data);

      //         toast.update(id, {
      //           render: "Return Accepted!",
      //           type: "success",
      //           isLoading: false,
      //           autoClose: 2000,
      //         });
      //         history.push("/storeFront/orders");
      //         source.close();
      //       });

      //       source.addEventListener("error", (e) => {
      //         console.error("Error: ", e);
      //         toast.update(id, {
      //           render: "Something went wrong",
      //           type: "error",
      //           isLoading: false,
      //           autoClose: 2000,
      //         });
      //         source.close();
      //       });

      //       return () => {
      //         source.close();
      //       };
      //     }
      //   })
      // );
    }
  };

  useEffect(() => {
    if (addressesData) {
      var tempDelivery = mainData;
      tempDelivery["delivery"] = addressesData[0];
      setMainData(tempDelivery);

      var tempBilling = mainData;
      tempBilling["billing"] = addressesData[0];
      setMainData(tempBilling);
    }
  }, [addressesData]);

  const setAddressPopup = (param) => {
    var newLocationForm = LocationForm.map((o) => {
      if (o.key == "Name") o.value = param ? mainData?.delivery?.Name : "";
      if (o.key == "phone_number")
        o.value = param ? mainData?.delivery?.phone_number : "";
      if (o.key == "address_line_1")
        o.value = param ? mainData?.delivery?.address_line_1 : "";
      if (o.key == "address_line_2")
        o.value = param ? mainData?.delivery?.address_line_2 : "";
      if (o.key == "address_line_3")
        o.value = param ? mainData?.delivery?.address_line_3 : "";
      if (o.key == "city") o.value = param ? mainData?.delivery?.city : "";
      if (o.key == "state") o.value = param ? mainData?.delivery?.state : "";
      if (o.key == "country")
        o.value = param ? mainData?.delivery?.country : "";
      if (o.key == "pincode")
        o.value = param ? mainData?.delivery?.pincode : "";
      if (o.key == "email") o.value = param ? mainData?.delivery?.email : "";
      return o;
    });
    var newLocationForm1 = {};
    newLocationForm.map((o) => {
      newLocationForm1[o.key] = o.value;
    });
    param ? setupdate(true) : setupdate(false);
    setnewlocationData(newLocationForm1);
    setLocationForm(newLocationForm);
  };

  const GetAddressData = () => {
    mainData["delivery"] = newlocationData;
    let body = {
      Name: newlocationData?.Name,
      address_line_1: newlocationData?.address_line_1,
      address_line_2: newlocationData?.address_line_2,
      address_line_3: newlocationData?.address_line_3,
      phone_number: newlocationData?.phone_number,
      email: newlocationData?.email,
      state: newlocationData?.state,
      pincode: newlocationData?.pincode,
      city: newlocationData?.city,
    };
    if (update) {
      body["id"] = mainData?.id;
    }

    update ? dispatch(updateAddress(body)) : dispatch(addAddress(body));

    setTimeout(() => {
      dispatch(loadAddresses());
    }, 500);
  };

  const handleClose = (param) => {
    if (param == "addressCard") {
      setshowAddressCard(false);
    } else {
      setOpen(false);
    }
  };

  const handleChangeAddress = (address, index) => {
    var tempDelivery = mainData;
    tempDelivery["delivery"] = address;
    tempDelivery["id"] = address?.id;
    setMainData(tempDelivery);
    setselectedAddressCard(index);
  };

  const handelSelectonChange = (key, value) => {
    console.log("key", key, "value", value);

    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
  };

  const [ItemsToReturn, setItemsToReturn] = useState([]);

  const handleCheckBoxChange = (id) => {
    if (ItemsToReturn.includes(id)) {
      setItemsToReturn(ItemsToReturn.filter((o) => o != id));
    } else {
      setItemsToReturn([...ItemsToReturn, id]);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#F5F5F5",
        padding: "16px 0 1px 0",
        height: "100%",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white",
          margin: "76px 16px 16px 16px",
          borderRadius: "10px",
          padding: "17px",
          // height: "230px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Typography sx={{ fontSize: "20px" }}>
          Do you choose to pickup the products for return at the same address?
        </Typography>
        {/* <div style={{ display: "flex", gap: "10px" }}></div> */}

        <Card sx={{ minWidth: 600, marginBottom: "20px", maxWidth: 1000 }}>
          <CardContent sx={{ paddingBottom: "14px !important" }}>
            <div className="store_Top">
              <div
                style={{
                  display: "block",
                  // width: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h7"
                  sx={{
                    lineHeight: "12px",
                    letterSpacing: " 0.5px",
                    color: " #2E2E2E",
                  }}
                >
                  <h3 style={{ color: "rgba(0, 22, 97, 1)" }}>
                    Delivery Address
                  </h3>
                </Typography>
                <Button
                  sx={
                    {
                      // float: "right",
                      // display: "block",
                      // paddingLeft: "200px",
                    }
                  }
                  variant="text"
                  onClick={() => {
                    setshowAddressCard(true);
                    setAddressPopup(false);
                  }}
                >
                  Add
                </Button>
              </div>

              {showAddressCard && (
                <ModalViewV2
                  modalTitle={"Add Address"}
                  handleConfirm={() => {
                    handleClose("addressCard");
                    GetAddressData();
                  }}
                  handleModalClose={() => {
                    handleClose("addressCard");
                  }}
                  modalOpen={showAddressCard}
                  actionBtns={
                    newlocationData.Name == "" ||
                    newlocationData.phone_number == "" ||
                    newlocationData.address_line_1 == "" ||
                    newlocationData.address_line_2 == ""
                      ? ["Cancel"]
                      : ["Cancel", "Confirm"]
                  }
                  component={"editAddress"}
                >
                  <AddForm
                    header={"Location Details"}
                    data={LocationForm.map((field) => {
                      return field;
                    })}
                    handelInputChange={handelInputChange}
                  />
                </ModalViewV2>
              )}
            </div>

            <div className="store_address_cards">
              {addressesData.map((o, index) => {
                return (
                  <div
                    className="store_cardText"
                    onClick={() => {
                      handleChangeAddress(o, index);
                    }}
                    style={{
                      border:
                        selectedAddressCard == index ? "2px solid #001661" : "",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <IconButton
                        onClick={() => {
                          handleChangeAddress(o, index);
                          setshowAddressCard(true);
                          setAddressPopup(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          dispatch(deleteAddress(o?.id));
                          setTimeout(() => {
                            dispatch(loadAddresses());
                          }, 500);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>

                    <p>{o?.Name}</p>
                    <p>{o?.address_line_1}</p>
                    <p>{o?.address_line_2}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

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
                  disabled={orderData?.items.some((o) => {
                    return (
                      o["@ondc/org/returnable"] &&
                      o["@ondc/org/returnable"].toString() == "false"
                    );
                  })}
                  value="female"
                  control={<Radio />}
                  label="Return Complete Order"
                  onChange={() => {
                    setselectedProducts(false);
                  }}
                />
                <FormControlLabel
                  disabled={orderData?.items.length == 1 ? true : false}
                  value="male"
                  control={<Radio />}
                  label="Partial Return"
                  onChange={() => {
                    setselectedProducts(true);
                  }}
                />
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
                width: "700px",
              }}
            >
              <FormGroup>
                {orderData?.items?.map((item, index) => {
                  return (
                    item["@ondc/org/returnable"] &&
                    item["@ondc/org/returnable"].toString() == "true" &&
                    item?.tags?.status != "Returned" &&
                    item?.tags?.status != "Cancelled" && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <FormControlLabel
                          control={<Checkbox />}
                          label={`${item?.descriptor?.name}  (Qty: ${item?.quantity?.count})`}
                          onChange={() => {
                            handleCheckBoxChange(item?.id);
                          }}
                        />
                        <div className="store_price_popup">
                          ₹{orderData?.quote?.breakup[index]?.price?.value}
                        </div>
                      </div>
                    )
                  );
                })}
              </FormGroup>
            </div>
          )}
          <div
            style={{
              width: "700px",
            }}
          >
            <MatSelect
              data={returnReasonsData.map((o) => {
                return {
                  id: o?.code,
                  label: o?.reason,
                };
              })}
              fieldKey="reasons"
              onChange={(e, value) => {
                handelSelectonChange("return_reason", value);
              }}
              placeholder="Select reason for Return"
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          {/* <Button
            variant="outlined"
            onClick={() => {
              setshowAddressCard(true);
            }}
          >
            Add new Address
          </Button> */}

          <Button
            disabled={
              !selectedProducts || ItemsToReturn.length > 0 ? false : true
            }
            variant="outlined"
            onClick={() => {
              handleReturnClick();
            }}
          >
            Confirm
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default ReturnItem;



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