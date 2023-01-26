import React, { useState, useEffect } from "react";
import "./DefaultImage.css";
import GallaryImgCard from "./GallaryImgCard";
import Modal from "./Modal";
import ImageUploading from "react-images-uploading";
//MUI
import DeleteIcon from "@mui/icons-material/Delete";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Box, Button, Typography } from "@mui/material";
// import ProductsTable from "./ImagesTable";
import ModalView from "./ModalView";

const DefaultImage = (props) => {
  //local variables
  let imageLocalData = localStorage.getItem(`addProduct[0]`)
    ? JSON.parse(localStorage.getItem(`addProduct[0]`))
    : null;
  const [show, setShow] = useState(false);
  const [modalView, setModal] = useState(false);
  const imgTypes = ["image/png", "image/jpg", "image/jpeg"];
  const [images, setImages] = React.useState([]);
  const [tempImages, setTempImages] = React.useState([]);
  const [isImageThere, setIsImageThere] = useState(
    // imageLocalData && imageLocalData.images ? true :
    false
  );
  const maxNumber = 10;

  const { setimageUpload } = props;

  //local functions
  const onImageChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && imgTypes.includes(selectedFile.type)) {
        setPreviewImage(URL.createObjectURL(selectedFile));
        setTryone("");
      } else {
        setPreviewImage(null);
        setTryone("please select valid image type");
      }
    }
  };

  const onChange = (imageList) => {
    setTempImages(imageList);
    if (imageList.length == 0) {
      setIsImageThere(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setTempImages([]);
  };

  const handleDialogOpenModalView = () => {
    updateImages();
    console.log("handleDialogOpenModalView", images);
    setModal(false);
  };

  const handleReplaceProduct = () => {
    handleDialogOpenModalView();
  };

  const updateImages = () => {
    console.log("called");
    var temp = [];
    var temp1 = [...images, ...tempImages];
    console.log("temp1 temp1 temp1", temp1);
    temp = temp1.map((image) => {
      console.log("image", image);
      if (image?.data_url) {
        return {
          // data: image.data_url.split(",")[1],
          data:
            image?.data_url || image?.enhancedImage
              ? image?.enhancedImage
                ? ""
                : image.data_url.split(",")[1]
              : "",
          link:
            image?.data_url || image?.enhancedImage
              ? image?.enhancedImage
                ? image?.enhancedImage
                : image?.data_url.split(",")[1]
              : "",
          name: image.file.name,
          size: image.file.size,
          type: image.file.type,
        };
      } else {
        return { data: image };
      }
    });
    // setStep1Data({ ...step1Data, image_options: temp });
    // setmainData({ ...mainData, image_options: temp });
    // props.tempData["image_options"] = temp;
    // props.setimageUpload(temp);
    setimageUpload(temp);
  };

  const handleEnhance = () => {
    setModal(true);
  };

  const handleSave = () => {
    var temp = [];
    setShow(false);
    var temp1 = [...images, ...tempImages];
    setImages((images) => [...images, ...tempImages]);
    temp = temp1.map((image) => {
      if (image?.data_url) {
        return {
          data: image?.data_url?.split(",")[1],
          name: image.file.name,
          size: image.file.size,
          type: image.file.type,
        };
      } else {
        return { data: image };
      }
    });

    setimageUpload(temp);
    // props.setimageUpload(temp);
    // props.tempData["image_options"] = temp;
    setTempImages([]);
    setIsImageThere(true);
  };

  useEffect(() => {
    updateImages();
  }, [images, tempImages]);

  const [imagesWholeData, setimagesWholeData] = useState([]);

  useEffect(() => {}, [imagesWholeData]);

  //render function
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
          height: "auto",
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
          <>
            {images && (
              <>
                {isImageThere && (
                  <GallaryImgCard
                    addImg={false}
                    setShow={setShow}
                    images={images}
                    setImages={setImages}
                    setIsImageThere={setIsImageThere}
                  />
                )}

                {/* <GallaryImgCard addImg={true} setShow={setShow} /> */}
                {!isImageThere && (
                  <GallaryImgCard
                    addImg={true}
                    setShow={setShow}
                    setIsImageThere={setIsImageThere}
                  />
                )}
              </>
            )}

            {show && (
              <Modal show={show} onClose={handleClose}>
                <Box className="modalHeaderBlock">
                  <Box className="modalHeaderBtnDiv">
                    <Box>
                      <label>Add Images</label>
                    </Box>
                    <Box>
                      <ClearOutlinedIcon onClick={() => handleClose()} />
                    </Box>
                  </Box>
                </Box>
                <ImageUploading
                  value={tempImages}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <Box
                      className="image_upload_popup"
                      {...dragProps}
                      style={isDragging ? { color: "red" } : null}
                    >
                      <Box className="upldImgLinkProduct">
                        <Box className="upldImgLinkProduct_frame">
                          <p className="upldImgLinkProduct_head">
                            Drag and Drop a file
                          </p>
                          <p className="upldImgLinkProduct_body">
                            files size to be less than 1Mb
                          </p>
                          <p className="orText">OR</p>
                          <Button
                            variant="contained"
                            style={{ textTransform: "none" }}
                            htmlFor="upload"
                            onClick={onImageChange && onImageUpload}
                          >
                            Upload an Image
                          </Button>
                          {tempImages.length > 0 && (
                            <Box
                              className="imagePreviewBlock"
                              style={
                                tempImages.length > 3
                                  ? { justifyContent: "left" }
                                  : { justifyContent: "center" }
                              }
                            >
                              {imageList.map((image, index) => (
                                <Box key={index} className="image-item">
                                  <Box className="imageHoverActionBlock">
                                    <img
                                      src={image?.data_url}
                                      alt=""
                                      width="130px"
                                      height="130px"
                                      className="previewImageHover"
                                    />
                                    <Box className="previewImageHoverAction">
                                      <DeleteIcon
                                        onClick={() => {
                                          onImageRemove(index);
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                </Box>
                              ))}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  )}
                </ImageUploading>
                <Box className="modalFooterBlock">
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    style={{ margin: "0px 5px", textTransform: "none" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={tempImages.length === 0 ? true : false}
                    style={{ textTransform: "none" }}
                  >
                    Confirm
                  </Button>
                  {/* </Box> */}
                </Box>
              </Modal>
            )}
          </>
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultImage;


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