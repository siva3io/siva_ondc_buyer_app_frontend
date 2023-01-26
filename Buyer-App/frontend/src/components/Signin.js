import {
  Box,
  Button,
  IconButton,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import PasswordIcon from "@mui/icons-material/Password";
import CloseIcon from '@mui/icons-material/Close';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./signin.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useDispatch, useSelector } from "react-redux";  
import { user_login, user_signup, forget_password, change_password } from "../redux/Action/action";

export default function Signin() {
  let dispatch = useDispatch();
  let history = useHistory();

  const [mainData, setMainData] = useState({});
  const [createAccount, setCreateAccount] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false); 

  const handleNext = () => {
    if (mainData?.email?.length > 5) { 
      dispatch(forget_password({"username":mainData?.email}, function (resp) {  
        toast(resp?.message)   
      })); 
    } else {
      toast("Invalid data") 
    }
    setOtpSent(true);
  };

  const onInputChange = (key, value) => {
    console.log(key, value);
    var temp = mainData;
    temp[key] = value;
    setMainData(temp);
  };

  //Reset Password
  const handleSubmit = () => {
    if (
      mainData?.email &&
      mainData?.otp &&
      mainData?.password &&
      mainData?.confirm_password &&
      mainData?.password === mainData?.confirm_password
    ) { 
      dispatch(change_password({"username":mainData?.email, "otp":mainData?.otp, "password":mainData?.password, "confirm_password":mainData?.confirm_password }, function (resp) { 
        toast(resp?.message)  
        if(resp?.message == "Updated successfully !!")
        { 
          setCreateAccount(false)
          setForgetPassword(false)
        }              
      }));  
      
    } else if (mainData?.password !== mainData?.confirm_password) { 
      toast("Passwords don't match") 
    } else {
      toast("Required all fields") 
    }
  };

  const handleCreateAccount = () => {
    if (
      mainData?.email &&
      mainData?.password &&
      mainData?.confirm_password &&
      mainData?.password === mainData?.confirm_password
    ) {
      //console.log("Successfully created");

      dispatch(user_signup({"username":mainData?.email, "password":mainData?.password, "confirm_password":mainData?.confirm_password }, function (resp) { 
        toast(resp?.data?.message) 
        localStorage.setItem("token", resp?.data?.token); 
       // if (localStorage.getItem("select_data") != null) {
         // history.push("/storeFront/cart") 
          //window.location.href="/storeFront/cart"
        // }
        // else{
           history.push("/storeFront/products") 
        // }
      })); 


    } else if (mainData?.password !== mainData?.confirm_password) { 
      toast("Passwords don't match") 
    } else {
      toast("Required all fields") 
    }
  };

  const handleLogin = () => {
    if (mainData?.email?.length > 5 && mainData?.password?.length > 5) { 
      dispatch(user_login({"username":mainData?.email, "password":mainData?.password}, function (resp) { 
        toast(resp?.data?.message) 
        if(resp?.data?.token)
        {
          localStorage.setItem("token", resp?.data?.token); 
          history.push("/storeFront/products")  
        }
        // if (localStorage.getItem("select_data") != null) {
        //   history.replace("/storeFront/cart") 
        //   //window.location.href="/storeFront/cart"
        // }
        // else{
          // history.push("/storeFront/products")  
        // }
      })); 
    } else {
      toast("Invalid data") 
    }
  };
 

  return (
    <div style={{ background: "grey", width: "100vw", height: "100vh" }}>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={true}
        //   onClose={handleClose}
        //   aria-labelledby="modal-modal-title"
        backdrop="false"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
        }}
      >
        {createAccount ? (
          <>
            <Box
              style={{
                background: "white",
                width: "50vw",
                minHeight: "70vh",
                padding: "2%",
                borderRadius: "15px",
                display: "flex",
                flexDirection: "column",
                gap: "5%",
                justifyContent: "space-between",
              }}
            >
              <CloseIcon onClick={() => history.push("/storeFront/") } style={{marginLeft:"95%", cursor:"pointer"}}/>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                  width="200px"
                  height="100px"
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <div style={{ width: "50%" }}>
                  <TextField
                    id="input-with-icon-textfield"
                    placeholder="Email Address"
                    variant="outlined"
                    onChange={(e) => onInputChange("email", e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    style={{ width: "100%" }}
                    type="text"
                  />
                </div>

                <div style={{ width: "50%" }}>
                  <TextField
                    id="input-with-icon-textfield"
                    onChange={(e) => onInputChange("password", e.target.value)}
                    placeholder="Password"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordIcon />
                        </InputAdornment>
                      ),
                    }}
                    style={{ width: "100%" }}
                    type="password"
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <TextField
                    id="input-with-icon-textfield"
                    placeholder="Confirm Password"
                    onChange={(e) =>
                      onInputChange("confirm_password", e.target.value)
                    }
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordIcon />
                        </InputAdornment>
                      ),
                    }}
                    style={{ width: "100%" }}
                    type="password"
                  />
                </div>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => {
                      handleCreateAccount();
                    }}
                    variant="outlined"
                  >
                    {" "}
                    Sign up{" "}
                  </Button>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  justifySelf: "flex-end",
                }}
              >
                <span
                  onClick={() => {
                    setCreateAccount(false);
                  }}
                  style={{ color: "grey", cursor: "pointer" }}
                >
                  {" "}
                  Already have an account ?{" "}
                  <span
                    style={{
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Sign in{" "}
                  </span>{" "}
                </span>
              </div>
            </Box>
          </>
        ) : (
          <>
            {forgetPassword ? (
              <>
                <Box
                  style={{
                    background: "white",
                    width: "50vw",
                    minHeight: "70vh",
                    padding: "2%",
                    borderRadius: "15px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5%",
                    justifyContent: "space-between",
                  }}
                >
                  <CloseIcon onClick={() => history.push("/storeFront/") } style={{marginLeft:"95%", cursor:"pointer"}}/>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                      width="200px"
                      height="100px"
                    />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    {!otpSent ? (
                      <>
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                          }}
                        >
                          <span style={{}}>
                            Enter your Email Address to send OTP
                          </span>
                          <TextField
                            id="input-with-icon-textfield"
                            placeholder="Email Address"
                            variant="outlined"
                            onChange={(e) =>
                              onInputChange("email", e.target.value)
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AccountCircle />
                                </InputAdornment>
                              ),
                            }}
                            style={{ width: "100%" }}
                            type="text" 
                          />
                        </div>

                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() => handleNext()}
                          >
                            {" "}
                            Next{" "}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                          }}
                        >
                          <span style={{}}>Enter Details</span>
                          <TextField
                            onChange={(e) =>
                              onInputChange("otp", e.target.value)
                            }
                            id="input-with-icon-textfield"
                            placeholder="Enter OTP"
                            variant="outlined"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PasswordIcon />
                                </InputAdornment>
                              ),
                            }}
                            style={{ width: "100%" }}
                            type="text"
                            autoComplete="false"
                          />

                          <div style={{ width: "100%" }}>
                            <TextField
                              id="input-with-icon-textfield"
                              onChange={(e) => onInputChange("password", e.target.value)}
                              placeholder="Password"
                              variant="outlined"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PasswordIcon />
                                  </InputAdornment>
                                ),
                              }}
                              style={{ width: "100%" }}
                              type="password"
                              autoComplete="false"
                            />
                          </div>
                          <div style={{ width: "100%" }}>
                            <TextField
                              id="input-with-icon-textfield"
                              placeholder="Confirm Password"
                              onChange={(e) =>
                                onInputChange("confirm_password", e.target.value)
                              }
                              variant="outlined"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PasswordIcon />
                                  </InputAdornment>
                                ),
                              }}
                              style={{ width: "100%" }}
                              type="password"
                              autoComplete="false"
                            />
                          </div>

                        </div>

                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                          }}
                        >
                          <Button variant="outlined" onClick={handleSubmit}> Submit </Button>
                        </div>
                      </>
                    )}
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      justifySelf: "flex-end",
                    }}
                  >
                    <span
                      onClick={() => {
                        setCreateAccount(true);
                      }}
                      style={{ color: "grey", cursor: "pointer" }}
                    >
                      {" "}
                      Do not have an account ?{" "}
                      <span
                        style={{
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        Create{" "}
                      </span>{" "}
                    </span>
                  </div>
                </Box>
              </>
            ) : (
              <>
                <Box
                  style={{
                    background: "white",
                    width: "50vw",
                    minHeight: "70vh",
                    padding: "2%",
                    borderRadius: "15px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5%",
                    justifyContent: "space-between",
                  }}
                >
                  <CloseIcon onClick={() => history.push("/storeFront/") } style={{marginLeft:"95%", cursor:"pointer"}}/>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                      width="200px"
                      height="100px"
                    />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    <div style={{ width: "50%" }}>
                      <TextField
                        id="input-with-icon-textfield"
                        placeholder="Email Address"
                        variant="outlined"
                        onChange={(e) => onInputChange("email", e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          ),
                        }}
                        style={{ width: "100%" }}
                        type="text"
                      />
                    </div>

                    <div style={{ width: "50%" }}>
                      <TextField
                        id="input-with-icon-textfield"
                        placeholder="Password"
                        variant="outlined"
                        onChange={(e) =>
                          onInputChange("password", e.target.value)
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PasswordIcon />
                            </InputAdornment>
                          ),
                        }}
                        style={{ width: "100%" }}
                        type="password"
                      />
                    </div>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <span
                          onClick={() => {
                            setForgetPassword(true);
                          }}
                          style={{ color: "grey", cursor: "pointer" }}
                        >
                          {" "}
                          forget password ?{" "}
                        </span>
                      </div>
                      <Button onClick={handleLogin} variant="outlined">
                        {" "}
                        Sign in{" "}
                      </Button>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      justifySelf: "flex-end",
                    }}
                  >
                    <span
                      onClick={() => {
                        setCreateAccount(true);
                      }}
                      style={{ color: "grey", cursor: "pointer" }}
                    >
                      {" "}
                      Do not have an account ?{" "}
                      <span
                        style={{
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        Create{" "}
                      </span>{" "}
                    </span>
                  </div>
                </Box>
              </>
            )}
          </>
        )}
      </Modal>
      <ToastContainer />
    </div>
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