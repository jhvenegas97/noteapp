import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEditMessagePageRoutingModule } from './create-edit-message-routing.module';

import { CreateEditMessagePage } from './create-edit-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEditMessagePageRoutingModule
  ],
  declarations: [CreateEditMessagePage]
})
export class CreateEditMessagePageModule {}
