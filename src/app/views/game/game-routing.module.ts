import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameComponent} from './game.component';
import {PlayComponent} from './play/play.component';

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
        component: PlayComponent,
        data: {
          title: 'Play game'
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
