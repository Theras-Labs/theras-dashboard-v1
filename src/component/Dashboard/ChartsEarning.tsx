import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  {
    name: "Month A",
    crypto: 4000,
    card: 2400,
    amt: 2400,
  },
  {
    name: "Month B",
    crypto: 3000,
    card: 1398,
    amt: 2210,
  },
  {
    name: "Month C",
    crypto: 2000,
    card: 9800,
    amt: 2290,
  },
  {
    name: "Month D",
    crypto: 2780,
    card: 3908,
    amt: 2000,
  },
  {
    name: "Month E",
    crypto: 1890,
    card: 4800,
    amt: 2181,
  },
  {
    name: "Month F",
    crypto: 2390,
    card: 3800,
    amt: 2500,
  },
  {
    name: "Month G",
    crypto: 3490,
    card: 4300,
    amt: 2100,
  },
];

export default class ChartsEarning extends PureComponent {
  render() {
    return (
      <div>
        <br />
        <div className="text-xl text-center">
          Crypto and Visa Earning Comparison
        </div>
        <br />
        <div className="h-[400px] bg-slate-800 p-4 rounded-md">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
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
              <Line
                type="monotone"
                dataKey="card"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="crypto" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export const ChartDaily = () => {
  return (
    <div>
      <br />
      <div className="text-xl text-center">Daily Earnings</div>
      <br />
      <div className="h-[400px] bg-slate-800 p-4 rounded-md">
        <ResponsiveContainer width="100%" height={"100%"}>
          <AreaChart
            width={500}
            height={200}
            data={data_2}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const data_2 = [
  {
    name: "Day A",
    crypto: 4000,
    total: 2400,
    amt: 2400,
  },
  {
    name: "Day B",
    crypto: 3000,
    total: 1398,
    amt: 2210,
  },
  {
    name: "Day C",
    crypto: 4723,
    total: 3574,
    amt: 2217,
  },
  {
    name: "Day D",
    crypto: 1567,
    total: 4567,
    amt: 2738,
  },
  {
    name: "Day E",
    crypto: 4254,
    total: 1934,
    amt: 3675,
  },
  {
    name: "Day F",
    crypto: 2356,
    total: 3211,
    amt: 2491,
  },
  {
    name: "Day G",
    crypto: 1453,
    total: 4968,
    amt: 4592,
  },
  {
    name: "Day H",
    crypto: 3879,
    total: 2543,
    amt: 3214,
  },
  {
    name: "Day I",
    crypto: 2976,
    total: 2389,
    amt: 2842,
  },
  {
    name: "Day J",
    crypto: 2039,
    total: 3590,
    amt: 3380,
  },
  {
    name: "Day K",
    crypto: 4256,
    total: 4649,
    amt: 3888,
  },
  {
    name: "Day L",
    crypto: 2980,
    total: 4091,
    amt: 3772,
  },
  {
    name: "Day M",
    crypto: 4579,
    total: 2483,
    amt: 4231,
  },
  {
    name: "Day N",
    crypto: 2843,
    total: 2901,
    amt: 3942,
  },
  {
    name: "Day O",
    crypto: 3748,
    total: 4863,
    amt: 4287,
  },
];
