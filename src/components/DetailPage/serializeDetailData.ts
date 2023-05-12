import { RowData, MounthData } from './interface'

export const serializeDetailData = (data: RowData, setData: CallableFunction, mounth: number | undefined, factoryId: string | undefined) => {
  if(data){
    const dataWithMounth = data.map((item) => {
      const { date } = item;
      if(date){
        const mounth = Number(date.split('/')[1]);
        return {
          ...item,
          mounth,
        };
      }
      return item;
    });

    const initMounthArray = [
      {name: "product1", value: 0},
      {name: "product2", value: 0}
    ];

    const filterData: RowData = dataWithMounth.filter((item) => item.mounth === mounth && item.factory_id === Number(factoryId));

    const mounthData = filterData.reduce((resArray: MounthData, item) => {
      initMounthArray.forEach((product, index) => {
        resArray[index]['value'] += Math.round(item[product.name]/1000);
      })
      return resArray;
    }, initMounthArray);

    setData(mounthData);
  }
}
