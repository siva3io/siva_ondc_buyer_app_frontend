import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import PasswordIcon from "@mui/icons-material/Password";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { user_login } from "../redux/action";

export default function Signin({ setIsSignIn }) {
  let dispatch = useDispatch();

  const [mainData, setMainData] = useState({});
  const [createAccount, setCreateAccount] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleNext = () => {
    console.log("otp sent");
    setOtpSent(true);
  };

  const onInputChange = (key, value) => {
    console.log(key, value);
    var temp = mainData;
    temp[key] = value;
    setMainData(temp);
  };

  const handleLogin = () => {
    if (mainData?.email?.length > 5 && mainData?.password?.length > 5) {
      dispatch(
        user_login(
          { username: mainData?.email, password: mainData?.password },
          function (resp) {
            if (resp?.data?.token) {
              toast(resp?.data?.message);
              localStorage.setItem("token", resp?.data?.token);
              setIsSignIn(true);
            }
            //  history.push("/storeFront/products")
          }
        )
      );
    } else {
      toast("Invalid data");
    }
  };

  return (
    <div style={{ background: "grey", width: "100vw", height: "100vh" }}>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={true}
        backdrop="false"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
        }}
      >
        {
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
                            onChange={e =>
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
                          <span style={{}}>Enter OTP</span>
                          <TextField
                            onChange={e => onInputChange("otp", e.target.value)}
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
                          <Button variant="outlined"> Submit </Button>
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
                    gap: "50px",
                  }}
                >
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
                      gap: "20px",
                    }}
                  >
                    <div style={{ width: "50%" }}>
                      <TextField
                        id="input-with-icon-textfield"
                        placeholder="Email Address"
                        variant="outlined"
                        onChange={e => onInputChange("email", e.target.value)}
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
                        onChange={e =>
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
                </Box>
              </>
            )}
          </>
        }
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
