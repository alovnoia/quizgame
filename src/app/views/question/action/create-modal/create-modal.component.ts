import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Topic} from '../../../topic/topic-model';
import {TopicService} from '../../../topic/topic.service';
import {QuestionService} from '../../question.service';
import {Globals} from '../../../../app.constants';
import {Question} from '../../question-model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['../../question.component.scss']
})
export class CreateModalComponent implements OnInit {

  LOG_TAG: string = 'CreateModalComponent ';
  //reference to topics array in QuestionComponent
  @Input('topics') topics: Topic[];
  @Input('photo') photo: any;
  // name of image file
  imageName: string;
  // use for check question code
  inputCodeStr: string;
  // save option of radio, default is 0 (first answer)
  radioOption: number;
  // declare event update table
  @Output() updateTable = new EventEmitter();
  @ViewChild('createModal') createModal: any;
  @ViewChild('inputCode') inputCode: ElementRef;
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
    this.imageName = '';
    this.inputCodeStr = '';
    this.radioOption = 0;
  }

  ngOnInit() {}

  /**
   * update table after create question
   * @param {Question} q
   */
  updateParentTable(q: Question): void {
    console.log(this.LOG_TAG, 'updateParentTable');
    this.updateTable.emit(q);
  }

  onOpenModal(e): void {
    this.clearForm();
    this.createModal.show();
  }

  /**
   * trigger image input
   * @param e
   */
  onSelectImage(e): void {
    this.inputImage.nativeElement.click();
  }

  /**
   * Listen event select image
   * @param event
   */
  selectImageListener(event): void {
    console.log(this.LOG_TAG, 'selectImageListener');
/*    let reader = new FileReader();
    reader.onload = (e: any) => {
      //let src = e.target.result;
    };*/
    //console.log(event.target.files[0].name);
    if (event.target.files[0]) {
      this.displayImage.nativeElement.src = this.globals.PHOTO_DIR + event.target.files[0].name;
      this.imageName = event.target.files[0].name;
    }
  }

  /**
   * set image to default
   * @param e
   */
  onDeleteImage(e): void {
    console.log(this.LOG_TAG, 'onDeleteImage');
    this.displayImage.nativeElement.src = this.photo.default;
    this.imageName = '';
  }

  /**
   * Handle submit form create
   * @param e
   * @param {NgForm} createForm: contain form data
   */
  onSubmitCreate(e: any, createForm: NgForm): void {
    console.log(this.LOG_TAG, 'onSubmitCreate');
    e.preventDefault();
    let formResult = createForm.value;
    let data = new Question;
    let tmp;
    let answerFlag; // save right answer

    createForm.value.image = this.imageName ? this.globals.PHOTO_DIR + this.imageName : '';
    //console.log(createForm.value);

    data.level = formResult.level;
    data.image = this.imageName ? this.globals.PHOTO_DIR + this.imageName : '';
    data.content = formResult.content;
    data.code = formResult.code;
    for (let topic of formResult.topic) {
      data.topic.push({
        "_id": topic._id,
        "name": topic.name
      });
    }
    // remove empty element by default
    data.topic.shift();
    for (let i = 0; i < 4; i++) {
      tmp = formResult['answer' + i];
      if (i === formResult.correct) {
        answerFlag = true;
      } else {
        answerFlag = false;
      }
      data.answers.push({
        "content": tmp,
        "correct": answerFlag
      });
    }
    //console.log(data);
    this.questionService.addQuestion(data).subscribe(q => {
      this.updateParentTable(q);
      this.createModal.hide();
    });
  }

  /**
   * Use for multiple option to compare value
   * @param {Topic} topic1
   * @param {Topic} topic2
   * @returns {boolean}
   */
  compareTopic(topic1: Topic, topic2: Topic): boolean {
    return topic1 && topic2 ? topic1._id === topic2._id : topic1 === topic2;
  }

  /**
   * clear value of form
   */
  clearForm(): void {
    console.log(this.LOG_TAG, 'clearForm');
    this.inputCode.nativeElement.value = '';
    this.inputLevel.nativeElement.value = '';
    this.inputTopic.nativeElement.value = [];
    this.displayImage.nativeElement.src = this.photo.default;
    this.inputContent.nativeElement.value = '';
    this.inputAnswer1.nativeElement.value = '';
    this.inputAnswer2.nativeElement.value = '';
    this.inputAnswer3.nativeElement.value = '';
    this.inputAnswer4.nativeElement.value = '';
    this.radioOption = 0;
  }

  /**
   * check question code before create
   * @param e
   */
  checkCode(e): void {
    console.log(this.LOG_TAG, 'checkCode');
    if (this.inputCodeStr) {
      this.questionService.checkCode(this.inputCodeStr).subscribe(res => {
        if (!res.result) {
          alert('Mã đã được sử dụng. Hãy nhập mã khác!');
          this.inputCodeStr = '';
        }
      });
    }
  }
}
