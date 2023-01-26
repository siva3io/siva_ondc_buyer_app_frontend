import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";

import Cart from "./screens/Cart";
import LogInScreen from "./screens/LogInScreen";
import Shop from "./screens/Products";
import PaymentPage from "./screens/PaymentPage";
import Navbar from "./screens/Navbar";
import Orders from "./screens/Orders";
import ProductView from "./screens/ProductView";
import CartPage from "./screens/CartPage";
import ReturnItem from "./screens/ReturnItem";
import Signin from "./components/Signin";

export default function url_routes() {
  // if (!localStorage.getItem("token") && location.hostname === "localhost") {
  //   localStorage.setItem(
  //     "token",
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MjYsIlVzZXJuYW1lIjoiIiwiYWNjZXNzX3RlbXBsYXRlX2lkIjoyLCJjb21wYW55X2lkIjo0LCJleHAiOjE2NzQ3MTQ5NjMsImZpcnN0X25hbWUiOiIiLCJsYXN0X25hbWUiOiIiLCJyb2xlX2lkIjoxLCJ1c2VyX3R5cGVzIjpbeyJpZCI6NjQsIm5hbWUiOiJCdXllciJ9XX0.AAWbPwLA2fxd5mWwudAbB5O-CjIarThGqIGkldATvQs"
  //   );
  // }
  return (
    <StrictMode>
      <Provider store={store}>
        <Router history={history}>
          <Navbar />
          <Switch>
          <Route exact path="/Signin" render={() => <Signin />} />
            <Route exact path="/storeFront" render={() => <LogInScreen />} />
            <Route exact path="/storeFront/cart" render={() => <Cart />} />
            <Route exact path="/storeFront/products" render={() => <Shop />} />
            <Route
              exact
              path="/storeFront/payments"
              render={() => <PaymentPage />}
            />
            <Route exact path="/storeFront/orders" render={() => <Orders />} />
            <Route
              exact
              path="/storeFront/ProductView/:id"
              render={props => <ProductView id={props.match.params.id} />}
            />
            <Route
              exact
              path="/storeFront/cartpage"
              render={() => <CartPage />}
            />
            <Route
              exact
              path="/storeFront/return/:id"
              render={props => <ReturnItem id={props.match.params.id} />}
            />
          </Switch>
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
