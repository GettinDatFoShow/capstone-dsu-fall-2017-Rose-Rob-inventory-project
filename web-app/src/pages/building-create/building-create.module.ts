import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuildingCreatePage } from './building-create';

@NgModule({
  declarations: [
    BuildingCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(BuildingCreatePage),
  ],
})
export class BuildingCreatePageModule {}
