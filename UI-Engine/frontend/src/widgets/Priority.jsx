import React from "react";
import "./Priority.css";
import "font-awesome/css/font-awesome.css";
import { Chip, Icon } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Priority = ({ rating, color }) => {
  console.log("rating", rating);

  var s = "";
  s = rating.toString().split(".");

  var r = 5;
  r = r - s[0];
  if (s.length > 1) {
    r = s[1] >= 1 ? r - 1 : r;
  }

  console.log(s, r, "ll");

  return (
    <>
      <div className="stars1">
        {rating >= 1 && <span class="fa fa-star checked-reviews"></span>}
        {rating >= 2 && <span class="fa fa-star checked-reviews"></span>}
        {rating >= 3 && <span class="fa fa-star checked-reviews"></span>}
        {rating >= 4 && <span class="fa fa-star checked-reviews"></span>}
        {rating >= 5 && <span class="fa fa-star checked-reviews"></span>}
        {s.length >= 2 && s[1] !== 0 && (
          <i class="fa fa-star-half-o checked-reviews2" aria-hidden="true"></i>
        )}
        {r >= 1 && (
          <span class="fa fa-star-o checked-reviews3" aria-hidden="true"></span>
        )}
        {r >= 2 && (
          <span class="fa fa-star-o checked-reviews3" aria-hidden="true"></span>
        )}
        {r >= 3 && (
          <span class="fa fa-star-o checked-reviews3" aria-hidden="true"></span>
        )}
        {r >= 4 && (
          <span class="fa fa-star-o checked-reviews3" aria-hidden="true"></span>
        )}
        {r >= 5 && (
          <span class="fa fa-star-o checked-reviews3" aria-hidden="true"></span>
        )}

        <div className="total-stars">
          <span class="fa fa-star checked-reviews">
            <span className="padding-5">{rating}</span>
          </span>
        </div>

        <div className="total-stars-badge">
          <span class="fa fa-star checked-reviews4">
            <span className="padding-5">{rating}</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default Priority;


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