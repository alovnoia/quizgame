import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Topic} from '../../../topic/topic-model';
import {Globals} from '../../../../app.constants';
import {TopicService} from '../../../topic/topic.service';
import {PackageService} from '../../package.service';
import {Package} from '../../package-model';
import {Question} from '../../../question/question-model';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['../../package.component.scss']
})
export class CreatePackageComponent implements OnInit {

  LOG_TAG: string = 'CreatePackageComponent ';
  // declare event update table
  @Output() updateTable = new EventEmitter();
  @ViewChild('createModal') createModal: any;
  @Input('topics') topics: Topic[];
  @ViewChild('inputCode') inputCode: ElementRef;
  @ViewChild('inputLevel') inputLevel: ElementRef;
  @ViewChild('inputTopic') inputTopic: ElementRef;
  // use for check question code
  inputCodeStr: string;
  // save generate questions
  genQuestions: Question[];
  // reference to value of select topic
  selectedTopic: Topic;

  constructor(private packageService: PackageService, private topicService: TopicService, private globals: Globals) {
    this.inputCodeStr = '';
    this.genQuestions = [];
  }

  ngOnInit() {
  }

  onOpenModal(e): void {
    this.clearForm();
    this.createModal.show();
  }

  /**
   * check question code before create
   */
  checkCode(): void {
    console.log(this.LOG_TAG, 'checkCode');
    if (this.inputCodeStr) {
      this.packageService.checkCode(this.inputCodeStr).subscribe(res => {
        if (!res.result) {
          alert('Illegal code. Please try again!');
          this.inputCodeStr = '';
        }
      });
    }
  }

  /**
   * Generate question for package
   */
  generateQuestion(): void {
    console.log(this.LOG_TAG, 'generateQuestion');
    let obj = {
      'level': this.inputLevel.nativeElement.value,
      'topic': this.selectedTopic._id
    };
    console.log(obj);
    this.packageService.generateQuestion(obj).subscribe(q => {
      console.log(q);
      this.genQuestions = q;
    });
  }

  /**
   * remove generated question when user change topic or level
   */
  changeCondition(): void {
    this.genQuestions = [];
  }

  onSubmitCreate(e, createForm): void {
    e.preventDefault();
    console.log(createForm.value);
    let data = createForm.value;
    let packageObj: Package = new Package({
      code: data.code.trim(),
      level: data.level.trim(),
      topic: {
        '_id': this.selectedTopic._id,
        'name': this.selectedTopic.name
      }
    });
    for (let i = 0; i < this.genQuestions.length; i++) {
      packageObj.questions.push({
        'id': this.genQuestions[i]._id,
        'code': this.genQuestions[i].code
      });
    }
    packageObj.questions.shift();
    console.log(packageObj);
    this.packageService.addPackage(packageObj).subscribe(res => {
      this.updateParentTable(res);
    });
    this.createModal.hide();

  }

  /**
   * update table after create package
   * @param {Package} p
   */
  updateParentTable(p: Package): void {
    console.log(this.LOG_TAG, 'updateParentTable');
    this.updateTable.emit(p);
  }

  clearForm(): void {
    this.inputCode.nativeElement.value = '';
    this.inputLevel.nativeElement.value = '';
    this.inputTopic.nativeElement.value = {};
    this.genQuestions = [];
  }
}
