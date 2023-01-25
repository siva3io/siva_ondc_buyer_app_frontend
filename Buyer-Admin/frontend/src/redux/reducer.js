import * as types from "./actionType";

const initialState = {
  orderstatusdata: [],
  orderstatusdata_meta: {},
  customersupportdata: [],
  customersupportdata_meta: {},
  payoutdetaildata: [],
  payoutdetaildata_meta: {},
  IssuesViewData: [],
  grievanceCategories: [],
  ticketTypesData: [],
  downloadLink: [],
  assignTicketData: [],
  assignTicketToUser: [],
  manageUsersdata: [],
  userType: [],
  manageUsersdata_meta: {},
  Igmlevel1data: [],
  Igmlevel1data_meta: {},
  Igmlevel2data: [],
  Igmlevel2data_meta: {},
  orderstatusoption: [],
  orderstatusoption_meta: {},
  loading: false,
  orderStatusDownload: [],
  salesdata: [],
};

const BAPdataReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.ORDER_STATUS_LIST:
      return {
        ...state,
        orderstatusdata: action.payload.data,
        orderstatusdata_meta: action.payload,
        loading: false,
      };
    case types.ORDER_STATUS_OPTION:
      return {
        ...state,
        orderstatusoption: action.payload.data,
        orderstatusoption_meta: action.payload,
        loading: false,
      };

    case types.PAYOUTDETAIL_LIST:
      return {
        ...state,
        payoutdetaildata: action.payload.data,
        payoutdetaildata_meta: action.payload.pagination,
        loading: false,
      };

    case types.TICKET_TYPES_LIST:
      return {
        ...state,
        ticketTypesData: action.payload,
        loading: false,
      };
    case types.DOWNLOAD_DATA:
      return {
        ...state,
        downloadLink: action.payload,
        loading: false,
      };
    case types.MANAGE_USERS_LIST:
      return {
        ...state,
        manageUsersdata: action.payload.data,
        manageUsersdata_meta: action.payload.meta,
        loading: false,
      };
    case types.USER_TYPE:
      return {
        ...state,
        userType: action.payload.data,
        loading: false,
      };

    case types.DOWNLOAD_ORDERS_STATUS:
      return {
        ...state,
        orderStatusDownload: action.payload.data,
        loading: false,
      };
    case types.SALES_VIEW:
      return {
        ...state,
        salesdata: action.payload.data,
        // salesOrderLineitems: action.payload.data.sales_order_lines,
        loading: false,
      };
    default:
      return state;
  }
};
export default BAPdataReducers;

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
