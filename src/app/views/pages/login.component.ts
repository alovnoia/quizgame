import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from './login.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  // message when login failed
  public wrongInfo: string = null;

  constructor(private loginService: LoginService, private router: Router) {
    this.wrongInfo = null;
  }

  ngOnInit() {
    console.log('onInit LoginComponent');
    if (this.loginService.getUserLoggedIn()) {
      this.router.navigateByUrl('topic');
    }
  }

  /**
   * event when user login
   * @param e data of login form
   */
  onLogin(e): void {
    console.log('Logged in');
    e.preventDefault();
    if (e.target[0].value === '' || e.target[1].value === '') {
      console.log('Login failed, blank field');
      this.wrongInfo = 'Please input username and password to login.';
      return;
    }
    let adminObj = {username: e.target[0].value, password: Md5.hashStr(e.target[1].value)};
    this.loginService.login(adminObj).subscribe(data => {
      if (data.count === 1) {
        console.log('Login success');
        this.loginService.setUserLoggedIn();
        this.router.navigateByUrl('topic');
        this.wrongInfo = null;
      } else {
        console.log('Login failed, wrong info');
        this.wrongInfo = 'Wrong username or password!';
      }
    });
  }
}
