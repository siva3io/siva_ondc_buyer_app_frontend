import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import "./CartPage.css";
import { useDispatch, useSelector } from "react-redux";
import { Product_select_API } from "../redux/Action/action";

import moment from "moment";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

import BASE_API_SOURCE from "../baseurl";

const left = {
  color: "#aaa",
  flexBasis: "35%",
  fontSize: "14px",
  margin: "0",
};

const right = {
  color: "#606161",
  flexBasis: "65%",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const title = {
  color: "#606161",
  fontSize: "24px",
  fontWeight: "500",
  margin: "0",
};

const product_tag = {
  color: "#AAAAAA",
  fontSize: "12px",
};

const product_desc = {
  color: "#606161",
  fontSize: "14px",
  margin: "10px 0px",
};
const amount_details = {
  display: "flex",
};
const product_price = {
  display: "flex",
  color: "#606161",
  fontSize: "16px",
  margin: "0",
  fontWeight: "500",
  gap: "10px",
};
const discount_style = {
  color: "#606161",
  fontSize: "16px",
  marginLeft: "14px",
  fontWeight: "500",
};
const buttonStyle = {
  //   alignItems: "center",
  backgroundColor: "#fff",
  border: "1px solid #1c75bc",
  borderRadius: "36px",
  color: "#1c75bc",
  display: "flex",
  fontSize: "14px",
  fontWeight: "500",
  //   height: "35px",
  //   justifContent: "center",
  //   width: "120px",
  padding: "3px 40px",
  marginLeft: "10px",
};

const ProductView = (id) => {
  // -------------------------NavBar---------------------------
  const topBar = new CustomEvent("topBar", {
    detail: {
      bar: true,
      route: "productView",
      search: false,
    },
  });
  document.dispatchEvent(topBar);
  // -------------------------NavBar---------------------------

  let details = {};

  // console.log("iddddddddddddddddddddd", id);

  const Id = id.id;
  const history = useHistory();
  let dispatch = useDispatch();

  const handleBack = () => {
    history.push("/storeFront/products");
  };

  const [items, setItems] = useState({});
  const [sellerData, setSellerData] = useState({});
  const [dummy, setDummy] = useState(0);

  const localAllProductsdata = JSON.parse(localStorage.getItem("AllProducts"));
  let CartProducts1 = JSON.parse(localStorage.getItem("CartProducts"));
  let cartProducts = [];
  if (CartProducts1 && CartProducts1.length > 1) {
    cartProducts = CartProducts1[1];
  }

  useEffect(() => {
    if (localAllProductsdata.length != 0) {
      let fetchedProductData = localAllProductsdata.find((o) => o?.id == Id);
      setSellerData(fetchedProductData);
      let newItems = {
        // id: o?.descriptor?.id,
        look_up_id: fetchedProductData?.id,
        name: fetchedProductData?.descriptor?.name
          .split(" ")
          .slice(0, 3)
          .join(" "),
        price: fetchedProductData?.price?.value,
        maxPrice: fetchedProductData?.price?.maximum_value,
        quantity:
          CartProducts1 && CartProducts1.length > 1
            ? cartProducts.find((x) => x?.look_up_id == fetchedProductData?.id)
                ?.quantity != undefined
              ? cartProducts.find(
                  (x) => x?.look_up_id == fetchedProductData?.id
                )?.quantity
              : 0
            : 0,
        image:
          fetchedProductData?.descriptor?.images &&
          fetchedProductData?.descriptor?.images[0],
        total_price: 0,
        provider: fetchedProductData?.provider?.name,
        manufacturer:
          fetchedProductData["@ondc/org/statutory_reqs_packaged_commodities"]
            ?.manufacturer_or_packer_name,
        description: fetchedProductData?.descriptor?.short_desc,
        cancelable:
          fetchedProductData["@ondc/org/cancellable"] &&
          fetchedProductData["@ondc/org/cancellable"].toString() == "true"
            ? "Yes"
            : "No",
        returnable:
          fetchedProductData["@ondc/org/returnable"] &&
          fetchedProductData["@ondc/org/returnable"].toString() == "true"
            ? "Yes"
            : "No",
        manufacturedDate:
          fetchedProductData["@ondc/org/statutory_reqs_packaged_commodities"]
            ?.month_year_of_manufacture_packing_import,
        cod:
          fetchedProductData["@ondc/org/available_on_cod"] &&
          fetchedProductData["@ondc/org/available_on_cod"].toString() == "true"
            ? "Yes"
            : "No",
      };
      setItems(newItems);
    }
  }, []);

  const handleClearCart = () => {
    localStorage.removeItem("CartProducts");
    const temp = items;
    temp.quantity = 0;
    setItems(temp);
    setCheckoutprice(0);
  };

  const [checkoutprice, setCheckoutprice] = useState(0);
  let checkoutTemp = 0;

  useEffect(() => {
    if (CartProducts1 && CartProducts1.length > 1) {
      cartProducts = CartProducts1[1];
      for (let i = 0; i < cartProducts?.length; i++) {
        if (cartProducts[i].quantity > 0) {
          checkoutTemp =
            checkoutTemp + cartProducts[i].quantity * cartProducts[i].price;
          // cartProducts = [...cartProducts, items[i]];
        }
      }
    }
    setCheckoutprice(checkoutTemp);
  }, []);

  // -----------------------------------increment start----------------------------------------------------

  const increment = (id) => {
    // console.log("increment", Id);

    const temp = items;
    temp.quantity += 1;
    setItems(temp);
    setCheckoutprice(checkoutprice + parseFloat(temp?.price));
    // setDummy(dummy + 1);

    CartProducts1 = JSON.parse(localStorage.getItem("CartProducts"));
    if (
      CartProducts1 &&
      CartProducts1.length == 2 &&
      CartProducts1[1].length != 0 &&
      CartProducts1[0].length != 0
    ) {
      // console.log("Cart not empty");
      let cartProducts = CartProducts1[1];
      let PayloadItems = CartProducts1[0];

      let alreadyInCart =
        PayloadItems.filter((e) => e.id === items?.look_up_id).length > 0;

      if (!alreadyInCart) {
        // console.log("not in cart");
        localStorage.setItem(
          "CartProducts",
          JSON.stringify([
            [
              ...PayloadItems,
              localAllProductsdata.find((o) => o?.id == items?.look_up_id),
            ],
            [...cartProducts, items],
          ])
        );
      } else {
        // console.log("already in cart");
        let objIndex = cartProducts.findIndex(
          (obj) => obj.look_up_id == items?.look_up_id
        );

        cartProducts[objIndex].quantity += 1;

        localStorage.setItem(
          "CartProducts",
          JSON.stringify([PayloadItems, cartProducts])
        );
      }
    } else {
      // console.log("First Cart Item");

      localStorage.setItem(
        "CartProducts",
        JSON.stringify([
          [localAllProductsdata.find((o) => o?.id == items?.look_up_id)],
          [items],
        ])
      );
    }
  };
  // -----------------------------------increment end----------------------------------------------------

  // -----------------------------------decrement start----------------------------------------------------

  const decrement = (id) => {
    // console.log("decrement", Id);

    const temp = items;
    temp.quantity -= 1;
    setItems(temp);
    setCheckoutprice(checkoutprice - parseFloat(temp?.price));
    // setDummy(dummy + 1);

    CartProducts1 = JSON.parse(localStorage.getItem("CartProducts"));
    let cartProducts = CartProducts1[1];
    let PayloadItems = CartProducts1[0];

    if (temp.quantity < 1) {
      // console.log("quantity less than 1");
      PayloadItems = PayloadItems.filter((o) => o?.id != items?.look_up_id);
      cartProducts = cartProducts.filter(
        (o) => o?.look_up_id != items?.look_up_id
      );
    } else {
      // console.log("quantity greater than 1");
      let objIndex = cartProducts.findIndex(
        (obj) => obj.look_up_id == items?.look_up_id
      );
      cartProducts[objIndex].quantity -= 1;
    }
    localStorage.setItem(
      "CartProducts",
      JSON.stringify([PayloadItems, cartProducts])
    );
  };
  // -----------------------------------decrement end----------------------------------------------------

  // function handleClick() {
  //   let PayloadItems = [];
  //   CartProducts1 = JSON.parse(localStorage.getItem("CartProducts"));
  //   if (CartProducts1 && CartProducts1.length > 1) {
  //     PayloadItems = CartProducts1[0];
  //   } else if (CartProducts1) {
  //     cartProducts = CartProducts1;
  //   }

  //   var payload = {
  //     context: {
  //      // transaction_id: PayloadItems[0]?.transaction_id,
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
  //         // console.log("select");
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
  //             console.log("select", data);
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
  //   // dispatch(load_select_data(payload));
  //   history.push("/storeFront/cart");
  // }

  const discount = ((items?.maxPrice - items?.price) / items?.maxPrice) * 100;

  // console.log(items, "itemssssssssssssssssssssssssss");
  // console.log(sellerData, "sellerrrrrrrrrrrrrrrr");

  return (
    // { items!=null && (

    <div style={{ background: "#f3f3f3" }}>
      <div style={{ padding: "24px 10%", marginTop: "76px" }}>
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={() => {
            // handleDeleteButton(o?.id);
            // setStep(0);
            handleBack();
          }}
        >
          <ArrowBackIcon style={{ color: "#5D5D5D" }} />
        </IconButton>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
          // style={{
          //   maxWidth: "600px",
          // }}
          >
            <img
              src={items?.image}
              style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "5px",
                width: " 350px",
                height: "450px",
              }}

              //   background="contain"
            />
          </div>
          <div style={{ maxWidth: "600px", padding: "16px" }}>
            <div style={{ padding: "16px" }}>
              <div style={title}>{items?.name}</div>
              <div style={product_tag}>
                Ordering from <b>{items?.provider}</b>
              </div>
              <div style={product_desc}>{items?.description}</div>
              <div style={amount_details}>
                <div style={product_price}>
                  <del>₹{items?.maxPrice}</del>
                  <div>₹{items?.price} </div>
                </div>
                <div style={discount_style}>
                  ({discount > 0 ? parseInt(discount) : "0"}% off)
                </div>
              </div>
            </div>
            <div
              style={{
                border: "1px solid #AAAAAA",
                width: "600px",
                height: "1px",
              }}
            ></div>
            <div style={{ padding: "16px" }}>
              <div style={{ display: "flex", padding: "8px" }}>
                <div style={left}>Returnable:</div>
                <div style={right}>{items?.returnable}</div>
              </div>
              <div style={{ display: "flex", padding: "8px" }}>
                <div style={left}>Cancelable:</div>
                <div style={right}>{items?.cancelable}</div>
              </div>
              <div style={{ display: "flex", padding: "8px" }}>
                <div style={left}>Cash On Delivery:</div>
                <div style={right}>{items?.cod}</div>
              </div>
            </div>
            <div style={{ padding: "16px" }}>
              <div>Product Details</div>
              <div style={{ display: "flex", padding: "8px" }}>
                <div style={left}>Manufacturer Name:</div>
                <div style={right}>{items?.manufacturer}</div>
              </div>
              <div style={{ display: "flex", padding: "8px" }}>
                <div style={left}>Imported Product Country of Origin:</div>
                <div style={right}>
                  {sellerData?.tags?.country_of_origin
                    ? sellerData?.tags?.country_of_origin
                    : "India"}
                </div>
              </div>
              <div style={{ display: "flex", padding: "8px" }}>
                <div style={left}>Category:</div>
                <div style={right}>{sellerData?.category_id}</div>
              </div>
              <div style={{ display: "flex", padding: "8px" }}>
                <div style={left}>Net Quantity:</div>
                <div style={right}>{items?.quantity}</div>
              </div>
              <div style={{ display: "flex", padding: "8px" }}>
                <div style={left}>Manufacturing Date:</div>
                <div style={right}>
                  {/* {items?.manufacturedDate}{" "} */}
                  {moment(items?.manufacturedDate).format("MM/yyyy") !=
                  "Invalid date"
                    ? moment(items?.manufacturedDate).format("MM/yyyy")
                    : items?.manufacturedDate}
                </div>
              </div>
            </div>
            <div style={{ padding: "16px" }}>
              <div>Seller Details</div>
              <div style={{ display: "flex", padding: "8px" }}>
                <div style={left}>Seller Name:</div>
                <div style={right}>{sellerData?.provider?.name}</div>
              </div>
              <div style={{ display: "flex", padding: "8px" }}>
                <div style={left}>Working Days:</div>
                <div style={right}>{sellerData?.provider?.working_days}</div>
              </div>
              <div style={{ display: "flex", padding: "8px" }}>
                <div style={left}>Working Hours:</div>
                <div style={right}>{sellerData?.provider?.working_hours}</div>
              </div>
              <div style={{ display: "flex", padding: "8px" }}>
                <div style={left}>Seller Description:</div>
                <div style={right}>{sellerData?.provider?.long_desc}</div>
              </div>
              <div style={{ display: "flex", padding: "8px" }}>
                <div style={left}>Seller Address:</div>
                <div style={right}>
                  {sellerData?.locations?.address?.full
                    ? sellerData?.locations?.address?.full
                    : sellerData?.locations?.address?.door +
                      " " +
                      sellerData?.locations?.address?.state +
                      "," +
                      sellerData?.locations?.address?.city +
                      "," +
                      sellerData?.locations?.address?.area_code}
                </div>
              </div>
            </div>
            <div className="store-pl-productCard-pricebody">
              <div className="pl-productCard-price">
                {" "}
                {/* ₹ {items?.price * items?.quantity} */}
              </div>
              {items?.quantity == 0 && (
                <div className="pl-productCard-cartButton">
                  <Button
                    className="pl-productCard-button1"
                    variant="contained"
                    style={{ width: "100px", maxHeight: "30px" }}
                    onClick={() => increment()}
                  >
                    <AddShoppingCartIcon
                      style={{ color: "white", size: "10px" }}
                    />
                  </Button>
                </div>
              )}

              {items?.quantity != 0 && (
                <div className="pl-cart-allButton">
                  <button
                    className="pl-cart-minusButton"
                    onClick={() => decrement()}
                  >
                    -
                  </button>
                  <div>{items?.quantity}</div>
                  <button
                    className="pl-cart-plusButton"
                    onClick={() => increment()}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="store-pl-pagination">
        <div className="store-pagination-second">
          <div className="pagination-price" style={{ margin: "0 50px 0 0" }}>
            Price: ₹{checkoutprice}
            {Number.isInteger(checkoutprice) && ".00"}
            {/* Price: ₹0.00 */}
          </div>
          <div
            className="pagination-clear-cart"
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
            <Link to="/storeFront/cart">
              <Button
                variant="contained"
                // onClick={() => {
                //   handleClick();
                // }}
              >
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    // )}
  );
};

export default ProductView;



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