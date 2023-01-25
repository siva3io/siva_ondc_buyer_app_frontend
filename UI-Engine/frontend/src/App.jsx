import React from "react";
import ReactDOM from "react-dom"; 
import Mat_Alert from "./widgets/Mat_Alert";
import "./index.css";
// import BasicBreadcrumbs from './widgets/BasicBreadcrumbs'
 
const App = () => (
  
  <div className="container">
    <div>Name: ui-engine</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div> 
    {/* <BasicBreadcrumbs data={[
      { path: 'users', breadcrumb: 'home' },
      { path: 'users/:userId', breadcrumb: 'Dlivery Order'},
      { path: 'something-else', breadcrumb: 'S1012256' },
    ]} handleLinkClick={{}}/> */}
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));


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