import {Component, Inject} from '@angular/core';
import {Globals} from '../../app.constants';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

  constructor (private router: Router, private globals: Globals,  @Inject(SESSION_STORAGE) private storage: WebStorageService) {}

  /**
   * event when logout
   */
  onLogout() {
    console.log('Logged out');
    this.storage.set(this.globals.KEY_LOGIN, false);
    this.router.navigateByUrl('pages/login');
  }
}
