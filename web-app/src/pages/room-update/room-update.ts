import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ItemService } from '../../provider/item.service';
import { Room } from '../../models/room';
import { RoomHistory} from "../../models/RoomHistory";
import { RoomDetail } from "../../models/RoomDetail";
import { RoomService } from '../../provider/room.service';
import { RoomHistoryService } from '../../provider/roomHistory.service';
import { BuildingService } from './../../provider/building.service';
import { Building } from './../../models/building';
import { RoomListPage } from './../room-list/room-list';
import { NFC, Ndef } from '@ionic-native/nfc';
//import { NFC, Ndef } from '@ionic-native/nfc';

/**
 * Generated class for the RoomUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-update',
  templateUrl: 'room-update.html',
  providers: [ToastController, RoomService, ItemService]
})
export class RoomUpdatePage {

  title: string = "Update Room";
  name: string = "";
  room: any = {};
  roomDetail = new RoomDetail();
  roomDetails: RoomDetail[];
  //room: Room = new Room();
  //rooms: Room[];
  roomHistory: RoomHistory = new RoomHistory();
  roomHistories: RoomHistory[];
  building: Building = new Building();
  buildings: Building[];
  selectBuildingOptions: any = {};
  names: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public roomService: RoomService, public toastCtrl: ToastController, public buildingService: BuildingService, public roomHistoryService: RoomHistoryService,
        public nfc: NFC, public ndef: Ndef) {
    this.room = navParams.get('param1');
    this.building = this.navParams.get('param2');
    this.getRoomHistory(this.room.id);
    console.log(this.room)
  }


  ionViewDidLoad() {
    this.addNfcListeners();  
  }

  getRoomHistory(roomId){
    this.roomHistoryService.getRoomHistoryByRoomId(roomId)
      .subscribe(
        res => {
         // console.log('Hello!');
          this.roomHistory = res
        },
        err => {
          this.presentToast("Error retreiving history.")
        }
      )
  }

  onAddDetail() {
    if (this.roomDetail.type !== null) {
      if (this.roomDetail.type !== undefined) {
        let detail = {
          type: this.roomDetail.type,
        }
        this.roomDetails.push(detail);
        this.roomDetail.type = null;
        this.presentToast("Detail Added!");
      }
      else {
        this.presentToast("Sorry, No Detail Provided!");
      }
    }
    else {
      this.presentToast("Sorry, No Detail Provided!");
    }
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
    this.roomHistory.action = 'Updated';
    this.roomHistory.date = date.toDateString();
    this.roomHistories.push(this.roomHistory);
    this.room.lastUpdated = date.toDateString();

    let roomWrapper = {
      building: this.building,
      room: this.room,
      histories: this.roomHistories,
      details: this.roomDetails
    }

    this.roomService.createRoom(roomWrapper).subscribe(
      res => {
        this.presentToast("Room Updated!");
      },
      error => {
        this.presentToast("Error Updating Room")
     },
     () => {
        this.navCtrl.push(RoomListPage);
      }
    );
  }

  getBuildings(){
    this.buildingService.getAllBuildings()
      .subscribe(
      res => {
        this.buildings = res

    },
      () => {
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
