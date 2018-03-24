import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Question} from './question-model';
import {QuestionService} from './question.service';
import {Topic} from '../topic/topic-model';
import {TopicService} from '../topic/topic.service';
import {LocalDataSource} from 'ng2-smart-table';
import {AnswersRenderComponent} from './renderTableRow/answers-render.component';
import {TopicsRenderComponent} from './renderTableRow/topics-render.component';
import {Globals} from '../../app.constants';
import {CreateModalComponent} from './action/create-modal/create-modal.component';
import {EditModalComponent} from './action/edit-modal/edit-modal.component';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  LOG_TAG: string = 'QuestionComponent';
  settings = {
    attr: {
      class: 'table'
    },
    mode: 'external', // inline|external|click-to-edit
    selectMode: 'single', // single|multi
    actions: {
      columnTitle: '',
      add: true,
      edit: true,
      delete: true,
      custom: [],
      position: 'left', // left|right
    },
    columns: {
      code: {
        title: 'Mã',
        type: 'html'
      },
      content: {
        title: 'Nội dung',
        type: 'html'
      },
      answers: {
        title: 'Đáp án',
        type: 'custom',
        renderComponent: AnswersRenderComponent
      },
      level: {
        title: 'Độ khó',
        type: 'html'
      },
      topic: {
        title: 'Chủ đề',
        type: 'custom',
        renderComponent: TopicsRenderComponent
      }
    },
    add: {
      inputClass: '',
      addButtonContent: '<i class="icon-plus btn btn-success btn-sm"> Thêm</i>',
      createButtonContent: 'Save',
      cancelButtonContent: 'Cancel',
      confirmCreate: false,
    },
    edit: {
      inputClass: '',
      editButtonContent: '<i class="icon-pencil btn btn-primary btn-sm"></i>',
      saveButtonContent: 'Update',
      cancelButtonContent: 'Cancel',
      confirmSave: false,
    },
    delete: {
      deleteButtonContent: '<i class="icon-trash btn btn-danger btn-sm"></i>',
      confirmDelete: true,
    },
    noDataMessage: 'Dữ liệu rỗng',
    pager: {
      display: true,
      perPage: 10,
    }
  };
  //source for smart table
  source: LocalDataSource;
  questions: Question[];
  topics: Topic[];
  // hide search view
  isHidden: boolean;
  // hide search content
  isVisuallyHidden: boolean;
  // show search content
  isShow: boolean;
  photo: object;
  imageName: string;
  // reference to CreateModalComponent to use child resource
  @ViewChild(CreateModalComponent) createModalCmp: CreateModalComponent;
  // reference to EditModalComponent to use child resource
  @ViewChild(EditModalComponent) editModalCmp: EditModalComponent;
  @ViewChild('createModal') createModal: any;
  @ViewChild('tableQuestion') tableQuestion: any;
  @ViewChild('inputLevel') inputLevel: ElementRef;
  @ViewChild('inputTopic') inputTopic: ElementRef;
  @ViewChild('inputContent') inputContent: ElementRef;
  @ViewChild('inputAnswer1') inputAnswer1: ElementRef;
  @ViewChild('inputAnswer2') inputAnswer2: ElementRef;
  @ViewChild('inputAnswer3') inputAnswer3: ElementRef;
  @ViewChild('inputAnswer4') inputAnswer4: ElementRef;
  @ViewChild('inputImage') inputImage: ElementRef;
  @ViewChild('displayImage') displayImage: ElementRef;
  @ViewChild('imageContainer') imageContainer: ElementRef;

  constructor(private questionService: QuestionService, private topicService: TopicService, private globals: Globals) {
    this.topics = [];
    this.source = new LocalDataSource(this.questions);
    this.isHidden = false;
    this.isVisuallyHidden = false;
    this.isShow = true;
    this.imageName = '';
    this.photo = {
      default: this.globals.PHOTO_DIR + this.globals.PHOTO_DEFAULT,
      added: ''
    }
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
  onClickAdvanceSearch(event: any): void {
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

  onSubmitSearch(e: any, searchForm: NgForm): void {
    console.log(this.LOG_TAG + ' onSubmitSearch');
    e.preventDefault();
    console.log(searchForm);
    let formResult = searchForm.value;
    let checkFormValid = this.checkFormSearchValid(formResult.level, formResult.topic,
                                                    formResult.type, formResult.code,
                                                    formResult.answer, formResult.content);

    if (checkFormValid) {
      let queryObj = {
        "level": formResult.level,
        "topic": formResult.topic,
        "type": formResult.type,
        "code": formResult.code,
        "answer": formResult.answer,
        "content": formResult.content,
      };
      this.questionService.getQuestions(queryObj).subscribe(question => {
        this.questions = question;
        this.source.load(this.questions);
        this.tableQuestion.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      alert('Nhập thông tin để tìm kiếm');
    }
  }

  checkFormSearchValid(inputLevel, inputTopic, inputType, inputQuestionId, inputAnswer, inputContent): boolean {
    let inputIsNotNull = false;
    for (let i = 0; i <= arguments.length; i++) {
      if (arguments[i]) {
        inputIsNotNull = true;
        break;
      }
    }
    return inputIsNotNull;
  }

  onCreateQuestion(e): void {
    console.log(this.LOG_TAG + ' onCreateQuestion');
    this.createModalCmp.onOpenModal(e);
  }

  updateTable(e: any): void {
    //console.log(e);
    this.questions = [e];
    this.source.load(this.questions);
  }

  onDeleteQuestion(event): void {
    console.log(this.LOG_TAG + ' onDeleteQuestion');
    //console.log(event);
    if (window.confirm('Bạn có chắc muốn xóa câu hỏi này?')) {
      this.questionService.deleteQuestion(event.data._id).subscribe();
      this.questions.splice(event.index, 1);
      this.source.load(this.questions);
    } else {

    }
  }

  onEditQuestion(e): void {
    console.log(this.LOG_TAG + ' onEditQuestion');
    this.editModalCmp.onOpenModal(e);
  }

}
