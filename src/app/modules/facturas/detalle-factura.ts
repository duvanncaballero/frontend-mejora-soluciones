export class DetalleFactura {
  articulo: string;
  cantidad: number;
  impuesto: number;
  valor: number;
  total: number;

  constructor(articulo: string, cantidad: number, impuesto: number, valor: number, total: number)
  {    
    this.articulo = articulo;
    this.cantidad = cantidad;
    this.impuesto = impuesto;
    this.valor = valor;
    this.total = total;
  }
}
