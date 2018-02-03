import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from './login.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin(e): void {
    e.preventDefault();
    let adminObj = {username: e.target[0].value, password: e.target[1].value};
    this.loginService.login(adminObj).subscribe(data => {
      console.log(data);
      if (data.count === 1) {
        this.loginService.setUserLoggedIn();
        this.router.navigateByUrl('dashboard');
      }
    });
  }
}
