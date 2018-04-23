import {Inject, Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../../app.constants';
import {of} from 'rxjs/observable/of';

@Injectable()
export class LoginService {

  private username : string;
  private loginAdminUrl: string;

  constructor(private http: HttpClient, private globals: Globals) {
    this.loginAdminUrl = globals.SERVER + globals.ADMIN_LOGIN;
  }

  setUserLoggedIn(): void {
    localStorage.setItem(this.globals.KEY_LOGIN, '1');
  }

  getUserLoggedIn(): string {
    return localStorage.getItem(this.globals.KEY_LOGIN);
  }

  deleteUserLoggedIn(): void {
    localStorage.removeItem(this.globals.KEY_LOGIN);
  }

  /**
   * check data from login form
   * @param adminObj
   * @returns {Observable<any>}
   */
  login(adminObj): Observable<any> {
    console.log('LoginService');
    return this.http.post<any>(this.loginAdminUrl, adminObj, this.globals.httpOptions).pipe(
      tap(() => console.log(`admin login`)),
      catchError(this.handleError<any>('login'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
