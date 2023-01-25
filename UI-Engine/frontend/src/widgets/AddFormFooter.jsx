import * as React from 'react';
import "./ViewBox.css"; 

export default function AddFormFooter({ header, subtotal, tax, shippingcharges, handelSelectonChange, handelInputChange, total, vender_credits, Final_Adjustment, Final_Enter_Amount }) {
    return (
        <>
        <div className="locationDetailsMain" style={{overflow:"hidden"}}>
        <div className="locationDetailForm">
            <div className="staticFormCard">
              <div className="staticFormCardTitle" style={{marginBottom:15}}>{header}</div> 
              <div class="payment-details-wrapper">
                <div class="left-details">
                    <div class="top-label"><label>Available Customer Credit </label>
                        <span class="price">{vender_credits??0}</span>
                    </div>
                    <div class="use-credit">
                    <label>Use Credit for Payment </label>
                    <span class="use-input">
                        <input name='rdbUseCredit' value="0" type="radio"/> Yes
                         <input name='rdbUseCredit' value="1" type="radio"/> No
                    </span>
                    </div>
                </div>
                <div class="right-details">
                    <div class="totail-box">
                        <div class="top-details">
                            <div class="sub-total">Sub-total <span class="price">{subtotal}</span></div>
                            <div class="sub-total">Tax <span class="price">{tax}</span></div>
                            <div class="sub-total">Shipping Charges <span class="price">{shippingcharges}</span></div>

                            <div class="right-form">
                                <select name='calulation_type' onChange={(e) => {
                                    handelSelectonChange("Final_Adjustment", e.target.value);
                                }}>
                                    <option value="plus">+</option>
                                    <option value="minus">-</option>
                                </select>

                                <input type="text" name='Final_Adjustment' value={Final_Adjustment} placeholder='Adjustment' onChange={(e) => {
                                    handelInputChange("Final_Adjustment", e.target.value);
                                }}></input>

                                <input type="text" name='Final_Enter_Amount' value={Final_Enter_Amount} placeholder='Enter Amount' onChange={(e) => {
                                    handelInputChange("Final_Enter_Amount", e.target.value);
                                }}></input>
                            </div>
                        </div>
                        <div class="total-footer">Total Payable: <span class="price">{total}</span></div>
                    </div>
                </div> 
             
             </div>
             
           </div>
        </div>
       </div>
      </>
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