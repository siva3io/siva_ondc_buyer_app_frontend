import React, { useEffect, useState } from "react";
import "./Orders.css";
import CallIcon from "@mui/icons-material/Call";
import CancelPopupPage from "./CancelPopup";
import RatingPopupPage from "./RatingPopupPage";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { loadOrders } from "../redux/Action/action";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import {
  Event_status_api,
  Event_Track_api,
  Event_Cancel_api,
  client_get_rating_categories,
  client_get_feedback_categories,
  client_get_feedback_form,
} from "../redux/Action/action";

import HelpPopupPage from "../components/HelpPopup";
import SingleOrder from "./SingleOrder";
import ModalViewV2 from "./Model2";
import { Typography } from "@material-ui/core";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

import RefundPopup from "../components/RefundPopup";
import { useHistory } from "react-router-dom";
import BASE_API_SOURCE from "../baseurl";
import { style } from "@mui/system";
import { Button } from "@mui/material";

const Orders = () => {
  //navBar Visible condition ------------------
  const topBar = new CustomEvent("topBar", {
    detail: {
      bar: true,
      route: "order",
      search: false,
    },
  });
  document.dispatchEvent(topBar);
  //navBar Visible condition ------------------

  let history = useHistory();

  const [orderData, setorderData] = useState();


  const [cancelSurityPopup, setcancelSurityPopup] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedCategory, setselectedCategory] = useState("");

  const [cancelPopup, setcancelPopup] = useState(false);
  const [ratingPopup, setRatingPopupOpen] = useState(false);
  const [refundPopup, setrefundPopupOpen] = useState(false);
  const [helpPopup, setHelpPopupOpen] = useState(false);

  const [OrderPage, setOrderPage] = useState(true);
  const [ratingvalue, setRatingvalue] = useState(0);
  const [ratingcategory, setRatingcategory] = useState("");
  const [ratinggiven, setRatinggiven] = useState({
    ratingvalue: 0,
    ratingcategory: "",
  });

  const [ratingCategories, setratingCategories] = useState([]);
  const [feedbackCategories, setfeedbackCategories] = useState([]);
  const [feedbackUrl, setfeedbackUrl] = useState([]);
  const [paymentType, setpaymentType] = useState("cod");

  const [clicked, setClicked] = useState(1);

  //------------------------------------------------------

  const { ordersData, grievanceCategories } = useSelector(
    (state) => state.data
  );


  const [products, setproducts] = useState({
    orderNo: "7490266",
    orderedDate: "November 12th, 2022",
    status: "Cancelled",
    opened: false,
    title: "Pick any 1 Sweat Pullover Hoodie for Men - Peach - M",
    quantity: 1,
    price: 672,
    shippingAddress: {
      name: "Jhonny Depp",
      mail: "jhonny@gmail.com",
      mobile: 9876543211,
      addressline1: "addressline1",
      addressline2: "addressline2",
      addressline3: "addressline3",
      state: "AP",
      pincode: 500070,
    },
    billingAddress: {
      name: "Jhonny Depp",
      mail: "jhonny@gmail.com",
      mobile: 9876543211,
      addressline1: "addressline1",
      addressline2: "addressline2",
      addressline3: "addressline3",
      state: "AP",
      pincode: 500070,
    },
    Review: [
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
    ],
  });

  useEffect(() => {
    let changed = products;
    changed["Review"] = [];
    ratingCategories.map((o) => {
      let obj = {
        lookup_id: o,
        name: o,
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
      };
      changed["Review"].push(obj);
    });
    setproducts(changed);
  }, [ratingCategories]);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadOrders());
  }, []);

  const redirection = (url) => {
    window.open(url, "_blank");
  };

  const handleToggle = (o, index) => {
    var newobj = ordersData;
    // newobj[index]["opened"] = !newobj[index]["opened"];

    for (let i = 0; i < newobj.length; i++) {
      if (index == i) {
        newobj[i]["opened"] = !newobj[i]["opened"];
      } else {
        newobj[i]["opened"] = false;
      }
    }

    // setproducts(newobj);
    setClicked(clicked + 1);
  };


  const handleRating = () => {
    let prod = orderData;
    prod["Review"] = products["Review"];
    setproducts(prod);
    // console.log(prod);
    setRatingPopupOpen(true);
  };

  const handleButtonClick = (prop) => {
    // console.log("bppId", bppId);
    if (prop == "status") {
      let status_payload = {
        context: {
          transaction_id: orderData?.transactionId,
          bpp_uri: orderData?.context?.bpp_uri,
          bpp_id: orderData?.context?.bpp_id,
          city: orderData?.context?.city,
        },
        message: {
          order_id: orderData?.id,
        },
      };

      dispatch(
        Event_status_api(status_payload, function (resp) {
          if (resp?.message?.ack?.status === "ACK") {
            console.log("ACK Status");
            const id = toast.loading("Updating Status...");

            const source = new EventSource(
              `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${resp?.context?.message_id}`
            );
            source.addEventListener("open", () => {
              console.log("SSE opened status!");
            });

            source.addEventListener("on_status", (e) => {
              dispatch(loadOrders());
              const data = JSON.parse(e.data);
              console.log("Status", data);
              toast.update(id, {
                render: "Status Updated!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
              });
              // setEventData(() => JSON.parse(e.data));
            });

            // console.log("combinedData", combinedData);

            source.addEventListener("error", (e) => {
              // console.error("Error: ", e);
              source.close();
            });

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
      // dispatch(load_status_data(status_payload));
    } else if (prop == "track") {
      let track_payload = {
        context: {
          transaction_id: orderData?.transactionId,
          bpp_uri: orderData?.context?.bpp_uri,
          bpp_id: orderData?.context?.bpp_id,
          city: orderData?.context?.city,
        },
        message: {
          order_id: orderData?.id,
          callback_url: `${BASE_API_SOURCE.ondc_url}api/v1/ondc/bpp/eunimart_bpp/render_tracking`,
        },
      };

      dispatch(
        Event_Track_api(track_payload, function (resp) {
          if (resp?.message?.ack?.status === "ACK") {
            console.log("ACK");
            const source = new EventSource(
              `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${resp?.context?.message_id}`
            );
            source.addEventListener("open", () => {
              console.log("SSE opened track!");
            });

            source.addEventListener("on_track", (e) => {
              dispatch(loadOrders());
              const data = JSON.parse(e.data);
              // console.log(data, data?.message?.tracking?.url);
              redirection(data?.message?.tracking?.url);

              // setEventData(() => JSON.parse(e.data));
            });

            // console.log("combinedData", combinedData);

            source.addEventListener("error", (e) => {
              // console.error("Error: ", e);
              source.close();
            });

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
    } else if (prop == "cancel") {
      let cancel_payload = {
        context: {
          transaction_id: orderData?.transactionId,
          bpp_uri: orderData?.context?.bpp_uri,
          bpp_id: orderData?.context?.bpp_id,
          city: orderData?.context?.city,
        },
        message: {
          order_id: orderData?.id,
          cancellation_reason_id: reason,
        },
      };
      // console.log("cancel action");
      dispatch(
        Event_Cancel_api(cancel_payload, function (resp) {
          if (resp?.message?.ack?.status === "ACK") {
            console.log("ACK cancel");
            const id = toast.loading("Order Cancelling...");
            const source = new EventSource(
              `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${resp?.context?.message_id}`
            );
            source.addEventListener("open", () => {
              console.log("SSE opened cancel!");
            });

            source.addEventListener("on_cancel", (e) => {
              dispatch(loadOrders());
              const data = JSON.parse(e.data);
              console.log("on_cancel_data", data);

              setrefundPopupOpen(true);
              toast.update(id, {
                render: "Order Cancelled!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
              });
              source.close();
              // setEventData(() => JSON.parse(e.data));
            });

            // console.log("combinedData", combinedData);

            source.addEventListener("error", (e) => {
              console.error("Error: ", e);
              toast.update(id, {
                render: "Something went wrong",
                type: "error",
                isLoading: false,
                autoClose: 2000,
              });
              source.close();
            });

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
    } else if (prop == "rating") {
      var rating_categories_payload = {
        context: {
          transaction_id: orderData?.transactionId,
          bpp_id: orderData?.context?.bpp_id,
          bpp_uri: orderData?.context?.bpp_uri,
        },
      };

      dispatch(
        client_get_rating_categories(
          rating_categories_payload,
          function (resp) {
            if (resp?.message?.ack?.status === "ACK") {
              const source = new EventSource(
                `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${resp?.context?.message_id}`
              );
              source.addEventListener("open", () => {
                console.log("SSE opened! rating_categories");
              });

              source.addEventListener("rating_categories", (e) => {
                const data = JSON.parse(e.data);
                console.log("rating_categories", data);
                setratingCategories(data?.rating_categories);
                source.close();
                // setEventData(() => JSON.parse(e.data));
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
          }
        )
      );

      var feedback_categories_payload = {
        context: {
          transaction_id: orderData?.transactionId,
          bpp_id: orderData?.context?.bpp_id,
          bpp_uri: orderData?.context?.bpp_uri,
        },
      };

      dispatch(
        client_get_feedback_categories(
          feedback_categories_payload,
          function (resp) {
            if (resp?.message?.ack?.status === "ACK") {
              const source = new EventSource(
                `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${resp?.context?.message_id}`
              );
              source.addEventListener("open", () => {
                console.log("SSE opened! feedback_categories");
              });

              source.addEventListener("feedback_categories", (e) => {
                const data = JSON.parse(e.data);
                console.log("feedback_categories", data);
                setfeedbackCategories(data?.feedback_categories);
                source.close();
                // setEventData(() => JSON.parse(e.data));
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
          }
        )
      );
    }
  };

  const [dummy, setdummy] = useState(0);
  var temp = 0;

  useEffect(() => {
    var feedback_form_payload = {
      context: {
        transaction_id: orderData?.transactionId,
        bpp_id: orderData?.context?.bpp_id,
        bpp_uri: orderData?.context?.bpp_uri,
      },
      message: {
        // rating_value: 5,
        // rating_value: ratingvalue,
        // rating_category: ratingcategory,
        rating_value: ratinggiven?.ratingvalue,
        rating_category: ratinggiven?.ratingcategory,
      },
    };

    dispatch(
      client_get_feedback_form(feedback_form_payload, function (resp) {
        if (resp?.message?.ack?.status === "ACK") {
          const source = new EventSource(
            `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${resp?.context?.message_id}`
          );
          source.addEventListener("open", () => {
            console.log("SSE opened! feedback_form " + ratingcategory);
          });

          source.addEventListener("feedback_form", (e) => {
            const data = JSON.parse(e.data);
            console.log("feedback_form " + ratingcategory, data);
            setfeedbackUrl(data?.message?.feedback_url);
            let feedback_form = data?.message?.feedback_form;
            feedback_form.map((ele) => {
              let newproducts = products;
              newproducts.Review = newproducts?.Review?.map((e2) => {
                if (e2.lookup_id == o) {
                  e2?.value.map((e3) => {
                    if (e3.lookup_id == ele?.answer_type) {
                      if (ele?.answer_type == "checkbox") {
                        e3?.questions.push({
                          answer_type: ele?.answer_type,
                          id: ele?.id,
                          parent_id: ele?.parent_id,
                          ques: ele?.question,
                          ans: ele?.answer.map((k) => {
                            return { ansvalue: k, selected: false };
                          }),
                          selected: [],
                        });
                      } else if (ele?.answer_type == "radio") {
                        e3?.questions.push({
                          id: ele?.id,
                          parent_id: ele?.parent_id,
                          answer_type: ele?.answer_type,
                          ques: ele?.question,
                          ans: ele?.answer,
                          selected: "no",
                        });
                      } else if (ele?.answer_type == "text") {
                        e3?.questions.push({
                          id: ele?.id,
                          parent_id: ele?.parent_id,
                          answer_type: ele?.answer_type,
                          ques: ele?.question,
                          ans: ele?.answer,
                        });
                      }
                    }
                  });
                }
                return e2;
              });

              setproducts(newproducts);
              temp += 1;
              setdummy(temp);
            });

            source.close();
            // setEventData(() => JSON.parse(e.data));
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
    // feedbackCategories.length > 0 &&
    //   feedbackCategories?.map(o => {
    //     var feedback_form_payload = {
    //       context: {
    //         transaction_id: orderData?.transactionId,
    //         bpp_id: orderData?.context?.bpp_id,
    //         bpp_uri: orderData?.context?.bpp_uri,
    //       },
    //       message: {
    //         // rating_value: 5,
    //         rating_value: ratingvalue,
    //         rating_category: o,
    //       },
    //     };

    //     dispatch(
    //       client_get_feedback_form(feedback_form_payload, function (resp) {
    //         if (resp?.message?.ack?.status === "ACK") {
    //           const source = new EventSource(
    //             `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${resp?.context?.message_id}`
    //           );
    //           source.addEventListener("open", () => {
    //             console.log("SSE opened! feedback_form " + o);
    //           });

    //           source.addEventListener("feedback_form", e => {
    //             const data = JSON.parse(e.data);
    //             console.log("feedback_form " + o, data);
    //             setfeedbackUrl(data?.message?.feedback_url);
    //             let feedback_form = data?.message?.feedback_form;
    //             feedback_form.map(ele => {
    //               let newproducts = products;
    //               newproducts.Review = newproducts?.Review?.map(e2 => {
    //                 if (e2.lookup_id == o) {
    //                   e2?.value.map(e3 => {
    //                     if (e3.lookup_id == ele?.answer_type) {
    //                       if (ele?.answer_type == "checkbox") {
    //                         e3?.questions.push({
    //                           answer_type: ele?.answer_type,
    //                           id: ele?.id,
    //                           parent_id: ele?.parent_id,
    //                           ques: ele?.question,
    //                           ans: ele?.answer.map(k => {
    //                             return { ansvalue: k, selected: false };
    //                           }),
    //                           selected: [],
    //                         });
    //                       } else if (ele?.answer_type == "radio") {
    //                         e3?.questions.push({
    //                           id: ele?.id,
    //                           parent_id: ele?.parent_id,
    //                           answer_type: ele?.answer_type,
    //                           ques: ele?.question,
    //                           ans: ele?.answer,
    //                           selected: "no",
    //                         });
    //                       } else if (ele?.answer_type == "text") {
    //                         e3?.questions.push({
    //                           id: ele?.id,
    //                           parent_id: ele?.parent_id,
    //                           answer_type: ele?.answer_type,
    //                           ques: ele?.question,
    //                           ans: ele?.answer,
    //                         });
    //                       }
    //                     }
    //                   });
    //                 }
    //                 return e2;
    //               });

    //               setproducts(newproducts);
    //               temp += 1;
    //               setdummy(temp);
    //             });

    //             source.close();
    //             // setEventData(() => JSON.parse(e.data));
    //           });

    //           source.addEventListener("error", e => {});

    //           return () => {
    //             source.close();
    //           };
    //         } else if (data?.error && data?.error?.message) {
    //           toast.error(data?.error?.message, {
    //             autoClose: 2000,
    //           });
    //         } else {
    //           toast.error("Something went wrong", {
    //             autoClose: 2000,
    //           });
    //         }
    //       })
    //     );
    //   });
  }, [ratinggiven]);
  // }, [ratingvalue, ratingcategory]);

  // }, [feedbackCategories, ratingvalue]);

  // const decrement = itemId => {
  //   var item_quantity = orderData?.items.map(e => {
  //     if (e && e?.id == itemId && e.quantity && e.quantity.count) {
  //       e.quantity.count -= 1;
  //     }
  //     return e;
  //   });
  //   var New_orderData = orderData;
  //   New_orderData.items = item_quantity;
  //   setorderData(New_orderData);
  // };

  // const increment = itemId => {
  //   var item_quantity = orderData?.items.map(e => {
  //     if (e && e?.id == itemId && e.quantity && e.quantity.count) {
  //       e.quantity.count += 1;
  //     }
  //     return e;
  //   });
  //   var New_orderData = orderData;
  //   New_orderData.items = item_quantity;
  //   setorderData(New_orderData);
  // };

  // const reset_OrderData = id => {
  //   var new_ordersData = ordersData.find(o => o?.id == id);
  //   setorderData(JSON.parse(JSON.stringify(new_ordersData)));
  // };

  return OrderPage ? (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        height: "100%",
        minHeight: "710px",
        marginTop: "76px",
      }}
    >
      <div className="Orders_title">My Orders</div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
          padding: "10px",
        }}
      >
        {ordersData.map((o, index) => {
          return (
            <Fade top>
              <div
                style={{
                  backgroundColor: "white",
                  width: "720px",
                  minHeight: "100px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  boxShadow: " inset 0 0 5px #ddd",
                  boxSizing: "border",
                }}
                // onClick={() => {
                //   handleToggle(o, index);
                // }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "24px",
                      borderBottom: o.opened
                        ? "1px solid rgb(226 216 216)"
                        : "none",
                    }}
                    onClick={() => {
                      handleToggle(o, index);
                      setorderData(JSON.parse(JSON.stringify(o)));
                    }}
                  >
                    <div>
                      <p className="orders_card_order_number">
                        {o?.transactionId}
                      </p>
                      <p className="order_date">
                        Ordered on{" "}
                        <b>
                          {moment(o?.createdAt).format("DD-MM-yyyy")},{" "}
                          {moment(o?.createdAt).format("hh:mm A")}
                        </b>
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <div>
                        <div className="order_status">Status:</div>
                        <div
                          className="order_status_current"
                          style={{
                            color:
                              o?.state == "Accepted"
                                ? "orange"
                                : o?.state == "Cancelled"
                                ? "red"
                                : "green",
                            borderColor:
                              o?.state == "Accepted"
                                ? "orange"
                                : o?.state == "Cancelled"
                                ? "red"
                                : "green",
                            backgroundColor:
                              o?.state == "Accepted"
                                ? "rgba(249, 193, 50, 0.05)"
                                : o?.state == "Cancelled"
                                ? "rgb(249 50 50 / 5%)"
                                : "rgb(63 249 50 / 5%)",
                            // backgroundColor: "rgba(249, 193, 50, 0.05)",
                            // rgb(63 249 50 / 5%)
                          }}
                        >
                          {o.state}
                        </div>
                      </div>
                      <div style={{ paddingTop: "10px", marginRight: "20px" }}>
                        {o?.opened ? (
                          <ArrowDropUpIcon fontSize="large" />
                        ) : (
                          <ArrowDropDownIcon fontSize="large" />
                        )}
                      </div>
                    </div>
                  </div>
                  {o.opened ? (
                    <div
                      style={{
                        textAlign: "left",
                        margin: "24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <div
                        style={{
                          // display: "flex",
                          // justifyContent: "space-between",
                          display: "grid",
                          gridTemplateColumns: "85% 15%",
                        }}
                      >
                        <div>
                          {o?.items &&
                            o?.items?.map((item) => {
                              return (
                                <div>
                                  <div
                                    className="store_product_title"
                                    style={{ display: "flex", gap: "10px" }}
                                  >
                                    {item?.descriptor?.name}
                                    {item?.tags?.status == "Cancelled" && (
                                      <div style={{ color: "indianred" }}>
                                        (Cancelled)
                                      </div>
                                    )}
                                    {item?.tags?.status ==
                                      "Return_Approved" && (
                                      <div style={{ color: "indianred" }}>
                                        (Return Approved)
                                      </div>
                                    )}
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <span className="order_quantity_count">
                                      Qty:{item?.quantity?.count}
                                    </span>
                                    {/* <span className="order_price">
                                  ₹ {o?.quote?.price?.value}
                                </span> */}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        <div className="Order_Price">
                          <span className="order_price">
                            ₹ {o?.quote?.price?.value}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div className="status_button">{o?.state}</div>
                        {/* <div className="status_button">NOT RETURNABLE</div> */}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "10%",
                          padding: "30px 0px",
                          borderBottom: "1px solid rgb(226 216 216)",
                        }}
                      >
                        <div
                          style={{
                            width: "45%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                          }}
                        >
                          <div className="title_address">Shipped to:</div>
                          <div className="address_name">
                            {o?.fulfillments[0]?.end?.location?.address?.name}
                          </div>
                          <div
                            className="address_lines"
                            style={{ margin: "5px 0px" }}
                          >
                            {o?.fulfillments[0]?.end?.contact?.email}
                            {" - "}
                            {o?.fulfillments[0]?.end?.contact?.phone}
                          </div>
                          <div className="address_lines">
                            {o?.fulfillments[0]?.end?.location?.address?.door}
                            {", "}
                            {o?.fulfillments[0]?.end?.location?.address?.city}
                          </div>
                          <div className="address_lines">
                            {o?.fulfillments[0]?.end?.location?.address?.state}
                            {o?.fulfillments[0]?.end?.location?.address
                              ?.areaCode &&
                              ", " +
                                o?.fulfillments[0]?.end?.location?.address
                                  ?.areaCode}
                          </div>
                        </div>
                        <div
                          style={{
                            width: "45%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                          }}
                        >
                          <div className="title_address">Billed to:</div>
                          <div className="address_name">{o?.billing?.name}</div>
                          <div
                            className="address_lines"
                            style={{ margin: "5px 0px" }}
                          >
                            {o?.billing?.email}
                            {" - "}
                            {o?.billing?.phone}
                          </div>
                          <div className="address_lines">
                            {o?.billing?.address?.door}
                            {", " + o?.billing?.address?.city}
                          </div>
                          <div className="address_lines">
                            {o?.billing?.address?.state}
                            {o?.billing?.address?.area_code &&
                              ", " + o?.billing?.address?.area_code}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          margin: "16px 0px",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                        // style={{
                        //   width: "50%",
                        // }}
                        >
                    
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >

                          {o?.state &&
                            o?.state.toLowerCase() == "delivered" && (
                              <button
                                className="product_options status"
                                onClick={() => {
                                  handleRating();
                                  handleButtonClick("rating");
                                }}
                              >
                                Rating
                              </button>
                            )}
                          {o?.state &&
                            o?.state &&
                            o?.state.toLowerCase() != "delivered" &&
                            o?.state.toLowerCase() != "cancelled" && (
                              <>
                                <button
                                  className="product_options status"
                                  onClick={() => {
                                    handleButtonClick("status");
                                  }}
                                >
                                  Get Status
                                </button>
                                <button
                                  className="product_options track"
                                  onClick={() => {
                                    handleButtonClick("track");
                                  }}
                                >
                                  Track
                                </button>
                              </>
                            )}

                          {o?.state &&
                            o?.state.toLowerCase() != "cancelled" &&
                            o?.state &&
                            o?.state.toLowerCase() != "delivered" &&
                            !o?.state?.toLowerCase().includes("rto") &&
                            o?.items?.some((e) => {
                              return (
                                e["@ondc/org/cancellable"] &&
                                e["@ondc/org/cancellable"].toString() ==
                                  "true" &&
                                e?.tags?.status != "Cancelled"
                              );
                            }) && (
                              // o?.items[0]["@ondc/org/cancellable"] &&
                              <button
                                className="product_options cancel"
                                onClick={() => {
                                  o?.payment?.type == "PRE-FULFILLMENT" || o?.payment?.type == "ON-ORDER"
                                    ? setpaymentType("prepaid")
                                    : setpaymentType("cod");

                                  // setcancelSurityPopup(true);
                                  setcancelPopup(true);
                                }}
                                style={{ border: "1px solid #1c75bc" }}
                              >
                                Cancel
                              </button>
                            )}

                          {o?.state &&
                            o?.state.toLowerCase() == "delivered" && (
                              <button
                                className="product_options cancel"
                                onClick={() => {
                                  history.push(
                                    `/storeFront/return/${orderData?.id}`
                                  );
                                }}
                              >
                                Return
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </Fade>
          );
        })}
      </div>



      {cancelSurityPopup && (
        <ModalViewV2
          modalTitle={"Cancel"}
          handleModalClose={() => {
            setcancelSurityPopup(false);
          }}
          modalOpen={cancelSurityPopup}
          // actionBtns={["Cancel", "Confirm"]}
          // modalContentStyleHeight={"100%"}
          modalContentStyleWidth={"auto"}
          styleLeft={"calc(50% - 700px/2)"}
          styleHeight={"auto"}
          mainWidth={"530px"}
          modalContentStylePadding={"16px"}
          height={"200px"}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Typography>
              Do you want to return the order instead of cancelling it?
            </Typography>
            <div style={{ display: "flex", gap: "20px" }}>
              <Button
                variant="outlined"
                onClick={() => {
                  history.push(`/storeFront/return/${orderData?.id}`);
                }}
              >
                Return
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setcancelSurityPopup(false);
                  setcancelPopup(true);
                }}
              >
                Cancel order
              </Button>
            </div>
          </div>
        </ModalViewV2>
      )}

      {cancelPopup && (
        <CancelPopupPage
          show={cancelPopup}
          setShow={setcancelPopup}
          handleButtonClick={handleButtonClick}
          setReason={setReason}
          orderData={orderData}
          // decrement={decrement}
          // increment={increment}
          // reset_OrderData={reset_OrderData}
        />
      )}

      {ratingPopup && (
        <RatingPopupPage
          show={ratingPopup}
          setShow={setRatingPopupOpen}
          products={products}
          setproducts={setproducts}
          ratingCategories={ratingCategories}
          setratingCategories={setratingCategories}
          feedbackCategories={feedbackCategories}
          setfeedbackCategories={setfeedbackCategories}
          orderData={orderData}
          feedbackUrl={feedbackUrl}
          setRatingvalue={setRatingvalue}
          setRatingcategory={setRatingcategory}
          setRatinggiven={setRatinggiven}
        />
      )}

      {helpPopup && (
        <HelpPopupPage
          show={helpPopup}
          setShow={setHelpPopupOpen}
          setOrderPage={setOrderPage}
          grievanceCategories={grievanceCategories}
          setselectedCategory={setselectedCategory}
        />
      )}

      {refundPopup && paymentType == "prepaid" && (
        <RefundPopup show={refundPopup} setShow={setrefundPopupOpen} />
      )}
    </div>
  ) : (
    <div style={{ marginTop: "50px" }}>
      <SingleOrder
        OrderPage={OrderPage}
        setOrderPage={setOrderPage}
        selectedCategory={selectedCategory}
        orderData={orderData}
      />
    </div>
  );
};

export default Orders;


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