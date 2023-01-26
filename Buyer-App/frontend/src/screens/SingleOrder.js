import React, { useEffect, useState, Suspense } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Chip, TextareaAutosize, Button } from "@mui/material";
import SingleFileUpload from "Remote/SingleFileUpload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
const filter = createFilterOptions();

const SingleOrder = (props) => {
  let dispatch = useDispatch();

  const [imageUpload, setimageUpload] = useState("");
  const [fileUploadImage, setfileUploadImage] = useState("");
  const [fileUploadLink, setfileUploadLink] = useState("");
  const [removeFile, setRemoveFile] = useState();
  const [value, setValue] = useState(null);

  const { selectedCategory, orderData } = props;



  useEffect(() => {
    removeFile && setfileUploadLink("")
  }, [removeFile]);

  const { grievanceCategories } = useSelector((state) => state.data);

  const issues = [];

  grievanceCategories &&
    grievanceCategories.map((o) => {
      !issues.includes(o.category) && issues.push(o.category);
    });

  const [category, setcategory] = useState(selectedCategory);
  const [SubjectOfIssue, setSubjectOfIssue] = useState([]);

  const handleCancel = () => {
    props.setOrderPage(true);
  };

  const [mainData, setmainData] = useState({});

  const handleInputChange = (key, value) => {
    console.log("key", key, "value", value);
    var newmainData = mainData;
    newmainData[key] = value;
    setmainData(newmainData);

    if (key == "IssueCategory") {
      setcategory(value);
      let temp = [];
      grievanceCategories &&
        grievanceCategories.map((o) => {
          o?.category == value &&
            temp.push({
              label: o.description,
              code: o.code,
              expected_resolution_time: o?.expected_resolution_time,
              expected_response_time: o?.expected_response_time,
            });
        });
      setSubjectOfIssue(temp);
    }
  };

  useEffect(() => {
    let temp = [];
    grievanceCategories &&
      grievanceCategories.map((o) => {
        o?.category == category &&
          temp.push({
            label: o.description,
            code: o.code,
            expected_resolution_time: o?.expected_resolution_time,
            expected_response_time: o?.expected_response_time,
          });
      });
    setSubjectOfIssue(temp);
  }, [category]);

  // console.log(orderData, "orderDataaaaaaaaa");

  const handleSubmitClick = () => {
    console.log("mainData", mainData);

    props.setOrderPage(true);

    let payload = {
      // context: {},
      message: {
        issue: {
          order: orderData,
          rating: orderData?.rating ? orderData?.rating : "", //laterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
          source: {
            issue_source_type: "Interfacing NP",
          },
          status: {
            status: "open",
            modified_by: {
              org: {
                name: orderData?.billing && orderData?.billing?.name,
              },
              person: {
                name: orderData?.billing && orderData?.billing?.name,
              },
              contact: {
                name: orderData?.billing && orderData?.billing?.name,
                email: orderData?.billing && orderData?.billing?.email,
                phone: orderData?.billing && orderData?.billing?.phone,
                address: {
                  full:
                    orderData?.billing &&
                    orderData?.billing?.address?.door +
                      orderData?.billing?.address?.building,
                  format: "string",
                },
              },
            },
            // closing_reason: "",
            status_details: {
              long_desc: mainData?.IssueDescription,
              short_desc: mainData?.IssueDescription,
            },
            // closing_remarks: "",
            // status_change_date: {
            //   timestamp: "2022-12-04T05:28:11.320Z",
            // },
            // issue_modification_date: {
            //   timestamp: "2022-12-04T05:28:11.320Z",
            // },
            modified_issue_field_name: "string",
          },
          category: mainData?.IssueCategory
            ? mainData?.IssueCategory
            : selectedCategory,
          issue_type: "Issue",
          description: {
            name: mainData?.subjectIssue?.label,
            long_desc: mainData?.IssueDescription,
            short_desc: mainData?.IssueDescription,
            additional_desc: {
              url: fileUploadLink,
              content_type: "text/plain",
            },
          },
          // finalized_odr: {},
          complainant_info: {
            person: {
              name: orderData?.billing && orderData?.billing?.name,
            },
            contact: {
              name: orderData?.billing && orderData?.billing?.name,
              email: orderData?.billing && orderData?.billing?.email,
              phone: orderData?.billing && orderData?.billing?.phone,
              address: {
                full:
                  orderData?.billing &&
                  orderData?.billing?.address?.door +
                    orderData?.billing?.address?.building,
                format: "string",
              },
            },
            complainant_action: "open",
            complainant_action_reason: mainData?.SubjectIssue?.label,
          },
          expected_response_time: {
            duration: mainData?.SubjectIssue?.expected_response_time,
          },
          expected_resolution_time: {
            duration: mainData?.SubjectIssue?.expected_resolution_time,
          },
          supplementary_information: [
            {
              issue_update_info: {
                long_desc: mainData?.IssueDescription,
                short_desc: mainData?.IssueDescription,
              },
            },
          ],
        },
      },
      AssignedTo: "22",
      AssignedFrom: localStorage.getItem("user_id")
        ? localStorage.getItem("user_id")
        : 1234,
    };

    dispatch(raise_report_api(payload));

    setTimeout(() => {
      dispatch(loadIssuesList());
    }, 500);
  };

  return (
    <div>
      <div className="store_tickets_wrapper">
        <div className="store_tickets_left_wrapper">
          <div className="store_ticket_profile">
            <div className="store_profile_img">
              <img src="https://dev-api.eunimart.com/files/images/profile.png"></img>
            </div>
            <div className="store_profile_heading">
              <p className="profile_main">New Ticket</p>
              {/* <p>Ticket Id: 909098</p> */}
            </div>
          </div>
          <div className="ticket_fields">
            <div className="store_field">
              <Typography sx={{ color: "black" }}>Issue category</Typography>
              <Autocomplete
                disablePortal
                className="store_select_ticket"
                options={issues}
                sx={{ width: 300 }}
                value={category}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Issue category"
                    placeholder="Issue category"
                    InputLabelProps={{ shrink: false }}
                  />
                )}
                onChange={(e, value) => {
                  handleInputChange("IssueCategory", value);
                }}
              />
            </div>

            <div className="store_field">
              <Typography sx={{ color: "black" }}>Order ID</Typography>
              <TextField
                className="store_select_ticket"
                // label="Order ID"
                variant="outlined"
                placeholder="Order ID"
                disabled={orderData?.transactionId ? true : false}
                value={orderData?.transactionId}
                InputLabelProps={{ shrink: false }}
                onChange={(e) => {
                  handleInputChange("orderId", e.target.value);
                }}
              />
            </div>

            <div className="store_field">
              <Typography sx={{ color: "black" }}>Subject of issue</Typography>
              {/* <Autocomplete
                disablePortal
                className="store_select_ticket"
                options={SubjectOfIssue}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Subject of issue"
                    InputLabelProps={{ shrink: false }}
                  />
                )}
                onChange={(e, value) => {
                  handleInputChange("SubjectIssue", value);
                }}
              /> */}
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => (
                  <li {...props}>{option.label}</li>
                )}
                freeSolo
                id="free-solo-dialog-demo"
                className="store_select_ticket"
                options={SubjectOfIssue}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Subject of issue"
                    InputLabelProps={{ shrink: false }}
                  />
                )}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setTimeout(() => {
                      toggleOpen(true);
                      setDialogValue({
                        title: newValue,
                        year: "",
                      });
                    });
                  } else if (newValue && newValue.inputValue) {
                    console.log("Sample0");

                    toggleOpen(true);
                    setDialogValue({
                      title: newValue.inputValue,
                      year: "",
                    });
                  } else {
                    setValue(newValue);
                    console.log("Sample");
                  }
                  handleInputChange("subjectIssue", newValue);
                }}
                filterOptions={(options, params) => {
                  console.log((options, "params", params));
                  const filtered = filter(options, params);

                  if (params.inputValue !== "") {
                    filtered.push({
                      inputValue: params.inputValue?.getoptionLabel?.name,
                      label: `${params.inputValue}`,
                      value: params.inputValue,
                    });
                  }
                  return filtered;
                }}
              />
            </div>

            <div className="store_field">
              <Typography sx={{ color: "black" }}>
                Description of Issue
              </Typography>
              <TextareaAutosize
                aria-label="Description of Issue"
                placeholder="Description of Issue"
                style={{ width: "100%", height: "150px" }}
                onChange={(e) => {
                  handleInputChange("IssueDescription", e.target.value);
                }}
              />
            </div>

            <SingleFileUpload
              setimageUpload={setimageUpload}
              setfileUpload={setfileUploadImage}
              setRemoveFile={setRemoveFile}
            />

            <div className="store_ticket_actions">
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleSubmitClick();
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="store_tickets_right_wrapper">
          <img src="https://dev-api.eunimart.com/files/images/amico.png"></img>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;


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