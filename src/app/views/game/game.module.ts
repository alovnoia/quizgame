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
import {SafeImagePipe} from '../../pipe/safe-image.pipe';
import {PlayGuard, ResultGuard} from './game.guard';

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    FormsModule
  ],
  declarations: [
    GameComponent,
    PlayComponent,
    GameResultComponent,
    SafeImagePipe
  ],
  providers: [ GameService, PackageService, QuestionService, TopicService, Globals, PlayGuard, ResultGuard ]
})
export class GameModule { }
