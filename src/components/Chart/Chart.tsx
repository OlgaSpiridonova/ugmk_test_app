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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Chart.css'
import {
  API_URL,
  MOUNTHS,
  FILTER_ALL_PRODUCTS,
  FILTER_PRODUCT_1,
  FILTER_PRODUCT_2,
} from './constants';

function Chart() {

  const navigate = useNavigate();
  const [data, setData] = useState();
  const [filter, setFilter] = useState(FILTER_ALL_PRODUCTS);

  const handleSelect = (e) => setFilter(e.target.value);
  const goToDetailPage = (id, mounth) => navigate(`details/${id}/${mounth}`);

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      const dataWithMounth = response.data.map((item) => {
        const date = item['date'];
        if(date){
          const dateArray = date.split('/');
          const mounth = dateArray[1];
          return {
            ...item,
            mounth: mounth,
          };
        }
        return item;
      });

      const yearData = dataWithMounth.reduce((yearArray, item) => {
        const mounth = item['mounth'];
        yearArray[mounth] = yearArray[mounth] || [];
        yearArray[mounth]['factory1'] = yearArray[mounth]['factory1'] || 0;
        yearArray[mounth]['factory2'] = yearArray[mounth]['factory2'] || 0;
        yearArray[mounth]['f1p1'] = yearArray[mounth]['f1p1'] || 0;
        yearArray[mounth]['f1p2'] = yearArray[mounth]['f1p2'] || 0;
        yearArray[mounth]['f2p1'] = yearArray[mounth]['f2p1'] || 0;
        yearArray[mounth]['f2p2'] = yearArray[mounth]['f2p2'] || 0;
        yearArray[mounth]['mounth'] = MOUNTHS[item['mounth']-1];
        yearArray[mounth]['mounth_number'] = mounth;

        if(item.factory_id === 1){
          yearArray[mounth]['factory1'] += item['product1']/1000;
          yearArray[mounth]['factory1'] += item['product2']/1000;
          yearArray[mounth]['f1p1'] += item['product1']/1000;
          yearArray[mounth]['f1p2'] += item['product2']/1000;
        }
        if(item.factory_id === 2){
          yearArray[mounth]['factory2'] += item['product1']/1000;
          yearArray[mounth]['factory2'] += item['product2']/1000;
          yearArray[mounth]['f2p1'] += item['product1']/1000;
          yearArray[mounth]['f2p2'] += item['product2']/1000;
        }
        return yearArray;
      }, []);
      const result = yearData.slice(1)
      console.log(result);
      setData(result);
    });
  }, []);

  return (
    <>
      <div className="filter">
        Product type
        <select onChange={handleSelect}>
          <option>{FILTER_ALL_PRODUCTS}</option>
          <option>{FILTER_PRODUCT_1}</option>
          <option>{FILTER_PRODUCT_2}</option>
        </select>
      </div>
      <BarChart
        width={1000}
        height={700}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mounth" />
        <YAxis />
        <Tooltip />
        <Legend />
        {(filter === FILTER_ALL_PRODUCTS) && (
          <>
            <Bar dataKey="factory1" fill="#8884d8" onClick={(e) => goToDetailPage(1, e.mounth_number)} role="presentation" />
            <Bar dataKey="factory2" fill="#82ca9d" onClick={(e) => goToDetailPage(2, e.mounth_number)} role="presentation" />
          </>
        )}
        {(filter === FILTER_PRODUCT_1) && (
          <>
            <Bar dataKey="f1p1" fill="#8884d8" onClick={(e) => goToDetailPage(1, e.mounth_number)} />
            <Bar dataKey="f2p1" fill="#82ca9d" onClick={(e) => goToDetailPage(2, e.mounth_number)} />
          </>
        )}
        {(filter === FILTER_PRODUCT_2) && (
          <>
            <Bar dataKey="f1p2" fill="#8884d8" onClick={(e) => goToDetailPage(1, e.mounth_number)} />
            <Bar dataKey="f2p2" fill="#82ca9d" onClick={(e) => goToDetailPage(2, e.mounth_number)} />
          </>
        )}
      </BarChart>
    </>
  )
}

export default Chart