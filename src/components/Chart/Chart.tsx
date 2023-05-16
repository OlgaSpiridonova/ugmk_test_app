import { useEffect, useState, useContext } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

import { BAR_COLORS } from '../../constants/constants';
import { RowDataContext } from "../../store/context";
import {
  filterTitle,
  allProducts,
  product1,
  product2,
  factory1,
  factory2,
} from "../../locale/ru.json";

import { serializeChartData } from './serializeChartData'
import { IRowData, IEvent } from './interface'

import './Chart.css'

const filterData = [
  {name: allProducts, value: "all"},
  {name: product1, value: "product1"},
  {name: product2, value: "product2"},
];

function Chart() {
  const navigate = useNavigate();
  const goToDetailPage = (id: number, mounth: number) => navigate(`details/${id}/${mounth}`);
  const rowData: IRowData | null = useContext(RowDataContext);
  const [data, setData] = useState();
  const filterValue = localStorage.getItem('filter') ? String(localStorage.getItem('filter')) : "all";
  const [filter, setFilter] = useState(filterValue);
  const handleSelect = (e: IEvent) => {
    setFilter(e.target.value);
    localStorage.setItem('filter', e.target.value);
  };

  useEffect(() => serializeChartData(rowData, setData), [rowData]);

  return (
    <div className="year-chart">
      <div className="filter">
        {filterTitle}
        <select onChange={handleSelect} defaultValue={filterValue}>
          {filterData.map((item) => <option key={item.value} value={item.value}>{item.name}</option>)}
        </select>
      </div>
      <BarChart
        width={1000}
        height={500}
        data={data}
      >
        <XAxis dataKey="mounthName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={filter === "product1" 
            ? "f1p1" 
            : filter === "product2" 
            ? "f1p2"
            : "factory1"
          }
          fill={BAR_COLORS[0]}
          name={factory1}
          onClick={(e) => goToDetailPage(1, e.mounth)}
        />
        <Bar
          dataKey={filter === "product1" 
            ? "f2p1" 
            : filter === "product2" 
            ? "f2p2"
            : "factory2"
          }
          fill={BAR_COLORS[1]}
          name={factory2}
          onClick={(e) => goToDetailPage(2, e.mounth)}
        />
      </BarChart>
    </div>
  )
}

export default Chart
