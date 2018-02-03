import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import { PackageComponent } from './package.component';

const routes: Routes = [
  {
    path: '',
    component: PackageComponent,
    data: {
      title: 'Topic'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule {}
