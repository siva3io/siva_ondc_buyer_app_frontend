import React, { useState, useEffect } from "react";
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";

function OrderDetails({ data, edit }) {
  console.log("OrderDetails data 33", data);

  const datePipe = dateString => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  var cdate = datePipe(data && data.created_date);

  //#endregion Customer Shipping Address
  const Customer_Shipping_Address = [
    {
      label: "Receiver Name",
      text:
        data &&
        data.confirm?.message?.order?.fulfillments?.length > 0 &&
        data.confirm?.message?.order?.fulfillments[0]?.end?.contact?.name,
      type: "input",
    },
    {
      label: "Mobile Number",
      text:
        data &&
        data.confirm?.message?.order?.fulfillments?.length > 0 &&
        data.confirm?.message?.order?.fulfillments[0]?.end?.contact?.phone,
      type: "input",
    },
    {
      label: "Address line 1",
      text:
        data &&
        data.confirm?.message?.order?.fulfillments?.length > 0 &&
        data.confirm?.message?.order?.fulfillments[0]?.end?.location?.address
          ?.door,
      type: "input",
    },

    {
      label: "City",
      text:
        data &&
        data.confirm?.message?.order?.fulfillments?.length > 0 &&
        data.confirm?.message?.order?.fulfillments[0]?.end?.location?.address
          ?.city,
      type: "input",
    },
    {
      label: "State",
      text:
        data &&
        data.confirm?.message?.order?.fulfillments?.length > 0 &&
        data.confirm?.message?.order?.fulfillments[0]?.end?.location?.address
          ?.state,
      type: "input",
    },
    {
      label: "Country",
      text:
        data &&
        data.confirm?.message?.order?.fulfillments?.length > 0 &&
        data.confirm?.message?.order?.fulfillments[0]?.end?.location?.address
          ?.country,
      type: "input",
    },
    {
      label: "Pin Code",
      text:
        data &&
        data.confirm?.message?.order?.fulfillments?.length > 0 &&
        data.confirm?.message?.order?.fulfillments[0]?.end?.location?.address
          ?.area_code,
      type: "input",
    },
  ];
  //#endregion Customer Shipping Address

  //#endregion Customer Billing Address
  const Customer_Billing_Address = [
    {
      label: "Receiver Name",
      text: data && data?.billing && data.billing?.name,
      type: "input",
    },
    {
      label: "Mobile Number",
      text: data && data?.billing && data.billing?.phone,
      type: "input",
    },
    {
      label: "Address line 1",
      text: data && data.billing && data.billing?.address?.door,
      type: "input",
    },
    {
      label: "City",
      text: data && data.billing && data.billing?.address?.city,
      type: "input",
    },
    {
      label: "State",
      text: data && data.billing && data.billing?.address?.state,
      type: "input",
    },
    {
      label: "Country",
      text: data && data.billing && data.billing?.address?.country,
      type: "input",
    },

    {
      label: "Pin Code",
      text: data && data.billing && data.billing?.address?.area_code,
      type: "input",
    },
  ];
  //#endregion Customer Billing Address
  var payment_due_cdate = datePipe(data && data.payment_due_date);

  //#region Order Line Item
  const headCells = [
    {
      key: "product_name",
      label: "Product Name",
      type: "text",
    },
    {
      key: "product_description",
      label: "Description",
      type: "text",
    },
    {
      key: "product_quantity",
      numeric: true,
      label: "Quantity",
      type: "text",
    },
    {
      key: "product_currency",
      label: "Currency",
      type: "text",
    },
    {
      key: "product_price",
      numeric: true,
      label: "Price",
      type: "text",
    },
  ];
  //#endregion Order Line Item

  //#region Amount Details
  const Amount_Details = [
    {
      label: "Currency",
      text: data && data.confirm?.message?.order?.quote?.price?.currency,
      type: "input",
    },
    {
      label: "Value",
      text: data && data.confirm?.message?.order?.quote?.price?.value,
      type: "input",
    },
  ];
  //#endregion Amount Details

  return (
    <>
      {/* <RemoteViewBox view_data={Sales_Order_Data} header={"Order Details"}/> */}

      <RemoteViewBox
        view_data={Customer_Shipping_Address}
        header={"Shipping Address"}
      />

      <RemoteViewBox
        view_data={Customer_Billing_Address}
        header={"Billing Address"}
      />

      {/* <RemoteViewBox view_data={Payment_Terms} header={"Payment Terms"}/> */}

      {data && data.items && (
        <RemoteViewBox_Table
          headCells={headCells}
          table_data={data.items.map(item => {
            return {
              product_name:
                item && item.descriptor?.name ? item.descriptor?.name : "--",
              product_description:
                item && item.descriptor?.short_desc
                  ? item.descriptor?.short_desc.includes(".")
                    ? item.descriptor?.short_desc.substring(
                        0,
                        item.descriptor?.short_desc.indexOf(".")
                      )
                    : item.descriptor?.short_desc
                  : "--",
              product_quantity:
                item && item.quantity?.count ? item.quantity?.count : "--",
              product_currency:
                item && item.price?.currency ? item.price?.currency : "--",
              product_price:
                item && item.price?.value ? item.price?.value : "--",
            };
          })}
          header={"Order Line Item"}
        />
      )}

      {/* <RemoteViewBox view_data={additional_information} header={"Additional Information"}/> */}

      <RemoteViewBox view_data={Amount_Details} header={"Amount Details"} />
    </>
  );
}

export default OrderDetails;

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
