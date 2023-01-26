import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
//{{ondc_local_host}}/api/v1/ondc/clientApis/bap/eunimart_bap/multi_select
//{{ondc_local_host}}/api/v1/ondc/clientApis/bap/eunimart_bap/multi_init
//{{ondc_local_host}}/api/v1/ondc/clientApis/bap/eunimart_bap/multi_confirm
const get_status_data = (data) => ({
  type: types.STATUS,
  payload: data,
});
export const load_status_data = (data) => {
  return function (dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/bap/eunimart_bap/status`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log(resp, "response");
        dispatch(get_status_data(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const Event_status_api = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/status`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log("resp", resp);
        callback(resp.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
      });
  };
};

export const Event_Track_api = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/track`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log("resp", resp);
        callback(resp.data);
      })
      .catch((error) => console.log(error));
  };
};

export const Event_Cancel_api = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/cancel`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log("resp", resp);
        // toast("Cancelling");
        callback(resp.data);
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
      });
  };
};

const get_track_data = (data) => ({
  type: types.TRACK,
  payload: data,
});
export const load_track_data = (data) => {
  return function (dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/bap/eunimart_bap/track`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log(resp, "response");
        dispatch(get_track_data(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const get_cancel_data = (data) => ({
  type: types.CANCEL,
  payload: data,
});
export const load_cancel_data = (data) => {
  return function (dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/cancel`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log(resp, "response");
        dispatch(get_cancel_data(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

//#region Get Product Search List
export const Product_Search_API = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/search`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        callback(resp.data);
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Product Search List

export const Product_select_API = (data, toastID, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/select`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log("resp", resp);
        callback(resp.data);
      })
      .catch((error) => {
        // console.log(error);
        toast.update(toastID, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };
};

export const Product_Multi_select_API = (data, toastID, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/multi_select`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log("resp", resp);
        callback(resp.data);
      })
      .catch((error) => {
        // console.log(error);
        toast.update(toastID, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };
};

export const Product_Multi_init_API = (data, toastID, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/multi_init`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log("resp", resp);
        callback(resp.data);
      })
      .catch((error) => {
        // console.log(error);
        toast.update(toastID, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };
};

export const Product_Multi_confirm_API = (data, toastID, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/multi_confirm`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log("resp", resp);
        callback(resp.data);
      })
      .catch((error) => {
        // console.log(error);
        toast.update(toastID, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };
};

export const Product_init_API = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/init`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log("init--resp", resp);

        callback(resp.data);
      })
      .catch((error) => console.log(error));
  };
};

export const Product_confirm_API = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/confirm`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log("resp", resp);
        callback(resp.data);
      })
      .catch((error) => console.log(error));
  };
};

//-------------------------------------------------

const getloadCities = (data) => ({
  type: types.LOAD_CITIES,
  payload: data,
});

export const loadCities = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.ondc_url}api/v1/ondc/cities`, { headers })
      .then((resp) => {
        dispatch(getloadCities(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// -------------------------------------------------------ADDRESSES---------------------------------------

const getloadAddresses = (data) => ({
  type: types.LOAD_ADDRESSES,
  payload: data,
});

export const loadAddresses = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/address/${
          localStorage.getItem("user_id")
            ? localStorage.getItem("user_id")
            : 1234
        }`,
        { headers }
      )
      .then((resp) => {
        dispatch(getloadAddresses(resp?.data));
      })
      .catch((error) => console.log(error));
  };
};

const loadaddAddress = (data) => ({
  type: types.ADD_ADDRESS,
  payload: data,
});

export const addAddress = (data) => {
  return function (dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/address/${
          localStorage.getItem("user_id")
            ? localStorage.getItem("user_id")
            : 1234
        }`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        dispatch(loadaddAddress(resp.data));
        toast.success("Added address successfully!", {
          toastId: "Added address successfully!",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
      });
  };
};

const loadupdateAddress = (data) => ({
  type: types.UPDATE_ADDRESS,
  payload: data,
});

export const updateAddress = (data) => {
  return function (dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/address/update/${
          localStorage.getItem("user_id")
            ? localStorage.getItem("user_id")
            : 1234
        }`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        dispatch(loadupdateAddress(resp.data));
        toast.success("Updated address successfully!", {
          toastId: "Updated address successfully!",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
      });
  };
};

export const deleteAddress = (id) => {
  return function (dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/address/delete/${
          localStorage.getItem("user_id")
            ? localStorage.getItem("user_id")
            : 1234
        }/${id}`,
        { headers }
      )
      .then((resp) => {
        // dispatch(loadupdateAddress(resp.data));
        toast.success("Deleted address successfully!", {
          toastId: "Deleted address successfully!",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
      });
  };
};

// -------------------------------------------------------ADDRESSES---------------------------------------

const getOrders = (data) => ({
  type: types.LOAD_ORDERS,
  payload: data,
});

export const loadOrders = () => {
  return function (dispatch) {
    var params = {
      per_page: 500,
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/orders/${
          localStorage.getItem("user_id") ? localStorage.getItem("user_id") : 26
        }`,
        { headers, params }
      )
      .then((resp) => {
        dispatch(getOrders(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const del_prod_data = (id, data, callback) => {
  console.log("del prod action");
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .delete(``, { headers })
      .then((resp) => {
        const result = {
          status: resp.status + "-" + resp.statusText,
          headers: resp.headers,
          data: resp.data.meta.message,
        };
        callback(result.data);
      })
      .catch((error) => {
        callback(error.response?.data.meta.message || error);
      });
  };
};

// ------------------------------------Rating Apis-------------------------------------------

//#region Get Product Search List
export const client_get_rating_categories = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/get_rating_categories`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        callback(resp.data);
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Product Search List

//#region Get client_get_feedback_form
export const client_get_feedback_form = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/get_feedback_form`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        callback(resp.data);
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get client_get_feedback_form

//#region Get client_get_feedback_form
export const client_get_feedback_categories = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/get_feedback_categories`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        callback(resp.data);
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get client_get_feedback_form

//#region Get client_get_feedback_form
export const set_rating_api = (data) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/rating`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // callback(resp.data);
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get client_get_feedback_form



export const Razorpay_Create_order = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/razorpay/create_order`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log("resp", resp);
        callback(resp.data);
      })
      .catch((error) => console.log(error));
  };
};

export const Razorpay_Callback = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/payment/razorpay/callback`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log("resp", resp);
        callback(resp.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something Bad happened!", {
          toastId: "Something Bad happened!",
          autoClose: 2000,
        });
      });
  };
};


export const partialCancelUpdateApi = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/update`,

        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log("resp", resp);
        callback(resp.data);
      })
      .catch((error) => console.log(error));
  };
};

