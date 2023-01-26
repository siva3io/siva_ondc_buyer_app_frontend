import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ModalViewV2 from "./ModalViewV2";
import AddForm from "Remote/AddForm";
import IconButton from "@mui/material/IconButton";
import { loadAddresses } from "../redux/Action/action";
import { useHistory } from "react-router-dom";
import {
  Product_init_API,
  addAddress,
  updateAddress,
  deleteAddress,
  loadCities,
  Product_select_API,
  Product_Multi_select_API,
  Product_Multi_init_API,
} from "../redux/Action/action";
import { cartProducts, PayloadItems } from "../screens/Products";
import CheckIcon from "@mui/icons-material/Check";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BASE_API_SOURCE from "../baseurl";
import validator from "validator";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export var data = [];
function Cart() {
  const topBar = new CustomEvent("topBar", {
    detail: {
      bar: true,
      route: "cart",
      search: false,
    },
  });
  document.dispatchEvent(topBar);

  useEffect(() => {
    dispatch(loadAddresses());
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

  const [proceed, setproceed] = useState(true);
  const [payment, setpayment] = useState(false);
  const [dummy, setdummy] = useState(1);

  const [Name, setName] = useState("Name");
  const [Address1, setAddress1] = useState("Address1");
  const [Address2, setAddress2] = useState("Address2");

  const [BillingName, setBillingName] = useState("Name");
  const [BillingAddress1, setBillingAddress1] = useState("Address1");
  const [BillingAddress2, setBillingAddress2] = useState("Address2");
  const [sameDeliveryAddress, setsameDeliveryAddress] = useState(false);

  const [CartProducts, setCartProducts] = useState(
    JSON.parse(localStorage.getItem("CartProducts"))
  );

  const [CartItemDetails, setCartItemDetails] = useState(
    JSON.parse(localStorage.getItem("CartProducts"))
  );

  const payLoadItemDetails = CartProducts ? CartProducts[0] : [];

  const { addressesData, citiesData } = useSelector(state => state.data);

  //address Card
  const [showAddressCard, setshowAddressCard] = useState(false);

  let history = useHistory();
  let dispatch = useDispatch();

  function handleClick() {
    console.log("mainData", mainData);
    if (localStorage.getItem("select_data")) {
      let localOnSelectData = JSON.parse(localStorage.getItem("select_data"));
      let init_payload = localOnSelectData.map(item => {
        return {
          context: {
            transaction_id: item?.context?.transaction_id,
            bpp_uri: item?.context?.bpp_uri,
            bpp_id: item?.context?.bpp_id,
            city: item?.context?.city,
          },
          message: {
            order: {
              provider: item?.message?.order?.provider,

              items: item?.message?.order?.items.map(o => {
                return {
                  id: o?.id,
                  quantity: {
                    count:
                      CartProducts &&
                      CartProducts.length > 0 &&
                      CartProducts[1].find(e => e?.look_up_id == o?.id)
                        ?.quantity,
                  },
                  fulfillment_id: o?.fulfillment_id,
                };
              }),
              fulfillments: item?.message?.order?.fulfillments,
              billing: {
                address: {
                  door:
                    mainData?.billing?.address_line_1 +
                    ", " +
                    mainData?.billing?.address_line_2,

                  city: mainData?.billing?.city ? mainData?.billing?.city : "",
                  state: mainData?.billing?.state
                    ? mainData?.billing?.state
                    : "",
                  country: mainData?.billing?.country
                    ? mainData?.billing?.country
                    : "",
                  area_code: mainData?.billing?.pincode
                    ? mainData?.billing?.pincode
                    : "",
                },
                phone: mainData?.billing?.phone_number
                  ? mainData?.billing?.phone_number
                  : "",
                name: mainData?.billing?.Name ? mainData?.billing?.Name : "",
                email: mainData?.billing?.email ? mainData?.billing?.email : "",
              },
              delivery: {
                type: "Delivery",
                name: mainData?.delivery?.Name ? mainData?.delivery?.Name : "",
                email: mainData?.delivery?.email
                  ? mainData?.delivery?.email
                  : "",
                phone: mainData?.delivery?.phone_number
                  ? mainData?.delivery?.phone_number
                  : "",
                location: {
                  gps: JSON.parse(localStorage.getItem("search"))?.lat_long,
                  address: {
                    door:
                      mainData?.delivery?.address_line_1 +
                      ", " +
                      mainData?.delivery?.address_line_2,

                    city: mainData?.delivery?.city
                      ? mainData?.delivery?.city
                      : "",
                    state: mainData?.delivery?.state
                      ? mainData?.delivery?.state
                      : "",
                    country: mainData?.delivery?.country
                      ? mainData?.delivery?.country
                      : "",
                    area_code: mainData?.delivery?.pincode
                      ? mainData?.delivery?.pincode
                      : "",
                  },
                },
              },
            },
          },
        };
      });

      let deliveryaddress = {
        type: "Delivery",
        name: mainData?.delivery?.Name ? mainData?.delivery?.Name : "",
        email: mainData?.delivery?.email ? mainData?.delivery?.email : "",
        phone: mainData?.delivery?.phone_number
          ? mainData?.delivery?.phone_number
          : "",
        location: {
          gps: JSON.parse(localStorage.getItem("search"))?.lat_long,
          address: {
            door:
              mainData?.delivery?.address_line_1 +
              ", " +
              mainData?.delivery?.address_line_2,

            city: mainData?.delivery?.city ? mainData?.delivery?.city : "",
            state: mainData?.delivery?.state ? mainData?.delivery?.state : "",
            country: mainData?.delivery?.country
              ? mainData?.delivery?.country
              : "",
            area_code: mainData?.delivery?.pincode
              ? mainData?.delivery?.pincode
              : "",
          },
        },
      };

      const id = toast.loading("Please wait...");
      localStorage.removeItem("init_data");
      dispatch(
        Product_Multi_init_API(init_payload, id, function (resp) {
          console.log("init resp", resp);
          resp.map((item, index) => {
            if (item?.message?.ack?.status === "ACK") {
              console.log("INIT");
              const source = new EventSource(
                `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${item?.context?.message_id}`
              );
              source.addEventListener("open", () => {
                console.log("SSE opened INIT");
              });
              source.addEventListener("on_init", e => {
                const data = JSON.parse(e.data);
                console.log("data_init", data, item);

                let on_init_data = [];
                if (!localStorage.getItem("init_data")) {
                  data.id = item?.id;
                  data.message.order["delivery"] = deliveryaddress;
                  on_init_data.push(data);

                  localStorage.setItem(
                    "init_data",
                    JSON.stringify(on_init_data)
                  );
                  window.dispatchEvent(new Event("localfetchInitData"));
                } else {
                  let oldata = JSON.parse(localStorage.getItem("init_data"));
                  data.id = item?.id;
                  data["delivery"] = deliveryaddress;
                  oldata.push(data);
                  localStorage.setItem("init_data", JSON.stringify(oldata));
                  window.dispatchEvent(new Event("localfetchInitData"));
                }

                if (data?.error && data?.error?.message) {
                  toast.update(id, {
                    render: data?.error?.message,
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                  });
                } else {
                  localStorage.setItem(
                    "address_details",
                    JSON.stringify(mainData?.delivery)
                  );

                  toast.update(id, {
                    render: "Order Initiated!",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                  });
                }
                source.close();
              });
              source.addEventListener("error", e => {
                const data = JSON.parse(e.data);
                console.error("Error: ", data);
                // toast.update(id, {
                //   render: data?.error?.message,
                //   type: "error",
                //   isLoading: false,
                //   autoClose: 2000,
                // });
                source.error();
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
      // dispatch(load_init_data(payload));

      history.push("/storeFront/payments");
    }

    // var init_payload =
    // {
    //   context: {
    //     transaction_id: payLoadItemDetails[0]?.transaction_id,
    //     bpp_uri: payLoadItemDetails[0]?.bpp_uri,
    //     bpp_id: payLoadItemDetails[0]?.bpp_id,
    //   },
    //   message: {
    //     order: {
    //       provider: {
    //         id: payLoadItemDetails[0]?.provider_id,
    //         locations:
    //         [
    //           {
    //             id: payLoadItemDetails[0]?.location_id
    //               ? payLoadItemDetails[0]?.location_id
    //               : "",
    //           },
    //         ],
    //       },
    //       items: payLoadItemDetails.map((o) => {
    //         return {
    //           id: o?.id,
    //           quantity: {
    //             count:
    //               CartProducts &&
    //               CartProducts.length > 0 &&
    //               CartProducts[1].find((e) => e?.look_up_id == o?.id)?.quantity,
    //           },
    //           fulfillment_id:
    //             localData?.message?.order?.items &&
    //             localData?.message?.order?.items.length > 0
    //               ? localData?.message?.order?.items[0]?.fulfillment_id
    //               : "",
    //         };
    //       }),
    //       fulfillments: localData?.message?.order?.fulfillments
    //         ? localData?.message?.order?.fulfillments
    //         : "",
    //       billing: {
    //         address: {
    //           door: mainData?.billing?.address_line_1
    //             ? mainData?.billing?.address_line_1
    //             : "",
    //           building: mainData?.billing?.address_line_2
    //             ? mainData?.billing?.address_line_2
    //             : "",
    //           street: mainData?.billing?.address_line_3
    //             ? mainData?.billing?.address_line_3
    //             : "",
    //           city: mainData?.billing?.city ? mainData?.billing?.city : "",
    //           state: mainData?.billing?.state ? mainData?.billing?.state : "",
    //           country: mainData?.billing?.country
    //             ? mainData?.billing?.country
    //             : "",
    //           areaCode: mainData?.billing?.pincode
    //             ? mainData?.billing?.pincode
    //             : "",
    //         },
    //         phone: mainData?.billing?.phone_number
    //           ? mainData?.billing?.phone_number
    //           : "",
    //         name: mainData?.billing?.Name ? mainData?.billing?.Name : "",
    //         email: mainData?.billing?.email ? mainData?.billing?.email : "",
    //       },
    //       delivery: {
    //         type: "Delivery",
    //         name: mainData?.delivery?.Name ? mainData?.delivery?.Name : "",
    //         email: mainData?.delivery?.email ? mainData?.delivery?.email : "",
    //         phone: mainData?.delivery?.phone_number
    //           ? mainData?.delivery?.phone_number
    //           : "",
    //         location: {
    //           gps: JSON.parse(localStorage.getItem('search'))?.lat_long,
    //           // payLoadItemDetails[0]?.locations?.gps
    //           //   ? payLoadItemDetails[0]?.locations?.gps
    //           //   : "",
    //           address: {
    //             door: mainData?.delivery?.address_line_1
    //               ? mainData?.delivery?.address_line_1
    //               : "",
    //             building: mainData?.delivery?.address_line_2
    //               ? mainData?.delivery?.address_line_2
    //               : "",
    //             street: mainData?.delivery?.address_line_3
    //               ? mainData?.delivery?.address_line_3
    //               : "",
    //             city: mainData?.delivery?.city ? mainData?.delivery?.city : "",
    //             state: mainData?.delivery?.state
    //               ? mainData?.delivery?.state
    //               : "",
    //             country: mainData?.delivery?.country
    //               ? mainData?.delivery?.country
    //               : "",
    //             areaCode: mainData?.delivery?.pincode
    //               ? mainData?.delivery?.pincode
    //               : "",
    //           },
    //         },
    //       },
    //       payment: {
    //         type: "POST-FULFILLMENT",
    //       },
    //     },
    //   },
    // };
    // const id = toast.loading("Please wait...");
    // dispatch(
    //   Product_init_API(init_payload, function (resp) {
    //     console.log("resp 1", resp)
    //     if (resp?.message?.ack?.status === "ACK") {
    //       console.log("INIT");
    //       const source = new EventSource(
    //         `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${resp?.context?.message_id}`
    //       );
    //       source.addEventListener("open", () => {
    //         console.log("SSE opened INIT");
    //       });
    //       source.addEventListener("on_init", (e) => {
    //         const data = JSON.parse(e.data);
    //         console.log("data_init", data);
    //         if (data?.message?.ack?.status == "NACK") {
    //           toast.update(id, {
    //             render: data?.message?.error?.message,
    //             type: "error",
    //             isLoading: false,
    //             autoClose: 2000,
    //           });
    //         }
    //         else if(data?.error && data?.error?.message)
    //         {
    //           toast.error(data?.error?.message, {
    //             autoClose: 2000,
    //           });
    //         }
    //         else {
    //           localStorage.setItem("init_data", JSON.stringify(data));
    //           localStorage.setItem(
    //             "address_details",
    //             JSON.stringify(mainData?.delivery)
    //           );
    //           window.dispatchEvent(new Event("localfetchInitData"));

    //           toast.update(id, {
    //             render: "Order Initiated!",
    //             type: "success",
    //             isLoading: false,
    //             autoClose: 2000,
    //           });
    //         }
    //         source.close();
    //       });
    //        source.addEventListener("error", (e) => {
    //         toast.update(id, {
    //           render: "Something went wrong",
    //           type: "error",
    //           isLoading: false,
    //           autoClose: 2000,
    //         });
    //       });

    //       return () => {
    //         source.close();
    //       };
    //     }
    //     else if(resp?.error && resp?.error?.message)
    //     {
    //       toast.error(resp?.error?.message, {
    //         autoClose: 2000,
    //       });
    //     }
    //     else {
    //       toast.update(id, {
    //         render: "Something went wrong",
    //         type: "error",
    //         isLoading: false,
    //         autoClose: 2000,
    //       });
    //     }
    //   })
    // );
    // // dispatch(load_init_data(payload));

    // history.push("/storeFront/payments");
  }

  const [localData, setlocalData] = useState("");

  var tempvar = 0;

  useEffect(() => {
    dispatch(loadCities());
  }, []);

  const states = [];
  citiesData &&
    citiesData?.map(o => {
      !states.includes(o?.State) && states.push(o?.State);
    });

  React.useEffect(() => {
    function handleResize() {
      if (JSON.parse(localStorage.getItem("select_data")) != null) {
        setlocalData(JSON.parse(localStorage.getItem("select_data")));
        let newproducts = products;

        let newlocalData = JSON.parse(localStorage.getItem("select_data"));
        let newCartItemDetails = CartItemDetails[1];

        // for (let index = 0; index < newCartItemDetails.length; index++) {
        //   newCartItemDetails[index]["delivery_charges"] =
        //     newlocalData[index]?.message?.order?.quote?.breakup &&
        //     newlocalData[index]?.message?.order?.quote?.breakup.length > 0 &&
        //     newlocalData[index]?.message?.order?.quote?.breakup.find(
        //       ele => ele["@ondc/org/title_type"] == "delivery"
        //     )?.price?.value
        //       ? newlocalData[index]?.message?.order?.quote?.breakup.find(
        //           ele => ele["@ondc/org/title_type"] == "delivery"
        //         )?.price?.value
        //       : "00.00 INR";
        //   newCartItemDetails[index]["packing_charges"] =
        //     newlocalData[index]?.message?.order?.quote?.breakup &&
        //     newlocalData[index]?.message?.order?.quote?.breakup.length > 0 &&
        //     newlocalData[index]?.message?.order?.quote?.breakup.find(
        //       ele => ele["@ondc/org/title_type"] == "packing"
        //     )?.price?.value
        //       ? newlocalData[index]?.message?.order?.quote?.breakup.find(
        //           ele => ele["@ondc/org/title_type"] == "packing"
        //         )?.price?.value
        //       : "00.00 INR";
        //   newCartItemDetails[index]["tax"] =
        //     newlocalData[index]?.message?.order?.quote?.breakup &&
        //     newlocalData[index]?.message?.order?.quote?.breakup.length > 0 &&
        //     newlocalData[index]?.message?.order?.quote?.breakup.find(
        //       ele => ele["@ondc/org/title_type"] == "tax"
        //     )?.price?.value
        //       ? newlocalData[index]?.message?.order?.quote?.breakup.find(
        //           ele => ele["@ondc/org/title_type"] == "tax"
        //         )?.price?.value
        //       : "00.00 INR";
        // }
        for (let index = 0; index < newproducts.length; index++) {
          newproducts[index]["delivery_charges"] =
            newlocalData[index]?.message?.order?.quote?.breakup &&
            newlocalData[index]?.message?.order?.quote?.breakup.length > 0 &&
            newlocalData[index]?.message?.order?.quote?.breakup.find(
              ele => ele["@ondc/org/title_type"] == "delivery"
            )?.price?.value
              ? newlocalData[index]?.message?.order?.quote?.breakup.find(
                  ele => ele["@ondc/org/title_type"] == "delivery"
                )?.price?.value
              : "00.00 INR";
          newproducts[index]["packing_charges"] =
            newlocalData[index]?.message?.order?.quote?.breakup &&
            newlocalData[index]?.message?.order?.quote?.breakup.length > 0 &&
            newlocalData[index]?.message?.order?.quote?.breakup.find(
              ele => ele["@ondc/org/title_type"] == "packing"
            )?.price?.value
              ? newlocalData[index]?.message?.order?.quote?.breakup.find(
                  ele => ele["@ondc/org/title_type"] == "packing"
                )?.price?.value
              : "00.00 INR";
          newproducts[index]["tax"] =
            newlocalData[index]?.message?.order?.quote?.breakup &&
            newlocalData[index]?.message?.order?.quote?.breakup.length > 0 &&
            newlocalData[index]?.message?.order?.quote?.breakup.find(
              ele => ele["@ondc/org/title_type"] == "tax"
            )?.price?.value
              ? newlocalData[index]?.message?.order?.quote?.breakup.find(
                  ele => ele["@ondc/org/title_type"] == "tax"
                )?.price?.value
              : "00.00 INR";
          newproducts[index]["convFee"] =
            newlocalData[index]?.message?.order?.quote?.breakup &&
            newlocalData[index]?.message?.order?.quote?.breakup.length > 0 &&
            newlocalData[index]?.message?.order?.quote?.breakup.find(
              ele => ele["@ondc/org/title_type"] == "misc"
            )?.price?.value
              ? newlocalData[index]?.message?.order?.quote?.breakup.find(
                  ele => ele["@ondc/org/title_type"] == "misc"
                )?.price?.value
              : "00.00 INR";
        }

        setCartItemDetails([CartItemDetails[0], newCartItemDetails]);
        setProducts(newproducts);
        tempvar += 1;
        setdummy(tempvar);
        let cal = 0.0;
        newproducts.forEach(
          o =>
            (cal =
              cal +
              parseFloat(o?.price) * o?.quantity +
              parseFloat(o?.delivery_charges) +
              parseFloat(o?.packing_charges) +
              parseFloat(o?.tax) +
              parseFloat(o?.convFee))
        );
        settotalAmount(cal);
        localStorage.setItem(
          "CartProducts",
          JSON.stringify([CartItemDetails[0], newCartItemDetails])
        );
      }
    }
    window.addEventListener("localfetchSelectData", handleResize);

    return () => {
      window.removeEventListener("localfetchSelectData", handleResize);
    };
  });

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
      required: true,
    },
    {
      label: "Country",
      type: "input",
      key: "country",
      // defaultVal: {},
      required: true,
      disabled: true,
    },
    {
      label: "State",
      type: "select",
      key: "state",
      // defaultVal: {},
      required: true,
    },
    {
      label: "City/Town",
      type: "select",
      key: "city",
      required: true,
    },
    {
      label: "Email",
      type: "input",
      key: "email",
      required: true,
    },
  ]);

  const [products, setProducts] = useState(
    CartItemDetails && CartItemDetails[1] && CartItemDetails[1].length > 0
      ? CartItemDetails[1]?.map((o, index) => {
          return {
            id: index + 1,
            price: o?.price,
            look_up_id: o?.look_up_id,
            image: o?.image,
            total_price: parseFloat(o?.price) * o?.quantity,
            name: o?.name,
            quantity: o?.quantity,
            seller_name: "Seller Name",
            delivery_charges: o?.delivery_charges
              ? o?.delivery_charges
              : "00.00 INR",
            packing_charges: o?.packing_charges
              ? o?.packing_charges
              : "00.00 INR",
            tax: o?.tax ? o?.tax : "00.00 INR",
            convFee: o?.convFee ? o?.convFee : "00.00 INR",
          };
        })
      : []
  );

  let cal = 0.0;
  products.forEach(
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

  localStorage.setItem(
    "CartProducts",
    JSON.stringify([payLoadItemDetails, products])
  );

  data = Object.assign(products);

  // const handleClose = (param) => {
  //   if (param == "addressCard") {
  //     setshowAddressCard(false);
  //     setName(mainData?.person_name);
  //     setAddress1(mainData?.address_line_1);
  //     setAddress2(mainData?.address_line_2);
  //   } else {
  //     setOpen(false);
  //   }
  // };

  useEffect(() => {}, [products]);

  const handleButtonClick = param => {
    if (param == "Same as Delivery Address") {
      mainData["billing"] = mainData["delivery"];
      setBillingName(
        mainData?.delivery?.Name
          ? mainData?.delivery?.Name
          : mainData?.billing?.Name
      );
      setBillingAddress1(
        mainData?.delivery?.address_line_1
          ? mainData?.delivery?.address_line_1
          : mainData?.billing?.address_line_1
      );
      setBillingAddress2(
        mainData?.delivery?.address_line_2
          ? mainData?.delivery?.address_line_2
          : mainData?.billing?.address_line_2
      );
    }
  };

  const handleDeleteButton = (id, look_up_id) => {
    let newProducts = products.filter(o => o?.id != id);
    setProducts(newProducts);
    let UpdatedCartDetails = CartItemDetails.filter(
      o => o?.look_up_id != look_up_id
    );
    let UpdatedpayLoadDetails = payLoadItemDetails.filter(
      o => o?.id != look_up_id
    );
    localStorage.setItem(
      "CartProducts",
      JSON.stringify([UpdatedpayLoadDetails, UpdatedCartDetails])
    );
    setCartProducts([UpdatedpayLoadDetails, UpdatedCartDetails]);
    setdummy(dummy + 1);
    data = Object.assign(newProducts);
    let cal = 0.0;
    UpdatedCartDetails.forEach(
      o =>
        (cal =
          cal +
          parseFloat(o?.price) * o?.quantity +
          parseFloat(o?.delivery_charges) +
          parseFloat(o?.packing_charges) +
          parseFloat(o?.tax) +
          parseFloat(o?.convFee))
    );
    settotalAmount(cal);
    callproductdata();
  };

  const [mainData, setMainData] = useState({});
  const [update, setupdate] = useState(true);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const handelInputChangeLocation = (key, value) => {
    console.log("key ", key);
    console.log("value ", value);
    // if (key == "phone_number") {
    //   // if (validator.isMobilePhone(value)) {
    //   //   toast.success('Valid Mobile Number')
    //   // } else {
    //   //   toast.error('Please enter valid mobile number')
    //   // }
    //   var Number_Validation = new RegExp(/^[0-9\b]+$/);
    //   if (!Number_Validation.test(value)) {
    //     toast.error("Please enter only number.");
    //   }
    //   // else if(value.length != 10){
    //   //   toast.error("Please enter valid mobile number.")
    //   // }
    //   else if (value.length == 10) {
    //     toast.success("Valid Mobile Number");
    //   }
    // } else if (key == "email") {
    //   if (validator.isEmail(value)) {
    //     toast.success("Valid Email");
    //   } else {
    //     toast.error("Please enter valid Email");
    //   }
    // }
    // ----------------------------------------------
    // if (key == "state") {
    //   setStateData(value);
    //   console.log(value, "valueeeee");
    //   let temp = [];
    //   citiesData &&
    //     citiesData.map((o) => {
    //       o?.State == value && temp?.push(o?.City);
    //     });
    //   setCityData(temp);
    // }
    setnewlocationData({ ...newlocationData, [key]: value });
    try {
      var newLocationForm = LocationForm.map(o => {
        if (o.key == key) o.value = value;
        return o;
      });
      setLocationForm(newLocationForm);
    } catch (e) {}
    // var newMainData = mainData;
    // newMainData[key] = value;
    // setMainData(newMainData);
  };

  const handleSelectonChangeLocation = (key, value) => {
    switch (key) {
      case "city":
      case "state": {
        setLocationForm(
          LocationForm.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
    }
    if (key == "state") {
      setStateData(value);
      // console.log(value, "valueeeee");
      let temp = [];
      citiesData &&
        citiesData.map(o => {
          o?.State == value && temp?.push(o?.City);
        });
      setCityData(temp);
    }
    if (key == "city") {
      // console.log(value, "444444444444444");
      setCityData(value);
    }
    setnewlocationData({ ...newlocationData, [key]: value });
    // try {
    //   var newLocationForm = LocationForm.map((o) => {
    //     if (o.key == key) o.value = value;
    //     return o;
    //   });
    //   setLocationForm(newLocationForm);
    // } catch (e) {}
  };

  useEffect(() => {
    let temp = [];
    citiesData &&
      citiesData?.map(o => {
        o?.State == stateData && temp?.push(o?.City);
      });
    setCityData(temp);
  }, [stateData]);
  // console.log(cityData, "cityyyyyyyyy", stateData, "stateteeeeeeeee");

  useEffect(() => {
    if (addressesData) {
      var tempDelivery = mainData;
      tempDelivery["delivery"] = addressesData[0];
      setMainData(tempDelivery);

      var tempBilling = mainData;
      tempBilling["billing"] = addressesData[0];
      setMainData(tempBilling);

      setName(mainData?.delivery?.Name);
      setAddress1(mainData?.delivery?.address_line_1);
      setAddress2(mainData?.delivery?.address_line_1);

      setBillingName(mainData?.delivery?.Name);
      setBillingAddress1(mainData?.delivery?.address_line_1);
      setBillingAddress2(mainData?.delivery?.address_line_2);
    }
  }, [addressesData]);

  const setAddressPopup = param => {
    // console.log(mainData, "parammmmmmmmmm");
    var newLocationForm = LocationForm.map(o => {
      if (o.key == "Name") o.value = param ? mainData?.delivery?.Name : "";
      if (o.key == "phone_number")
        o.value = param ? mainData?.delivery?.phone_number : "";
      if (o.key == "address_line_1")
        o.value = param ? mainData?.delivery?.address_line_1 : "";
      if (o.key == "address_line_2")
        o.value = param ? mainData?.delivery?.address_line_2 : "";
      if (o.key == "address_line_3")
        o.value = param ? mainData?.delivery?.address_line_3 : "";
      if (o.key == "city")
        o.value = param
          ? mainData?.delivery?.city
            ? mainData?.delivery?.city
            : cityData
          : "";
      if (o.key == "state")
        o.value = param
          ? mainData?.delivery?.state
            ? mainData?.delivery?.state
            : stateData
          : "";
      if (o.key == "country")
        // o.value = param ? mainData?.delivery?.country : "";
        o.value = "India";
      if (o.key == "pincode")
        o.value = param ? mainData?.delivery?.pincode : "";
      if (o.key == "email") o.value = param ? mainData?.delivery?.email : "";
      return o;
    });
    var newLocationForm1 = {};
    newLocationForm.map(o => {
      newLocationForm1[o.key] = o.value;
    });
    param ? setupdate(true) : setupdate(false);
    setnewlocationData(newLocationForm1);
    setLocationForm(newLocationForm);
  };

  const handleAddressAddClick = () => {
    // if (key == "phone_number") {
    //   var Number_Validation = new RegExp(/^[0-9\b]+$/);
    //   if (!Number_Validation.test(newlocationData?.phone_number)) {
    //     toast.error("Please enter only number.");
    //   }
    //   else if (value.length == 10) {
    //     toast.success("Valid Mobile Number");
    //   }
    // } else if (key == "email") {
    //   if (validator.isEmail(value)) {
    //     toast.success("Valid Email");
    //   } else {
    //     toast.error("Please enter valid Email");
    //   }
    // }

    var Number_Validation = new RegExp(/^[0-9\b]+$/);
    if (!Number_Validation.test(newlocationData?.phone_number)) {
      toast.error("Please enter valid mobile number.");
    } else if (newlocationData?.phone_number.length != 10) {
      toast.error("Please enter 10 digits mobile number.");
    } else if (!validator.isEmail(newlocationData?.email)) {
      toast.error("Please enter valid Email");
    } else {
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

      //close popup
      setshowAddressCard(false);
    }
  };

  const handleClickProceed = () => {
    setCartProducts(JSON.parse(localStorage.getItem("CartProducts")));
    let cal = 0.0;
    products.forEach(
      o =>
        (cal =
          cal +
          parseFloat(o?.price) * o?.quantity +
          parseFloat(o?.delivery_charges) +
          parseFloat(o?.packing_charges) +
          parseFloat(o?.tax) +
          parseFloat(o?.convFee))
    );
    settotalAmount(cal);
    setproceed(false);
    setpayment(true);
  };

  const backProcessStep = () => {
    setproceed(true);
    setpayment(false);
  };

  const decrement = id => {
    try {
      var newCartProducts = CartProducts;
      if (newCartProducts[1][id].quantity > 1) {
        newCartProducts[1][id]["quantity"] =
          newCartProducts[1][id]["quantity"] - 1;
        localStorage.setItem("CartProducts", JSON.stringify(newCartProducts));
        setCartProducts(newCartProducts);
        setCartItemDetails(newCartProducts[1]);
        setProducts(newCartProducts[1]);
        let cal = 0.0;
        newCartProducts[1].forEach(
          o =>
            (cal =
              cal +
              parseFloat(o?.price) * o?.quantity +
              parseFloat(o?.delivery_charges) +
              parseFloat(o?.packing_charges) +
              parseFloat(o?.tax) +
              parseFloat(o?.convFee))
        );
        settotalAmount(cal);
        setdummy(dummy + 1);
      } else if (newCartProducts[1][id].quantity == 1) {
        // console.log("came here");
        newCartProducts[0] = newCartProducts[0].filter(
          (o, index) => index !== id
        );
        newCartProducts[1] = newCartProducts[1].filter(
          (o, index) => index !== id
        );

        localStorage.setItem("CartProducts", JSON.stringify(newCartProducts));
        setCartProducts(newCartProducts);
        setCartItemDetails(newCartProducts[1]);
        setProducts(newCartProducts[1]);
        let cal = 0.0;
        newCartProducts[1].forEach(
          o =>
            (cal =
              cal +
              parseFloat(o?.price) * o?.quantity +
              parseFloat(o?.delivery_charges) +
              parseFloat(o?.packing_charges) +
              parseFloat(o?.tax) +
              parseFloat(o?.convFee))
        );
        settotalAmount(cal);
        setdummy(dummy + 1);
      }
    } catch (ex) {
      console.log("Error", ex);
    }
  };

  const increment = id => {
    try {
      var newCartProducts = JSON.parse(localStorage.getItem("CartProducts"));
      newCartProducts[1][id]["quantity"] =
        newCartProducts[1][id]["quantity"] + 1;
      localStorage.setItem("CartProducts", JSON.stringify(newCartProducts));
      setCartProducts(newCartProducts);
      setCartItemDetails(newCartProducts[1]);
      setProducts(newCartProducts[1]);
      let cal = 0.0;
      newCartProducts[1].forEach(
        o =>
          (cal =
            cal +
            parseFloat(o?.price) * o?.quantity +
            parseFloat(o?.delivery_charges) +
            parseFloat(o?.packing_charges) +
            parseFloat(o?.tax) +
            parseFloat(o?.convFee))
      );
      settotalAmount(cal);
      setdummy(dummy + 1);
    } catch (ex) {
      console.log("Error", ex);
    }
  };
  const [selectedAddressCard, setselectedAddressCard] = useState(0);
  const [selectedBillingAddressCard, setselectedBillingAddressCard] =
    useState(0);

  const handleChangeAddress = (address, index) => {
    var tempDelivery = mainData;
    tempDelivery["delivery"] = address;
    tempDelivery["id"] = address?.id;
    setMainData(tempDelivery);
    setselectedAddressCard(index);
  };
  const handleChangeBillingAddress = (address, index) => {
    var tempDelivery = mainData;
    tempDelivery["billing"] = address;
    setMainData(tempDelivery);
    setselectedBillingAddressCard(index);
  };

  const [isevent_update, setisevent_update] = useState(false);
  useEffect(() => {
    callproductdata();
  }, []);

  function callproductdata() {
    var CartProducts1 = JSON.parse(localStorage.getItem("CartProducts"));
    if (CartProducts1 && CartProducts1.length > 1) {
      var payload = CartProducts1[0].map(item => {
        return {
          context: {
            //transaction_id: item?.transaction_id,
            bpp_uri: item?.bpp_uri,
            bpp_id: item?.bpp_id,
            city: item?.city_code,
          },
          message: {
            order: {
              provider: {
                id: item?.provider_id,
                locations: [
                  {
                    id: item?.location_id ? item?.location_id : "",
                  },
                ],
              },
              items: [item],
            },
            fulfillments: [
              {
                end: {
                  location: {
                    gps: JSON.parse(localStorage.getItem("search"))?.lat_long,
                    address: {
                      area_code: JSON.parse(localStorage.getItem("search"))
                        ?.pincode,
                    },
                  },
                },
              },
            ],
          },
        };
      });
    } else {
      history.push("/storeFront/cart");
    }
    const id = toast.loading("Please wait...");
    localStorage.removeItem("select_data");
    dispatch(
      Product_Multi_select_API(payload, id, function (resp) {
        resp.map((item, index) => {
          console.log("item", item);
          if (item?.message?.ack?.status === "ACK") {
            const source = new EventSource(
              `${BASE_API_SOURCE.ondc_url}api/v1/ondc/events?messageId=${item?.context?.message_id}`
            );
            source.addEventListener("open", () => {
              console.log("SSE opened select!");
            });
            source.addEventListener("on_select", e => {
              var data = JSON.parse(e.data);
              console.log("select_data", data);
              let on_select_data = [];
              if (!localStorage.getItem("select_data")) {
                data.id = item?.id;
                on_select_data.push(data);

                localStorage.setItem(
                  "select_data",
                  JSON.stringify(on_select_data)
                );
                window.dispatchEvent(new Event("localfetchSelectData"));
                setlocalData(on_select_data);
              } else {
                let oldata = JSON.parse(localStorage.getItem("select_data"));
                data.id = item?.id;
                oldata.push(data);
                localStorage.setItem("select_data", JSON.stringify(oldata));
                window.dispatchEvent(new Event("localfetchSelectData"));
                setlocalData(oldata);
              }

              if (data?.error && data?.error?.message) {
                //Error --- 889
                toast.update(id, {
                  render: data?.error?.message,
                  type: "error",
                  isLoading: false,
                  autoClose: 2000,
                });
              } else {
                //window.dispatchEvent(new Event("localfetchSelectData"));
                // localStorage.setItem("select_data", JSON.stringify(data));
                toast.update(id, {
                  render: "Added to cart!",
                  type: "success",
                  isLoading: false,
                  autoClose: 2000,
                });
              }
              var currentindex = index + 1;
              if (resp.length == currentindex) {
                setisevent_update(true);
              }
              source.close();
            });

            source.addEventListener("error", e => {
              const data = JSON.parse(e.data);
              console.error("Error: ", data);
              // toast.update(id, {
              //   render: data?.error?.message,
              //   type: "error",
              //   isLoading: false,
              //   autoClose: 2000,
              // });
              source.error();
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

  return (
    <>
      <div className="store_splitScreen">
        <div className="store_topPane">
          {proceed && (
            <>
              <Card sx={{ minWidth: 275, marginBottom: "20px" }}>
                <CardContent>
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
                          handleAddressAddClick();
                        }}
                        handleModalClose={() => {
                          setshowAddressCard(false);
                        }}
                        modalOpen={showAddressCard}
                        actionBtns={
                          newlocationData.Name == "" ||
                          newlocationData.phone_number == "" ||
                          // ||newlocationData.phone_number.length != "10"
                          // ||!RegExp(/^[0-9\b]+$/).test(newlocationData.phone_number)
                          newlocationData.address_line_1 == "" ||
                          newlocationData.address_line_2 == "" ||
                          newlocationData.pincode == "" ||
                          newlocationData.country == "" ||
                          newlocationData.state == "" ||
                          newlocationData.city == "" ||
                          newlocationData.email == ""
                            ? // || !validator.isEmail(newlocationData.email)
                              ["Cancel"]
                            : ["Cancel", "Confirm"]
                        }
                        component={"editAddress"}
                      >
                        <AddForm
                          header={"Location Details"}
                          data={LocationForm.map(field => {
                            switch (field.key) {
                              case "city": {
                                field.data = cityData;
                                break;
                              }
                              case "state": {
                                field.data = states;
                                break;
                              }
                            }
                            return field;
                          })}
                          handelInputChange={handelInputChangeLocation}
                          handelSelectonChange={handleSelectonChangeLocation}
                        />
                      </ModalViewV2>
                    )}
                  </div>

                  <div className="store_address_cards">
                    {addressesData?.map((o, index) => {
                      return (
                        <div
                          className="store_cardText"
                          onClick={() => {
                            handleChangeAddress(o, index);
                          }}
                          style={{
                            border:
                              selectedAddressCard == index
                                ? "2px solid #001661"
                                : "",
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

                  <h4
                  // style={{ marginTop: "50px", paddingLeft: "20px" }}
                  >
                    Add Delivery Instructions
                  </h4>

                  <TextField
                    className="store_features_contact"
                    id="outlined-basic"
                    label="Add Delivery Instructions"
                    variant="outlined"
                  />
                  <br></br>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 275, marginBottom: "50px" }}>
                <CardContent>
                  <div
                    className="store_Top"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "block", width: "80%" }}>
                      <Typography
                        variant="h7"
                        sx={{
                          lineHeight: "12px",
                          letterSpacing: " 0.5px",
                          color: " #2E2E2E",
                        }}
                      >
                        <h3 style={{ color: "rgba(0, 22, 97, 1)" }}>
                          Billing Address
                        </h3>
                      </Typography>
                    </div>
                    <div>
                      <Button
                        sx={{ float: "right" }}
                        variant="text"
                        onClick={() => {
                          handleButtonClick("Same as Delivery Address");
                          setsameDeliveryAddress(true);
                        }}
                      >
                        Same as Delivery Address
                      </Button>
                    </div>
                  </div>
                  {sameDeliveryAddress ? (
                    <div
                      className="store_cardText"
                      style={{ border: "2px solid rgb(0, 22, 97)" }}
                    >
                      <p>{mainData["billing"]?.Name}</p>
                      <p>{mainData["billing"]?.address_line_1}</p>
                      <p>{mainData["billing"]?.address_line_2}</p>
                    </div>
                  ) : (
                    <div className="store_address_cards">
                      {addressesData.map((o, index) => {
                        return (
                          <div
                            className="store_cardText"
                            onClick={() => {
                              handleChangeBillingAddress(o, index);
                            }}
                            style={{
                              border:
                                selectedBillingAddressCard == index
                                  ? "2px solid #001661"
                                  : "",
                            }}
                          >
                            <p>{o?.Name}</p>
                            <p>{o?.address_line_1}</p>
                            <p>{o?.address_line_2}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <h4
                  // style={{ marginTop: "50px", paddingLeft: "20px" }}
                  >
                    Add Billing Instructions
                  </h4>

                  <TextField
                    className="store_features_contact"
                    id="outlined-basic"
                    label="Add Billing Instructions"
                    variant="outlined"
                  />
                  <br></br>
                </CardContent>
              </Card>
            </>
          )}

          {payment && (
            <>
              <Card
                className="store_cardSucess"
                sx={{ minWidth: 275, marginBottom: "20px" }}
              >
                <CardContent>
                  <div
                    className="store_Top"
                    style={{ display: "flex", width: "100%" }}
                  >
                    <div style={{ width: "80%" }}>
                      <Typography
                        variant="h7"
                        sx={{
                          lineHeight: "12px",
                          letterSpacing: " 0.5px",
                          color: " #2E2E2E",
                        }}
                      >
                        <h3 style={{ color: "rgba(0, 22, 97, 1)" }}>
                          Address <CheckIcon></CheckIcon>
                        </h3>
                      </Typography>
                    </div>
                    <div style={{ width: "20%", margin: "auto" }}>
                      <Button
                        sx={{ float: "right" }}
                        variant="text"
                        onClick={() => {
                          backProcessStep();
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                  <div className="AddressConfirm">
                    <p>Delivering to:</p>
                    <p>{mainData?.delivery?.Name}</p>
                    <p>
                      {mainData?.delivery?.address_line_1},{" "}
                      {mainData?.delivery?.address_line_2}
                    </p>
                    <p>
                      {mainData?.delivery?.city}, {mainData?.delivery?.state},{" "}
                      {mainData?.delivery?.pincode}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card sx={{ minWidth: 275, marginBottom: "20px" }}>
                <CardContent>
                  <div
                    className="store_Top"
                    style={{ display: "block", width: "100%" }}
                  >
                    <div style={{ width: "100%" }}>
                      <Typography
                        variant="h7"
                        sx={{
                          lineHeight: "12px",
                          letterSpacing: " 0.5px",
                          color: " #2E2E2E",
                        }}
                      >
                        <h3 style={{ color: "rgba(0, 22, 97, 1)" }}>Cart</h3>
                      </Typography>
                    </div>
                  </div>
                  <Divider />

                  <div className="store_productsOverView">
                    {CartProducts[1]?.map((data, id) => {
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
                              <div className="store_product_title">
                                {data?.name}
                              </div>
                              <div className="store_ordering_from">
                                Ordering from <b>{data?.seller_name}</b>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "100%",
                                  bottom: " 10px",
                                  position: "absolute",
                                  padding: "0px 20px 0px 0px",
                                }}
                              >
                                <div className="store_card_price">
                                  ₹ {data?.price}
                                </div>
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
                    })}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="store_bottomPane">
          <Card>
            <CardContent>
              <div className="store_left_content_form">
                {products?.map(o => {
                  return (
                    <>
                      <table style={{ marginTop: "0px", marginBottom: "30px" }}>
                        <tr>
                          <td>
                            <div style={{ display: "flex" }}>
                              <h2
                                style={{
                                  maxWidth: "275px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {o?.name}
                                {/* <DeleteIcon /> */}
                              </h2>
                              <IconButton
                                color="primary"
                                sx={{ p: "10px" }}
                                aria-label="directions"
                                onClick={() => {
                                  handleDeleteButton(o?.id, o?.look_up_id);
                                }}
                              >
                                <DeleteIcon style={{ color: "#5D5D5D" }} />
                              </IconButton>
                            </div>
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
                          <td>
                            {o?.delivery_charges}
                            {Number.isInteger(o?.delivery_charges) && ".00"}
                          </td>
                        </tr>
                        <tr>
                          <td>Packing Charges</td>
                          <td>
                            {o?.packing_charges}
                            {Number.isInteger(o?.packing_charges) && ".00"}
                          </td>
                        </tr>
                        <tr>
                          <td>Tax</td>
                          <td>
                            {o?.tax}
                            {Number.isInteger(o?.tax) && ".00"}
                          </td>
                        </tr>
                        <tr>
                          <td>Convenience Fee</td>
                          <td>
                            {o?.convFee}
                            {Number.isInteger(o?.convFee) && ".00"}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ color: "red" }}>
                              {localData &&
                                localData?.find(p => p.id == o.look_up_id)
                                  ?.error?.message}
                            </span>
                          </td>
                          <td></td>
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

                {proceed &&
                  ((isevent_update && (
                    <Button
                      disabled={
                        localData &&
                        localData?.filter(p => p?.error?.message).length > 0
                          ? true
                          : false
                      }
                      variant="contained"
                      style={{
                        width: "-webkit-fill-available",
                        backgroundColor:
                          localData &&
                          localData?.filter(p => p?.error?.message).length > 0
                            ? "grey"
                            : "rgba(0, 22, 97, 1)",
                      }}
                      onClick={() => {
                        handleClickProceed();
                      }}
                    >
                      Proceed
                    </Button>
                  )) || (
                    <Button
                      disabled
                      variant="contained"
                      style={{
                        width: "-webkit-fill-available",
                        backgroundColor: "grey",
                      }}
                    >
                      Proceed
                    </Button>
                  ))}

                {payment && (
                  <Button
                    variant="contained"
                    style={{
                      width: "-webkit-fill-available",
                      backgroundColor: "rgba(0, 22, 97, 1)",
                    }}
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    Continue to Payments
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
export default Cart;



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