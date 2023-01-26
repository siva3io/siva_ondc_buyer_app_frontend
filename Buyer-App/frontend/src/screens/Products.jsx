import {
  Checkbox,
  createStyles,
  FormControlLabel,
  FormGroup,
  Input,
  Pagination,
  Slider,
  Typography,
} from "@mui/material";
import Fade from "react-reveal/Fade";
import { Box } from "@mui/system";
import React from "react";
import "./Products.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Product_select_API,
  load_cart_items,
  emptyCart,
  updateCart,
  loadCities,
} from "../redux/Action/action";
import { useDispatch, useSelector } from "react-redux";

import { EventProductdata } from "../screens/LogInScreen";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

import BASE_API_SOURCE from "../baseurl";

export var cartProducts = [];
export var PayloadItems = [];

export var testingExport;
export var setItemsExport;
export var setprovidersFilterExport;
export var setcatagoriesFilterExport;
export var setfullfillmentsFilterExport;
export var setfullReturnableFilterExport;
export var setfullCancellableFilterExport;

const Shop = () => {
  toast.dismiss();

  const topBar = new CustomEvent("topBar", {
    detail: {
      bar: true,
      route: "products",
      search: true,
    },
  });
  document.dispatchEvent(topBar);

  let history = useHistory();
  let dispatch = useDispatch();
  // clearcart
  const [clearcart, setclearcart] = useState(true);

  var CartProducts1 = JSON.parse(localStorage.getItem("CartProducts"));

  var Usertoken = localStorage.getItem("token");
  //console.log("Usertoken", Usertoken)

  const { citiesData } = useSelector((state) => state.data);

  const handleClearCart = () => {
    localStorage.removeItem("CartProducts");
    const tempp = [...items];
    for (let i = 0; i < tempp?.length; i++) {
      if (tempp[i]?.quantity > 0) {
        tempp[i].quantity = 0;
      }
    }
    setItems(tempp);
    dispatch(emptyCart());
  };

  // function handleClick() {
  //   PayloadItems = [];
  //   CartProducts1 = JSON.parse(localStorage.getItem("CartProducts"));
  //   if (CartProducts1 && CartProducts1.length > 1) {
  //     cartProducts = CartProducts1[1];
  //     PayloadItems = CartProducts1[0];
  //   } else if (CartProducts1) {
  //     cartProducts = CartProducts1;
  //   }

  //   // for (let i = 0; i < PayloadItems?.length; i++) {
  //   //   PayloadItems[i]["quantity"] = cartProducts[i]?.quantity;
  //   // }

  //   // for (let i = 0; i < items?.length; i++) {
  //   //   if (items[i]?.quantity > 0) {
  //   //     const found = cartProducts.find((o) => o?.id == items[i]?.id);
  //   //     if (found) {
  //   //       cartProducts = cartProducts.filter((o) => o?.id != items[i]?.id);
  //   //     }
  //   //     cartProducts = [...cartProducts, items[i]];
  //   //     let fetchProductData = tempData.filter(
  //   //       (o) => o?.id == items[i]?.look_up_id
  //   //     )[0];
  //   //     fetchProductData["quantity"] = items[i]?.quantity;
  //   //     PayloadItems = [...PayloadItems, fetchProductData];
  //   //   }
  //   // }

  //   // dispatch(load_cart_items());

  //   var payload = {
  //     context: {
  //       //transaction_id: PayloadItems[0]?.transaction_id,
  //       bpp_uri: PayloadItems[0]?.bpp_uri,
  //       bpp_id: PayloadItems[0]?.bpp_id,
  //     },
  //     message: {
  //       order: {
  //         provider: {
  //           id: PayloadItems[0]?.provider_id,
  //           locations: [
  //             {
  //               id: PayloadItems[0]?.location_id
  //                 ? PayloadItems[0]?.location_id
  //                 : "",
  //             },
  //           ],
  //         },
  //         items: PayloadItems,
  //       },
  //       fulfillments: [
  //         {
  //           end: {
  //             location: {
  //               gps: JSON.parse(localStorage.getItem('search'))?.lat_long,
  //               // gps: PayloadItems[0]?.locations?.gps
  //               //   ? PayloadItems[0]?.locations?.gps
  //               //   : "",
  //               address: {
  //                 area_code: PayloadItems[0]?.locations?.address?.area_code
  //                   ? PayloadItems[0]?.locations?.address?.area_code
  //                   : "",
  //                   gps: JSON.parse(localStorage.getItem('search'))?.lat_long,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   };
  //   const id = toast.loading("Please wait...");
  //   dispatch(
  //     Product_select_API(payload, id, function (resp) {
  //       if (resp?.message?.ack?.status === "ACK") {
  //         const source = new EventSource(
  //           `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${resp?.context?.message_id}`
  //         );
  //         source.addEventListener("open", () => {
  //           console.log("SSE opened select!");
  //         });
  //         source.addEventListener("on_select", (e) => {
  //           const data = JSON.parse(e.data);
  //           if(data?.error && data?.error?.message)
  //           { //Error --- 889
  //             toast.update(id, {
  //               render: data?.error?.message,
  //               type: "error",
  //               isLoading: false,
  //               autoClose: 2000,
  //             });
  //           }
  //           else{
  //             localStorage.setItem("select_data", JSON.stringify(data));
  //             window.dispatchEvent(new Event("localfetchSelectData"));
  //             toast.update(id, {
  //               render: "Added to cart!",
  //               type: "success",
  //               isLoading: false,
  //               autoClose: 2000,
  //             });
  //           }
  //           source.close();
  //         });

  //         source.addEventListener("error", (e) => {
  //           const data = JSON.parse(e.data);
  //           console.error("Error: ", data);
  //           // toast.update(id, {
  //           //   render: "Something went wrong",
  //           //   type: "error",
  //           //   isLoading: false,
  //           //   autoClose: 2000,
  //           // });
  //           source.error();
  //         });

  //         return () => {
  //           source.close();
  //         };
  //       }
  //       else if(data?.error && data?.error?.message)
  //       {
  //         toast.error(data?.error?.message, {
  //           autoClose: 2000,
  //         });
  //       }
  //       else {
  //         toast.update(id, {
  //           render: "Something went wrong",
  //           type: "error",
  //           isLoading: false,
  //           autoClose: 2000,
  //         });
  //       }
  //     })
  //   );
  //   dispatch(loadCities());
  //   // dispatch(load_select_data(payload));
  //   history.push("/storeFront/cart");
  // }

  var idx = 0;
  const [cart, setCart] = useState([]);

  const [tempData, setTempData] = useState(
    JSON.parse(localStorage.getItem("AllProducts"))
  );

  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("AllProducts"))
  );

  testingExport = setTempData;
  // console.log("again");
  const [items, setItems] = useState([]);
  setItemsExport = setItems;

  const [fetchedproviders, setfetchedproviders] = useState([]);
  const [fetchedcategories, setfetchedcategories] = useState([]);
  const [fetchedfullfillments, setfetchedfullfillments] = useState([]);

  useEffect(() => {
    // console.log("again2");
    CartProducts1 = JSON.parse(localStorage.getItem("CartProducts"));
    if (CartProducts1 && CartProducts1.length > 1) {
      // console.log("inside 0");
      cartProducts = CartProducts1[1];
    }
    let newItems = tempData.map((o, index) => {
      if (items.filter((element) => element?.look_up_id == o?.id).length != 0) {
        return null;
      }
      return {
        // id: o?.descriptor?.id,
        id: index + 1,
        look_up_id: o?.id,
        name: o?.descriptor?.name.split(" ").slice(0, 3).join(" "),
        price: o?.price?.value,
        quantity:
          CartProducts1 && CartProducts1.length > 1
            ? cartProducts.find((x) => x?.look_up_id == o?.id)?.quantity !=
              undefined
              ? cartProducts.find((x) => x?.look_up_id == o?.id)?.quantity
              : 0
            : 0,
        available_quantity: o?.quantity,
        image: o?.descriptor?.images && o?.descriptor?.images[0],
        total_price: 0,
        provider: o?.provider?.name,
        category_id: o?.category_id,
        fulfillment_id: o?.fulfillment_id,
        returnable: o["@ondc/org/returnable"] ? "Yes" : "No",
        cancellable: o["@ondc/org/cancellable"] ? "Yes" : "No",
      };
    });

    newItems = newItems.filter((o) => o != null);

    let len = fetchedproviders.length;
    for (let index = 0; index < len; index++) {
      fetchedproviders.pop();
    }

    let len1 = fetchedcategories.length;
    for (let index = 0; index < len1; index++) {
      fetchedcategories.pop();
    }

    let len2 = fetchedfullfillments.length;
    for (let index = 0; index < len2; index++) {
      fetchedfullfillments.pop();
    }

    tempData.map((o) => {
      if (!fetchedproviders.includes(o?.provider?.name))
        fetchedproviders.push(o?.provider?.name);
      if (
        !fetchedcategories.includes(o?.category_id) &&
        o?.category_id != undefined
      ) {
        fetchedcategories.push(o?.category_id);
      }
      if (
        !fetchedfullfillments.includes(o?.fulfillment_id) &&
        o?.category_id != undefined
      ) {
        fetchedfullfillments.push(o?.fulfillment_id);
      }
    });
    setItems([...items, ...newItems]);
  }, [tempData, clearcart]);

  React.useEffect(() => {
    function handleResize() {
      const listitems = JSON.parse(localStorage.getItem("AllProducts"));

      let newItems = [];
      listitems.map((o) => {
        let temp = tempData.filter((e) => o?.id == e?.id);
        if (temp.length == 0) {
          newItems = [...newItems, o];
        }
      });

      if (newItems.length != 0) {
        setTempData([...tempData, ...newItems]);
        // setTempData([...newItems]);
      }
      listitems.map((o) => {
        if (!fetchedproviders.includes(o?.provider?.name))
          fetchedproviders.push(o?.provider?.name);
        if (
          !fetchedcategories.includes(o?.category_id) &&
          o?.category_id != undefined
        ) {
          fetchedcategories.push(o?.category_id);
        }
        if (
          !fetchedfullfillments.includes(o?.fulfillment_id) &&
          o?.category_id != undefined
        ) {
          fetchedfullfillments.push(o?.fulfillment_id);
        }
      });
    }
    window.addEventListener("storage", handleResize);

    return () => {
      window.removeEventListener("storage", handleResize);
    };
  });

  const [checkoutprice, setCheckoutprice] = useState(0);
  let checkoutTemp = 0;

  // useEffect(() => {
  //   for (let i = 0; i < items?.length; i++) {
  //     if (items[i].quantity > 0) {
  //       checkoutTemp =
  //         checkoutTemp + items[i].quantity * parseFloat(items[i].price);
  //       // cartProducts = [...cartProducts, items[i]];
  //     }
  //   }
  //   setCheckoutprice(checkoutTemp);
  // }, [items]);

  React.useEffect(() => {
    function handleCartItemsChange() {
      if (localStorage.getItem("CartProducts")) {
        CartProducts1 = JSON.parse(localStorage.getItem("CartProducts"));
        cartProducts = CartProducts1[1];
        PayloadItems = CartProducts1[0];
      }
      // console.log("cartProducts", cartProducts);
      for (let i = 0; i < cartProducts?.length; i++) {
        if (cartProducts[i].quantity > 0) {
          checkoutTemp =
            checkoutTemp +
            cartProducts[i].quantity * parseFloat(cartProducts[i].price);
        }
      }
      setCheckoutprice(checkoutTemp);
    }
    window.addEventListener("CartItemstorage", handleCartItemsChange);

    return () => {
      window.removeEventListener("CartItemstorage", handleCartItemsChange);
    };
  });

  const updateCartItems = () => {
    CartProducts1 = JSON.parse(localStorage.getItem("CartProducts"));
    if (CartProducts1 && CartProducts1.length > 1) {
      cartProducts = CartProducts1[1];
      PayloadItems = CartProducts1[0];
    } else if (CartProducts1) {
      cartProducts = CartProducts1;
    }

    let temptransactionId = "";

    dispatch(
      load_cart_items(function (resp) {
        temptransactionId = resp?.data?.transactionId;

        let payload = {
          context: {
            transaction_id: PayloadItems[0]?.transaction_id,
            bpp_uri: PayloadItems[0]?.bpp_uri,
            bpp_id: PayloadItems[0]?.bpp_id,
          },
          message: {
            order: {
              provider: {
                id: PayloadItems[0]?.provider_id,
                locations: [
                  {
                    id: PayloadItems[0]?.location_id
                      ? PayloadItems[0]?.location_id
                      : "",
                  },
                ],
              },
              items: PayloadItems,
            },
            fulfillments: [
              {
                end: {
                  location: {
                    gps: JSON.parse(localStorage.getItem("search"))?.lat_long,
                    // gps: PayloadItems[0]?.locations?.gps
                    //   ? PayloadItems[0]?.locations?.gps
                    //   : "",
                    address: {
                      area_code: PayloadItems[0]?.locations?.address?.area_code
                        ? PayloadItems[0]?.locations?.address?.area_code
                        : "",
                      gps: JSON.parse(localStorage.getItem("search"))?.lat_long,
                    },
                  },
                },
              },
            ],
          },
        };

        dispatch(updateCart(temptransactionId, payload));
      })
    );
  };

  // -----------------------------------decrement start----------------------------------------------------

  const decrement = (i) => {
    // console.log("decrement", i);
    const temp = [...items];
    temp[i.id - 1].quantity = temp[i.id - 1].quantity - 1;
    setItems(temp);

    CartProducts1 = JSON.parse(localStorage.getItem("CartProducts"));
    cartProducts = CartProducts1[1];
    PayloadItems = CartProducts1[0];

    if (temp[i.id - 1].quantity < 1) {
      // console.log("quantity less than 1");
      PayloadItems = PayloadItems.filter((o) => o?.id != i?.look_up_id);
      cartProducts = cartProducts.filter((o) => o?.look_up_id != i?.look_up_id);
    } else {
      // console.log("quantity greater than 1");
      let objIndex = cartProducts.findIndex(
        (obj) => obj.look_up_id == i?.look_up_id
      );
      cartProducts[objIndex].quantity -= 1;
      PayloadItems[objIndex].quantity -= 1;
    }
    localStorage.setItem(
      "CartProducts",
      JSON.stringify([PayloadItems, cartProducts])
    );

    window.dispatchEvent(new Event("CartItemstorage"));
    setclearcart(!clearcart);

    //update Cart items to Api
    //updateCartItems();
  };

  // -----------------------------------decrement end----------------------------------------------------

  // -----------------------------------increment start----------------------------------------------------
  const increment = (i) => {
    // console.log("increment", i);
    const temp = [...items];
    temp[i.id - 1].quantity = temp[i.id - 1].quantity + 1;
    setItems(temp);

    // PayloadItems = [];
    CartProducts1 = JSON.parse(localStorage.getItem("CartProducts"));
    if (
      CartProducts1 &&
      CartProducts1.length == 2 &&
      CartProducts1[1].length != 0 &&
      CartProducts1[0].length != 0
    ) {
      // console.log("Cart not empty");
      cartProducts = CartProducts1[1];
      PayloadItems = CartProducts1[0];

      let alreadyInCart =
        PayloadItems.filter((e) => e.id === i?.look_up_id).length > 0;

      if (!alreadyInCart) {
        // console.log("not in cart");
        let tempPayloadItem = tempData.find((o) => o?.id == i?.look_up_id);

        tempPayloadItem["quantity"] = i?.quantity;

        localStorage.setItem(
          "CartProducts",
          JSON.stringify([
            [...PayloadItems, tempPayloadItem],
            [...cartProducts, i],
          ])
        );
      } else {
        // console.log("already in cart");
        let objIndex = cartProducts.findIndex(
          (obj) => obj.look_up_id == i?.look_up_id
        );

        cartProducts[objIndex].quantity += 1;
        PayloadItems[objIndex].quantity += 1;

        localStorage.setItem(
          "CartProducts",
          JSON.stringify([PayloadItems, cartProducts])
        );
      }
    } else {
      // console.log("First Cart Item");

      let tempPayloadItem = tempData.find((o) => o?.id == i?.look_up_id);

      tempPayloadItem["quantity"] = i?.quantity;

      localStorage.setItem(
        "CartProducts",
        JSON.stringify([[tempPayloadItem], [i]])
      );
    }

    window.dispatchEvent(new Event("CartItemstorage"));
    setclearcart(!clearcart);

    //update Cart items to Api
    //updateCartItems();
  };

  // -----------------------------------increment end----------------------------------------------------

  const [value1, setValue1] = React.useState([20, 37]);
  const minDistance = 10;

  const handleChange1 = (event, newValue, activeThumb) => {
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const styles = createStyles({
    formControlLabel: { fontSize: "20rem", "& label": { fontSize: "20rem" } },
  });

  const handleProductView = (index) => {
    history.push(`/storeFront/productView/${index}`);
  };

  // let providersFilter = [];

  const [providersFilter, setprovidersFilter] = useState([]);
  const [catagoriesFilter, setcatagoriesFilter] = useState([]);
  const [fullfillmentsFilter, setfullfillmentsFilter] = useState([]);
  const [ReturnableFilter, setReturnableFilter] = useState([]);
  const [CancellableFilter, setCancellableFilter] = useState([]);

  setprovidersFilterExport = setprovidersFilter;
  setcatagoriesFilterExport = setcatagoriesFilter;
  setfullfillmentsFilterExport = setfullfillmentsFilter;

  const handleCheckBoxClick = (type, id) => {
    console.log("type", type);
    console.log("id", id);
    if (type == "providers") {
      if (providersFilter.find((o) => o == id)) {
        setprovidersFilter(providersFilter.filter((o) => o != id));
      } else {
        setprovidersFilter([...providersFilter, id]);
      }
    } else if (type == "catagories") {
      if (catagoriesFilter.find((o) => o == id)) {
        setcatagoriesFilter(catagoriesFilter.filter((o) => o != id));
      } else {
        setcatagoriesFilter([...catagoriesFilter, id]);
      }
    } else if (type == "fullfillements") {
      if (fullfillmentsFilter.find((o) => o == id)) {
        setfullfillmentsFilter(fullfillmentsFilter.filter((o) => o != id));
      } else {
        setfullfillmentsFilter([...fullfillmentsFilter, id]);
      }
    } else if (type == "Cancellable") {
      if (CancellableFilter.find((o) => o == id)) {
        setCancellableFilter(CancellableFilter.filter((o) => o != id));
      } else {
        setCancellableFilter([...CancellableFilter, id]);
      }
    } else if (type == "Returnable") {
      if (ReturnableFilter.find((o) => o == id)) {
        setReturnableFilter(ReturnableFilter.filter((o) => o != id));
      } else {
        setReturnableFilter([...ReturnableFilter, id]);
      }
    }
  };

  // console.log("providersFilter", providersFilter);

  const handleApplyFilter = () => {
    // console.log("ApplyFilter");
    // console.log("providersFilter", providersFilter);
    // console.log("Items", items);
    // let newItems = [];
    // setItems(items.filter((o) => o?.provider == providersFilter[0]));
  };

  let searchedProduct =
    localStorage.getItem("search") &&
    JSON.parse(localStorage.getItem("search"))["search_key"];

  return (
    <Box sx={{ width: "100%", backgroundColor: "#F5F5F5", paddingTop: "16px" }}>
      <div className="pl-BackgroundBody">
        <div className="pl-SearchText">
          Searching for {searchedProduct} results
        </div>
        <div className="pl-gridAllfilter">
          <div className="pl-filterDiv">
            <div className="pl-filterHeader">Filters</div>
            <div className="pl-filterContent">
              {/* <div className="pl-filterHeader2">Price Range</div> */}
              {/* <div className="pl-priceranger">
                <div>0</div>
                <div className="pl-priceranger1">
                  <Slider
                    getAriaLabel={() => "Minimum distance"}
                    value={value1}
                    onChange={handleChange1}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                  />
                </div>
                <div>100</div>
                <div className="pl-priceranger2">
                  <Input
                    value={value}
                    size="small"
                    onChange={handleInputChange}
                    inputProps={{
                      step: 50,
                      min: 0,
                      max: 100,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </div>
              </div> */}
              <div className="pl-filterHeader2">Providers</div>
              <div className="pl-checkbox">
                <FormGroup style={{ gap: "5px" }}>
                  {fetchedproviders.map((o) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={() => {
                              handleCheckBoxClick("providers", o);
                            }}
                          />
                        }
                        label={
                          <Box component="div" fontSize={14}>
                            {/* {o?.provider?.name} */}
                            {o} ({items.filter((p) => p?.provider == o).length})
                          </Box>
                        }
                      />
                    );
                  })}
                </FormGroup>
              </div>
              <div className="pl-filterHeader2">Categories</div>
              <div className="pl-checkbox">
                <FormGroup style={{ gap: "5px" }}>
                  {fetchedcategories.map((o) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={() => {
                              handleCheckBoxClick("catagories", o);
                              // handleCheckBoxClick(o);
                            }}
                          />
                        }
                        label={
                          <Box component="div" fontSize={14}>
                            {o} (
                            {items.filter((p) => p?.category_id == o).length})
                          </Box>
                        }
                      />
                    );
                  })}
                </FormGroup>
              </div>
              <div className="pl-filterHeader2">Fullfilments</div>
              <div className="pl-checkbox">
                <FormGroup style={{ gap: "5px" }}>
                  {fetchedfullfillments.map((o) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={() => {
                              handleCheckBoxClick("fullfillements", o);
                              // handleCheckBoxClick(o);
                            }}
                          />
                        }
                        label={
                          <Box component="div" fontSize={14}>
                            {o == "1" ? "Delivery" : o} (
                            {items.filter((p) => p?.fulfillment_id == 1).length}
                            )
                          </Box>
                        }
                      />
                    );
                  })}
                </FormGroup>
              </div>
              <div className="pl-filterHeader2">Cancellable</div>
              <div className="pl-checkbox">
                <FormGroup style={{ gap: "5px" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          handleCheckBoxClick("Cancellable", "Yes");
                        }}
                      />
                    }
                    label={
                      <Box component="div" fontSize={14}>
                        Yes (
                        {items.filter((o) => o?.cancellable == "Yes").length})
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          handleCheckBoxClick("Cancellable", "No");
                        }}
                      />
                    }
                    label={
                      <Box component="div" fontSize={14}>
                        No ({items.filter((o) => o?.cancellable == "No").length}
                        )
                      </Box>
                    }
                  />
                </FormGroup>
              </div>
              <div className="pl-filterHeader2">Returnable</div>
              <div className="pl-checkbox">
                <FormGroup style={{ gap: "5px" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          handleCheckBoxClick("Returnable", "Yes");
                        }}
                      />
                    }
                    label={
                      <Box component="div" fontSize={14}>
                        Yes (
                        {items.filter((o) => o?.returnable == "Yes").length})
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          handleCheckBoxClick("Returnable", "No");
                        }}
                      />
                    }
                    label={
                      <Box component="div" fontSize={14}>
                        No ({items.filter((o) => o?.returnable == "No").length})
                      </Box>
                    }
                  />
                </FormGroup>
              </div>
            </div>
            {/* <div className="pl-filterFooter">
              <div className="pl-filterFooter1">
                <button
                  class="pl-filterbutton button1"
                  onClick={() => {
                    handleApplyFilter();
                  }}
                >
                  Apply Filter
                </button>
              </div>
            </div> */}
          </div>
          {tempData.length == 0 ? (
            <div
              className="spinner-container"
              style={{ display: "flex", height: "70vh", width: "70vw" }}
            >
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="pl-gridAllCards">
              <div className="pl-gridcards">
                {/* ?.filter(o=> ReturnableFilter.length == 0 || ReturnableFilter.includes(o['@ondc/org/returnable'])) */}
                {items?.map((i, index) => {
                  // console.log("ii", i);
                  if (
                    (providersFilter.length == 0 ||
                      providersFilter.includes(i?.provider)) &&
                    (catagoriesFilter.length == 0 ||
                      catagoriesFilter.includes(i?.category_id)) &&
                    (fullfillmentsFilter.length == 0 ||
                      fullfillmentsFilter.includes(i?.fulfillment_id)) &&
                    (ReturnableFilter.length == 0 ||
                      ReturnableFilter.includes(i?.returnable)) &&
                    (CancellableFilter.length == 0 ||
                      CancellableFilter.includes(i?.cancellable))
                  )
                    return (
                      <Fade>
                        <div
                          className="pl-productCardbody"
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            className="pl-productCard-img"
                            src={i.image}
                            alt="alternatetext"
                            width="120"
                            height="120"
                            onClick={() => {
                              handleProductView(i?.look_up_id);
                            }}
                          ></img>
                          <div
                            className="pl-productCard-header"
                            onClick={() => {
                              handleProductView(i?.look_up_id);
                            }}
                          >
                            {i.name}
                          </div>
                          <div
                            className="pl-productCard-content"
                            onClick={() => {
                              handleProductView(i?.look_up_id);
                            }}
                          >
                            {i.provider}
                          </div>
                          <div className="store-pl-productCard-pricebody">
                            <div className="pl-productCard-price">
                              {" "}
                              ₹ {i.price}
                            </div>
                            {i.quantity == 0 && (
                              <div className="pl-productCard-cartButton">
                                <Button
                                  className="pl-productCard-button1"
                                  variant="contained"
                                  style={{ width: "100px", maxHeight: "30px" }}
                                  onClick={() => increment(i)}
                                >
                                  <AddShoppingCartIcon
                                    style={{ color: "white", size: "10px" }}
                                  />
                                </Button>
                              </div>
                            )}

                            {i.quantity != 0 && (
                              <div className="pl-cart-allButton">
                                <button
                                  className="pl-cart-minusButton"
                                  onClick={() => decrement(i)}
                                >
                                  -
                                </button>
                                <div>{i.quantity}</div>
                                <button
                                  disabled={
                                    i?.quantity >=
                                    i?.available_quantity?.available?.count
                                      ? true
                                      : false
                                  }
                                  style={{
                                    backgroundColor:
                                      i?.quantity >=
                                      i?.available_quantity?.available?.count
                                        ? "dimgray"
                                        : "#416bff",
                                  }}
                                  className={
                                    i?.available_quantity?.available?.count
                                      ? i?.quantity <
                                        i?.available_quantity?.available?.count
                                        ? "pl-cart-plusButton"
                                        : ""
                                      : "pl-cart-plusButton"
                                  }
                                  onClick={() => increment(i)}
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </Fade>
                    );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="store-pl-pagination">
          <div className="store-pagination-second">
            <div className="pagination-price" style={{ margin: "0 50px 0 0" }}>
              Price: ₹{checkoutprice}
              {Number.isInteger(checkoutprice) && ".00"}
            </div>
            <div
              className="pagination-checkout"
              style={{ margin: "0 15px 0 0" }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  handleClearCart();
                }}
              >
                Clear Cart
              </Button>
            </div>
            <div className="pagination-checkout">
              {
              // localStorage.getItem("cartProducts") != null &&
              (
                Usertoken &&
                <Link to="/storeFront/cart">
                  <Button variant="contained">
                    Checkout
                  </Button>
                </Link>
                ||
                <Link to="/Signin">
                  <Button variant="contained">
                    Checkout
                  </Button>
                </Link>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Shop;



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