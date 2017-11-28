import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemListPage } from './item-list';
import { RoomDisplayComponent } from '../../components/room-display/room-display';

@NgModule({
  declarations: [
    ItemListPage,
    RoomDisplayComponent
  ],
  imports: [
    IonicPageModule.forChild(ItemListPage),
  ],
  exports: [RoomDisplayComponent],
  entryComponents: [
    RoomDisplayComponent
  ]
})
export class ItemListPageModule {}
