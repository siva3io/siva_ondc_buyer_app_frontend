import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CartPage.css";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Product_select_API,
  Product_Multi_select_API,
} from "../redux/Action/action";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

import BASE_API_SOURCE from "../baseurl";

export const CartCard = ({
  data,
  id,
  products,
  setProducts,
  dummy,
  setdummy,
  checkoutprice,
  setCheckoutprice,
  handelDeletebtn,
}) => {
  const decrement = i => {
    let data = products;
    if (data[1][i].quantity > 1) {
      data[1][i].quantity = data[1][i].quantity - 1;
      localStorage.setItem("CartProducts", JSON.stringify([data[0], data[1]]));
      setProducts(data);
      setCheckoutprice(
        parseFloat(checkoutprice) - parseFloat(data[1][i].price)
      );
      setdummy(dummy + 1);
    } else if (data[1][i].quantity == 1) {
      // console.log("came here");
      setCheckoutprice(
        parseFloat(checkoutprice) - parseFloat(data[1][i].price)
      );
      data[0] = data[0].filter((o, index) => index !== i);
      data[1] = data[1].filter((o, index) => index !== i);
      localStorage.setItem("CartProducts", JSON.stringify([data[0], data[1]]));
      setProducts(data);
      setdummy(dummy + 1);
    }
  };

  const increment = i => {
    let data = products;
    data[1][i].quantity = data[1][i].quantity + 1;
    localStorage.setItem("CartProducts", JSON.stringify([data[0], data[1]]));
    setProducts(data);
    setCheckoutprice(parseFloat(checkoutprice) + parseFloat(data[1][i].price));
    setdummy(dummy + 1);
  };

  return (
    <div className="store_card_whole">
      <div style={{ display: "flex" }}>
        <div className="store_image_div_style">
          <img
            src={data?.image}
            width="110"
            height="110"
            className="store_image_style"
          />
        </div>
        <div
          style={{
            padding: "0px 16px",
            width: "70%",
            backgroundColor: "white",
            minWidth: "100px",
            position: "relative",
          }}
        >
          <div className="store_product_title" style={{ display: "flex" }}>
            <span
              style={{
                maxWidth: "320px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data?.name}
            </span>
            <span style={{ marginLeft: "40%" }}>
              <IconButton
                color="primary"
                sx={{ p: "0px" }}
                aria-label="directions"
                onClick={e => {
                  handelDeletebtn(data?.id, data?.look_up_id);
                }}
              >
                <DeleteIcon style={{ color: "#5D5D5D" }} />
              </IconButton>
            </span>
          </div>
          <div className="store_ordering_from">
            Ordering from <b>{data?.seller_name}</b>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              bottom: " 10px",
              paddingTop: "20px",
            }}
          >
            <div className="store_card_price">₹ {data?.price}</div>
            <div className="pl-cart-allButton">
              <button
                className="pl-cart-minusButton"
                onClick={() => decrement(id)}
              >
                -
              </button>
              <div>{data?.quantity}</div>
              <button
                className="pl-cart-plusButton"
                onClick={() => increment(id)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export var cartProducts = [];
export var PayloadItems = [];
const CartPage = () => {
  const topBar = new CustomEvent("topBar", {
    detail: {
      bar: true,
      route: "cartpage",
      search: false,
    },
  });
  document.dispatchEvent(topBar);
  const [products, setProducts] = useState(
    localStorage.getItem("CartProducts")
      ? JSON.parse(localStorage.getItem("CartProducts"))
      : []
  );
  const [dummy, setdummy] = useState(1);
  const [checkoutprice, setCheckoutprice] = useState(0.0);
  let checkoutTemp = 0.0;

  let dispatch = useDispatch();
  const history = useHistory();
  const [items, setItems] = useState([]);
  var CartProducts1 = JSON.parse(localStorage.getItem("CartProducts"));
  useEffect(() => {
    if (CartProducts1 && CartProducts1.length > 0) {
      cartProducts = CartProducts1[1];
      PayloadItems = CartProducts1[0];
    }
  }, [CartProducts1]);

  useEffect(() => {
    if (products !== null && products.length !== 0)
      for (let i = 0; i < products[1]?.length; i++) {
        if (products[1][i].quantity > 0) {
          checkoutTemp =
            checkoutTemp + products[1][i].quantity * products[1][i].price;
        }
      }
    setCheckoutprice(checkoutTemp);
    // console.log("thanu");
  }, [products]);

  const handelDeletebtn = (id, look_up_id) => {
    console.log("key", id, "value", look_up_id);
    PayloadItems = PayloadItems.filter(o => o?.id != id);
    cartProducts = cartProducts.filter(o => o?.look_up_id != look_up_id);
    localStorage.setItem(
      "CartProducts",
      JSON.stringify([PayloadItems, cartProducts])
    );
    setProducts(
      localStorage.getItem("CartProducts")
        ? JSON.parse(localStorage.getItem("CartProducts"))
        : []
    );
    //window.location.reload();
    //history.go("/storeFront/cartpage");
  };

  //Old Single Product
  //  function handleCheckoutButton() {
  //   let PayloadItems = [];
  //   debugger
  //   CartProducts1 = JSON.parse(localStorage.getItem("CartProducts"));
  //   if (CartProducts1 && CartProducts1.length > 1) {
  //     PayloadItems = CartProducts1[0];
  //   } else if (CartProducts1) {
  //     cartProducts = CartProducts1;
  //   }

  //   var payload = {
  //     context: {
  //       transaction_id: PayloadItems[0]?.transaction_id,
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
  //                 gps: JSON.parse(localStorage.getItem('search'))?.lat_long,
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
  //             const data = JSON.parse(e.data);
  //             console.log("sddggg", data)
  //             if(data?.error && data?.error?.message)
  //             { //Error --- 889
  //               toast.update(id, {
  //                 render: data?.error?.message,
  //                 type: "error",
  //                 isLoading: false,
  //                 autoClose: 2000,
  //               });
  //             }
  //             else{
  //             window.dispatchEvent(new Event("localfetchSelectData"));
  //             localStorage.setItem("select_data", JSON.stringify(data));
  //             toast.update(id, {
  //               render: "Added to cart!",
  //               type: "success",
  //               isLoading: false,
  //               autoClose: 2000,
  //             });
  //            }
  //             source.close();
  //         });

  //         source.addEventListener("error", (e) => {
  //           const data = JSON.parse(e.data);
  //           console.error("Error: ", data);
  //           // toast.update(id, {
  //           //   render: data?.error?.message,
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
  //  }

  // function handleCheckoutButton() {
  //   let PayloadItems = [];
  //   CartProducts1 = JSON.parse(localStorage.getItem("CartProducts"));
  //   if (CartProducts1 && CartProducts1.length > 1) {
  //     var payload = CartProducts1[0].map((item)=> {
  //       return {
  //         context: {
  //           //transaction_id: item?.transaction_id,
  //           bpp_uri: item?.bpp_uri,
  //           bpp_id: item?.bpp_id,
  //         },
  //         message: {
  //           order: {
  //             provider: {
  //               id: item?.provider_id,
  //               locations: [
  //                 {
  //                   id: item?.location_id
  //                     ? item?.location_id
  //                     : "",
  //                 },
  //               ],
  //             },
  //             items: [item],
  //           },
  //           fulfillments: [
  //             {
  //               end: {
  //                 location: {
  //                   gps: JSON.parse(localStorage.getItem('search'))?.lat_long,
  //                   // gps: PayloadItems[0]?.locations?.gps
  //                   //   ? PayloadItems[0]?.locations?.gps
  //                   //   : "",
  //                   address: {
  //                     area_code: item?.locations?.address?.area_code
  //                       ? item?.locations?.address?.area_code
  //                       : "",
  //                     gps: JSON.parse(localStorage.getItem('search'))?.lat_long,
  //                   },
  //                 },
  //               },
  //             },
  //           ],
  //         },
  //       };
  //     })
  //   }

  //   const id = toast.loading("Please wait...");
  //   localStorage.removeItem("select_data")
  //   dispatch(
  //     Product_Multi_select_API(payload, id, function (resp) {
  //       resp.map((item)=> {
  //         if (item?.message?.ack?.status === "ACK") {
  //           const source = new EventSource(
  //             `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${item?.context?.message_id}`
  //           );
  //           source.addEventListener("open", () => {
  //             console.log("SSE opened select!");
  //           });
  //           source.addEventListener("on_select", (e) => {
  //               var data = JSON.parse(e.data);
  //               let on_select_data = [];
  //               if(!localStorage.getItem("select_data"))
  //               {
  //                 data.id = item?.id;
  //                 on_select_data.push(data)
  //                 window.dispatchEvent(new Event("localfetchSelectData"));
  //                 localStorage.setItem("select_data", JSON.stringify(on_select_data));
  //               }
  //               else{
  //                 let oldata = JSON.parse(localStorage.getItem("select_data"));
  //                 data.id = item?.id;
  //                 oldata.push(data)
  //                 window.dispatchEvent(new Event("localfetchSelectData"));
  //                 localStorage.setItem("select_data", JSON.stringify(oldata));
  //               }

  //               if(data?.error && data?.error?.message)
  //               { //Error --- 889
  //                 toast.update(id, {
  //                   render: data?.error?.message,
  //                   type: "error",
  //                   isLoading: false,
  //                   autoClose: 2000,
  //                 });
  //               }
  //               else{
  //               //window.dispatchEvent(new Event("localfetchSelectData"));
  //               // localStorage.setItem("select_data", JSON.stringify(data));
  //               toast.update(id, {
  //                 render: "Added to cart!",
  //                 type: "success",
  //                 isLoading: false,
  //                 autoClose: 2000,
  //               });
  //             }
  //               source.close();
  //           });

  //           source.addEventListener("error", (e) => {
  //             const data = JSON.parse(e.data);
  //             console.error("Error: ", data);
  //             // toast.update(id, {
  //             //   render: data?.error?.message,
  //             //   type: "error",
  //             //   isLoading: false,
  //             //   autoClose: 2000,
  //             // });
  //             source.error();
  //           });

  //           return () => {
  //             source.close();
  //           };
  //         }
  //         else {
  //           toast.update(id, {
  //             render: "Something went wrong",
  //             type: "error",
  //             isLoading: false,
  //             autoClose: 2000,
  //           });
  //         }
  //       })
  //     })
  //   );

  //   // dispatch(load_select_data(payload));
  //   history.push("/storeFront/cart");
  // }

  return (
    <div>
      <div
        style={{
          backgroundColor: "#f3f3f3",
          minHeight: "630px",
          height: "100%",
          marginTop: "76px",
          paddingLeft: "8%",
          paddingRight: "8%",
        }}
      >
        <div className="store_titleStyle">Cart</div>
        <div style={{ display: "flex", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              gap: "16px",
              width: "70%",
              flexWrap: "wrap",
            }}
          >
            {products != null && products[1] && products[1].length > 0 ? (
              products[1].map((o, index) => {
                return (
                  <CartCard
                    data={o}
                    id={index}
                    products={products}
                    setProducts={setProducts}
                    dummy={dummy}
                    setdummy={setdummy}
                    checkoutprice={checkoutprice}
                    setCheckoutprice={setCheckoutprice}
                    handelDeletebtn={handelDeletebtn}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
          <div
            style={{ width: "30%", backgroundColor: "white" }}
            className="store_price_details"
          >
            <div className="store_price_details_head">Price Details</div>
            <div style={{ padding: "20px 25px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="store_items_count">
                  Items in cart (
                  {products !== null && products.length !== 0
                    ? products[1].length
                    : 0}
                  )
                </div>
                <div className="store_items_price">₹ {checkoutprice}</div>
              </div>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                <Link to="/storeFront/cart">
                  <button
                    className="store_checkout_button"
                    // onClick={() => {
                    //   handleCheckoutButton();
                    // }}
                  >
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;



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