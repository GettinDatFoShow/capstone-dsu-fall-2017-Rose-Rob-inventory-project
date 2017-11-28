import { NgModule } from '@angular/core';
import { RoomDisplayComponent } from './room-display/room-display';
import { IonicModule } from 'ionic-angular/module';
import { BuildingDisplayComponent } from './building-display/building-display';


@NgModule({
	declarations: [RoomDisplayComponent,
    BuildingDisplayComponent],
	imports: [ 
		IonicModule
	  ],
	exports: [RoomDisplayComponent,
    BuildingDisplayComponent]
})
export class ComponentsModule {}
