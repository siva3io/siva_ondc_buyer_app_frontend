import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./HorizontalStepper.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";

import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Check from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

import Rate from "./RatingComponent2";

import {
  client_get_rating_categories,
  set_rating_api,
} from "../redux/Action/action";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#2E3369",
      padding: "0px",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#2E3369",
      padding: "0px",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === "dark" ? "#2E3369" : "#2E3369",
    borderTopWidth: 3,
    borderRadius: 10,
    padding: "0px",
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#2E3369",
    zIndex: 1,
    fontSize: 30,
    borderRadius: "50%",
    border: "4px solid #2E3369",
    padding: "0px",
  },
  "& .QontoStepIcon-notcompletedIcon": {
    color: "red",
    zIndex: 1,
    fontSize: 30,
    borderRadius: "50%",
    border: "4px solid #2E3369",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot
      ownerState={{ active }}
      className={className}
      style={{ padding: "0px", margin: "0px" }}
    >
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <ClearIcon className="QontoStepIcon-notcompletedIcon" />
      )}
    </QontoStepIconRoot>
  );
}

export default function HorizontalLinearStepper({ ...props }) {
  let dispatch = useDispatch();

  const [rating, setrating] = React.useState(0);
  const [prevrating, setPrevrating] = React.useState(0);

  // const steps = props?.steps;
  // console.log(steps, props);
  const [activeStep, setActiveStep] = React.useState(0);

  const [skipped, setSkipped] = React.useState(new Set());
  const [dummy, setdummy] = React.useState(1);

  const {
    feedbackCategories,
    setfeedbackCategories,
    handleModalClose,
    products,
    steps,
    setratingCategories,
    feedbackUrl,
    setproducts,
    handleClearProductsReview,
    transactionId,
    orderbppId,
    OrderbppUrl,
    setRatingvalue,
    setRatingcategory,
    setRatinggiven,
  } = props;

  const isStepOptional = step => {
    return step === 1;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleSubmitClick = (ratingType, transactionId, items) => {
    // console.log(
    //   "ratingType",
    //   ratingType,
    //   "transactionId",
    //   transactionId,
    //   "items",
    //   items
    // );
    ratingType = products.Review.find(type => type.lookup_id == ratingType);

    let feedback_form_questions = [];
    ratingType.value.map(type => {
      type.questions.map(e => {
        feedback_form_questions.push({
          id: e?.id,
          parent_id: e?.parent_id,
          question: e?.ques,
          answer: e?.ans,
          answer_type: e?.answer_type,
        });
      });
    });
    let payload = {
      context: {
        transaction_id: props.transactionId,
        bpp_id: orderbppId,
        bpp_uri: OrderbppUrl,
      },
      message: {
        rating_category: ratingType?.lookup_id,
        id:
          ratingType?.lookup_id == "order"
            ? transactionId
            : ratingType?.lookup_id == "product"
            ? items[0]?.id
            : "",
        value: ratingType?.rating,
        feedback_form: feedback_form_questions,
        feedback_id: feedbackUrl?.params?.feedback_id,
      },
    };
    dispatch(set_rating_api(payload));
  };

  // console.log("productsasdasdasd", products);

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  // console.log("products are", props.products);

  // ------------------------------------Rating-----------------------------------------------------
  const handleRatingChange = (newValue, index) => {
    setrating(newValue);
    let newproducts = products;
    newproducts.Review[index].rating = newValue;
    setproducts(newproducts);
  };

  return (
    <Box
      sx={{
        width: "100%",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {console.log("steps******", steps, products.Review, products)}
      {products?.Review?.map((o, index) => {
        {
          console.log("each obj-----", o);
        }
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "10%" }}>
            {index == 0 && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  <ArrowBackIcon />
                </Button>
                <div>
                  <Stepper
                    activeStep={activeStep}
                    connector={<QontoConnector />}
                  >
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};

                      if (isStepSkipped(index)) {
                        stepProps.completed = false;
                      }
                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel
                            {...labelProps}
                            StepIconComponent={QontoStepIcon}
                          ></StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </div>
                <div>
                  {rating > 0 &&
                    (activeStep === steps.length - 1 ? (
                      <button
                        style={{
                          color: "white",
                          background: "blue",
                          borderRadius: "4px",
                        }}
                        onClick={() => {
                          handleModalClose();
                          handleClearProductsReview();
                          // handleSubmitClick(
                          //   steps[activeStep],
                          //   products.transactionId,
                          //   products.items
                          // );
                        }}
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleNext();
                          // handleSubmitClick(
                          //   steps[activeStep],
                          //   products.transactionId,
                          //   products.items
                          // );
                        }}
                      >
                        <ArrowForwardIcon />
                      </button>
                    ))}
                </div>
              </div>
            )}
            {activeStep === steps.length ? (
              <React.Fragment>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  {/* <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Clear</Button> */}
                </Box>
              </React.Fragment>
            ) : (
              o?.lookup_id === steps[activeStep] && (
                <React.Fragment>
                  {steps.includes(o?.lookup_id) && (
                    <>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        {steps[activeStep]}
                      </Typography>
                      {setRatingcategory(o?.lookup_id)}
                      <Rate
                        rating={o?.rating}
                        setrating={setrating}
                        products={products}
                        index={index}
                        setRatingvalue={setRatingvalue}
                        setRatinggiven={setRatinggiven}
                        category={o?.lookup_id}
                      />
                      {/* <Rating
                        name="no-value"
                        value={rating}
                        onChange={(event, newValue) => {
                          handleRatingChange(newValue, index);
                        }}
                      /> */}
                    </>
                  )}
                  {/* {(activeCategory = o)} */}
                  {feedbackCategories.includes(o?.lookup_id) &&
                    o?.value?.map(subobj => {
                      return (
                        <div style={{ textAlign: "left", alignItems: "left" }}>
                          {subobj?.name == "checkboxques" ? (
                            subobj?.questions.map((quesdetails, quesno) => {
                              return (
                                <div>
                                  <div className="store_review_question">
                                    {quesdetails?.ques}
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      // justifyContent: "space-evenly",
                                      margin: "10px",
                                      flexFlow: "row wrap",
                                      gap: "10px",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {quesdetails?.ques &&
                                      quesdetails?.ans.map((o, index) => {
                                        return (
                                          <div
                                            className="store_review_checkbox_ans"
                                            style={{
                                              cursor: "pointer",
                                              background: o.selected
                                                ? "#72AB3A"
                                                : "",
                                            }}
                                            onClick={() => {
                                              quesdetails?.selected.includes(
                                                o?.ansvalue
                                              )
                                                ? (quesdetails.selected =
                                                    quesdetails.selected.filter(
                                                      opt => opt != o?.ansvalue
                                                    ))
                                                : quesdetails?.selected.push(
                                                    o?.ansvalue
                                                  );

                                              o.selected = !o.selected;
                                              // console.log(quesdetails);
                                              setdummy(dummy + 1);
                                            }}
                                          >
                                            {o?.ansvalue}
                                          </div>
                                        );
                                      })}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <></>
                          )}
                          {subobj?.name == "radioques" ? (
                            subobj?.questions.map(quesdetails => {
                              return (
                                <div>
                                  <div className="store_review_question">
                                    {quesdetails?.ques}
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "2%",
                                      // paddingLeft: "30%",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {quesdetails?.ques &&
                                      quesdetails?.ans.map((o, index) => {
                                        return (
                                          <div
                                            className="store_review_radio_ans"
                                            style={{
                                              cursor: "pointer",
                                              background: quesdetails.selected
                                                ? "#72AB3A"
                                                : "",
                                            }}
                                            onClick={() => {
                                              quesdetails.selected = o;
                                              // console.log(quesdetails);
                                            }}
                                          >
                                            {o}
                                          </div>
                                        );
                                      })}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <></>
                          )}
                          {subobj?.name == "textques" ? (
                            subobj?.questions.map(quesdetails => {
                              return (
                                <div>
                                  <div className="store_review_question">
                                    {quesdetails?.ques && quesdetails?.ques}
                                  </div>
                                  {quesdetails?.ques && (
                                    <textarea
                                      rows="4"
                                      cols="65"
                                      onChange={e => {
                                        quesdetails.ans = e.target.value;
                                        // console.log(
                                        //   e.target.value,
                                        //   quesdetails
                                        // );
                                      }}
                                    />
                                  )}
                                </div>
                              );
                            })
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    })}
                </React.Fragment>
              )
            )}
          </div>
        );
      })}
    </Box>
  );
}



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