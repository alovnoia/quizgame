import { Component, OnInit } from '@angular/core';
import {Question} from './question-model';
import {QuestionService} from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  question: Question[];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    console.log('OnInit');
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService.getQuestions().subscribe(questions => this.question = questions);
    console.log(this.question);
  }

}
