import { Component, OnInit, ViewChild } from '@angular/core';
import { Factura } from '../factura';
import { FacturaService } from '../services/factura.service';
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmDialogComponent,
  ConfirmDialogModel
} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {ToastService} from "../../../shared/services/toast.service";
import {MatTableDataSource} from "@angular/material/table";
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-facturas-list',
  templateUrl: './facturas-list.component.html',
  styleUrls: ['./facturas-list.component.scss']
})
export class FacturasListComponent implements OnInit {

  loading = false;
  //the source where we will get the data
  facturas =  new MatTableDataSource<Factura>();
  // columns we will show on the table
  displayedColumns = ['factura', 'fecha', 'emisor', 'cliente', 'total', 'opcion'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  constructor(private facturaService: FacturaService,
              private dialogConfirm: MatDialog,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.getAll();
    this.facturas.paginator = this.paginator;
    // this.facturas.sort = this.sort;
  }

  ngAfterViewInit() {
    this.facturas.sort = this.sort;
  }

  public doFilter = (value: string) => {
    this.facturas.filter = value.trim().toLocaleLowerCase();
  }
  async getAll(): Promise<void> {
    this.loading = true;
    this.facturas.data = await this.facturaService.getAll();
    this.loading = false;
  }

  async eliminar(factura: Factura): Promise<void> {

    const dialogData = new ConfirmDialogModel(
      'Eliminar Factura',
      `¿Está seguro(a) de eliminar la factrura: <b>${factura.prefijo}-${factura.consecutivo}</b>?`
    );
    const dialogRef = this.dialogConfirm.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        const response = await this.facturaService.delete(factura.id);
        if (response.success) {
          this.toastService.success('Factura eliminada con éxito!');
          this.getAll();
        }
      }
    });

  }
}
