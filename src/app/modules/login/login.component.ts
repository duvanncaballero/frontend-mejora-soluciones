import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoginService } from './services/login.service';
import { TokenService } from './services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private api: LoginService,
    private token: TokenService,
    private router: Router
  ) 
  {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.loginForm.patchValue({
      'login': 'duvan.caballero@hotmail.com',
      'password': '12345678',
    });
  }

  async submit(): Promise<void> {
    if (!this.loginForm.valid) {
      this.toastService.warning('Hay errores en el formulario');
      return;
    }

    let response = await this.api.login({'email': this.loginForm.value.login, password: this.loginForm.value.password});
    if (!response.success)
    {
      this.toastService.warning('Crendenciales incorrectas');
      return;
    }
    
    this.token.handle(response.access_token);
    this.router.navigate(['/facturas']);
  }

}
