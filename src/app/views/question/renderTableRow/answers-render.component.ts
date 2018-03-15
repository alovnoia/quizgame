import {Component, Input, OnInit} from '@angular/core';

@Component({
  template: `<ul [innerHTML]="renderValue"></ul>`,
})
export class AnswersRenderComponent implements OnInit {

  renderValue: string;

  @Input() value;
  @Input() rowData: any;

  constructor() { this.renderValue = ``; }

  ngOnInit() {
    for (let answer of this.value) {
      if (answer.correct) {
        this.renderValue += `<li class="badge badge-success">` + answer.content + `</li><br>`;
      } else {
        this.renderValue += `<li class="badge badge-danger">` + answer.content + `</li><br>`;
      }
    }
  }

}
