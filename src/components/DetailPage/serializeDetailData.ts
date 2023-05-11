export const serializeDetailData = (data: { date: string | undefined }[], setData: CallableFunction, mounth: string | undefined, factoryId: string | undefined) => {
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

    const initMounthArray = [
      {name: "product1", value: 0},
      {name: "product2", value: 0}
    ];

    const filterData = dataWithMounth.filter((item: any) => item.mounth === mounth && item.factory_id === Number(factoryId));

    const mounthData = filterData.reduce((resArray: Array<any>, item: any) => {
      initMounthArray.forEach((product, index) => {
        resArray[index]['value'] += Math.round(item[product.name]/1000);
      })
      return resArray;
    }, initMounthArray);

    setData(mounthData);
  }
}
