import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Room } from '../../models/room';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { RoomUpdatePage } from '../../pages/room-update/room-update';
import { RoomService } from '../../provider/room.service';
import { Building } from '../../models/building';
import { BuildingService } from '../../provider/building.service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { RoomCreatePage } from '../../pages/room-create/room-create';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { lang } from 'moment';

@Component({
  selector: 'room-display',
  templateUrl: 'room-display.html'
})
export class RoomDisplayComponent {
  options: GeolocationOptions;
  @Input("displayRoom") room: Room;
  @Input("total") total: number = 0;

  private building: Building = new Building;

  constructor(private navCtrl: NavController, private roomService: RoomService,
      private buildingService: BuildingService, private toastCtrl: ToastController,
      private geolocation: Geolocation
  ) {  }

  ngAfterViewInit(){
    this.getBuilding(); 
  }

  getPosition(){
    var coords = this.room.latitude + "," + this.room.longitude; 
    var label = 'Rooms last scanned location';
    window.open('geo:lat,long?q='+ coords +'(' + label + ')'+'_system');
  }


  updateClicked(event: Event) {
    this.navCtrl.push(RoomUpdatePage, {
      room: this.room
    });
  };

  getBuilding() {
    this.buildingService.findBuildingByRoom(this.room.id).subscribe(
      res => {
        this.building = res;
      },
      err => {
        this.presentToast("Building not found.")
      }
    )
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
