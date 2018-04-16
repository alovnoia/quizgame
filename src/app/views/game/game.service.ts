import { Injectable } from '@angular/core';
import {Globals} from '../../app.constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {Challenge} from './challenge-model';
import {of} from 'rxjs/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Game} from './game-model';

@Injectable()
export class GameService {

  private challengeUrl: string;
  private gameUrl: string;
  LOG_TAG: string = 'challengeService';
  // game data
  private gameData = new BehaviorSubject<any>({});
  public currentGameData = this.gameData.asObservable();
  // game result
  private gameResult = new BehaviorSubject<any>({});
  public sentResult = this.gameResult.asObservable();

  constructor(private http: HttpClient, private globals: Globals) {
    this.challengeUrl = this.globals.SERVER + this.globals.CHALLENGE;
    this.gameUrl = this.globals.SERVER + this.globals.GAME;
  }

  changeGameData(data: object) {
    this.gameData.next(data);
  }

  setGameResult(result: object) {
    this.gameResult.next(result);
  }

  findGame(obj: object): Observable<Game> {
    return this.http.post<Game>(this.gameUrl + 'find', obj, this.globals.httpOptions)
      .pipe(
        tap(() => console.log(this.LOG_TAG + ` found a game`)),
        catchError(this.handleError<Game>('findGame'))
      );
  }

  createGame(obj: object): Observable<Game> {
    return this.http.post<Game>(this.gameUrl, obj, this.globals.httpOptions)
      .pipe(
        tap(() => console.log(this.LOG_TAG + ` added a game`)),
        catchError(this.handleError<Game>('addGame'))
      );
  }

  /**
   * create a challenge to db
   * @param {Challenge} obj
   * @returns {Observable<Challenge>}
   */
  createChallenge(obj: object): Observable<Challenge> {
    return this.http.post<Challenge>(this.challengeUrl, obj, this.globals.httpOptions)
      .pipe(
        tap(() => console.log(this.LOG_TAG + ` added a challenge`)),
        catchError(this.handleError<Challenge>('addChallenge'))
      );
  }

  updateChallenge(obj: any): Observable<any> {
    return this.http.put(this.challengeUrl + obj._id, obj, this.globals.httpOptions)
      .pipe(
        tap(q => console.log(this.LOG_TAG + ` updated challenge id=${obj._id}`)),
        catchError(this.handleError<any>('updateChallenge'))
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
