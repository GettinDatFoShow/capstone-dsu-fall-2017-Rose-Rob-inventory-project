import { RoomListPage } from './../room-list/room-list';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ItemService } from './../../provider/item-service';
import { ItemDisplayPage } from './../item-display/item-display';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BuildingService } from '../../provider/building-service';

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
  providers: [ItemService]  
})
export class BuildingListPage {

  public buildings: any = [];
  public error: any;
  public building: any = {};
  public item: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public buildingServices: BuildingService,
              public itemService: ItemService, public barcodeScanner: BarcodeScanner) {
    this.getAllBuildings();
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
    this.building = building;
    this.navCtrl.push(RoomListPage, {
      param1: this.building
    });
  };

  checkItemNotNull(item) {
    if(item === undefined) {
      //TO DO: here add code to go add new item page
    }
    else{
      this.navCtrl.push(ItemDisplayPage, {
        param1: this.item
      });
    }
  }

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
       this.itemService.searchItemByCode(barcodeData.text)
       .subscribe(
        // data => console.log(data),
        data => this.item = data,
        error => alert(error),
        () => {
          this.checkItemNotNull(this.item);
          console.log(this.item);
        }
      );
    }, (err) =>{
        console.log('look right here!!!: ', err);
    });
  }

}
