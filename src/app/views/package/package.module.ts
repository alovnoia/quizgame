import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageComponent } from './package.component';
import { PackageRoutingModule } from './package-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {CreatePackageComponent} from './action/create-package/create-package.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap/modal';
import {Globals} from '../../app.constants';
import {QuestionService} from '../question/question.service';
import {TopicService} from '../topic/topic.service';
import {PackageService} from './package.service';
import {RenderTopicComponent} from './renderTableRow/render-topic.component';
import { DetailsPackageComponent } from './action/details-package/details-package.component';

@NgModule({
  imports: [
    CommonModule,
    PackageRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  entryComponents: [
    RenderTopicComponent
  ],
  declarations: [
    PackageComponent,
    CreatePackageComponent,
    RenderTopicComponent,
    DetailsPackageComponent
  ],
  providers: [ PackageService, QuestionService, TopicService, Globals ]
})
export class PackageModule { }
