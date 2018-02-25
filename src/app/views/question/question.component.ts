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
  // hide search view
  isHidden: boolean;
  // hide search content
  isVisuallyHidden: boolean;
  // show search content
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
    //console.log(this.topics);
  }

  /**
   * get topic from db via service
   */
  getTopics(): void {
    console.log(this.LOG_TAG + ' getTopics');
    this.topicService.getTopics().subscribe( topics => {
      for (let i = topics.length - 1; i >= 0; i--) {
        this.topics.push(new Topic(topics[i]._id, topics[i].name, topics[i].desc, topics[i].status));
      }
    });
  }

  /**
   * click event of search area
   * @param event
   */
  onClickAdvanceSearch(event): void {
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
      this.isHidden = true;
      setTimeout( () =>  {
        this.isVisuallyHidden = true;
      }, 150);
    }
  }

  onSubmitSearch(e): void {
    e.preventDefault();
    //console.log(event.target[4].value);
    let inputLevel = e.target[0].value;
    let inputTopic = e.target[1].value;
    let inputType = e.target[2].value;
    let inputQuestionId = e.target[3].value.trim();
    let inputAnswer = e.target[4].value.trim();
    let inputContent = e.target[5].value.trim();
    let checkFormValid = this.checkFormSearchValid(inputLevel, inputTopic, inputType, inputQuestionId, inputAnswer, inputContent);

    let queryObj = {
      "level": inputLevel,
      "topic": inputTopic,
      "type": inputType,
      "id": inputQuestionId,
      "answer": inputAnswer,
      "content": inputContent,
    };

    if (checkFormValid) {
      this.questionService.getQuestions(queryObj).subscribe(question => {
        this.questions = question;
      });
    } else {
      alert('Nhập thông tin để search');
    }
  }

  checkFormSearchValid(inputLevel, inputTopic, inputType, inputQuestionId, inputAnswer, inputContent): boolean {
    let inputIsNotNull = false;
    for (let i = 0; i <= arguments.length; i++) {
      if (arguments[i] && arguments[i] !== 'none') {
        inputIsNotNull = true;
        break;
      }
    }
    return inputIsNotNull;
  }

}
