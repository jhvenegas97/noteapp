import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEditMessagePage } from './create-edit-message.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEditMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEditMessagePageRoutingModule {}
