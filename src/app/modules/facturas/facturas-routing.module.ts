import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturasComponent } from './facturas.component';
import { FacturasFormComponent } from './facturas-form/facturas-form.component';
import { FacturasViewComponent } from './facturas-view/facturas-view.component';

const routes: Routes = [
  {path: '', component: FacturasComponent},
  {path: 'new', component: FacturasFormComponent},
  {path: ':id', component: FacturasFormComponent},
  {path: 'view/:id', component: FacturasViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturasRoutingModule { }

