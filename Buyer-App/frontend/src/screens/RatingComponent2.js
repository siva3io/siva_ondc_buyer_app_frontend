import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Container, Radio, Rating } from "./RatingStyles";
const Rate = ({ ...props }) => {
  const [rate, setRate] = useState(props?.rating);
  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => {
                setRate(givenRating);
                props.setrating(givenRating);
                props.products.Review[props.index].rating = givenRating;
                console.log("YESSS");
                props.setRatingvalue(givenRating);
                props.setRatinggiven({
                  ratingvalue: givenRating,
                  ratingcategory: props.category,
                });
              }}
            />
            <Rating>
              <FaStar
                fontSize="x-large"
                color={
                  givenRating < rate || givenRating === rate
                    ? "#FFB400"
                    : "#D1D1D1"
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
};

export default Rate;


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