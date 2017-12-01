import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomInventoryPage } from './room-inventory';

@NgModule({
  declarations: [
    RoomInventoryPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomInventoryPage),
  ],
})
export class RoomInventoryPageModule {}
