import { ItemService } from './../../provider/item-service';
import { ItemDisplayPage } from './../item-display/item-display';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomService } from '../../provider/room-service';
import { Observable } from 'rxjs/Observable';
import { CurrencyPipe } from '@angular/common';
import { ItemListPage } from '../../pages/item-list/item-list';

/**
 * Generated class for the RoomListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-list',
  templateUrl: 'room-list.html',
  providers: [RoomService, ItemService ]
})
export class RoomListPage {

  public rooms: any = [];
  public error: any;
  public room: any = {};
  public building: any = {};
  public totalRooms: number = 0;
  public buildingFlag: boolean = false;
  public title: string = "Listed Rooms"
  public header: string = "Rooms"
  public scannedCode: string = undefined;
  public item: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
               public roomService: RoomService, public barcodeScanner: BarcodeScanner, public itemService: ItemService) {
      this.building = navParams.get('param1');
      console.log(this.building);
      console.log("Building: ", this.building);
      this.checkBuildingNotNull(this.building);
    }

  refresh() {
    this.checkBuildingNotNull(this.room);
  }

  checkBuildingNotNull(room) {
    if(room === undefined) {
      this.getAllRooms();
    }
    else{
      this.title = "Building " + this.building.name + " " + this.building.number + ": Listed Rooms";
      this.getBuildingRooms(this.building.id);
      this.buildingFlag = true;
    }
  }

  getBuildingRooms(buildingId) {
    this.roomService.getRoomsByBuildingId(buildingId)
    .subscribe(
      data => this.rooms = data,
      error => alert(error),
      () => {
        console.log(this.rooms);
        console.log("Retrieved Building Rooms.");
        this.totalRooms = this.rooms.length;
        this.header = this.room.name + " " + this.room.number + " currently has " + this.totalRooms + " roooms listed.";
      }
    );
    }

  getAllRooms() {
    this.roomService.getAllRooms()
      .subscribe(
        // data => console.log(data),
        data => this.rooms = data,
        error => alert(error),
        () => {
          console.log(this.rooms);
          console.log("finished")
        }
      );
  }

  roomTapped(event, room) {
    this.room = room;
    this.navCtrl.push(ItemListPage, {
      param1: this.room
    });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomListPage');
  }  
  
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
        console.log('Error: ', err);
    });
  }



}
