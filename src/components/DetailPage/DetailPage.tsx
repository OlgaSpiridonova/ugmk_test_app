import { useState, useEffect, useContext } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useParams } from 'react-router-dom';

import { MOUNTHS, COLORS } from '../../constants/constants';
import { RowDataContext } from "../../store/context";
import {
  product1,
  product2,
  detailTitle,
  detailTitleFor,
} from "../../locale/ru.json";

import { serializeDetailData } from './serializeDetailData'

function DetailPage() {
  const { factory_id: factoryId, mounth } = useParams();
  const rowData: any = useContext(RowDataContext);
  const [data, setData] = useState([]);
  const mounthIndex = Number(mounth)-1;

  useEffect(() => serializeDetailData(rowData, setData, mounth, factoryId), [rowData]);

  return (
    <>
      <h1>{`${detailTitle}${factoryId === "1" ? "А" : "Б"}${detailTitleFor}${MOUNTHS[mounthIndex]}`}</h1>
      <PieChart width={1000} height={500}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={150} label>
          {
            <>
              <Cell key={'product1'} name={product1} fill={COLORS[0]}/>
              <Cell key={'product2'} name={product2} fill={COLORS[1]}/>
            </>
          }
        </Pie>
        <Legend />
      </PieChart>
    </>
  )
}

export default DetailPage
