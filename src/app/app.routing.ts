import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';
import {AuthGuard} from './views/pages/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard ],
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        canActivate: [ AuthGuard ],
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'topic',
        canActivate: [ AuthGuard ],
        loadChildren: './views/topic/topic.module#TopicModule'
      },
      {
        path: 'question',
        canActivate: [ AuthGuard ],
        loadChildren: './views/question/question.module#QuestionModule'
      },
      {
        path: 'package',
        canActivate: [ AuthGuard ],
        loadChildren: './views/package/package.module#PackageModule'
      },
      {
        path: 'game',
        canActivate: [ AuthGuard ],
        component: SimpleLayoutComponent,
        children: [
          {
            path: '',
            canActivate: [ AuthGuard ],
            loadChildren: './views/game/game.module#GameModule'
          }
        ]
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'pages/404'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
