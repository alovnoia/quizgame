import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {Globals} from '../../app.constants';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import {Question} from '../question/question-model';
import {Package} from './package-model';

@Injectable()
export class PackageService {

  private packageUrl: string;
  LOG_TAG: string = 'packageService';

  constructor(private http: HttpClient, private globals: Globals) {
    this.packageUrl = globals.SERVER + globals.PACKAGE;
  }

  /**
   * get package from db base on search input
   * @param {Object} queryObj
   * @returns {Observable<Package[]>}
   */
  getPackages(queryObj: Object): Observable<Package[]> {
    return this.http.post<Package[]>(this.packageUrl + 'search', queryObj, this.globals.httpOptions)
      .pipe(
        tap(p => console.log(this.LOG_TAG + ` fetched package `, p)),
        catchError(this.handleError('getPackages', []))
      );
  }

  /**
   * check question code on db
   * @param {string} code
   * @returns {Observable<any>}
   */
  checkCode(code: string): Observable<any> {
    return this.http.post<any>(this.packageUrl + 'check-code', {code: code}, this.globals.httpOptions)
      .pipe(
        tap(() => console.log(this.LOG_TAG + ` check package code`)),
        catchError(this.handleError<any>('checkCode'))
      );
  }

  /**
   * check question code on db
   * @param {string} code
   * @returns {Observable<any>}
   */
  generateQuestion(obj: any): Observable<any> {
    return this.http.post<any>(this.packageUrl + 'generate-questions', obj, this.globals.httpOptions)
      .pipe(
        tap(() => console.log(this.LOG_TAG + ` generate question`)),
        catchError(this.handleError<any>('generateQuestion'))
      );
  }

  /**
   * add question to db
   * @param {Question} questionObj
   * @returns {Observable<Question>}
   */
  addPackage(packageObj: Package): Observable<Package> {
    return this.http.post<Package>(this.packageUrl, packageObj, this.globals.httpOptions)
      .pipe(
        tap(() => console.log(this.LOG_TAG + ` added a package`)),
        catchError(this.handleError<Package>('addPackage'))
      );
  }

  /**
   * remove package from db
   * @param {string} idDelete
   * @returns {Observable<Package>}
   */
  deletePackage(idDelete: string): Observable<Package> {
    return this.http.delete<Package>(this.packageUrl + idDelete, this.globals.httpOptions)
      .pipe(
        tap(q => console.log(this.LOG_TAG + ` deleted Package id=${idDelete}`)),
        catchError(this.handleError<Package>('deletePackage'))
      );
    //console.log(this.topics);
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
