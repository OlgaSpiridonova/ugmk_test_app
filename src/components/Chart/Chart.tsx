import { useEffect, useState, useContext } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { useNavigate } from 'react-router-dom';

import { MOUNTHS, COLORS } from '../../constants/constants';
import { Context } from "../../App";
import {
  filterTitle,
  allProducts,
  product1,
  product2,
  factory1,
  factory2,
} from "../../locale/ru.json";

import './Chart.css'

function Chart() {
  const navigate = useNavigate();
  const handleSelect = (e: any) => setFilter(e.target.value);
  const goToDetailPage = (id: number, mounth: number) => navigate(`details/${id}/${mounth}`);
  const context: any = useContext(Context);
  const [data, setData] = useState();
  const [filter, setFilter] = useState(allProducts);
  const filterData = [
    allProducts,
    product1,
    product2,
  ];
  const factoriesData = [
    {name: "factory1", id: "1"},
    {name: "factory2", id: "2"},
  ];

  const prepareChartData = (data: any) => {
    if(data){
      const dataWithMounth = data.map((item: any) => {
        const { date } = item;
        if(date){
          const mounth = date.split('/')[1];
          return {
            ...item,
            mounth,
          };
        }
        return item;
      });

      const yearData = dataWithMounth.reduce((yearArray: Array<any>, item: any) => {
        const { mounth } = item;
        const mounthIndex = Number(mounth)-1;

        yearArray[mounthIndex] = yearArray[mounthIndex] || {};
        yearArray[mounthIndex]['factory1'] = yearArray[mounthIndex]['factory1'] || 0;
        yearArray[mounthIndex]['factory2'] = yearArray[mounthIndex]['factory2'] || 0;
        yearArray[mounthIndex]['f1p1'] = yearArray[mounthIndex]['f1p1'] || 0;
        yearArray[mounthIndex]['f1p2'] = yearArray[mounthIndex]['f1p2'] || 0;
        yearArray[mounthIndex]['f2p1'] = yearArray[mounthIndex]['f2p1'] || 0;
        yearArray[mounthIndex]['f2p2'] = yearArray[mounthIndex]['f2p2'] || 0;
        yearArray[mounthIndex]['mounth'] = item['mounth'];
        yearArray[mounthIndex]['mounthName'] = MOUNTHS[item['mounth']-1];

        if(item.factory_id === 1){
          yearArray[mounthIndex]['factory1'] += Math.round(item['product1']/1000);
          yearArray[mounthIndex]['factory1'] += Math.round(item['product2']/1000);
          yearArray[mounthIndex]['f1p1'] += Math.round(item['product1']/1000);
          yearArray[mounthIndex]['f1p2'] += Math.round(item['product2']/1000);
        }
        if(item.factory_id === 2){
          yearArray[mounthIndex]['factory2'] += Math.round(item['product1']/1000);
          yearArray[mounthIndex]['factory2'] += Math.round(item['product2']/1000);
          yearArray[mounthIndex]['f2p1'] += Math.round(item['product1']/1000);
          yearArray[mounthIndex]['f2p2'] += Math.round(item['product2']/1000);
        }
        
        return yearArray;
      }, [{factory1: 0, factory2: 0, f1p1: 0, f1p2: 0, f2p1: 0, f2p2: 0,}]);
      
      setData(yearData);
    }
  }

  useEffect(() => prepareChartData(context), [context]);

  return (
    <>
      <div className="filter">
        {filterTitle}
        <select onChange={handleSelect}>
          {filterData.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <BarChart
        width={1000}
        height={700}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mounthName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={filter === product1 
            ? "f1p1" 
            : filter === product2 
            ? "f1p2"
            : "factory1"
          }
          fill={COLORS[0]}
          name={factory1}
          onClick={(e) => goToDetailPage(1, e.mounth)}
        />
        <Bar
          dataKey={filter === product1 
            ? "f2p1" 
            : filter === product2 
            ? "f2p2"
            : "factory2"
          }
          fill={COLORS[1]}
          name={factory2}
          onClick={(e) => goToDetailPage(2, e.mounth)}
        />
      </BarChart>
    </>
  )
}

export default Chart