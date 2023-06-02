import React, { PureComponent } from "react";
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
    date: "2000-01",
    winner: 4000,
    you: 2400,
    amt: 2400,
  },
  {
    date: "2000-02",
    winner: 3000,
    you: 1398,
    amt: 2210,
  },
  {
    date: "2000-03",
    winner: 2000,
    you: 9800,
    amt: 2290,
  },
  {
    date: "2000-04",
    winner: 2780,
    you: 3908,
    amt: 2000,
  },
  {
    date: "2000-05",
    winner: 1890,
    you: 4800,
    amt: 2181,
  },
  {
    date: "2000-06",
    winner: 2390,
    you: 3800,
    amt: 2500,
  },
  {
    date: "2000-07",
    winner: 3490,
    you: 4300,
    amt: 2100,
  },
  {
    date: "2000-08",
    winner: 4000,
    you: 2400,
    amt: 2400,
  },
  {
    date: "2000-09",
    winner: 3000,
    you: 1398,
    amt: 2210,
  },
  {
    date: "2000-10",
    winner: 2000,
    you: 9800,
    amt: 2290,
  },
  {
    date: "2000-11",
    winner: 2780,
    you: 3908,
    amt: 2000,
  },
  {
    date: "2000-12",
    winner: 1890,
    you: 4800,
    amt: 2181,
  },
];

const monthTickFormatter = (tick) => {
  const date = new Date(tick);

  return date.getMonth() + 1;
};

const renderQuarterTick = (tickProps) => {
  const { x, y, payload } = tickProps;
  const { value, offset } = payload;
  const date = new Date(value);
  const month = date.getMonth();
  const quarterNo = Math.floor(month / 3) + 1;
  const isMidMonth = month % 3 === 1;

  if (month % 3 === 1) {
    return <text x={x} y={y - 4} textAnchor="middle">{`Q${quarterNo}`}</text>;
  }

  const isLast = month === 11;

  if (month % 3 === 0 || isLast) {
    const pathX = Math.floor(isLast ? x + offset : x - offset) + 0.5;

    return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />;
  }
  return null;
};
export default class ChartsLeaderboard extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/bar-chart-with-double-xaxis-dfug7";

  render() {
    return (
      <div>
        <div className="text-xl text-center">Session winner monthly</div>
        <br />
        <div className="h-[400px] bg-gray-800 p-4 rounded-md">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
              <XAxis dataKey="date" tickFormatter={monthTickFormatter} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                interval={0}
                tick={renderQuarterTick}
                height={1}
                scale="band"
                xAxisId="quarter"
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="you" fill="#8884d8" />
              <Bar dataKey="winner" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
