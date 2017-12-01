import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemCreatePage } from './item-create';
// import { ItemListPage } from '../item-list/item-list'
//import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    ItemCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCreatePage),
    //AutoCompleteModule
  ],
})
export class ItemCreatePageModule {}
