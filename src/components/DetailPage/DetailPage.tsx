import { useState, useEffect, useContext } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useParams } from 'react-router-dom';

import { MOUNTHS, COLORS } from '../constants';
import { Context } from "../../App";

function DetailPage() {
  const { factory_id, mounth } = useParams();
  const context = useContext(Context);
  const [data, setData] = useState([]);
  const mounthIndex = Number(mounth)-1;

  const testData = [
    {
      "name": "Product 1",
      "value": 400
    },
    {
      "name": "Product 2",
      "value": 300
    },
  ]

  useEffect(() => {
    if(context){
      const dataWithMounth = context.map((item) => {
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

      const filterData = dataWithMounth.filter((item) => item.mounth === mounth && item.factory_id === Number(factory_id));
      console.log(filterData);

      const mounthData = filterData.reduce((resArray, item) => {
        resArray['product1'] = resArray['product1'] || {};
        resArray['product2'] = resArray['product2'] || {};
        resArray['product1']['value'] = resArray['product1']['value'] || 0;
        resArray['product2']['value'] = resArray['product2']['value'] || 0;
        resArray['product1']['name'] = resArray['product1']['name'] || '';
        resArray['product2']['name'] = resArray['product2']['name'] || '';

        resArray['product1']['value'] += item['product1']/1000;
        resArray['product2']['value'] += item['product2']/1000;
        resArray['product1']['name'] = 'product1';
        resArray['product2']['name'] = 'product2';

        return resArray;
      }, []);
      console.log(mounthData);
      
      setData(mounthData);
    }
  }, [context]);


  return (
    <>
      <h3>{`Статистика по продукции фабрики ${factory_id} за ${MOUNTHS[mounthIndex]}`}</h3>
      <PieChart width={730} height={250}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
          {
            <>
              <Cell key={'cell-product1'} fill={COLORS[0]}/>
              <Cell key={'cell-product2'} fill={COLORS[1]}/>
            </>
          }
        </Pie>
        <Legend />
      </PieChart>
    </>
  )
}

export default DetailPage