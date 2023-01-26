import React, { useEffect } from "react";
import "./style.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { lazy, Suspense } from "react";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));

const EditableCard = ({ fields, edit }) => {
  console.log("VariantDetailsCard", fields);
  const [query, setQuery] = useState(false);
  const [variant, setVariant] = useState(
    fields
      ? fields.organization_details
        ? fields.organization_details
        : []
      : []
  );
  const [finalVariant, setFinalVariant] = useState({});
  const dispatch = useDispatch();
  const [saveEnable, setSaveEnable] = useState(false);
  const isActive = true;

  const onInputChange = (prop, value) => {
    console.log("onInputChange", prop, value);
    const newVariant = { ...variant };
    console.log("newVariant", newVariant);
    const newFinalVariant = { ...finalVariant };

    newVariant[prop] = value;
    newFinalVariant[prop] = value;

    setVariant(newVariant);
    setFinalVariant(newFinalVariant);
    setSaveEnable(true);
    console.log("11", variant);
  };

  const toggleActive = () => {
    isActive = !isActive;
  };

  const sendData = () => {
    const payload = {};
  };

  useEffect(() => {
    setVariant(
      fields
        ? fields.organization_details
          ? fields.organization_details
          : []
        : []
    );
    if (edit === false) {
      setQuery(true);
    }
  }, [fields]);

  //render function
  return (
    <Box className="companyDetailsOrder">
      {variant && (
        <>
          <Box className="companyDetailsOrderHeader">
            <p className="companyDetailsOrder_header">User Details</p>
            <Box>
              {query === true ? (
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setQuery(prev => !prev);
                      setSaveEnable(false);
                    }}
                    style={{ textTransform: "none" }}
                  >
                    Edit Details
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setQuery(prev => !prev);
                    }}
                    style={{ textTransform: "none" }}
                  >
                    Cancel
                  </Button>

                  <Button
                    disabled={!saveEnable}
                    variant="contained"
                    style={{ textTransform: "none", marginLeft: "10px" }}
                    onClick={() => {
                      if (saveEnable === true) {
                        setQuery(prev => !prev);
                        sendData();
                      }
                    }}
                  >
                    Save Details
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
          <Box className="companyDetailsOrder_card">
            <Box className="variantDetailsCard_card_left">
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteViewTextField
                  card
                  label={"Name"}
                  text={variant.name ? variant.name : "--"}
                  disabled_y={query}
                  name="name"
                  onInputChange={onInputChange}
                />
              </Suspense>

              <Suspense fallback={<div>Loading... </div>}>
                {query && (
                  <RemoteViewTextField
                    card
                    label={"Role"}
                    text={
                      variant.business_location
                        ? variant.business_location
                        : "--"
                    }
                    disabled_y={query}
                    name="Role"
                    onInputChange={onInputChange}
                  />
                )}
                {!query && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "50%" }}>Role</div>
                    <Autocomplete
                      disablePortal
                      // id="combo-box-demo"
                      options={["Sample", "ssads", "Hii"]}
                      sx={{ width: "100%" }}
                      renderInput={params => <TextField {...params} />}
                    />
                  </div>
                )}
              </Suspense>
            </Box>
            <Box className="variantDetailsCard_card_right">
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteViewTextField
                  card
                  label={"Email Address"}
                  text={variant.industry}
                  disabled_y={query}
                  name="industry"
                  onInputChange={onInputChange}
                />
              </Suspense>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default EditableCard;
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
