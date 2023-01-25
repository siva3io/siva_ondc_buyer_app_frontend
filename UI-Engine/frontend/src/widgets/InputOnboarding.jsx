import React, { useState } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  Typography,
  TextareaAutosize,
  Button,
} from "@mui/material";
import "./InputOnboarding.css";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FormControl from "@mui/material/FormControl";
import FileUploading from "react-files-uploading";

const InputOnboarding = (props) => {
  let selectOptions = props.data ? props.data : [];

  const [focused, setFocused] = useState(false);
  const {
    type,
    label,
    errorMessage,
    onChange,
    id,
    disabled,
    setgstDoc,
    setpanDoc,
    ...inputProps
  } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  const [files, setFiles] = React.useState([]);

  const [Validate, setValidate] = useState(false);

  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  const uploadHandler = (s, event) => {
    // console.log("event", event.target.files[0]);
    const file = event.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      console.log("img data", e.target.result);
      s == "GST Details"
        ? setgstDoc(e.target.result.split(",")[1])
        : setpanDoc(e.target.result.split(",")[1]);
    };

    setFiles([...files, file]);
  };

  return (
    <Box
      className="input_main_wrapper"
      style={{ marginInline: "auto", width: "min-content" }}
    >
      <Box
        className="inputWrapper"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px",
          width: "100%",
          margin: "8px 0px",

          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <Box
          className="labelWrap"
          style={{ display: props.label === "" && "none" }}
        >
          <Typography
            htmlFor={props.label.toLowerCase().split(" ").join("_")}
            className={props.disabled_y ? "label_disabled" : "label"}
            sx={{ color: props.labelcolor == "white" ? "white" : "black" }}
          >
            {props.label}{" "}
            {props.required ? <p className="product_required_mark">*</p> : null}
          </Typography>
        </Box>
        <Box
          className="input_wrap"
          style={
            props.label == "GST Details" ||
            props.label == "PAN Number" ||
            props.label == "Aadhar Number Verification"
              ? {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }
              : {}
          }
        >
          {type === "input" ? (
            // && files.length == 0
            <>
              <TextField
                style={{
                  borderRadius: "5px",
                  backgroundColor: "white",
                  marginRight:
                    (props.label == "GST Details" ||
                      props.label == "PAN Number" ||
                      props.label == "Aadhar Number Verification") &&
                    "10px",
                }}
                disabled={disabled}
                id="standard-name"
                onChange={onChange}
                helperText={focused ? errorMessage : ""}
                error={focused && errorMessage}
                {...inputProps}
                min={props && props.min}
                type={props.type ? props.type : "text"}
                autoComplete="off"
                onFocus={() =>
                  inputProps.name === "confirmPassword" && setFocused(true)
                }
                onBlur={handleFocus}
                size="small"
                onInput={(e) => {
                  if (props.type === "number") {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 12);
                  }
                  if (e.target.value.length === 0) {
                    setFocused(true);
                  }
                }}
              />
              {(props.label == "GST Details" ||
                props.label == "PAN Number") && (
                <>
                  <Button
                    disabled={files.length == 0 ? false : true}
                    style={{
                      backgroundColor:
                        files.length == 0
                          ? props.labelcolor == "white"
                            ? "#B9B9B9"
                            : "rgba(0, 22, 97, 0.9)"
                          : "rgba(114, 171, 58, 1)",
                      color:
                        files.length == 0
                          ? props.labelcolor == "white"
                            ? "black"
                            : "white"
                          : "white",
                      textTransform: "none",
                    }}
                    variant="contained"
                    component="label"
                  >
                    <input
                      type="file"
                      hidden
                      onChange={(e) => uploadHandler(props.label, e)}
                      onClick={(e) => (e.target.value = null)}
                    />
                    {files.length == 0 ? "Upload" : "Uploaded"}
                  </Button>
                  {files &&
                    files.map((file) => (
                      <DeleteIcon
                        className="delIcon"
                        style={{
                          color: "#f55321",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => removeFile(file.name)}
                      />
                    ))}
                </>
              )}
              {props.label == "Aadhar Number Verification" && (
                <>
                  <Button
                    disabled={Validate}
                    onClick={() => {
                      setValidate(true);
                    }}
                    style={{
                      backgroundColor: !Validate
                        ? props.labelcolor == "white"
                          ? "#B9B9B9"
                          : "rgba(0, 22, 97, 0.9)"
                        : "rgba(114, 171, 58, 1)",
                      color: !Validate
                        ? props.labelcolor == "white"
                          ? "black"
                          : "white"
                        : "white",
                      textTransform: "none",
                    }}
                    variant="contained"
                    component="label"
                  >
                    {!Validate ? "Validate" : "Validated"}
                  </Button>
                  {Validate && (
                    <CheckCircleIcon
                      style={{
                        padding: "5px",
                        color: "rgba(114, 171, 58, 1)",
                        display: "flex",
                        alignItems: "center",
                      }}
                    />
                  )}
                </>
              )}
            </>
          ) : type === "select" ? (
            <Box
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <FormControl sx={{ width: "100%" }}>
                <Autocomplete
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "white",
                    marginRight: "10px",
                  }}
                  multiple={props.multiple}
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={selectOptions}
                  value={props.value}
                  onChange={onChange}
                  sx={{ width: "100%" }}
                  filterSelectedOptions={props.multiple === true ? true : false}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Search ${props.label ?? ""}`}
                    />
                  )}
                />
              </FormControl>
            </Box>
          ) : type === "textarea" ? (
            <TextareaAutosize
              style={{
                borderRadius: "5px",
                backgroundColor: "white",
                marginRight: "10px",
                width: "90%",
              }}
              className="clstextarea"
              id="standard-name"
              minRows={props.rows}
              onChange={onChange}
              value={props.value}
              placeholder={props.placeholder}
            />
          ) : (
            <></>
          )}
        </Box>
      </Box>
      {/* {files &&
        files.map((file) => (
          <>
            <li
              className="file-item"
              key={file.name}
              style={{ backgroundColor: "bisque" }}
            >
              <InsertDriveFileIcon />
              <p>{file.name}</p>
              <div className="actions">
                <div className="loading"></div>
                {isUploading && (
                  <SyncIcon
                    className="fa-spin"
                    onClick={() => removeFile(file.name)}
                  />
                )}
                {!isUploading && (
                  <DeleteIcon
                    className="delIcon"
                    onClick={() => removeFile(file.name)}
                  />
                )}
              </div>
            </li>
          </>
        ))} */}
    </Box>
  );
};

export default InputOnboarding;


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