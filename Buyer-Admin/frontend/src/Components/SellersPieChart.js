import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import CircleIcon from "@mui/icons-material/Circle";
import "./SellersPieChart.css";

const renderActiveShape = props => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;
  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="dashboard_pie_value"
      >
        {payload.value}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius - 1}
        outerRadius={outerRadius + 2}
        fill={fill}
      />
    </g>
  );
};

export default class DoublePieChart extends PureComponent {
  data = [
    { name: "Achieved", value: this.props.achieved },
    { name: "To be achieved", value: 100 - this.props.achieved },
  ];
  COLORS = [this.props.achieved_color, this.props.unachieved_color];
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <div>
        <div className="bap_dashboard_goals_container">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                data={this.data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={this.onPieEnter}
              >
                {this.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={this.COLORS[index % this.COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div>
            {/* <div className="dashboard_goals_data">{this.props.tag}</div> */}
            <div className="bap_dashboard_goals_tags_container">
              <CircleIcon
                fontSize="smallest"
                className="bap_icon_dashboard_goals_icon1"
              />
              <div className="bap_dashboard_goals_tags">
                Active Users {"  -  "}
                {this.props.achieved}%
              </div>
            </div>
            <div className="bap_dashboard_goals_tags_container dashboard_goals_icon2">
              <CircleIcon
                className="bap_icon_dashboard_goals_icon2"
                fontSize="smallest"
              />
              <div className="bap_dashboard_goals_tags">
                Inactive Users {"  -  "}
                {100 - this.props.achieved}%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
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
