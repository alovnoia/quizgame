import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Question} from '../../../question/question-model';

@Component({
  selector: 'app-details-package',
  templateUrl: './details-package.component.html',
  styleUrls: ['./details-package.component.scss']
})
export class DetailsPackageComponent implements OnInit {

  @ViewChild('detailsModal') detailsModal: any;
  question: Question[];
  package: object;

  constructor() {
    this.question = [];
    this.package = {
      code: '',
      level: '',
      topic: '',
      usage: ''
    };
  }

  ngOnInit() {
  }

  onOpenModal(e): void {
    console.log(e.data);
    this.question = e.data.questions;
    let level;
    if (e.data.level === 'easy') {
      level = '<span class="badge badge-success">Dễ</span>';
    } else if (e.data.level === 'medium') {
      level = '<span class="badge badge-warning">Trung bình</span>';
    } else {
      level = '<span class="badge badge-danger">Khó</span>';
    }
    this.package = {
      code: e.data.code,
      level: level,
      topic: e.data.topic.name,
      usage: e.data.usage,
      question: e.data.questions
    };
    this.detailsModal.show();
  }
}
