export type RowData = {
  date: string | null,
  mounth: number,
  factory_id: number,
  product1: number,
  product2: number
}[] | null;

export type YearData = {
  factory1: number,
  factory2: number,
  f1p1: number,
  f1p2:number,
  f2p1: number, 
  f2p2: number,
  [char: string]: any
}[];
