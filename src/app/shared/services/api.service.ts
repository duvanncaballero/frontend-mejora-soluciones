import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { TokenService } from 'src/app/modules/login/services/token.service';

@Injectable({ providedIn: 'root' })
export class ApiService {

  
  constructor(private http: HttpClient,
    private token: TokenService) {
  }

  async get(path: string): Promise<any> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token.get()); 

    return await this.http.get<any>(path, { headers })
      .toPromise()
      .then(resp => {
        return resp;
      })
      .catch((error: any) => {
        return error;
      });
  }

  async post(path: string, params: object): Promise<any> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token.get()); 

    return await this.http.post(path, params, { headers })
      .toPromise()
      .then(resp => {
        return resp;
      })
      .catch((error: any) => {
        return error;
      });
  }

  async put(path: string, params: object): Promise<any> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token.get()); 

    return await this.http.put(path, params, { headers })
      .toPromise()
      .then(resp => {
        return resp;
      })
      .catch((error: any) => {
        return error;
      });
  }

  async delete(path: string): Promise<any> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token.get()); 

    return await this.http.delete(path, { headers })
      .toPromise()
      .then(resp => {
        return resp;
      })
      .catch((error: any) => {
        return error;
      });
  }

}
