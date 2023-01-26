import * as React from "react";
import { useState } from "react";
import LabeledText from "./LabeledText";
import {
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import "./ViewBox.css";
import BasicButton from "./BasicButton";
import MatAdditionalInput from "./MatAdditionalInput";
import MatInput from "./MatInput";
import MatText from "./MatText";
import MatTextArea from "./MatTextArea";
import MatRadio from "./MatRadio";
import MatCheckBox from "./MatCheckbox";
import MatSelect from "./MatSelect";
import MatMultiSelect from "./MatMultiSelect";
import MatSwitch from "./MatSwitch";
import SingleFileUpload from "./SingleFileUpload";
import DefaultImage from "./DefaultImage";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers";
import FileUpload from "./FileUpload";

export default function AddForm({
  data,
  header,
  handelInputChange,
  handelSelectonChange,
  handelCheckBoxonChange,
  handelRadionButtononChange,
  IsCheckboxShowForCopyField,
  CheckboxShowForCopyField_text,
  CheckboxShowForCopyField_value,
  handelCheckboxShowForCopyField_valueChange,
  Islabel_priceSpace,
  IsButtonShow,
  ButtonText,
  handleButtonClick,
  handelToggleChange,
  setimageUpload,
  setfileUpload,
  handleFileUpload,
  handelClickChange,
  handleDateAndTime
}) {
  return (
    <>
      <div className="locationDetailsMain">
        <div className="locationDetailForm">
          <div className="staticFormCard">
            <div className="staticFormCardTitle">
              {header}

              {IsButtonShow && (
                <button
                  variant="contained"
                  className="btn_primary"
                  onClick={(e) => {
                    handleButtonClick(ButtonText);
                  }}
                  style={{
                    textTransform: "none",
                    borderColor: "#ccc",
                    float: "right",
                    marginLeft: 10,
                    backgroundColor: "#416BFF",
                    color: "#fff",
                  }}
                >
                  {ButtonText}
                </button>
              )}
            </div>

            <div className="product-staticFormCardForm">
              {IsCheckboxShowForCopyField && (
                <>
                  <div>
                    <MatCheckBox
                      fields={[
                        [
                          0,
                          CheckboxShowForCopyField_text,
                          CheckboxShowForCopyField_value,
                        ],
                      ]}
                      onChange={(props) => {
                        handelCheckboxShowForCopyField_valueChange(
                          CheckboxShowForCopyField_text,
                          CheckboxShowForCopyField_value
                        );
                      }}
                    />
                  </div>
                  <div></div>
                </>
              )}
              {data.map((field) => {
                // console.log("field", field);
                const typ = field.type;
                return typ === "input" || typ === "text" ? (
                  <MatInput
                    disabled={field.disabled}
                    required={field.required}
                    minLength={field.minLength ? field.minLength : ""}
                    maxLength={field.maxLength ? field.maxLength : ""}
                    errorMessage={field.errorMessage ? field.errorMessage : ""}
                    type={field.type}
                    label={field.label}
                    name={field.label}
                    value={field.value}
                    placeholder={`Enter ${field.label}`}
                    onChange={(e) => {
                      handelInputChange(
                        field?.key,
                        e?.target?.value,
                        field?.id
                      );
                    }}
                  />
                ) : typ === "justtext" ? (
                  <MatText
                    disabled={field.disabled}
                    required={field.required}
                    minLength={field.minLength ? field.minLength : ""}
                    maxLength={field.maxLength ? field.maxLength : ""}
                    errorMessage={field.errorMessage ? field.errorMessage : ""}
                    type={field.type}
                    label={field.label}
                    name={field.label}
                    value={field.value}
                    placeholder={`Enter ${field.label}`}
                    onChange={(e) => {
                      handelInputChange(
                        field?.key,
                        e?.target?.value,
                        field?.id
                      );
                    }}
                  />
                ) : typ === "additionalinput" ? (
                  <MatAdditionalInput
                    disabled={field.disabled}
                    required={field.required}
                    minLength={field.minLength ? field.minLength : ""}
                    maxLength={field.maxLength ? field.maxLength : ""}
                    errorMessage={field.errorMessage ? field.errorMessage : ""}
                    type={field.type}
                    label={field.label}
                    labelname={field.label}
                    labelvalue={field.value}
                    labelplaceholder={`Enter ${field.label}`}
                    labelkey={field.labelkey}
                    field={field.field}
                    fieldname={field.field}
                    fieldvalue={field.value}
                    fieldplaceholder={`Enter ${field.field}`}
                    fieldkey={field.fieldkey}
                    onChange={(e, label) => {
                      handelInputChange(label, e.target.value, "custom");
                    }}
                  />
                ) : typ === "date" ? (
                  <MatInput
                    required={field.required}
                    minLength={field.minLength ? field.minLength : ""}
                    maxLength={field.maxLength ? field.maxLength : ""}
                    errorMessage={field.errorMessage ? field.errorMessage : ""}
                    type={field.type}
                    label={field.label}
                    name={field.label}
                    value={field.value}
                    placeholder={`Enter ${field.label}`}
                    onChange={(e) => {
                      handelInputChange(field.key, e.target.value);
                    }}
                  />
                ) : typ === "textarea" ? (
                  <MatTextArea
                    label={field.label}
                    name={field.label}
                    value={field.value}
                    rows={field.row}
                    placeholder={`Enter ${field.label}`}
                    onChange={(e) => {
                      handelInputChange(field.key, e.target.value);
                    }}
                  />
                ) : typ === "button" ? (
                  <BasicButton
                    type={field.outline}
                    text={field.text}
                    width={field.width}
                    onClick={(e) => {
                      handelClickChange(field.key, e.target.value);
                    }}
                  />
                ) : typ === "radio" ? (
                  <Box
                    className="product-checkboxFieldMain"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography
                      className="radioLabelWrap"
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        width: "26%",
                      }}
                    >
                      <Typography sx={{ color: "black" }}>
                        {field.label}
                      </Typography>
                      {field.required ? (
                        <Typography
                          className="product_required_mark"
                          sx={{ color: "red!important" }}
                        >
                          *
                        </Typography>
                      ) : null}
                    </Typography>
                    <Box className="product-checkboxFieldSub">
                      <MatRadio
                        label={field.label}
                        fields={field.sub}
                        //setRadioType={setRadioType}
                        defaultVal={field.defaultVal}
                        onChange={(e) => {
                          handelRadionButtononChange(field.key, e.target.value);
                        }}
                      />
                    </Box>
                  </Box>
                ) : typ === "select" || typ === "dropdown" ? (
                  <MatSelect
                    disabled={false}
                    label={field.label}
                    data={field.data}
                    placeholder={`Select ${field.label}`}
                    fieldKey={field.key}
                    required={field.required}
                    value={field.value || null}
                    onChange={(e, value) => {
                      handelSelectonChange(field.key, value);
                    }}
                    defaultVal={field.defaultVal}
                  />
                ) : typ === "multiSelect" ? (
                  <MatMultiSelect
                    disabled={false}
                    label={field.label}
                    data={field.data}
                    placeholder={`Select ${field.label}`}
                    fieldKey={field.key}
                    required={field.required}
                    value={field.value || null}
                    onChange={(e, value) => {
                      handelSelectonChange(field.key, value);
                    }}
                    defaultVal={field.defaultVal}
                  />
                ) : typ === "checkbox" ? (
                  <MatCheckBox
                    fields={[[field.value, field.label, field.isChecked]]}
                    onChange={(props) => {
                      handelCheckBoxonChange(field);
                    }}
                  />
                ) : typ === "pre" ? (
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        width: "35%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        htmlFor={field.label.toLowerCase().split(" ").join("_")}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Typography sx={{ color: "#5d5d5d" }}>
                          {field.label}
                        </Typography>
                        {field.required ? (
                          <Typography
                            className="product_required_mark"
                            sx={{ color: "red!important" }}
                          >
                            *
                          </Typography>
                        ) : null}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {field.value}
                    </Box>
                  </Box>
                ) : typ === "card" ? (
                  <>
                    {field.IsSpaceRequired && <div></div>}
                    <Card
                      sx={{
                        minWidth: "100%",
                        border: "1px solid cornflowerblue",
                        borderRadius: 2,
                      }}
                    >
                      <CardContent>
                        <div
                          style={{
                            fontSize: 18,
                            fontWeight: "600",
                            marginBottom: 25,
                          }}
                        >
                          {field.label}
                        </div>
                        {field.value.map((sub_field) => (
                          <div style={{ width: "100%", padding: "18px" }}>
                            <div style={{ width: "40%", float: "left" }}>
                              <strong
                                style={{
                                  fontSize: 14,
                                  color: "rgb(100 98 98)",
                                }}
                              >
                                {sub_field.label}
                              </strong>
                            </div>

                            <div style={{ width: "60%", float: "left" }}>
                              <label
                                style={{
                                  fontSize: 14,
                                  color: "rgb(159 152 152)",
                                  width: "60%",
                                }}
                              >
                                {sub_field.value}
                              </label>
                            </div>
                            <br></br>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </>
                ) : typ === "label_price" ? (
                  <>
                    {Islabel_priceSpace && <div></div>}
                    <div
                      style={{
                        backgroundColor: "rgb(243 243 243)",
                        padding: 12,
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      {field.label}
                      <label
                        style={{
                          color: "rgb(39 52 114)",
                          fontWeight: "600",
                          float: "right",
                        }}
                      >
                        {" "}
                        {field.value}
                      </label>
                    </div>
                  </>
                ) : typ === "card_final_payment" ? (
                  <>
                    <Card
                      sx={{
                        minWidth: "100%",
                        border: "1px solid cornflowerblue",
                        borderRadius: 2,
                      }}
                    >
                      <CardContent>
                        {field.value.map((sub_field) => (
                          <div style={{ width: "100%", padding: "18px" }}>
                            <div style={{ width: "40%", float: "left" }}>
                              <strong
                                style={{
                                  fontSize: 14,
                                  color: "rgb(100 98 98)",
                                }}
                              >
                                {sub_field.label}
                              </strong>
                            </div>

                            <div style={{ width: "60%", float: "left" }}>
                              <label
                                style={{
                                  fontSize: 14,
                                  color: "rgb(159 152 152)",
                                  width: "60%",
                                }}
                              >
                                {sub_field.value}
                              </label>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </>
                ) : typ === "time_card" ? (
                  <>
                    <div>
                      {field.value.map((sub_field) => (
                        <>
                          <span style={{ marginRight: 20 }}>
                            <span style={{ marginRight: 20 }}>
                              {" "}
                              {sub_field.label}{" "}
                            </span>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label=""
                                value={sub_field.value}
                                onChange={(newValue) => {
                                  handelInputChange(sub_field.key, newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </span>
                        </>
                      ))}
                    </div>
                  </>
                ) : typ === "toggle" ? (
                  <>
                    <MatSwitch
                      required={field?.required}
                      label={field?.label}
                      name={field?.key}
                      value={field?.value}
                      onChange={(newValue) => {
                        handelToggleChange(field, newValue);
                      }}
                    />
                  </>
                ) : typ === "upload_image" ? (
                  <DefaultImage
                    required={field?.required}
                    label={field?.label}
                    name={field?.key}
                    value={field?.value}
                    setimageUpload={setimageUpload}
                  />
                ) : typ === "single_file_upload" || typ === "file" ? (
                  <SingleFileUpload
                    required={field?.required}
                    label={field?.label}
                    name={field?.key}
                    value={field?.value}
                    id={field?.id}
                    buttonLabel={field?.buttonLabel}
                    setfileUpload={setfileUpload}
                  />
                ) :
                  typ === "file_upload" ? (
                    <FileUpload
                      required={field?.required}
                      label={field?.label}
                      name={field?.key}
                      value={field?.value}
                      id={field?.id}
                      buttonLabel={field?.buttonLabel}
                      handleFileUpload={handleFileUpload}
                    />
                  ) : typ === "dateandtime" ? (
                    <div className="date_and_time">
                      {/* {field.value.map((sub_field) => ( */}
                        {/* <> */}
                          
                            <div className="wrapper_1_datetime">
                              {" "}
                              {field.label}{" "}
                            </div>
                            <div className="wrapper_2_datetime">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <div className="date_and_time_width">
                              <DateTimePicker
                                label=""
                                
                                value={field.value}
                                disablePast={true}
                                onChange={(newValue) => {
                                  handleDateAndTime(field.key, newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} sx={{width:"100%"}}/>
                                )}
                              />
                              </div>

                            </LocalizationProvider>
                          </div>
                        {/* </> */}
                      {/*  ))} */}
                    </div>
                  ) : (
                    <></>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


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