import { tokenName } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() 
  {}

  handle(token: any){
    this.set(token);
  }

  set(token: any){
    localStorage.setItem('token_mejora_solcuiones', token)
  }

  get(){
    return localStorage.getItem('token_mejora_solcuiones');
  }
}
