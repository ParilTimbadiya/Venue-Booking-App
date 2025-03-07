import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Chart = ({ data }) => {
  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pct" fill="#8884d8" />
    </BarChart>
  );
};

export default Chart;