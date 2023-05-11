import { MOUNTHS, factories } from '../../constants/constants';

export const serializeChartData = (data: { date: string | undefined }[], setData: CallableFunction) => {
  if(data){
    const dataWithMounth = data.map((item) => {
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
    console.log(dataWithMounth);
    
    const initYearData = MOUNTHS.map(() => {
      return {factory1: 0, factory2: 0, f1p1: 0, f1p2: 0, f2p1: 0, f2p2: 0,};
    })
    const yearData = dataWithMounth.reduce((yearArray: Array<any>, item: any) => {
      const mounthIndex = Number(item.mounth)-1;
      yearArray[mounthIndex] = yearArray[mounthIndex] || {};
      yearArray[mounthIndex]['mounth'] = item['mounth'];
      yearArray[mounthIndex]['mounthName'] = MOUNTHS[item['mounth']-1];

      factories.forEach((factory) => {
        yearArray[mounthIndex][factory.name] += (factory.id === item.factory_id ? Math.round(item['product1']/1000) : 0);
        yearArray[mounthIndex][factory.name] += (factory.id === item.factory_id ? Math.round(item['product2']/1000) : 0);
        yearArray[mounthIndex][factory.product1Key] += (factory.id === item.factory_id ? Math.round(item['product1']/1000) : 0);
        yearArray[mounthIndex][factory.product2Key] += (factory.id === item.factory_id ? Math.round(item['product2']/1000) : 0);
      })
      return yearArray;
    }, initYearData);

    setData(yearData);
  }
}
