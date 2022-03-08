import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private api: ApiService
  ) 
  {}

  async login(param: {}): Promise<any> {
    return await this.api.post(`${environment.apiBackend}/auth/login`, param);
  }
}
