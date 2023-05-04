import {
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

function DetailPage() {
  const data = [
    {
      "name": "Product 1",
      "value": 400
    },
    {
      "name": "Product 2",
      "value": 300
    },
  ]
  
  const colors = ["#8884d8", "#82ca9d"];

    return (
      <PieChart width={730} height={250}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]}/>
            ))
          }
        </Pie>
        <Legend />
      </PieChart>
    )
}

export default DetailPage