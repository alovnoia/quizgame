import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import { TopicComponent } from './topic.component';

const routes: Routes = [
  {
    path: '',
    component: TopicComponent,
    data: {
      title: 'Topic'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule {}
