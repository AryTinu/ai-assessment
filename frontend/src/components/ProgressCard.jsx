import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import "../styles/Cards.css";

const data = [
  { score: 40 },
  { score: 60 },
  { score: 55 },
  { score: 80 },
  { score: 72 },
  { score: 90 },
];

const ProgressCard = () => {

  return (
    <div className="chart-card">

      <div className="chart-header">

        <h2>
          Performance Overview
        </h2>

        <p>
          Last 6 assessments
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={data}>

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#7C3AED"
            strokeWidth={4}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
};

export default ProgressCard;