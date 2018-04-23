import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameComponent} from './game.component';
import {PlayComponent} from './play/play.component';
import {GameResultComponent} from './game-result/game-result.component';
import {PlayGuard, ResultGuard} from './game.guard';


const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    data: {
      title: 'Game'
    }
  },
  {
    path: '',
    data: {
      title: 'Setting game'
    },
    children: [
      {
        path: 'play',
        canActivate: [PlayGuard],
        component: PlayComponent,
        data: {
          title: 'Play game'
        }
      },
      {
        path: 'result',
        canActivate: [ResultGuard],
        component: GameResultComponent,
        data: {
          title: 'Game result'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GameRoutingModule { }
