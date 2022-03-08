import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ToastService} from "../../../shared/services/toast.service";
import { FacturaService } from '../services/factura.service';
import { ActivatedRoute, Router} from "@angular/router";
import { Helpers } from 'src/app/shared/helpers/helpers';
import { MatTableDataSource} from "@angular/material/table";
import { DetalleFactura } from '../detalle-factura';
import { Resolucion } from '../resolucion';
import { Factura } from '../factura';

@Component({
  selector: 'app-facturas-form',
  templateUrl: './facturas-form.component.html',
  styleUrls: ['./facturas-form.component.scss']
})
export class FacturasFormComponent implements OnInit {
  
  id: number;
  loading: boolean = false;
  facturaForm: FormGroup;
  detalleForm: FormGroup;
  helpers = new Helpers();
  detalle =  new MatTableDataSource<DetalleFactura>();
  displayedColumns = ['articulo', 'cantidad', 'impuesto', 'valorUnitario', 'total', 'opcion'];
  resolucion: Resolucion;
  factura: string;
  data :any = []

  constructor(private formBuilder: FormBuilder,
    private toastService: ToastService,
    private facturaService: FacturaService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) 
  {
    this.activeRoute.params.subscribe(params => {
      if (params.id !== undefined && params.id !== null) {
        this.id = params.id;
        this.load();
      }else{
        this.getResolucion();
      }
    });
  }

  ngOnInit(): void {
    this.facturaForm = this.formBuilder.group({
      emisor: [null, [Validators.required]],
      nitEmisor: [null, [Validators.required]],
      cliente: [null, [Validators.required]],
      nitCliente: [null, [Validators.required]],
    });

    this.detalleForm = this.formBuilder.group({
      producto: [null, [Validators.required]],
      impuesto: [null, [Validators.required]],
      valorUnitario: [null, [Validators.required]],
      cantidad: [null, [Validators.required]],
      total: [null, [Validators.required]],
    });
  }

  async getResolucion(): Promise<void> {
    this.resolucion = await this.facturaService.getResolucion();
    this.factura = this.resolucion.prefijo +' - '+this.resolucion.consecutivo;
  }

  async load(): Promise<void> {
    const facturaDetalle = await this.facturaService.getByID(this.id);

    this.factura = facturaDetalle.prefijo +' - '+facturaDetalle.consecutivo;
    this.facturaForm.patchValue({
      'nitEmisor': facturaDetalle.nit_emisor,
      'emisor': facturaDetalle.emisor,
      'nitCliente': facturaDetalle.nit_cliente,
      'cliente': facturaDetalle.cliente,
    });

    facturaDetalle.detalle.map((value: any)=> {
      this.detalle.data.push(new DetalleFactura(
        value.articulo,
        value.cantidad,
        value.valor_impuesto,
        value.valor_unitario,
        value.valor_total,
      ));
    })


    this.detalle.connect().next(this.detalle.data);
  }

  getParams(): Factura {
    return {
      ...this.facturaForm.value,
      id: this.id,
      detalle: this.detalle.data
    };
  }

  async submit(): Promise<void> {
    if (!this.facturaForm.valid) {
      this.toastService.warning('Hay errores en el formulario');
      return;
    }

    const factura = this.getParams();
    console.log(factura);
    let response;
    this.loading = true;
    if (!this.id) {
      response = await this.facturaService.create(factura);
    } else {
      response = await this.facturaService.update(factura);
    }

    this.loading = false;
    if (response.success) {
      this.toastService.success(response.message);
      this.route.navigate(['/facturas']);
    }else{
      this.toastService.warning('Hay errores en el formulario');
    }
  }

  async submitDetail(): Promise<void> {
    if (!this.detalleForm.valid) {
      this.toastService.warning('Hay errores en el formulario');
      return;
    }

    this.detalle.data.push(new DetalleFactura(
        this.detalleForm.value.producto,
        this.detalleForm.value.cantidad,
        this.detalleForm.value.impuesto,
        this.detalleForm.value.valorUnitario,
        this.detalleForm.value.total,
    ));

    this.detalleForm.reset();

    this.detalle.connect().next(this.detalle.data);
  }

  async eliminar(id: number): Promise<void> {
    this.detalle.data.splice(id, 1);
    this.detalle.connect().next(this.detalle.data);
  }

  totalProduct() {
    let cantidad = 0;
    let impuesto = 0;
    let valorUnitario = 0;

    cantidad = this.detalleForm.value.cantidad;
    impuesto = this.detalleForm.value.impuesto;
    valorUnitario = this.detalleForm.value.valorUnitario;

    if(cantidad>0 && valorUnitario>0)
    {
      this.detalleForm.patchValue({
        'total': ((valorUnitario+impuesto)*cantidad),  
      });
    }
  }
}
