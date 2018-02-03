import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Topic } from './topic-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../../app.constants';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class TopicService {

  private topicsUrl: string;

  topics = [
    { id: '1', name: 'Du lịch', desc: 'Các từ vựng về du lịch', status: true },
    { id: '2', name: 'Công nghệ', desc: 'Các từ vựng về công nghệ', status: true },
    { id: '3', name: 'Lịch sử', desc: 'Kiến thức lịch sử', status: false },
    { id: '4', name: 'Giao tiếp', desc: 'Các câu giao tiếp thường gặp', status: false },
    { id: '5', name: 'Khoa học', desc: 'Các thuật ngữ khoa học', status: true }
  ]

  constructor(private http: HttpClient, private globals: Globals) {
    this.topicsUrl = globals.SERVER + globals.TOPIC;
  }

  getTopics(): Observable<Topic[]> {
    //return of (this.topics);
    return this.http.get<Topic[]>(this.topicsUrl)
      .pipe(
        tap(topics => console.log(`fetched topics`)),
        catchError(this.handleError('getTopics', []))
      );
  }

  deleteTopic(idDelete: string): Observable<Topic> {
    return this.http.delete<Topic>(this.topicsUrl + idDelete, this.globals.httpOptions).pipe(
      tap(_ => console.log(`deleted topic id=${idDelete}`)),
      catchError(this.handleError<Topic>('deleteTopic'))
    );
    //console.log(this.topics);
  }

  shiftTopic(): void {
    this.topics.shift();
  }

  addTopic(topicObj: Topic): Observable<Topic> {
    //this.topics.unshift({id: '100', name: name, desc: desc, status: status});
    return this.http.post<Topic>(this.topicsUrl, topicObj, this.globals.httpOptions).pipe(
      tap(() => console.log(`added a topic`)),
      catchError(this.handleError<Topic>('addTopic'))
    );
  }

  editTopic(topicObj: Topic): Observable<any> {
    console.log(topicObj);
    return this.http.put(this.topicsUrl + topicObj._id, topicObj, this.globals.httpOptions).pipe(
      tap(_ => console.log(`updated topic id=${topicObj._id}`)),
      catchError(this.handleError<any>('updateTopic'))
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
