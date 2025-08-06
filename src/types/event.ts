export interface Event {
  id: number;
  type: 'COMPRA' | 'VENDA';
  user: string;
  value: number;
  time: string;
  status: 'completed' | 'pending';
}
