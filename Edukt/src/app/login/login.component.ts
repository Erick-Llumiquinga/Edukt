import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { DataRx } from '../models/data-rx';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  dataLogin;

  constructor(
    private formBuilder: FormBuilder, 
    private services: LoginService,
    private router: Router
  ) { this._form() }

  ngOnInit(): void {
  }

  _form = () => {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z]*[A-Z]*[0-9.]*([a-z])*(@*[a-z.])*$')]],
      password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]*$')]]
    })
  }

  login = () => {
    if(!this.loginForm.invalid)
    {
      let data = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      }
      
      this.loginForm.reset();
      this.services.login(data)
      .subscribe((resp: DataRx) => {
        if(resp.ok)
        {
          console.log(resp.data);
          sessionStorage.setItem('token', resp.token);
          let data = {
            name: `${resp.data['name']} ${resp.data['lastname']}`,
            role: resp.data['idRole'],
            img: resp.data['img']
          };
          sessionStorage.setItem('data', JSON.stringify(data));
          return this.router.navigate(['/inicio'])
        }
        
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: error.error.msg,
          showConfirmButton: false,
          timer: 1500,
        })
        return console.log(error)
      });
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.code === 'Enter') {
      event.preventDefault();
      this.login();
    }
  }
}
