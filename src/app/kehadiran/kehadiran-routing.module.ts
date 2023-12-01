import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { kehadiranPage } from './kehadiran.page';

const routes: Routes = [
  {
    path: '',
    component: kehadiranPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class kehadiranPageRoutingModule {}
