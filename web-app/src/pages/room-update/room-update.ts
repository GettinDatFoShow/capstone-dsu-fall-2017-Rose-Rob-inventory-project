import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ItemService } from '../../provider/item.service';
import { RoomHistory} from "../../models/RoomHistory";

import { RoomService } from '../../provider/room.service';
import { RoomHistoryService } from '../../provider/roomHistory.service';
import { BuildingService } from './../../provider/building.service';

import { Building } from './../../models/building';
import { RoomListPage } from './../room-list/room-list';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Room } from '../../models/room';

@IonicPage()
@Component({
  selector: 'page-room-update',
  templateUrl: 'room-update.html',
  providers: [ToastController, RoomService, BuildingService, RoomHistoryService]
})
export class RoomUpdatePage {

  private title: string = "Update Room";
  private name: string = "";
  private room: Room = new Room;

  private roomHistory: RoomHistory = new RoomHistory;
  private roomHistories: any = [];
  private building: Building = new Building;
  private buildings: any = [];
  private selectBuildingOptions: any = {};
  private names: any = [];
  private mobileFlag: boolean = false;


  constructor(private navCtrl: NavController, private navParams: NavParams, private roomService: RoomService,
    private toastCtrl: ToastController, private buildingService: BuildingService,
    private roomHistoryService: RoomHistoryService,
    private nfc: NFC, private ndef: Ndef) {}

  ionViewDidLoad() {
    this.room = this.navParams.get('room');
    this.building = this.navParams.get('building');
    this.roomHistories = this.navParams.get('history');

    this.mobileFlag = this.navParams.get('mobileFlag')
    this.getRoomHistory();
    this.getBuildings();

    if(this.mobileFlag) {
      this.addNfcListeners();
    }
    this.selectBuildingOptions = {
        title: 'Listed Buildings',
        mode: 'md',
    };
  }

  getRoomHistory(){
    this.roomHistoryService.getRoomHistoryByRoomId(this.room.id)
      .subscribe(
        res => {
          this.roomHistory = res
        },
        err => {
          this.presentToast("Error retreiving history.")
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

  onUpdate() {
    this.presentToast("Updating Room...");
    let date = new Date;
    this.roomHistory = {
      action: 'Updated',
      date: date.toDateString()
    }
    //this.roomHistories.push(this.roomHistory);
    this.room.lastUpdated = date.toDateString();

    this.presentToast(this.roomHistories)

    let roomWrapper = {
      room: this.room,
      building: this.building,
      histories: this.roomHistories

    }

    this.roomService.updateRoom(roomWrapper).subscribe(
      res => {
        this.presentToast("Room Updated!");
      },
      error => {
        this.presentToast(error)
     },
     () => {
        this.navCtrl.push(RoomListPage, {
          mobileFlag: this.mobileFlag,
          building: this.building
        });
      }
    );
  }

 getBuildings(){
      this.buildingService.getAllBuildings()
        .subscribe(
        res => {
          this.buildings = res
      },
        error => {
          console.log(this.building);
        }
      )
  }


  addNfcListeners():void {
    this.nfc.addTagDiscoveredListener(()  => {
      this.presentToast('successfully attached ndef listener');
      }, (err) => {
        this.presentToast(err);
      }).subscribe((event) => {
        this.presentToast(this.nfc.bytesToHexString(event.tag.id));
        this.room.nfcCode = this.nfc.bytesToHexString(event.tag.id);
        this.nfc.bytesToHexString(event.tag.id)
        this.presentToast(this.room.nfcCode);
    });
    this.nfc.addNdefListener(() => {
      this.presentToast('successfully attached ndef listener');
      }, (err) => {
        this.presentToast(err);
      }).subscribe((event) => {
        this.presentToast(this.nfc.bytesToHexString(event.tag.id));
        this.room.nfcCode = this.nfc.bytesToHexString(event.tag.id);
        this.nfc.bytesToHexString(event.tag.id)
        this.presentToast(this.room.nfcCode);
    });
    this.nfc.addNdefFormatableListener(() => {
      this.presentToast('successfully attached ndef listener');
      }, (err) => {
        this.presentToast(err);
      }).subscribe((event) => {
        this.presentToast(this.nfc.bytesToHexString(event.tag.id));
        this.room.nfcCode = this.nfc.bytesToHexString(event.tag.id);
        this.nfc.bytesToHexString(event.tag.id)
        this.presentToast(this.room.nfcCode);
    });
  }

  tagListenerSuccess(event: Event) {
    this.presentToast("FOUND NFC");
    this.vibrate(2000);
  }

  vibrate(time:number):void {
    if(navigator.vibrate) {
        navigator.vibrate(time);
    }
  }

}
