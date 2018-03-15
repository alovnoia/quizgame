import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionComponent } from './question.component';
import { QuestionRoutingModule } from './question-routing.module';
import { QuestionService } from './question.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Globals} from '../../app.constants';
import {TopicService} from '../topic/topic.service';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { AnswersRenderComponent } from './renderTableRow/answers-render.component';
import {TopicsRenderComponent} from './renderTableRow/topics-render.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateModalComponent } from './action/create-modal/create-modal.component';
import { EditModalComponent } from './action/edit-modal/edit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    QuestionRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SmartTableModule,
    ModalModule.forRoot()
  ],
  entryComponents: [
    AnswersRenderComponent,
    TopicsRenderComponent
  ],
  declarations: [
    QuestionComponent,
    AnswersRenderComponent,
    TopicsRenderComponent,
    CreateModalComponent,
    EditModalComponent
  ],
  providers: [ QuestionService, TopicService, Globals ]
})
export class QuestionModule { }
