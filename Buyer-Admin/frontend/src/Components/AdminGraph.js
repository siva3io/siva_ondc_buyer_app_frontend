import "./SellersPieChart.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "09 Jan",
    uv: 4000,
    pv: 2400,
    uo: 3000,
    amt: 2400,
  },
  {
    name: "15",
    uv: 3000,
    uo: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "20",
    uv: 2000,
    pv: 9800,
    uo: 3000,
    amt: 2290,
  },
  {
    name: "25",
    uv: 2780,
    pv: 3908,
    uo: 3000,
    amt: 2000,
  },
  {
    name: "01 Feb",
    uv: 1890,
    pv: 4800,
    uo: 3000,
    amt: 2181,
  },
  {
    name: "14",
    uv: 2390,
    pv: 3800,
    uo: 3000,
    amt: 2500,
  },
];

export default function AdminGraph() {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="1 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" barSize={27} stackId="a" fill="#FD7789" />
        <Bar dataKey="uv" stackId="a" fill="#A35599" />
        <Bar dataKey="uo" stackId="a" radius={[10, 10, 0, 0]} fill=" #72AB3A" />
      </BarChart>
    </ResponsiveContainer>
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
