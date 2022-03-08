import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import { Factura } from '../factura';

environment
@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(
    private api: ApiService
  )
  {}

  async getAll(): Promise<any> {

    return await this.api.get(`${environment.apiBackend}/factura/get-list`);
  }

  async getByID(id: number): Promise<any> {
    return await this.api.post(`${environment.apiBackend}/factura/show`, {factura: id});
  }

  async getResolucion(): Promise<any> {
    return await this.api.get(`${environment.apiBackend}/resolucion/get-list`);
  }

  async create(factura: Factura): Promise<any> {
    return await this.api.post(`${environment.apiBackend}/factura/create`, factura);
  }

  async update(factura: Factura): Promise<any> {
    return await this.api.put(`${environment.apiBackend}/factura/update`, factura);
  }

  async delete(id: number): Promise<any> {
    return await this.api.delete(`${environment.apiBackend}/factura/delete/${id}`);
  }
  
}
