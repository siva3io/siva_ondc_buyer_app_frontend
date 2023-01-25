import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import FileUploading from "react-files-uploading";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import "./matInput.css";

const SingleFileUpload = (props) => {
  const { setfileUpload } = props;

  const [files, setFiles] = React.useState([]);
  const [show, setShow] = useState(true);
  console.log("props", props);

  const onChange = (fileList) => {
    console.warn("fileList", fileList);
    setFiles(fileList);

    for (let index = 0; index < fileList.length; index++) {
      let reader = new FileReader();
      reader.readAsDataURL(fileList[index]);
      reader.onload = (e) => {
        // console.log("img data" + index, e.target.result);
        setfileUpload({
          data: e.target.result.split(",")[1],
          name: fileList[index].name,
          size: fileList[index].size,
          type: fileList[index].type,
          key: props?.name,
          id: props?.id,
        });
      };
    }
  };

  return (
    <Box className="input_main_wrapper">
      <Box
        className="inputWrapper"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px",
          width: "97%",
          margin: "24px 0px",
        }}
      >
        <Box
          className="labelWrap"
          style={{ display: props?.label === "" && "none" }}
        >
          <Typography
            htmlFor={props?.label?.toLowerCase()?.split(" ")?.join("_")}
            className={props.disabled_y ? "label_disabled" : "label"}
            sx={{ color: "black" }}
          >
            {props?.label}{" "}
            {props.required ? <p className="product_required_mark">*</p> : null}
          </Typography>
        </Box>
        <Box className="input_wrap">
          <FileUploading
            multiple
            value={files}
            maxNumber={1}
            onChange={onChange}
          >
            {({
              fileList,
              errors,
              isDragging,
              onFileUpload,
              onFileRemoveAll,
              onFileUpdate,
              onFileRemove,
              dragProps,
            }) => {
              return (
                <div className="upload__file-wrapper">
                  {errors && (
                    <div>
                      {errors.maxNumber && (
                        <span>Number of selected files exceed maxNumber</span>
                      )}
                      {errors.acceptType && (
                        <span>Your selected file type is not allow</span>
                      )}
                      {errors.maxFileSize && (
                        <span>Selected file size exceed maxFileSize</span>
                      )}
                    </div>
                  )}
                  {fileList.length != 0 ? setShow(false) : setShow(true)}
                  {show && (
                    <button
                      id="btn-upload"
                      type="button"
                      // style={isDragging ? { color: "red" } : undefined}
                      style={{
                        background: "DodgerBlue",
                        color: "white",
                        fontSize: "20px",
                        padding: "10px 60px",
                        borderRadius: "5px",
                        margin: "10px 0px",
                        cursor: "pointer",
                      }}
                      onClick={() => {props.setRemoveFile(false),onFileUpload()}}
                      {...dragProps}
                    >
                      {props.buttonLabel
                        ? props.buttonLabel
                        : "Click or Drop here"}
                    </button>
                  )}

                  <div
                    id="list-files"
                    style={{
                      color: "red",
                    }}
                  >
                    {fileList.map((file, index) => (
                      <div key={`file-${index}`} className="file-item">
                        <p>{file.name}</p>
                        <div className="file-item__btn-wrapper">
                          <button
                            id={`update_${index}`}
                            type="button"
                            style={{
                              background: "DodgerBlue",
                              color: "white",
                              padding: "5px 15px",
                              borderRadius: "10px",
                              margin: "5px 10px",
                              cursor: "pointer",
                            }}
                            onClick={() => onFileUpdate(index)}
                          >
                            {/* {`Update ${index}`} */}
                            {`Change`}
                          </button>
                          <button
                            id={`remove_${index}`}
                            type="button"
                            style={{
                              background: "DodgerBlue",
                              color: "white",
                              padding: "5px 15px",
                              borderRadius: "10px",
                              margin: "5px 10px",
                              cursor: "pointer",
                            }}
                            onClick={() => {props.setRemoveFile(true),onFileRemove(index)}}
                          >
                            {/* {`Remove ${index}`} */}
                            {`Remove`}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }}
          </FileUploading>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleFileUpload;


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