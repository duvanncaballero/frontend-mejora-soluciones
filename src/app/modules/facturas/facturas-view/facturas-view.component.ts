import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../services/factura.service';
import { ActivatedRoute, Router} from "@angular/router";
import { DetalleFactura } from '../detalle-factura';
import { Factura } from '../factura';

@Component({
  selector: 'app-facturas-form',
  templateUrl: './facturas-view.component.html',
  styleUrls: ['./facturas-view.component.scss']
})
export class FacturasViewComponent implements OnInit {
  
  id: number;
  loading: boolean = false;
  factura :any = [];

  constructor(
    private facturaService: FacturaService,
    private activeRoute: ActivatedRoute
  ) 
  {
    this.activeRoute.params.subscribe(params => {
      if (params.id !== undefined && params.id !== null) {
        this.id = params.id;
      }
    });
  }

  ngOnInit(): void {
    this.load();
  }

  async load(): Promise<void> {
    const facturaDetalle = await this.facturaService.getByID(this.id);
    this.factura = {
      nitEmisor: facturaDetalle.nit_emisor,
      emisor: facturaDetalle.emisor,
      nitCliente: facturaDetalle.nit_cliente,
      cliente: facturaDetalle.cliente,
      fecha: facturaDetalle.fecha,
      hora: facturaDetalle.hora,
      consecutivo: facturaDetalle.consecutivo,
      prefijo: facturaDetalle.prefijo,
      total: facturaDetalle.total,
      detalle: facturaDetalle.detalle
    };
  }

}
