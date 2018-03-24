import {Component, Input, OnInit} from '@angular/core';

@Component({
  template: `<p *ngIf="renderValue" [innerHTML]="renderValue"></p>`,
})
export class RenderTopicComponent implements OnInit {

  renderValue: string;

  @Input() value;
  @Input() rowData: any;

  constructor() {
    this.renderValue = ``;
  }

  ngOnInit() {
    this.renderValue = this.value.name;
  }

}
