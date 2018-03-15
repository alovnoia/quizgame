import {Component, Input, OnInit} from '@angular/core';

@Component({
  template: `<ul id="topic-list" *ngIf="renderValue" [innerHTML]="renderValue"></ul>`,
  styleUrls: ['../question.component.scss']
})
export class TopicsRenderComponent implements OnInit {

  renderValue: string;

  @Input() value;
  @Input() rowData: any;

  constructor() {
    this.renderValue = ``;
  }

  ngOnInit() {
    for (let topic of this.value) {
      this.renderValue += `<li><span>` + topic.name + `<span></li>`;
    }
  }

}
