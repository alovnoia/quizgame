import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `<span class="badge" [ngClass]="{'badge-success': isSuccess, 'badge-danger': isDanger}">
    {{renderValue}}</span>
  `,
})
export class StatusRenderComponent implements ViewCell, OnInit {

  renderValue: string;
  isSuccess: boolean;
  isDanger: boolean;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    //console.log('Render status data');
    if (this.value) {
      this.renderValue = 'Đang sử dụng';
      this.isSuccess = true;
      this.isDanger = false;
    } else {
      this.renderValue = 'Đã ẩn';
      this.isSuccess = false;
      this.isDanger = true;
    }
  }

}
