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
  providers: [ToastController, RoomService, ItemService ]
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
  private mobileFlag: boolean = false;

  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController,
    private roomService: RoomService, private barcodeScanner: BarcodeScanner, private itemService: ItemService,
    private nfc: NFC, private ndef: Ndef) { }

  ionViewDidLoad() {
    this.building = this.navParams.get('building');
    this.checkBuildingNotNull(this.building);
    this.mobileFlag = this.navParams.get('mobileFlag');
    if (this.mobileFlag) {
      this.addNfcListeners();
    }
  }

  refresh() {
    this.presentToast("Refreshing List..");
    this.checkBuildingNotNull(this.room);
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  checkBuildingNotNull(room) {
    if(room === undefined) {
      this.getAll();
    }
    else{
      this.title = "Building " + this.building.name + " " + this.building.number;
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
        if(this.refreshingFlag === true ){
          this.presentToast("Building List is Fresh!");
          this.refreshingFlag = false;
        }
      }
    );
  }

  getAll() {
    this.roomService.getAllRooms()
      .subscribe(
        // data => console.log(data),
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
    this.navCtrl.push(ItemListPage, {
      mobileFlag: this.mobileFlag,      
      hasRoom: true,
      room: this.room
    });
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
        // data => console.log(data),
        data => this.item = data,
        error => alert(error),
        () => {
          this.checkItemNotNull(this.item);
          // console.log(this.item);
        }
      );
    }, (err) =>{
        // console.log('Error: ', err);
    });
  }

  addNfcListeners(): void {
    this.nfc.addTagDiscoveredListener(()  => {
      this.presentToast('successfully attached TagDiscovered listener');
      }, (err) => {
        this.presentToast(err);
      }).subscribe((event) => {
        this.goToRoomList(event.tag.id);        
    });
    this.nfc.addNdefListener(() => {
      this.presentToast('successfully attached Ndef listener');
      }, (err) => {
        this.presentToast(err);
      }).subscribe((event) => {
        this.goToRoomList(event.tag.id);        
    });
    this.nfc.addNdefFormatableListener(() => {
      this.presentToast('successfully attached NdefFormatable listener');
      }, (err) => {
        this.presentToast(err);
      }).subscribe((event) => {
        this.goToRoomList(event.tag.id);
      });
  }

  searchRooms(tagId) {
    for(let i = 0; i <this.rooms.length; i++) {
      let room = this.rooms[i];
      if (room.nfcCode === tagId) {
        this.presentToast("Room Found")
        this.navCtrl.push(ItemListPage, {
          mobileFlag: this.mobileFlag,          
          hasRoom: true,
          room: room, 
        });
        break;
      }
    }
    this.presentToast("No Room Found.");
  }

  goToRoomList(tagId) {
    this.presentToast(this.room.nfcCode);    
    this.searchRooms(this.nfc.bytesToHexString(tagId))
  }

}
