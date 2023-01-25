import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../baseurl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

//#region Get Order Status List
const getOrderStatusData = data => ({
  type: types.ORDER_STATUS_LIST,
  payload: data,
});

export const loadOrderStatusData = param => {
  return function (dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters: param.filters,
      sort: param.sort,
    };

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    // const userId = JSON.parse(localStorage.getItem("user_id"))
    //   ? JSON.parse(localStorage.getItem("user_id"))
    //   : 22;

    axios
      .get(`${BASE_API_SOURCE.ondc_url}/api/v1/ondc/allOrders`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getOrderStatusData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Order Status List

//#region Get Order Status options
const getOrderStatusDataOption = data => ({
  type: types.ORDER_STATUS_OPTION,
  payload: data,
});

export const loadOrderStatusDataOption = param => {
  return function (dispatch) {
    var params = {
      per_page: "1000",
      page_no: param.offset,
      filters: param.filters,
      sort: param.sort,
    };

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    // const userId = JSON.parse(localStorage.getItem("user_id"))
    //   ? JSON.parse(localStorage.getItem("user_id"))
    //   : 22;

    axios
      .get(`${BASE_API_SOURCE.ondc_url}/api/v1/ondc/allOrders`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getOrderStatusDataOption(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Order Status options

//#region Get PayoutDetail List
const getPayoutDetailData = data => ({
  type: types.PAYOUTDETAIL_LIST,
  payload: data,
});

export const loadPayoutDetailData = param => {
  return function (dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters: param.filters,
      sort: param.sort,
    };

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    const userId = localStorage.getItem("user_id");

    axios
      .get(
        `${BASE_API_SOURCE.ondc_url}/api/v1/ondc/payout_details/list/${userId}`,
        { params, headers }
      )
      .then(resp => {
        dispatch(getPayoutDetailData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get PayoutDetail List

//#region Get Download api
const getDownloadData = data => ({
  type: types.DOWNLOAD_DATA,
  payload: data,
});

export const loadDownloadData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    const userId = localStorage.getItem("user_id");

    axios
      .get(
        `${BASE_API_SOURCE.ondc_url}/api/v1/ondc/payout_details/download/${userId}`,
        { headers }
      )
      .then(resp => {
        dispatch(getDownloadData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Download api

//#region Get Order Status List
const getAssignTicketData = data => ({
  type: types.ASSIGN_TICKET_DATA,
  payload: data,
});

export const loadAssignTicketData = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.ondc_url}/api/v1/ondc/get_order?id=${id}`, {
        headers,
      })
      .then(resp => {
        dispatch(getAssignTicketData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Order Status List

const getTypeOfUser = data => ({
  type: types.USER_TYPE,
  payload: data,
});

export const LoadUserType = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/TYPE_OF_USER`, {
        headers,
      })
      .then(resp => {
        dispatch(getTypeOfUser(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const BapUserCreate = data => {
  console.log(data, "im in action");
  return function () {
    console.log(data, "im in action");
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/contacts/create`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {
        console.log(resp);
        toast.success("New user Created", {
          toastId: "Reply sent Successfully !12",
          autoClose: 2000,
        });
      })
      .catch(error => {
        toast.error("New user Creation failed.Please try again");
      });
  };
};

// __________________________________________

const orderstatusdoenload = data => ({
  type: types.DOWNLOAD_ORDERS_STATUS,
  payload: data,
});

export const downloadOrderStatus = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.ondc_url}/api/v1/ondc/generateOrderCsv`, {
        headers,
      })
      .then(resp => {
        dispatch(orderstatusdoenload(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// https://ondc.eunimart.com/api/v1/ondc/get_order?transaction_id=2a0853fb-562f-4ec4-9a08-87b0f6945c91

//#region Get Sales Order Data By Id
const getSalesDataById = data => ({
  type: types.SALES_VIEW,
  payload: data,
});

export const loadSalesDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.ondc_url}api/v1/ondc/get_order?transaction_id=` + Id,
        { headers }
      )
      .then(resp => {
        dispatch(getSalesDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Sales Order Data By Id

export const user_login = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
    };
    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}/api/v1/ondc/user_login`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {
        localStorage.setItem("token", resp?.data?.token);
        localStorage.setItem("user_id", JSON.stringify(resp?.data?.userid));
        localStorage.setItem(
          "user_data",
          JSON.stringify({
            id: 22,
            name: "BAP Admin",
            first_name: "BAP",
            last_name: "Admin",
            username: "bap_admin@eunimart.com",
            email: "",
            work_email: "",
            mobile_number: "",
            user_types: [{ id: 567, name: "BAP_ADMIN" }],
            login_type: 0,
            auth: { otp_token: "666666" },
            "2fa_conf": [],
            device_ids: [],
            preferences: [],
            access_ids: [12],
            company_id: 1,
            team_head: "",
            external_details: {},
            Company: {
              name: "Eunimart Ltd",
              addresses: null,
              phone: "9638527410",
              email: "sushma@gmail.com",
              company_details: {
                business_name: "Eunimart Omnichannel Private Ltd",
                business_address: "Hyderabad",
                financial_year_start_id: 772,
                financial_year_start: {
                  lookup_type_id: 0,
                  LookupType: {
                    lookup_type: "",
                    display_name: "",
                    Lookupcodes: null,
                    is_enabled: null,
                    ID: 0,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                    DeletedAt: null,
                  },
                  lookup_code: "",
                  display_name: "",
                  source_code: "",
                  description: "",
                  is_enabled: null,
                  ID: 0,
                  CreatedAt: "0001-01-01T00:00:00Z",
                  UpdatedAt: "0001-01-01T00:00:00Z",
                  DeletedAt: null,
                },
                financial_year_end_id: 772,
                financial_year_end: {
                  lookup_type_id: 0,
                  LookupType: {
                    lookup_type: "",
                    display_name: "",
                    Lookupcodes: null,
                    is_enabled: null,
                    ID: 0,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                    DeletedAt: null,
                  },
                  lookup_code: "",
                  display_name: "",
                  source_code: "",
                  description: "",
                  is_enabled: null,
                  ID: 0,
                  CreatedAt: "0001-01-01T00:00:00Z",
                  UpdatedAt: "0001-01-01T00:00:00Z",
                  DeletedAt: null,
                },
                authorised_signatory: "shayak Mazumder",
                authorised_signatory_address: "Hyderabad",
                std_code_id: 40,
                std_code: {
                  lookup_type_id: 0,
                  LookupType: {
                    lookup_type: "",
                    display_name: "",
                    Lookupcodes: null,
                    is_enabled: null,
                    ID: 0,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                    DeletedAt: null,
                  },
                  lookup_code: "",
                  display_name: "",
                  source_code: "",
                  description: "",
                  is_enabled: null,
                  ID: 0,
                  CreatedAt: "0001-01-01T00:00:00Z",
                  UpdatedAt: "0001-01-01T00:00:00Z",
                  DeletedAt: null,
                },
                store_name: "Warehouse",
                store_description: "E-commerce website",
                serviceable_areas: [
                  {
                    city: {
                      gps: "17.4485835,78.39080349999999",
                      id: "std:040",
                      label: "Hyderabad",
                    },
                    latitude: "17.4485835",
                    longitude: "78.39080349999999",
                    radius: null,
                    state: { id: 32, label: "Telangana" },
                    whole_city: false,
                  },
                ],
                domain_id: 675,
                domain: {
                  lookup_type_id: 0,
                  LookupType: {
                    lookup_type: "",
                    display_name: "",
                    Lookupcodes: null,
                    is_enabled: null,
                    ID: 0,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                    DeletedAt: null,
                  },
                  lookup_code: "",
                  display_name: "",
                  source_code: "",
                  description: "",
                  is_enabled: null,
                  ID: 0,
                  CreatedAt: "0001-01-01T00:00:00Z",
                  UpdatedAt: "0001-01-01T00:00:00Z",
                  DeletedAt: null,
                },
                established_on: "0001-01-01T00:00:00Z",
                store_timings: {
                  day: "",
                  time: [
                    {
                      closing_time: "2023-01-10T11:30:00.552Z",
                      opening_time: "2023-01-10T01:30:00.056Z",
                    },
                  ],
                  is_open: true,
                },
                seller_apps: ["Eunimart BPP"],
                enable_email_notifications: false,
                enable_phone_notifications: false,
              },
              is_enterpise: true,
              parent_id: 0,
              child_ids: null,
              type: 630,
              company_defaults: {
                time_zone: {
                  id: 507,
                  lookup_code: "IST",
                  display_name: "Indian Standard Time",
                },
                date_format: {
                  id: 504,
                  lookup_code: "dd/mm/yyyy",
                  display_name: "dd/mm/yyyy",
                },
                time_format: {
                  id: 502,
                  lookup_code: "12_HOURS",
                  display_name: "12 hours",
                },
                access_template_details: { default_user_template_id: 3 },
              },
              notification_settings_id: null,
              notification_template_id: null,
              is_enabled: true,
            },
            profile: {},
            address_details: null,
            access_template_id: [{ id: 12, name: "BPP_ADMIN" }],
            is_enabled: true,
            is_active: true,
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MjIsIlVzZXJuYW1lIjoiYmFwX2FkbWluQGV1bmltYXJ0LmNvbSIsImFjY2Vzc190ZW1wbGF0ZV9pZCI6MTIsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY3NDczNjAzMSwiZmlyc3RfbmFtZSI6IkJBUCIsImxhc3RfbmFtZSI6IkFkbWluIiwicm9sZV9pZCI6bnVsbCwidXNlcl90eXBlcyI6W3siaWQiOjU2NywibmFtZSI6IkJBUF9BRE1JTiJ9XX0.GvWFbnSYlNtoC8I0U4I0piPlPmjrStxTjMWTLd6o_k0",
          })
        );

        callback(resp);
      })
      .catch(error => {
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
      "Content-type": "application/json",
    };
    axios
      .post(
        `${BASE_API_SOURCE.ondc_url}/api/v1/ondc/user_signup`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {
        console.log(resp?.data, "response");
        localStorage.setItem("token", resp?.data?.token);
        callback(resp.data);
      })
      .catch(error => {
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
