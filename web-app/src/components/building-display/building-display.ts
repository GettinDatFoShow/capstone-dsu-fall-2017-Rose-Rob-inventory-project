import { Component, Input, OnInit } from '@angular/core';
import { Building } from '../../models/building';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { BuildingUpdatePage } from '../../pages/building-update/building-update';

@Component({
  selector: 'building-display',
  templateUrl: 'building-display.html'
})
export class BuildingDisplayComponent {

  @Input("displayBuilding") building: Building;
  @Input("total") total: number = 0;

  private org: any = { 
    name: "Delaware State University",
    type: "University"
  }

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {
    
  }

  updateClicked(event: Event) {
    this.navCtrl.push(BuildingUpdatePage, {
      building: this.building
    });
  };

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
