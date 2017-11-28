import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../models/room';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { RoomUpdatePage } from '../../pages/room-update/room-update';
import { RoomService } from '../../provider/room.service';
import { Building } from '../../models/building';
import { BuildingService } from '../../provider/building.service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Component({
  selector: 'room-display',
  templateUrl: 'room-display.html'
})
export class RoomDisplayComponent implements OnInit{

  text: string;
  @Input("displayRoom") room: Room;
  @Input("total") total: number = 0;
  private building: Building = new Building;
  constructor(private navCtrl: NavController, private roomService: RoomService,
      private buildingService: BuildingService, private toastCtrl: ToastController
  ) {

  }

  ngOnInit() {
   this.getBuilding(); 
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
