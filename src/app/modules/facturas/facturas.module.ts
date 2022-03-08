import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatListModule} from "@angular/material/list";
import {MatLineModule, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {SharedModule} from "../../shared/shared.module";
import {ComponentsModule} from "../../shared/components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxCurrencyModule} from "ngx-currency";
import {FacturasComponent } from './facturas.component';
import {FacturasFormComponent } from './facturas-form/facturas-form.component';
import {FacturasListComponent } from './facturas-list/facturas-list.component';
import {FacturasRoutingModule } from './facturas-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule } from '@angular/material/select';
import {FacturasViewComponent } from './facturas-view/facturas-view.component';

@NgModule({
  declarations: [
    FacturasComponent,
    FacturasFormComponent,
    FacturasListComponent,
    FacturasViewComponent,
  ],
  imports: [
    CommonModule,
    FacturasRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatListModule,
    MatLineModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxCurrencyModule,

    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatOptionModule,
  ]
})
export class FacturasModule {
}
