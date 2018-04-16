import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameRoutingModule} from './game-routing.module';
import {GameComponent} from './game.component';
import {QuestionService} from '../question/question.service';
import {TopicService} from '../topic/topic.service';
import {PackageService} from '../package/package.service';
import {Globals} from '../../app.constants';
import {GameService} from './game.service';
import { PlayComponent } from './play/play.component';
import {FormsModule} from '@angular/forms';
import { GameResultComponent } from './game-result/game-result.component';

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    FormsModule
  ],
  declarations: [
    GameComponent,
    PlayComponent,
    GameResultComponent
  ],
  providers: [ GameService, PackageService, QuestionService, TopicService, Globals ]
})
export class GameModule { }
