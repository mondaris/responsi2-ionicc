import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { kehadiranPageRoutingModule } from './kehadiran-routing.module';

import { kehadiranPage } from './kehadiran.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, kehadiranPageRoutingModule],
  declarations: [kehadiranPage],
})
export class kehadiranPageModule {}
