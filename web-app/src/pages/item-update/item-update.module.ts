import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemUpdatePage } from './item-update';

@NgModule({
  declarations: [
    ItemUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemUpdatePage),
  ],
})
export class ItemUpdatePageModule {}
