import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import axios from 'axios'

function Chart() {

  const [state, setState] = useState();
  useEffect(() => {
    const apiUrl = 'http://localhost:3001/products';
    axios.get(apiUrl).then((resp) => {
      const allProducts = resp.data;
      const factory1 = allProducts.filter((item) => item.factory_id === 1);
      const arr = factory1.map((item) => {
        const date = item['date'];
        if(date){
          const dateArray = date.split('/');
          const mounth = dateArray[1];
          return {
            ...item,
            mounth: mounth,
          };
        }
      });
      console.log(arr);
      setState(factory1);
    });
  }, []);

  return (
    <BarChart
    width={1000}
    height={700}
    data={state}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
    >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="id" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="product1" fill="#8884d8" />
    </BarChart>
  )
}

export default Chart