// const get_products_sync = (data) => ({
//   type: types.LOAD_CITIES,
//   payload: data,
// });



const get_cancellation_reasons = (data) => ({
  type: types.CANCELLATION_REASONS,
  payload: data,
});

export const load_cancellation_reasons = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.ondc_url}api/v1/ondc/cancellation_reasons`, {
        headers,
      })
      .then((resp) => {
        dispatch(get_cancellation_reasons(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const partialUpdateOrderApi = (data, type) => {
  return function (dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/update`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // dispatch(loadupdateAddress(resp.data));
        if (type == "partialReturn") {
          toast.success("Selected Items Return Request Sent!", {
            autoClose: 2000,
          });
        } else if (type == "completeOrder") {
          toast.success("Order Return Request Sent!", {
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        // console.log(error);
        toast.success("Something went wrong!", {
          autoClose: 2000,
        });
      });
  };
};

const get_return_reasons = (data) => ({
  type: types.RETURN_REASONS,
  payload: data,
});

export const load_return_reasons = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.ondc_url}api/v1/ondc/return_reasons`, {
        headers,
      })
      .then((resp) => {
        dispatch(get_return_reasons(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const Event_Return_api = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bap/eunimart_bap/return`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log("resp", resp);
        callback(resp.data);
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
      });
  };
};

// --------------------------------------Cart Start----------------------------
const get_cart_items = (data) => ({
  type: types.CART_DATA,
  payload: data,
});

export const load_cart_items = (callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/cart/get/${
          localStorage.getItem("user_id")
            ? localStorage.getItem("user_id")
            : 1234
        }`,
        {
          headers,
        }
      )
      .then((resp) => {
        callback(resp.data);
        dispatch(get_cart_items(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const emptyCart = () => {
  return function (dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/cart/delete/${
          localStorage.getItem("user_id")
            ? localStorage.getItem("user_id")
            : 1234
        }`,
        { headers }
      )
      .then((resp) => {
        toast.success("Cart cleared successfully!", {
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
      });
  };
};

export const updateCart = (transactionId, data) => {
  return function (dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/cart/update?transaction_id=${transactionId}`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {})
      .catch((error) => {});
  };
};
// --------------------------------------Cart end-----------------------------
 
export const user_login = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json" 
    }; 
    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/user_login`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => { 
        localStorage.setItem("token",resp?.data?.token)
        localStorage.setItem("user_id",JSON.stringify(resp?.data?.userid))
        callback(resp);
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
      });
  };
};


export const user_signup = (data, callback) => { 
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json" 
    }; 
    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/user_signup`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {  
        localStorage.setItem("token",resp?.data?.token)
        localStorage.setItem("user_id",JSON.stringify(resp?.data?.id))
        callback(resp.data);
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
      });
  };
};



export const forget_password = (data, callback) => { 
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json" 
    }; 
    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/forget_password`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {  
        callback(resp.data);
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
      });
  };
};


export const change_password = (data, callback) => { 
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json" 
    }; 
    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/change_password`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {  
        callback(resp.data);
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
      });
  };
};


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