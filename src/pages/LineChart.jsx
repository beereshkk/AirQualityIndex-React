import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LineChartView = ({ data }) => {
  return (
    <LineChart
      width={400}
      height={200}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="max" stroke="#8884d8" />
      <Line type="monotone" dataKey="min" stroke="#82ca9d" />
      <Line type="monotone" dataKey="avg" stroke="#ffc658" />
      <Legend />
    </LineChart>
  );
};

export default LineChartView;
