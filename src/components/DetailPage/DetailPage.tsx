import { useState, useEffect, useContext } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useParams } from 'react-router-dom';

import { MOUNTHS, COLORS } from '../../constants/constants';
import { Context } from "../../App";
import {
  product1,
  product2,
  detailTitle,
  detailTitleFor,
} from "../../locale/ru.json";

function DetailPage() {
  const { factory_id: factoryId, mounth } = useParams();
  const context: any = useContext(Context);
  const [data, setData] = useState([]);
  const mounthIndex = Number(mounth)-1;

  const prepareDetailData = (data: any) => {
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

      const filterData = dataWithMounth.filter((item: any) => item.mounth === mounth && item.factory_id === Number(factoryId));

      const mounthData = filterData.reduce((resArray: Array<any>, item: any) => {
        resArray[0] = resArray[0] || {};
        resArray[1] = resArray[1] || {};
        resArray[0]['value'] = resArray[0]['value'] || 0;
        resArray[1]['value'] = resArray[1]['value'] || 0;

        resArray[0]['value'] += Math.round(item['product1']/1000);
        resArray[1]['value'] += Math.round(item['product2']/1000);

        return resArray;
      }, []);
      
      setData(mounthData);
    }
  }

  useEffect(() => prepareDetailData(context), [context]);

  return (
    <>
      <h1>{`${detailTitle}${factoryId === "1" ? "А" : "Б"}${detailTitleFor}${MOUNTHS[mounthIndex]}`}</h1>
      <PieChart width={1000} height={500}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={150} label>
          {
            <>
              <Cell key={'cell-product1'} name={product1} fill={COLORS[0]}/>
              <Cell key={'cell-product2'} name={product2} fill={COLORS[1]}/>
            </>
          }
        </Pie>
        <Legend />
      </PieChart>
    </>
  )
}

export default DetailPage