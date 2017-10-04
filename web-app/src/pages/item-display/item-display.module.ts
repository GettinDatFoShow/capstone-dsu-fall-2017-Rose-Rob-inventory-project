import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDisplayPage } from './item-display';

@NgModule({
  declarations: [
    ItemDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemDisplayPage),
  ],
})
export class ItemDisplayPageModule {}
