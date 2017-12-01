import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuildingUpdatePage } from './building-update';

@NgModule({
  declarations: [
    BuildingUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(BuildingUpdatePage),
  ],
})
export class BuildingUpdatePageModule {}
