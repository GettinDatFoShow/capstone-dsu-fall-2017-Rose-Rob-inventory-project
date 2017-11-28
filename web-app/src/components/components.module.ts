import { NgModule } from '@angular/core';
import { RoomDisplayComponent } from './room-display/room-display';
import { IonicModule } from 'ionic-angular/module';


@NgModule({
	declarations: [RoomDisplayComponent],
	imports: [ 
		IonicModule
	  ],
	exports: [RoomDisplayComponent]
})
export class ComponentsModule {}
