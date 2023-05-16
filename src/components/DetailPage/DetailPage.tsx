import { useState, useEffect, useContext } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useParams } from 'react-router-dom';

import { MOUNTHS, PIE_COLORS } from '../../constants/constants';
import { RowDataContext } from "../../store/context";
import {
  product1,
  product2,
  detailTitle,
  detailTitleFor,
} from "../../locale/ru.json";

import { serializeDetailData } from './serializeDetailData'
import { IRowData } from './interface'

function DetailPage() {
  const { factory_id: factoryId, mounth } = useParams();
  const rowData: IRowData[] | null = useContext(RowDataContext);
  const [data, setData] = useState([]);
  const mounthIndex = Number(mounth)-1;

  useEffect(() => serializeDetailData(rowData, setData, Number(mounth), Number(factoryId)), [rowData]);

  return (
    <>
      <h1>{`${detailTitle}${factoryId === "1" ? "А" : "Б"}${detailTitleFor}${MOUNTHS[mounthIndex]}`}</h1>
      <PieChart width={1000} height={500}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={150} label>
          {
            <>
              <Cell key={'product1'} name={product1} fill={PIE_COLORS[0]}/>
              <Cell key={'product2'} name={product2} fill={PIE_COLORS[1]}/>
            </>
          }
        </Pie>
        <Legend />
      </PieChart>
    </>
  )
}

export default DetailPage
