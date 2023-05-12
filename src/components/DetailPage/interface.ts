export type RowData = {
  date: string | null,
  mounth: number,
  factory_id: number,
  product1: number,
  product2: number, 
  [char: string]: any
}[] | null;

export type MounthData = {
  name: string,
  value: number
}[];
