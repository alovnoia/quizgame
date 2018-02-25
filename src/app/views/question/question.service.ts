import { Injectable } from '@angular/core';
import { Question } from './question-model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../../app.constants';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class QuestionService {

  private questionUrl: string;
  LOG_TAG: string = 'questionService';
  questions = [
    {
      id: '1',
      content: '1 con vịt xòe ra 2 cái _______',
      image: 'D:/',
      answers: [
        {content: 'cánh', correct: true},
        {content: 'đầu', correct: false},
        {content: 'mào', correct: false},
        {content: 'đuôi', correct: false}]
    },
    {
      id: '2',
      content: 'Đại học Thăng Long có bao nhiêu khoa?',
      image: 'Các từ vựng về du lịch',
      answers: [
        {content: '9', correct: false},
        {content: '10', correct: true},
        {content: '11', correct: false},
        {content: '12', correct: false}]
    },
    {
      id: '3',
      content: '1+12x(7-4+6)/5 = ?',
      image: 'Các từ vựng về du lịch',
      answers: [
        {content: '55', correct: true},
        {content: '66', correct: false},
        {content: '77', correct: false},
        {content: '88', correct: false}]
    },
    {
      id: '4',
      content: 'Việt Nam thuộc châu lục nào?',
      image: 'Các từ vựng về du lịch',
      answers: [
        {content: 'Châu Âu', correct: false},
        {content: 'Châu Phi', correct: false},
        {content: 'Châu Nam Cực', correct: false},
        {content: 'Châu Á', correct: true}]
    },
    {
      id: '5',
      content: 'Con bò có mấy chân?',
      image: 'Các từ vựng về du lịch',
      answers: [
        {content: '1', correct: false},
        {content: '2', correct: false},
        {content: '4', correct: true},
        {content: '5', correct: false}]
    },
    {
      id: '6',
      content: 'Biến số nào của Hà Nội?',
      image: 'Các từ vựng về du lịch',
      answers: [
        {content: '51', correct: false},
        {content: '99', correct: false},
        {content: '29', correct: true},
        {content: '44', correct: false}]
    },
    {
      id: '7',
      content: 'Iphone là sản phẩm của?',
      image: 'Các từ vựng về du lịch',
      answers: [
        {content: 'Apple', correct: true},
        {content: 'Google', correct: false},
        {content: 'BKAV', correct: false},
        {content: 'Vietlott', correct: false}]
    },
    {
      id: '8',
      content: '1 ngày có bao nhiêu giờ',
      image: 'Các từ vựng về du lịch',
      answers: [
        {content: '23', correct: false},
        {content: '22', correct: false},
        {content: '21', correct: false},
        {content: '24', correct: true}]
    },
    {
      id: '9',
      content: '1 năm có bao nhiêu tháng?',
      image: 'Các từ vựng về du lịch',
      answers: [
        {content: '11', correct: false},
        {content: '12', correct: true},
        {content: '13', correct: false},
        {content: '14', correct: false}]
    },
    {
      id: '10',
      content: '1 tuần có bao nhiêu ngày?',
      image: 'Các từ vựng về du lịch',
      answers: [
        {content: '2', correct: false},
        {content: '7', correct: true},
        {content: '5', correct: false},
        {content: '4', correct: false}]
    },
    {
      id: '11',
      content: 'Tháng nào có ít ngày nhất?',
      image: 'Các từ vựng về du lịch',
      answers: [
        {content: '1', correct: false},
        {content: '3', correct: false},
        {content: '12', correct: false},
        {content: '2', correct: true}]
    },
    {
      id: '12',
      content: 'Đâu là định dạng ảnh?',
      image: 'Các từ vựng về du lịch',
      answers: [
        {content: 'docx', correct: false},
        {content: 'apk', correct: false},
        {content: 'jpg', correct: true},
        {content: 'ipa', correct: false}]
    },
    {
      id: '13',
      content: 'Có bao nhiêu con giáp?',
      image: 'Các từ vựng về du lịch',
      answers: [
        {content: '12', correct: true},
        {content: '13', correct: false},
        {content: '14', correct: false},
        {content: '15', correct: false}]
    },
    {
      id: '14',
      content: '2018 là năm con gì?',
      image: 'Các từ vựng về du lịch',
      answers: [
        {content: 'Gà', correct: false},
        {content: 'Chó', correct: false},
        {content: 'Lợn', correct: false},
        {content: 'Mèo', correct: true}]
    },
  ]

  constructor(private http: HttpClient, private globals: Globals) {
    this.questionUrl = globals.SERVER + globals.QUESTION;
  }

  getQuestions(queryObj: Object): Observable<Question[]> {
    return this.http.post<Question[]>(this.questionUrl, queryObj, this.globals.httpOptions)
      .pipe(
        tap(questions => console.log(this.LOG_TAG + ` fetched questions `, questions)),
        catchError(this.handleError('getQuestions', []))
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
