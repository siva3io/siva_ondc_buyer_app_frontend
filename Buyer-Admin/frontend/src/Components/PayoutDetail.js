import React, { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { loadPayoutDetailData } from "../redux/action";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import BASE_API_SOURCE from "../baseurl";

const PayoutDetail = () => {
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });
  const [selectedId, setId] = useState(0);
  const userId = JSON.parse(localStorage.getItem("user_id"));

  let dispatch = useDispatch();
  const { payoutdetaildata, payoutdetaildata_meta } = useSelector(
    state => state.data
  );
  useEffect(() => {
    dispatch(loadPayoutDetailData(params));
    // dispatch(loadDownloadData());
  }, [params]);

  // const { downloadLink } = useSelector((state) => state.data);
  // useEffect(()=> {
  //   dispatch(loadDownloadData);
  // },[]);
  // console.log(downloadLink,"downloadLInkkkkk");

  const TableData = [
    {
      key: "createdAt",
      label: "Order Create Date",
      type: "text",
    },
    {
      key: "orderCreatedDate",
      label: "Order Create Time",
      type: "text",
    },
    {
      key: "buyerAppOrderId",
      label: "Buyer App Order Id",
      type: "text",
    },
    {
      key: "Name of Seller",
      label: "Buyer App Order Item Id",
      type: "text",
    },
    {
      key: "networkOrderId",
      label: "Network Order ID",
      type: "text",
    },
    {
      key: "sellerNetworkParticipant",
      label: "Seller NP Name",
      type: "text",
    },
    {
      key: "sellerName",
      label: "Seller Name",
      type: "text",
    },
    {
      key: "orderReturnPeriodExpiryDate",
      label: "Order Return Period Expiry Date",
      type: "text",
    },
    {
      key: "settlementDueDate",
      label: "Settlement Due Date",
      type: "text",
    },
    {
      key: "status.display_name",
      label: "SKU Name",
      type: "text",
    },
    {
      key: "status.display_name",
      label: "Qty Ordered",
      type: "text",
    },
    {
      key: "totalItemValueIncludingTax",
      label: "Total Item Value(including Taxes)",
      type: "text",
    },
    {
      key: "status.display_name",
      label: "Shipping Charges",
      type: "text",
    },
    {
      key: "packagingCharges",
      label: "Packaging Charges",
      type: "text",
    },
    {
      key: "convenienceCharges",
      label: "Convenience Charges",
      type: "text",
    },
    {
      key: "totalOrderValue",
      label: "Total Order Value",
      type: "text",
    },
    {
      key: "buyerFinderFeeonTotalOrderValue",
      label: "Buyer Finder Fee on Total Order Value",
      type: "text",
    },
    {
      key: "merchantPayableAmount",
      label: "Merchant Payable Amount",
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
          leftText={"Payout Detail"}
          // download_link={`${BASE_API_SOURCE.ondc_url}api/v1/ondc/payout_details/download/${userId}`}
        />
      </Suspense>
      {payoutdetaildata &&
        payoutdetaildata_meta &&
        payoutdetaildata_meta?.per_page && (
          <Box sx={{ p: 2 }}>
            <Suspense fallback={<div>Loading... </div>}>
              <RemoteDynamicTable
                table_data={payoutdetaildata}
                headCells={TableData}
                info={payoutdetaildata_meta}
                setParams={setParams}
                handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                setId={setId}
                enablepagination={true}
              />
            </Suspense>
          </Box>
        )}
    </Box>
  );
};
export default PayoutDetail;
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
