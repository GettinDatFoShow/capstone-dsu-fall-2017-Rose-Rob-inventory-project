import { Room } from './../../models/room';
import { Item } from './../../models/item';
import { ItemService } from './../../provider/item.service';
import { ItemDisplayPage } from './../item-display/item-display';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomService } from '../../provider/room.service';
import { ItemListPage } from '../../pages/item-list/item-list';
import { ToastController } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Building } from '../../models/building';
import { MobileInfoService } from '../../provider/mobileInfo.service';
import { RoomCreatePage } from '../room-create/room-create';

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
  providers: [ItemListPage]
})
export class RoomListPage {

  private refreshingFlag: boolean = false;
  private rooms: any = [];
  private room: Room = new Room;
  private building: Building = new Building;
  private buildingFlag: boolean = false;
  private title: string = "Listed Rooms"
  private header: string = "Rooms"
  private scannedCode: string = undefined;
  private item: Item = new Item;
  private total: number = 0;
  private mobileFlag: boolean = this.mobileInfoService.getMobileFlag();
  
  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController,
    private roomService: RoomService, private barcodeScanner: BarcodeScanner, private itemService: ItemService,
    private nfc: NFC, private mobileInfoService: MobileInfoService) { }

  ionViewDidLoad() {
    this.building = this.navParams.get('building');
    this.checkBuildingNotNull(this.building);
    if (this.mobileFlag) {
      this.addNfcListeners();
    }
  }

  refresh() {
    this.presentToast("Refreshing List..");
    this.checkBuildingNotNull(this.building);
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  checkBuildingNotNull(buildingId) {
    if(this.building === undefined) {
      this.buildingFlag = false;
      this.getAll();
    }
    else{
      this.title = "Building " + this.building.name + " " + this.building.number;
      this.getBuildingRooms(this.building);
      this.buildingFlag = true;
    }
  }

  getBuildingRooms(buildingId) {
    this.roomService.getRoomsByBuildingId(buildingId)
    .subscribe(
      data => this.rooms = data,
      error => {
        this.presentToast("Error retrieving rooms");
      },
      () => {
        this.total = this.rooms.length;
        this.header = this.building.name + " " + this.building.number + " currently has " + this.total + " rooms listed.";
        if(this.refreshingFlag === true ){
          this.presentToast("Room List is Fresh!");
          this.refreshingFlag = false;
        }
      }
    );
  }

  getAll() {
    this.roomService.getAllRooms()
      .subscribe(
        data => this.rooms = data,
        error => alert(error),
        () => {
          this.total = this.rooms.length;
          this.total = this.rooms.length;
          if(this.refreshingFlag === true ){
            this.presentToast("Room List is Fresh!");
            this.refreshingFlag = false;
          }
        }
      );
  }

  buttonTapped(event, room) {
    this.room = room;
    this.goToItemListPage(room);
  };

  checkItemNotNull(item) {
    if(item === undefined) {
      //TO DO: here add code to go add new item page
    }
    else{
      this.navCtrl.push(ItemDisplayPage, {
        mobileFlag: this.mobileFlag,
        item: this.item
      });
    }
  }

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
       this.itemService.searchItemByCode(barcodeData.text)
       .subscribe(
        data => this.item = data,
        error => alert(error),
        () => {
          this.checkItemNotNull(this.item);
        }
      );
    }, (err) =>{
    });
  }

  addNfcListeners(): void {
    this.mobileInfoService.listen().subscribe( 
      res => {
        this.presentToast("ID Scanned: " + this.nfc.bytesToHexString(res.tag.id));
        this.vibrate(2000);
        this.searchRooms(this.nfc.bytesToHexString(res.tag.id));
      }, 
      (err) => {
          this.presentToast(err);
      });
  }

  searchRooms(tagId) {
    this.roomService.getRoomByNfcCode(tagId).subscribe(
      res => {
        this.room = res;
        this.presentToast("Room: " + this.room.name)
        this.goToItemListPage(this.room);
      },
      err => {
        this.presentToast("Room Not Found.")
        // this.navCtrl.push(RoomCreatePage, {
        //   hasTag: true,
        //   tagId: tagId
        // });
      }
    );
  }

  vibrate(time:number): void {
    if(navigator.vibrate) {
        navigator.vibrate(time);
    }
  }

  goToItemListPage(room): void {
    this.navCtrl.push(ItemListPage, {
      hasRoom: true,
      room: this.room
    });
  }

}
