import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Question} from './question-model';
import {QuestionService} from './question.service';
import {Topic} from '../topic/topic-model';
import {TopicService} from '../topic/topic.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  LOG_TAG: string = 'QuestionComponent';
  questions: Question[];
  topics: Topic[];
  isHidden: boolean;
  isVisuallyHidden: boolean;
  isShow: boolean;

  constructor(private questionService: QuestionService, private topicService: TopicService) {
    this.topics = [];
    this.isHidden = false;
    this.isVisuallyHidden = false;
    this.isShow = true;
  }

  ngOnInit() {
    console.log(this.LOG_TAG + ' OnInit');
    this.getTopics();
    console.log(this.topics);
    this.getQuestions();
  }

  /**
   * get topic from db via service
   */
  getTopics(): void {
    console.log(this.LOG_TAG + ' getTopics');
    this.topicService.getTopics().subscribe( topics => {
      for (let i = topics.length - 1; i >= 0; i--) {
        this.topics.push({
          _id: topics[i]._id,
          name: topics[i].name,
          desc: topics[i].desc,
          status: topics[i].status})
      }
    });
  }

  onClickAdvanceSearch(event) {
    console.log(this.LOG_TAG + ' onClickAdvanceSearch');
    if (this.isHidden) {
      event.target.innerText = 'Thu gọn';
      this.isVisuallyHidden = false;
      setTimeout( () =>  {
        this.isShow = true;
        this.isHidden = false;
      }, 50);
    } else {
      event.target.innerText = 'Mở rộng';
      this.isShow = false;
      //this.isVisuallyHidden = true;
      this.isHidden = true;
      setTimeout( () =>  {
        this.isVisuallyHidden = true;
      }, 150);
    }
  }

  getQuestions(): void {
    this.questionService.getQuestions().subscribe(questions => this.questions = questions);
    //console.log(this.questions);
  }

}
