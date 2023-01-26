import * as types from "../Action/actionType";

const initialState = {
  loading: false,
  initData: [],
  confirmData: [],
  selectData: [],
  statusData: [],
  trackData: [],
  cancelData: [],
  citiesData: [],
  addressesData: [],
  addAddressData: [],
  ordersData: [],
  salesdata: [],
  salesdata_meta: {},
  updateAddressData: [],
  grievanceCategories: [],
  IssuesListData: [],
  IssuesViewData: [],
  cancellationReasonsData: [],
  returnReasonsData: [],
  cartData: [],
};

const DataReducers = (state = initialState, action) => {
  // console.log("action", action);
  switch (action.type) {
    case types.INIT:
      return {
        ...state,
        initData: action.payload.data,
        loading: false,
      };
    case types.CONFIRM:
      return {
        ...state,
        confirmData: action.payload.data,
        loading: false,
      };
    case types.SELECT:
      return {
        ...state,
        selectData: action.payload.data,
        loading: false,
      };
    case types.STATUS:
      return {
        ...state,
        statusData: action.payload.data,
        loading: false,
      };
    case types.TRACK:
      return {
        ...state,
        trackData: action.payload.data,
        loading: false,
      };
    case types.CANCEL:
      return {
        ...state,
        cancelData: action.payload.data,
        loading: false,
      };
    case types.LOAD_CITIES:
      return {
        ...state,
        citiesData: action.payload.data,
        loading: false,
      };
    case types.LOAD_GRIEVANCE_CATEGORIES:
      return {
        ...state,
        grievanceCategories: action.payload,
        loading: false,
      };
    case types.LOAD_ADDRESSES:
      return {
        ...state,
        addressesData: action?.payload?.data ? action?.payload?.data : [],
        loading: false,
      };
    case types.ADD_ADDRESS:
      return {
        ...state,
        addAddressData: action.payload.data,
        loading: false,
      };
    case types.UPDATE_ADDRESS:
      return {
        ...state,
        updateAddressData: action.payload.data,
        loading: false,
      };
    case types.LOAD_ORDERS:
      return {
        ...state,
        ordersData: action.payload.data,
        loading: false,
      };
    case types.ISSUES_LIST:
      return {
        ...state,
        IssuesListData: action.payload,
        loading: false,
      };
    case types.ISSUES_VIEW:
      return {
        ...state,
        IssuesViewData: action.payload,
        loading: false,
      };
    case types.SALES_LIST:
      return {
        ...state,
        salesdata: action.payload.data,
        salesdata_meta: action.payload.meta,
        loading: false,
      };
    case types.CANCELLATION_REASONS:
      return {
        ...state,
        cancellationReasonsData: action.payload,
        loading: false,
      };
    case types.RETURN_REASONS:
      return {
        ...state,
        returnReasonsData: action.payload,
        loading: false,
      };
    case types.CART_DATA:
      return {
        ...state,
        cartData: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default DataReducers;

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