import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BuildingService } from '../../provider/building-service';
import { Building } from '../../provider/building';
import { Observable } from 'rxjs/Observable';
import { CurrencyPipe } from '@angular/common';

/**
 * Generated class for the BuildingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-building-list',
  templateUrl: 'building-list.html',
})
export class BuildingListPage {

  public buildings: any;
  public observe: Observable<any>;
  public error: any;
  public building: Building;

  constructor(public navCtrl: NavController, public navParams: NavParams, public buildingServices: BuildingService) {
    this.getAllBuildings();
    console.log(this.observe);
  }

  getAllBuildings() {
    this.buildingServices.getAllBuildings()
      .subscribe(
        // data => console.log(data),
        data => this.buildings = data,
        error => alert(error),
        () => {
          console.log(this.buildings);
          console.log("finished")
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomListPage');
  }

  buildingTapped(event, building) {
    var buildingSC = building.specialCode;
    this.buildingServices.searchBuilding(buildingSC)
      .subscribe(
        // data => console.log(data),
        data => this.building = data,
        error => alert(error),
        () => {
          console.log(this.building);
          console.log("finished")
        }
      );
  };

}
