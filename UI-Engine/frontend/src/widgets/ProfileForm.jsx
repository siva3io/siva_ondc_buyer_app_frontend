import * as React from "react";
import LabeledText from "./LabeledText";
import {
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import "./ViewBox.css";
import MatInput from "./MatInput";
import MatTextArea from "./MatTextArea";
import MatRadio from "./MatRadio";
import MatCheckBox from "./MatCheckbox";
import MatSelect from "./MatSelect";
import MatSwitch from "./MatSwitch";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function ProfileForm({
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
  sx
}) {

  console.log(sx,"stylex")
  return (
    <>
      <div className="locationDetailsMain">
        <div className="locationDetailForm">
          <div className="staticFormCard">
            <div className="staticFormCardTitle" >
              {header}

              {IsButtonShow && (
                <button
                  variant="contained"
                  className="btn_primary"
                  onClick={(e) => {
                    handleButtonClick();
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

            <div className="product-staticFormCardForm" style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"flex-start",width:"50vw"}}>
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
                const typ = field.type;
                return typ === "input" ? (
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
                      handelInputChange(field.key, e.target.value);
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
                ) : typ === "radio" ? (
                  <Box
                    className="product-checkboxFieldMain"
                    sx={{ display: "flex", alignItems: "center",justifyContent:"space-around",height:"50px"}}
                  >
                  <Box>

                    <Typography
                      className="radioLabelWrap"
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        // width: "26%",
                      }}
                    >
                      <Typography sx={{width:"200px"}}> <div> <p style={{width:"200px"}}>{field.label}</p></div></Typography>
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

                    <Box className="product-checkboxFieldSub" style={{position:"relative"}} >
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
                ) : typ === "select" ? (
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
                        handelToggleChange(field,newValue);
                      }}
                    />
                  </>
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