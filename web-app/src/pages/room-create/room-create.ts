import { BuildingService } from './../../provider/building.service';
import { RoomListPage } from './../room-list/room-list';
import { RoomService } from './../../provider/room.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Room } from '../../models/room';
import { RoomDetail } from '../../models/RoomDetail';
import { RoomHistory } from '../../models/RoomHistory';
import { Building } from '../../models/building';

@IonicPage()
@Component({
  selector: 'page-room-create',
  templateUrl: 'room-create.html',
  providers: [ToastController, RoomListPage, NFC, Ndef]
})
export class RoomCreatePage {

  private title: string = "Create Room";
  private name: string = "";
  private room: Room = new Room;
  private roomDetails: any = [];
  private roomDetail: RoomDetail = new RoomDetail;
  private roomHistory: RoomHistory = new RoomHistory;
  private building: Building = new Building;
  private buildings: any = [];
  private selectBuildingOptions: any = {};
  private names: any = [];
  private mobileFlag: boolean = false;
  private hasTagFlag: boolean = false;

  constructor(private nfc: NFC, private navCtrl: NavController, private navParams: NavParams, private roomService: RoomService,
    private roomListPage: RoomListPage, private toastCtrl: ToastController, private buildingService: BuildingService) { }

  ionViewDidLoad() {
    this.getBuildings();
    this.getAllNames();
    this.mobileFlag = this.navParams.get('mobileFlag');
    this.hasTagFlag = this.navParams.get('hasTag');
    if (this.hasTagFlag) {
      this.room.nfcCode = this.navParams.get('tagId');
    }
    if (this.mobileFlag) {
      this.addNfcListeners();
    }
    this.roomDetails = [];
    this.selectBuildingOptions = {
      title: 'Listed Buildings',
      mode: 'md',
    };
  }

  onAddDetail() {
    if (this.roomDetail.type !== null) {
      if (this.roomDetail.type !== undefined) {
        let detail = {
          type: this.roomDetail.type
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

  presentToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  onCreate(){
    this.presentToast("Creating New Room");
    let date = new Date;
    this.roomHistory.action = 'created';
    this.roomHistory.date = date.toDateString();
    this.room.created = date.toDateString();
    //this.room.addedToBuilding = date.toDateString();
    this.room.roomlocation = "coming soon";

    let roomWrapper = {
      room: this.room,
      building: this.building,
      number: this.room.number,
      name: this.room.name,
      histories: [this.roomHistory],
      details: this.roomDetails
    };

    this.roomService.createRoom(roomWrapper).subscribe(
      res => {
        this.presentToast("New Room Created!")
      },
      (err) => {
        this.presentToast("Oh No! Room Not Created");
      },
      () => {

        this.navCtrl.push(RoomListPage, {
          mobileFlag: this.mobileFlag
        });
      }
    );
  }

  getBuildings() {
    this.buildingService.getAllBuildings().subscribe(
      res => this.buildings = res,
      (err) => {
        this.presentToast("Error retrieving Buildings");
      }
    )
  }

  getAllNames(){
    this.roomService.getAllRooms().subscribe(
      res => this.names = res,
      err => console.log(err),
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
