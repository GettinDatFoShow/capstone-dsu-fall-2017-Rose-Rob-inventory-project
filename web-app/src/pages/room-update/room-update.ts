import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ItemService } from '../../provider/item.service';
import { RoomHistory} from "../../models/RoomHistory";
import { RoomDetail } from "../../models/RoomDetail";
import { RoomService } from '../../provider/room.service';
import { RoomHistoryService } from '../../provider/roomHistory.service';
import { BuildingService } from './../../provider/building.service';
import { Building } from './../../models/building';
import { RoomListPage } from './../room-list/room-list';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Room } from '../../models/room';
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

  private title: string = "Update Room";
  private name: string = "";
  private room: Room = new Room;
  private roomDetail = new RoomDetail;
  private roomDetails: any = [];
  private roomHistory: RoomHistory = new RoomHistory;
  private roomHistories: any = [];
  private building: Building = new Building;
  private buildings: any = [];
  private selectBuildingOptions: any = {};
  private names: any = [];
  private mobileFlag: boolean = false;


  constructor(private navCtrl: NavController, private navParams: NavParams, private roomService: RoomService, 
    private toastCtrl: ToastController, public buildingService: BuildingService, 
    private roomHistoryService: RoomHistoryService,
    private nfc: NFC, private ndef: Ndef) {}

  ionViewDidLoad() {
    this.room = this.navParams.get('room');
    this.building = this.navParams.get('building');
    this.mobileFlag = this.navParams.get('mobileFlag')
    this.getRoomHistory(this.room.id);
    if(this.mobileFlag) {
      this.addNfcListeners();        
    }
    this.presentToast("mobel flag = " + this.mobileFlag)
  }

  getRoomHistory(roomId){
    this.roomHistoryService.getRoomHistoryByRoomId(roomId)
      .subscribe(
        res => {
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
