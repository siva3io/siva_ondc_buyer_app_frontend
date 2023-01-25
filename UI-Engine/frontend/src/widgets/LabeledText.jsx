import React from "react";
import "./LabeledText.css";
//mui
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Autocomplete, Checkbox, TextareaAutosize } from "@mui/material";
import SingleFileUpload from "./SingleFileUpload";
import FileUpload from "./FileUpload";
import FileDownload from "./FileDownload";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers";

const LabeledText = props => {
  const onInputChange = props.onInputChange;
  // console.log(props, "--Props");
  return (
    <Box className="labeledTextWrapper" style={props?.sx ? props?.sx : {}}>
      {props?.type != "file_upload" ? (
        <Box className={props.card ? "labelWrap_card" : "labelWrap"}>
          <Typography
            htmlFor={props.label.toLowerCase().split(" ").join("_")}
            className={
              props.disabled_y ? "commonlabel_disabled" : "Commonlabel"
            }
          >
            {props.label}
          </Typography>
        </Box>
      ) : (
        <></>
      )}

      {props.disabled_y ? (
        <>
          {console.log(props, "props")}
          {props?.type == "time_card" ? (
            <Typography component="label" style={{ color: "#838383" }}>
              {" "}
              {props?.text
                ?.map(o => {
                  return moment(o?.value)?.format("LT");
                })
                ?.join(" to ")}{" "}
            </Typography>
          ) : (
            <Typography component="label" style={{ color: "#838383" }}>
              {props?.type == "select"
                ? typeof props?.text == "object"
                  ? props?.text?.label
                    ? props?.text?.label
                    : props?.text?.name
                    ? props?.text?.name
                    : props?.text?.display_name
                  : props?.text
                  ? props?.text
                  : "--"
                : props?.type == "text" || props?.type == undefined
                ? props?.text
                : ""}
            </Typography>
          )}
        </>
      ) : props?.type == undefined ||
        props?.type?.length == 0 ||
        props?.type == "text" ? (
        <TextField
          disabled={props.disabled_y}
          size="small"
          style={{ width: "100%" }}
          value={
            props.disabled_y && props.text === false
              ? "--"
              : props.disabled_y === false && props.text === "--"
              ? ""
              : props.text
          }
          type={props.type}
          name={props.name}
          onChange={e =>
            onInputChange(e.target.name, e.target.value, props.index_no)
          }
          // onInput={(e) => {
          //   if (props.type === "number") {
          //     e.target.value = Math.max(0, parseInt(e.target.value))
          //       .toString()
          //       .slice(0, 12);
          //   }
          // }}
        ></TextField>
      ) : props?.type == "select" ? (
        <>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={props?.data ? props?.data : []}
            value={props?.value}
            style={{ width: "100%" }}
            renderInput={params => <TextField {...params} />}
            onChange={(event, value) => {
              props.onSelectChange(props?.name, value);
            }}
          />
        </>
      ) : props?.type == "multiSelect" ? (
        <>
          {console.log("inSelect")}
          <Autocomplete
            multiple
            disablePortal
            id="combo-box-demo"
            options={props?.data ? props?.data : []}
            value={props?.value}
            style={{ width: "100%" }}
            renderInput={params => <TextField {...params} />}
            onChange={(event, value) => {
              props.onSelectChange(props?.name, value);
            }}
          />
        </>
      ) : props?.type == "textarea" ? (
        <>
          {console.log("intextarea")}
          <TextareaAutosize
            minRows={5}
            aria-label="maximum height"
            style={{ width: "50%" }}
            onChange={e => onInputChange(props.name, e.target.value)}
          />
        </>
      ) : props?.type == "file_upload" ? (
        <>
          {props?.isDownload ? (
            <>
              <FileDownload
                label={props?.label}
                name={props?.name}
                value={props?.text}
              />
            </>
          ) : (
            <FileUpload
              required={props?.required}
              label={props?.label}
              name={props?.name}
              value={props?.value}
              id={props?.id}
              buttonLabel={props?.buttonLabel}
              handleFileUpload={props?.handleFileUpload}
            />
          )}
        </>
      ) : props?.type == "time_card" ? (
        <>
          {props?.text?.map(sub_field => (
            <>
              <span style={{ marginRight: 20 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label={sub_field?.label}
                    value={sub_field?.value}
                    onChange={newValue => {
                      props?.handelTimeChange(sub_field?.key, newValue);
                    }}
                    renderInput={params => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </span>
            </>
          ))}
        </>
      ) : props?.type == "checkbox" ? (
        <>
          <Checkbox
            label={props?.label}
            name={props?.name}
            checked={props?.text ? true : false}
            onChange={() => {
              props?.handleCheckBox(props?.name, !props?.text);
            }}
          />
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default LabeledText;


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