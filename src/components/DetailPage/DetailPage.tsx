import {
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useParams } from 'react-router-dom';

import { MOUNTHS, COLORS } from '../constants';

function DetailPage() {
  const { factory_id, mounth } = useParams();
  const mounthIndex = Number(mounth)-1;

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

  return (
    <>
      <h3>{`Статистика по продукции фабрики ${factory_id} за ${MOUNTHS[mounthIndex]}`}</h3>
      <PieChart width={730} height={250}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]}/>
            ))
          }
        </Pie>
        <Legend />
      </PieChart>
    </>
  )
}

export default DetailPage