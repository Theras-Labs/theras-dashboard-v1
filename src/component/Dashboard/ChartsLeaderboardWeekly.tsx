import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Week A",
    winner: 4000,
    you: 2400,
    amt: 2400,
  },
  {
    name: "Week B",
    winner: 3000,
    you: 1398,
    amt: 2210,
  },
  {
    name: "Week C",
    winner: 2000,
    you: 9800,
    amt: 2290,
  },
  {
    name: "Week D",
    winner: 2780,
    you: 3908,
    amt: 2000,
  },
  {
    name: "Week E",
    winner: 1890,
    you: 4800,
    amt: 2181,
  },
  {
    name: "Week F",
    winner: 2390,
    you: 3800,
    amt: 2500,
  },
  {
    name: "Week G",
    winner: 3490,
    you: 4300,
    amt: 2100,
  },
];

export default class ChartsLeadeboardWeekly extends PureComponent {
  render() {
    return (
      <div>
        <div className="text-xl text-center">Session weekly</div>
        <br />
        <div className="h-[400px] bg-gray-800 p-4 rounded-md">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="you" stackId="a" fill="#8884d8" />
              <Bar dataKey="winner" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
