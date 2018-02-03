import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicComponent } from './topic.component';
import { TopicRoutingModule } from './topic-routing.module';
import { TopicService } from './topic.service';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { StatusRenderComponent } from './status-render.component';
import { HttpClientModule } from '@angular/common/http';
import {Globals} from '../../app.constants';

@NgModule({
  imports: [
    CommonModule,
    TopicRoutingModule,
    FormsModule,
    Ng2SmartTableModule,
    HttpClientModule
  ],
  entryComponents: [
    StatusRenderComponent
  ],
  declarations: [TopicComponent, StatusRenderComponent],
  providers: [ TopicService, Globals ]
})
export class TopicModule { }
