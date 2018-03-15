import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Globals} from '../../../../app.constants';
import {TopicService} from '../../../topic/topic.service';
import {QuestionService} from '../../question.service';
import {Topic} from '../../../topic/topic-model';
import {NgForm} from '@angular/forms';
import {Question} from '../../question-model';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['../../question.component.scss']
})
export class EditModalComponent implements OnInit {

  LOG_TAG: string = 'EditModalComponent ';
  //reference to topics array in QuestionComponent
  @Input('topics') topics: Topic[];
  @Input('photo') photo: any;
  // use for multiple option to set default selected topics to edit form
  selectedTopics: any;
  // name of image file
  imageName: string;
  // use for check question code
  inputCodeStr: string;
  // save option of radio, default is 0 (first answer)
  radioOption: number;
  // old data before edit in form
  oldData: Question;
  // declare event update table
  @Output() updateTable = new EventEmitter();
  @ViewChild('editModal') editModal: any;
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
   * update table after edit question
   * @param {Question} q
   */
  updateParentTable(q: Question): void {
    this.updateTable.emit(q);
  }

  /**
   * fill form with data and open modal
   * @param e
   */
  onOpenModal(e): void {
    console.log(this.LOG_TAG, 'onOpenModal');
    //console.log(e.data);
    this.oldData = e.data;
    this.inputCode.nativeElement.value = this.oldData.code;
    this.inputLevel.nativeElement.value = this.oldData.level;
    this.selectedTopics = this.oldData.topic;
    this.displayImage.nativeElement.src = this.oldData.image ? this.oldData.image : this.photo.default;
    this.inputContent.nativeElement.value = this.oldData.content;
    this.inputAnswer1.nativeElement.value = this.oldData.answers[0].content;
    this.inputAnswer2.nativeElement.value = this.oldData.answers[1].content;
    this.inputAnswer3.nativeElement.value = this.oldData.answers[2].content;
    this.inputAnswer4.nativeElement.value = this.oldData.answers[3].content;
    for (let i = 0; i < this.oldData.answers.length; i++) {
      if (this.oldData.answers[i].correct) {
        this.radioOption = i;
        break;
      }
    }
    this.editModal.show();
  }

  /**
   * Handle submit form edit
   * @param e
   * @param {NgForm} createForm: contain form data
   */
  onSubmitEdit(e: any, createForm: NgForm): void {
    console.log(this.LOG_TAG, 'onSubmitEdit');
    e.preventDefault();
    let formResult = createForm.value;
    let data = new Question;
    let tmp;
    let answerFlag; // save right answer
    createForm.value.image = this.imageName ? this.globals.PHOTO_DIR + this.imageName : '';
    //console.log(createForm.value);

    // if any field null, set it to old data to edit object
    data._id = this.oldData._id;
    data.image = this.imageName ? this.globals.PHOTO_DIR + this.imageName : '';
    data.level = formResult.level ? formResult.level : this.oldData.level;
    data.content = formResult.content ? formResult.content : this.oldData.content;
    data.code = formResult.code ? formResult.code : this.oldData.code;
    if (formResult.topic.length > 0) {
      for (let topic of formResult.topic) {
        data.topic.push({
          "_id": topic._id,
          "name": topic.name
        });
      }
    } else {
      data.topic = this.oldData.topic;
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
      // if user dont fill any answer input, replace it with old data
      if (!tmp) {
        data.answers.push({
          "content": this.oldData.answers[i].content,
          "correct": answerFlag
        });
        continue;
      }
      data.answers.push({
        "content": tmp,
        "correct": answerFlag
      });
    }
    //console.log(data);
    this.questionService.editQuestion(data).subscribe(q => {
      this.updateParentTable(q);
      this.editModal.hide();
    });
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
      let src = e.target.result;
      //this.displayImage.nativeElement.src = src;
      console.log(e.target.files[0].name);
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
   * Use for multiple option to compare value
   * @param {Topic} topic1
   * @param {Topic} topic2
   * @returns {boolean}
   */
  compareTopic(topic1: Topic, topic2: Topic): boolean {
    return topic1 && topic2 ? topic1._id === topic2._id : topic1 === topic2;
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
