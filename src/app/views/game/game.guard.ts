import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {GameService} from './game.service';

@Injectable()
export class PlayGuard implements CanActivate {

  constructor(private gameService: GameService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.gameService.getGameData()) {
      this.router.navigateByUrl('game');
      return false;
    }
    return true;
  }
}

@Injectable()
export class ResultGuard implements CanActivate {

  constructor(private gameService: GameService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.gameService.getGameResult()) {
      this.router.navigateByUrl('game');
      return false;
    }
    return true;
  }
}
