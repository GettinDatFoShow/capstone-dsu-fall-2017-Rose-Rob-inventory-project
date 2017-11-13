import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomUpdatePage } from './room-update';

@NgModule({
  declarations: [
    RoomUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(RoomUpdatePage),
  ],
})
export class RoomUpdatePageModule {}
