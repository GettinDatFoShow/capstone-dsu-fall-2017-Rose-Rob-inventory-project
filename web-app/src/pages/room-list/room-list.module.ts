import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomListPage } from './room-list';
import { BuildingDisplayComponent } from '../../components/building-display/building-display';

@NgModule({
  declarations: [
    RoomListPage,
    BuildingDisplayComponent
  ],
  imports: [
    IonicPageModule.forChild(RoomListPage),
  ],
  exports: [BuildingDisplayComponent],
  entryComponents: [
    BuildingDisplayComponent
  ]
})
export class RoomListPageModule {}
