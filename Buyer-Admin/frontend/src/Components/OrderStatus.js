import React, { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { downloadOrderStatus, loadOrderStatusData } from "../redux/action";
import RemoteDynamicTable from "./orderStatusDynamicTable";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";

const OrderStatus = ({ setOrderStatusViewId }) => {
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });
  const [selectedId, setId] = useState(0);

  let dispatch = useDispatch();

  const { orderstatusdata, orderstatusdata_meta, orderStatusDownload } =
    useSelector(state => state.data);
  useEffect(() => {
    dispatch(loadOrderStatusData(params));
    dispatch(downloadOrderStatus());
  }, [params]);
  console.log(orderstatusdata, orderstatusdata_meta, "orderstatusdata");

  const TableData = [
    {
      key: "context.bap_id",
      numeric: false,
      label: "Buyer NP Name",
      type: "text",
    },
    {
      key: "context.bpp_id",
      numeric: false,
      label: "Seller NP Name",
      type: "text",
    },
    {
      key: "createdAt",
      numeric: false,
      label: "Order Create Date & Time",
      type: "date_time",
    },
    {
      key: "transactionId",
      numeric: false,
      label: "Network Order Id",
      type: "text",
    },
    {
      key: "transactionId",
      numeric: false,
      label: "Network Transaction Id",
      type: "text",
    },
    {
      key: "item.id",
      numeric: false,
      label: "Buyer NP Order Item Id",
      type: "text",
    },
    {
      key: "item.id",
      numeric: false,
      label: "Buyer NP Order Id",
      type: "text",
    },
    {
      key: "state",
      numeric: false,
      label: "Order Status",
      type: "text",
    },
    {
      key: "billing.name",
      numeric: false,
      label: "Name of Seller",
      type: "text",
    },
    {
      key: "seller_pincode",
      numeric: false,
      label: "Seller Pincode",
      type: "text",
    },
    {
      key: "item.descriptor.name",
      numeric: false,
      label: "SKU Name",
      type: "text",
    },
    {
      key: "item.id",
      numeric: false,
      label: "SKU Code",
      type: "text",
    },
    {
      key: "order_category",
      numeric: false,
      label: "Order Category",
      type: "text",
    },
    {
      key: "shipped_at",
      numeric: false,
      label: "Shipped At Date & Time",
      type: "date_time",
    },
    {
      key: "delivered_at",
      numeric: false,
      label: "Delivered At Date & Time",
      type: "date_time",
    },
    {
      key: "delivery_type",
      numeric: false,
      label: "Delivery Type",
      type: "text",
    },
    {
      key: "logistics_network_order_id",
      numeric: false,
      label: "Logistics Network Order Id",
      type: "text",
    },
    {
      key: "logistics_network_transaction_id",
      numeric: false,
      label: "Logistics Network Transaction Id",
      type: "text",
    },
    {
      key: "billing.address.city",
      numeric: false,
      label: "Delivery City",
      type: "text",
    },
    {
      key: "billing.address.areaCode",
      numeric: false,
      label: "Delivery Pincode",
      type: "text",
    },
    {
      key: "cancelled_at",
      numeric: false,
      label: "Cancelled At Date & Time",
      type: "date_time",
    },
    {
      key: "cancelled_by",
      numeric: false,
      label: "Cancelled By",
      type: "text",
    },
    {
      key: "cancellation_reason",
      numeric: false,
      label: "Cancellation Reason",
      type: "text",
    },
    {
      key: "cancellation_remark",
      numeric: false,
      label: "Cancellation Remark",
      type: "text",
    },
    {
      key: "quote.price.value",
      numeric: false,
      label: "Total Order Value",
      type: "text",
    },
  ];

  const sortOptions = [];

  const [filterOptions, setFilterOptions] = useState([]);

  const searchItems = searchValue => {};

  const searchOptions = [];

  const filterSearchItems = (searchValue, searchTyp) => {};

  const [searchType, setSearchType] = useState("product_name");

  const handleChangeDyanmicAppBar = value => {
    setDynamicAppBar(value);
  };

  return (
    <Box sx={{ background: "#F9F9F9" }}>
      {orderStatusDownload && orderStatusDownload && (
        <Suspense fallback={<div>Loading... </div>}>
          <RemoteDynamicAppBar
            dynamicAppBar={dynamicAppBar}
            sortOptions={sortOptions}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            filterSearchItems={filterSearchItems}
            searchItems={searchItems}
            searchOptions={searchOptions}
            searchType={searchType}
            setSearchType={setSearchType}
            download={true}
            download_link={orderStatusDownload?.link}
            leftText={"Order Status"}
          />
        </Suspense>
      )}
      {orderstatusdata &&
        orderstatusdata_meta &&
        orderstatusdata_meta?.pagination && (
          <Box sx={{ p: 2 }}>
            <Suspense fallback={<div>Loading... </div>}>
              <RemoteDynamicTable
                table_data={orderstatusdata}
                headCells={TableData}
                customoptions={[]}
                info={orderstatusdata_meta?.pagination}
                setParams={setParams}
                handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                setId={setId}
                enablepagination={true}
                setOrderStatusViewId={setOrderStatusViewId}
              />
            </Suspense>
          </Box>
        )}
    </Box>
  );
};
export default OrderStatus;
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
