import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./screens/Home";
export default function url_routes() {
  if (!localStorage.getItem("token") && location.hostname === "localhost") {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MjIsIlVzZXJuYW1lIjoiYmFwX2FkbWluQGV1bmltYXJ0LmNvbSIsImFjY2Vzc190ZW1wbGF0ZV9pZCI6MTIsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY3NDQ3NDg4MCwiZmlyc3RfbmFtZSI6IkJBUCIsImxhc3RfbmFtZSI6IkFkbWluIiwicm9sZV9pZCI6bnVsbCwidXNlcl90eXBlcyI6W3siaWQiOjU2NywibmFtZSI6IkJBUF9BRE1JTiJ9XX0.AoPlFYv8Sz3Zm5jmMme3QF6tBO_usX8etOpEE1sCvqA"
    );
  }
  return (
    <StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route export path="/buyer_admin" element={<Home />} />
          </Routes>
        </Router>
      </Provider>
    </StrictMode>
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
