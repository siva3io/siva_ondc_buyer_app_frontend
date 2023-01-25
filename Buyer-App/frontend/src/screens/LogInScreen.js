import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LoginScreen.css";
import { Link, useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { load_products_sync } from "../redux/Action/action";
import MatSelect from "Remote/MatDropDown";
export var mainSearchData = {};
import { Product_Search_API } from "../redux/Action/action";
import { toast } from "react-toastify";

import BASE_API_SOURCE from "../baseurl";

import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@mui/material";
toast.configure();
export var EventProductdata = [];

const LogInScreen = () => {
  toast.dismiss();
  EventProductdata = [];
  let dispatch = useDispatch();
  const [age, setAge] = React.useState(
    JSON.parse(localStorage.getItem("search"))?.search_type
      ? JSON.parse(localStorage.getItem("search"))?.search_type
      : 10
  );

  const [buttondisabled, setbuttondisabled] = useState(
    mainSearchData?.search_key == null ||
      mainSearchData?.search_key == "" ||
      mainSearchData?.city == null ||
      mainSearchData?.city == "" ||
      mainSearchData?.label == null ||
      mainSearchData?.label == ""
      ? true
      : false
  );
  //Loading
  const [Loading, setLoading] = useState(false);

  localStorage.setItem("CartProducts", JSON.stringify([]));
  localStorage.setItem("AllProducts", JSON.stringify(EventProductdata));
  localStorage.removeItem("init_data");
  localStorage.removeItem("search");
  localStorage.removeItem("select_data");

  const [combinedData, setcombinedData] = useState([]);
  const [eventData, setEventData] = useState([]);

  const { citiesData } = useSelector((state) => state.data);

  const topBar = new CustomEvent("topBar", {
    detail: {
      bar: false,
      route: "login",
      search: false,
    },
  });
  document.dispatchEvent(topBar);
  let history = useHistory();

  // useEffect(() => {
  //   localStorage.setItem("AllProducts", JSON.stringify(combinedData));
  // }, [combinedData]);

  // useEffect(() => {
  //   dispatch(loadCities());
  // }, []);

  const handelSelectonChange = (data) => {
    mainSearchData["city"] = data.id;
    mainSearchData["label"] = data.label;
    mainSearchData["lat_long"] = data.lat_long;
    mainSearchData["pincode"] = data?.pincode ? data?.pincode : "";

    if (
      mainSearchData?.search_key == null ||
      mainSearchData?.search_key == "" ||
      mainSearchData?.city == null ||
      mainSearchData?.city == "" ||
      mainSearchData?.label == null ||
      mainSearchData?.label == ""
    ) {
      setbuttondisabled(true);
    } else {
      setbuttondisabled(false);
    }
  };

  const handleChange = (SelectChangeEvent) => {
    setAge(SelectChangeEvent.target.value);
    mainSearchData["search_type"] = SelectChangeEvent.target.value;
    // console.log(age);
  };

  const [underText, setunderText] = useState(false);

  const handelInputChange = (key, value) => {
    var onlyWhiteSpaces = /^\s*$/;
    var letters = /^[0-9A-Za-z\s@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*$/;
    // console.log(mainSearchData);
    mainSearchData[key] = value;

    if (
      mainSearchData?.search_key == null ||
      mainSearchData?.search_key == "" ||
      mainSearchData?.search_key.match(onlyWhiteSpaces) ||
      !mainSearchData?.search_key.match(letters) ||
      mainSearchData?.city == null ||
      mainSearchData?.city == "" ||
      mainSearchData?.label == null ||
      mainSearchData?.label == ""
    ) {
      setbuttondisabled(true);
    } else {
      setbuttondisabled(false);
    }

    if (
      (mainSearchData?.search_key.match(onlyWhiteSpaces) ||
        !mainSearchData?.search_key.match(letters)) &&
      mainSearchData?.search_key != "" &&
      mainSearchData?.search_key != null
    ) {
      setunderText(true);
    } else {
      setunderText(false);
    }
  };

  function checkImage(url) {
    var image = new Image();
    image.onload = function () {
      if (this.width > 0) {
        // console.log("image exists");
        return true;
      }
    };
    image.onerror = function () {
      return false;
      // console.log("image doesn't exist");
    };
    image.src = url;
  }

  const handleButtonClick = (param) => {
    if (mainSearchData["search_type"] == undefined) {
      mainSearchData["search_type"] = 10;
    }
    localStorage.setItem("search", JSON.stringify(mainSearchData));
    window.dispatchEvent(new Event("localfetchSearchedData"));
    setLoading(true); 
    var body = {
      context: {
        cityCode: mainSearchData?.city,
      },
      message: {
        criteria: {
          search_string: age == 10 ? mainSearchData?.search_key : undefined,
          provider_name: age == 20 ? mainSearchData?.search_key : undefined,
          category_name: age == 30 ? mainSearchData?.search_key : undefined,
          delivery_location: mainSearchData?.lat_long,
        },
        payment: {
          "@ondc/org/buyer_app_finder_fee_type": "percent",
          "@ondc/org/buyer_app_finder_fee_amount": "3",
        },
      },
    };

    dispatch(
      Product_Search_API(body, function (resp) {
        if (resp?.message?.ack?.status === "ACK") {
          const source = new EventSource(
            `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${resp?.context?.message_id}`
          );
          source.addEventListener("open", () => {
            console.log("SSE opened!");
          });

          source.addEventListener("on_search", (e) => {
            const data = JSON.parse(e.data);
            console.log(data);
            // setEventData(() => JSON.parse(e.data));
            if (
              data?.message?.catalog["bpp/providers"] &&
              data?.message?.catalog["bpp/providers"].length > 0 &&
              data?.message?.catalog["bpp/providers"][0]?.items &&
              data?.message?.catalog["bpp/providers"][0]?.items.length > 0
            ) {
              data?.message?.catalog["bpp/providers"].map((o) => {
                o?.items.map((e) => {
                  e["provider"] = o?.descriptor;
                  e["provider_id"] = o?.id;
                  e["locations"] =
                    o?.locations && o?.locations.length > 0
                      ? o?.locations[0]
                      : [];
                  e["city_code"] = data?.context?.city;
                  e["bpp_id"] = data?.context?.bpp_id;
                  e["bpp_uri"] = data?.context?.bpp_uri;
                  e["transaction_id"] = data?.context?.transaction_id;
                  e["bppDescriptor"] =
                    data?.message?.catalog["bpp/descriptor"] !== undefined &&
                    data?.message?.catalog["bpp/descriptor"];
                  // image validation----------------
                  if (
                    (e?.descriptor?.images &&
                      e?.descriptor?.images.length != 0 &&
                      checkImage(e?.descriptor?.images[0])) ||
                    e?.descriptor?.images == undefined ||
                    (e?.descriptor?.images &&
                      (e?.descriptor?.images[0] == "--placeholder--" ||
                        e?.descriptor?.images.length == 0))
                  ) {
                    e["descriptor"]["images"] = [
                      "https://dev-api.eunimart.com/files/images/default_img.jpg",
                    ];
                  }
                });
                EventProductdata = [...EventProductdata, ...o?.items];
                setcombinedData(EventProductdata);
                localStorage.setItem(
                  "AllProducts",
                  JSON.stringify(EventProductdata)
                );
                window.dispatchEvent(new Event("storage"));
              });
            }
          });

          source.addEventListener("error", (e) => {});

          return () => {
            source.close();
          };
        } else if (data?.error && data?.error?.message) {
          toast.error(data?.error?.message, {
            autoClose: 2000,
          });
        } else {
          toast.error("Something went wrong", {
            autoClose: 2000,
          });
        }
      })
    );
    setLoading(false);
    // setSearchedProducts();
    history.push("/storeFront/products");
  };

  // useEffect(() => {
  //   EventProductdata = Object.assign(combinedData);
  // }, [combinedData]);

  function handleClick(type) {
    if (type == "cart") {
      history.push("/storeFront/cartpage");
    } else if (type == "orders") {
      history.push("/storeFront/orders");
    } else if (type == "products") {
      history.push("/storeFront/products");
    }
  }

  function handleLogout() {
    // console.log("handleLogout");
    localStorage.setItem("logout", "fromBuyer");
    localStorage.removeItem("user_data");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    window.location.replace("/storeFront");
    // window.open("https://frontend.eunimart.com/", "_self");
  }

  var Usertoken = localStorage.getItem("token");

  return (
    <div
      style={{ height: "100vh" }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !buttondisabled) {
          // console.log("key pressed", e.key);
          handleButtonClick();
        }
      }}
    >
      <div className="top_bar_wrapper_login">
      {Usertoken &&
        <>
        <Button
          className="top_bottom"
          variant="text"
          onClick={() => {
            handleClick("cart");
          }}
        >
          Cart
        </Button>
        <Button
          className="top_bottom"
          variant="text"
          onClick={() => {
            handleClick("orders");
          }}
        >
          My Orders
        </Button>

        </>
      }
        {Usertoken &&
        <Button
          className="top_bottom"
          variant="text"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </Button>
        ||
        <Link to="/Signin">
        <Button className="top_bottom" variant="text">
          Login
        </Button>
        </Link>
        }
      </div>

      <div style={{ marginTop: "10%" }}>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <img
            src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
            width="200px"
            height="100px"
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: 400,
                height: "50px",
              }}
            >
              <MatSelect
                // style={{ height: "55px" }}
                disabled={false}
                data={citiesData.map((o) => {
                  return {
                    id: o.Code,
                    label: o.City,
                    lat_long: o.lat_long,
                    pincode: o?.pincode,
                  };
                })}
                fieldKey="city"
                onChange={(e, value) => {
                  handelSelectonChange(value);
                }}
                value={mainSearchData?.label}
                placeholder="Location"
              />
            </Paper>
            <div>
              <Paper
                component="form"
                variant="outlined"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: 500,
                  height: "50px",
                  boxShadow:
                    "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px",
                }}
              >
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={age}
                  label=""
                  onChange={handleChange}
                  style={{ height: "inherit", margin: "-1px" }}
                >
                  <MenuItem value={10}>Product</MenuItem>
                  <MenuItem value={20}>Provider</MenuItem>
                  <MenuItem value={30}>Category</MenuItem>
                </Select>

                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  defaultValue={mainSearchData?.search_key}
                  placeholder="Search"
                  onChange={(e) => {
                    handelInputChange("search_key", e.target.value);
                  }}
                  style={{ marginLeft: "15px", height: "inherit" }}
                />
              </Paper>

              <Typography style={{ color: "red" }}>
                {underText && "Please enter valid characters"}
              </Typography>
            </div>
          </div>
          {Loading ? (
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <Button
              style={{
                width: "100px",
                color: "white",

                backgroundColor: !buttondisabled ? "gray" : "lightgray",
                padding: "5px",
                borderRadius: "20px",
                border: "none",
              }}
              disabled={buttondisabled}
              onClick={() => {
                handleButtonClick();
              }}
            >
              Search
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogInScreen;



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