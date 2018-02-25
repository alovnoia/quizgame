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
  LOG_TAG: string = 'TopicService';

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

  /**
   * get topics from db
   * @returns {Observable<Topic[]>}
   */
  getTopics(): Observable<Topic[]> {
    //return of (this.topics);
    return this.http.get<Topic[]>(this.topicsUrl)
      .pipe(
        tap(topics => console.log(this.LOG_TAG + ` fetched topics `, topics)),
        catchError(this.handleError('getTopics', []))
      );
  }

  /**
   * delete topic from db
   * @param {string} idDelete id of topic will delete
   * @returns {Observable<Topic>}
   */
  deleteTopic(idDelete: string): Observable<Topic> {
    return this.http.delete<Topic>(this.topicsUrl + idDelete, this.globals.httpOptions)
      .pipe(
        tap(_=> console.log(this.LOG_TAG + ` deleted topic id=${idDelete}`)),
        catchError(this.handleError<Topic>('deleteTopic'))
    );
    //console.log(this.topics);
  }

  /**
   * remove 1 duplicate topic from local topic list after add
   */
  shiftTopic(): void {
    this.topics.shift();
  }

  /**
   * add a topic to db
   * @param {Topic} topicObj data of new topic
   * @returns {Observable<Topic>}
   */
  addTopic(topicObj: Topic): Observable<Topic> {
    //this.topics.unshift({id: '100', name: name, desc: desc, status: status});
    return this.http.post<Topic>(this.topicsUrl, topicObj, this.globals.httpOptions)
      .pipe(
        tap(() => console.log(this.LOG_TAG + ` added a topic`)),
        catchError(this.handleError<Topic>('addTopic'))
    );
  }

  /**
   * edit a topic on db
   * @param {Topic} topicObj new data of modify topic
   * @returns {Observable<any>}
   */
  editTopic(topicObj: Topic): Observable<any> {
    return this.http.put(this.topicsUrl + topicObj._id, topicObj, this.globals.httpOptions)
      .pipe(
        tap(_ => console.log(this.LOG_TAG + ` updated topic id=${topicObj._id}`)),
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
