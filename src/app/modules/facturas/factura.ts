export interface Factura {
  id: number;
  prefijo: string;
  consecutivo: number;
  fecha: Date;
  hora: Date;
  emisor: string;
  nit_emisor: number;
  cliente: string;
  nit_cliente: number;
  total: number;
}
