import {Component, Inject} from '@angular/core';
import {Globals} from '../../app.constants';
import {Router} from '@angular/router';
import {LoginService} from '../../views/pages/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

  constructor (private router: Router, private globals: Globals, private loginService: LoginService) {}

  /**
   * event when logout
   */
  onLogout() {
    console.log('Logged out');
    this.loginService.deleteUserLoggedIn();
    this.router.navigateByUrl('pages/login');
  }
}
