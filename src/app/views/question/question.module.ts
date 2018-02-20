import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionComponent } from './question.component';
import { QuestionRoutingModule } from './question-routing.module';
import { QuestionService } from './question.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Globals} from '../../app.constants';
import {TopicService} from '../topic/topic.service';

@NgModule({
  imports: [
    CommonModule,
    QuestionRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [QuestionComponent],
  providers: [ QuestionService, TopicService, Globals ]
})
export class QuestionModule { }
