export interface IRowData {
  date: string | null,
  mounth: number,
  factory_id: number,
  product1: number,
  product2: number, 
  [char: string]: any,
}

export interface IMounthData {
  name: string,
  value: number,
}

export type Operation = (
  data: IRowData[] | null,
  setData: CallableFunction,
  mounth: number | undefined,
  factoryId: number | undefined,
) => void;
