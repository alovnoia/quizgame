import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionComponent } from './question.component';
import { QuestionRoutingModule } from './question-routing.module';
import { QuestionService } from './question.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    QuestionRoutingModule,
    FormsModule
  ],
  declarations: [QuestionComponent],
  providers: [ QuestionService ]
})
export class QuestionModule { }
