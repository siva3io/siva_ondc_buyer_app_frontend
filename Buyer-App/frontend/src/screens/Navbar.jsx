import React, { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Payments.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import MicNoneIcon from "@mui/icons-material/MicNone";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Button from "@mui/material/Button";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link, useHistory } from "react-router-dom";

import MatSelect from "Remote/MatDropDown";
import { loadCities } from "../redux/Action/action";
import { Product_Search_API } from "../redux/Action/action";
var EventProductdata = [];

import {
  testingExport,
  setItemsExport,
  setprovidersFilterExport,
  setcatagoriesFilterExport,
  setfullfillmentsFilterExport,
} from "./Products";

import BASE_API_SOURCE from "../baseurl";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Navbar() {
  const [mainSearchData, setmainSearchData] = useState(
    JSON.parse(localStorage.getItem("search"))
  );

  const [age, setAge] = React.useState(
    JSON.parse(localStorage.getItem("search"))?.search_type
      ? JSON.parse(localStorage.getItem("search"))?.search_type
      : 10
  );

  const [buttondisabled, setbuttondisabled] = useState(
    mainSearchData?.search_key == "" ||
      mainSearchData?.city == "" ||
      mainSearchData?.label == ""
      ? true
      : false
  );

  // console.log("mainSearchData", mainSearchData);

  const [barCondition, setbarCondition] = React.useState(false);

  const [SearchCondition, setSearchCondition] = useState(false);

  const [CityValue, setCityValue] = useState(mainSearchData?.label);
  const [combinedData, setcombinedData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [CurrentRoute, setCurrentRoute] = useState("");

  let history = useHistory();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCities());
  }, []);

  // window.dispatchEvent(new Event("storage"));

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

  const handleButtonClick = () => {
    testingExport([]);
    setItemsExport([]);
    setprovidersFilterExport([]);
    setcatagoriesFilterExport([]);
    setfullfillmentsFilterExport([]);

    localStorage.setItem("search", JSON.stringify(mainSearchData));

    EventProductdata = [];

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
          source.addEventListener("open", () => {});

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
                // setcombinedData(EventProductdata);
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
  };

  React.useEffect(() => {
    function handleResize() {
      let fetchedSearchedData = JSON.parse(localStorage.getItem("search"));
      setmainSearchData(fetchedSearchedData);
      setCityValue(fetchedSearchedData?.label);
      setAge(fetchedSearchedData?.search_type);
    }
    window.addEventListener("localfetchSearchedData", handleResize);

    return () => {
      window.removeEventListener("localfetchSearchedData", handleResize);
    };
  });

  const { citiesData } = useSelector((state) => state.data);

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
    localStorage.setItem("logout", "fromBuyer");
    window.dispatchEvent(new Event("storage"));
    localStorage.removeItem("token");
    window.location.replace("/storeFront");
    // window.open("https://frontend.eunimart.com/", "_self");
  }

  document.addEventListener("topBar", (e) => {
    if (e.detail.bar == true) {
      setbarCondition(true);
    } else {
      setbarCondition(false);
    }
    setCurrentRoute(e.detail.route);
    if (e.detail.search == true) {
      setSearchCondition(true);
    } else {
      setSearchCondition(false);
    }
  });

  const handleChange = (SelectChangeEvent) => {
    setAge(SelectChangeEvent.target.value);
    var newmainSearchData = mainSearchData;
    newmainSearchData["search_type"] = SelectChangeEvent.target.value;
    setmainSearchData(newmainSearchData);
    // console.log(age);
    // localStorage.setItem("search", JSON.stringify(newmainSearchData));
  };

  const handelSelectonChange = (data) => {
    var newmainSearchData = mainSearchData;
    newmainSearchData["city"] = data.id;
    newmainSearchData["label"] = data.label;
    newmainSearchData["lat_long"] = data.lat_long;
    newmainSearchData["pincode"] = data?.pincode ? data?.pincode : "";

    setmainSearchData(newmainSearchData);
    setCityValue(data.label);

    if (
      newmainSearchData?.search_key == null ||
      newmainSearchData?.search_key == "" ||
      newmainSearchData?.city == null ||
      newmainSearchData?.city == "" ||
      newmainSearchData?.label == null ||
      newmainSearchData?.label == ""
    ) {
      setbuttondisabled(true);
    } else {
      setbuttondisabled(false);
    }

    // localStorage.setItem("search", JSON.stringify(newmainSearchData));
  };

  const handelInputChange = (key, value) => {
    var newmainSearchData = mainSearchData;
    newmainSearchData[key] = value;
    setmainSearchData(newmainSearchData);

    var onlyWhiteSpaces = /^\s*$/;
    var letters = /^[0-9A-Za-z\s@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*$/;
    if (
      newmainSearchData?.search_key == null ||
      newmainSearchData?.search_key == "" ||
      newmainSearchData?.search_key.match(onlyWhiteSpaces) ||
      !newmainSearchData?.search_key.match(letters) ||
      newmainSearchData?.city == null ||
      newmainSearchData?.city == "" ||
      newmainSearchData?.label == null ||
      newmainSearchData?.label == ""
    ) {
      setbuttondisabled(true);
    } else {
      setbuttondisabled(false);
    }
    // localStorage.setItem("search", JSON.stringify(newmainSearchData));
  };
  var Usertoken = localStorage.getItem("token");
  return (
    <>
      {barCondition && (
        <div className="top_bar">
          <div className="top_bar_wrapper">
            <div className="left_top_wrapper">
              <img
                onClick={() => {
                  history.push("/storeFront");
                }}
                src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                style={{
                  height: "55px",
                  width: "100px",
                  cursor: "pointer",
                }}
                alt="siva"
              />
              {SearchCondition && (
                <div
                  style={{ display: "contents" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !buttondisabled) {
                      // console.log("key pressed", e.key);
                      handleButtonClick();
                    }
                  }}
                >
                  <Paper
                    component="form"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      maxWidth: "300px",
                      minWidth: "220px",
                      height: "50px",
                    }}
                  >
                    <MatSelect
                      disabled={false}
                      value={CityValue}
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
                    />
                  </Paper>

                  <Paper
                    component="form"
                    variant="outlined"
                    sx={{
                      display: "flex",
                      alignItems: "center",

                      maxWidth: "400px",
                      minWidth: "300px",
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
                      placeholder="Search"
                      defaultValue={mainSearchData?.search_key}
                      onChange={(e) => {
                        handelInputChange("search_key", e.target.value);
                      }}
                      style={{ marginLeft: "15px", height: "inherit" }}
                    />
                  </Paper>

                  <Button
                    style={{
                      width: "100px",
                      color: "white",
                      height: "35px",

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
                </div>
              )}

              {/* <Paper
                component="form"
                sx={{ display: "flex", alignItems: "center", width: 400 }}
              >
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon style={{ color: "#5D5D5D" }} />
                </IconButton>

                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Location"
                  inputProps={{ "aria-label": "search google maps" }}
                />

                <IconButton
                  color="primary"
                  sx={{ p: "10px" }}
                  aria-label="directions"
                >
                  <AddLocationIcon style={{ color: "#5D5D5D" }} />
                </IconButton>
              </Paper>

              <Paper
                component="form"
                sx={{ display: "flex", alignItems: "center", width: 500 }}
              >

                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={age}
                  label=""
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Product</MenuItem>
                  <MenuItem value={20}>Provider</MenuItem>
                  <MenuItem value={30}>Category</MenuItem>
                </Select>

                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search google maps" }}
                />
              </Paper> */}
            </div>
            <div className="right_top_wrapper">
              {/* <Button
                className="top_bottom"
                variant="text"
                onClick={() => {
                  handleClick("products");
                }}
              >
                Products
              </Button> */}
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
          </div>
        </div>
      )}
    </>
  );
}
export default Navbar;

/*			
Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)			
All rights reserved.			
This program is free software: you can redistribute it and/or modify			
it under the terms of the GNU General Public License as published by			
the Free Software Foundation, either version 3 of the License, or			
(at your option) any later version.			
This program is distributed in the hope that it will be useful,			
but WITHOUT ANY WARRANTY; without even the implied warranty of			
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the			
GNU General Public License for more details.			
You should have received a copy of the GNU General Public License			
along with this program. If not, see <http://www.gnu.org/licenses/>.			
*/
