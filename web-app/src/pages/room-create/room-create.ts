import { BuildingService } from './../../provider/building.service';
import { RoomService } from './../../provider/room.service';
import { RoomListPage } from './../room-list/room-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Room } from '../../models/room';
import { RoomHistory } from '../../models/RoomHistory';
import { Building } from '../../models/building';
// create and import room location
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-room-create',
  templateUrl: 'room-create.html',
  providers: [ToastController, RoomListPage, BuildingService, NFC, Ndef]
})
export class RoomCreatePage {

  private title: string = "Create Room";
  private name: string = "";
  private room: Room = new Room;
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
    this.selectBuildingOptions = {
      title: 'Listed Buildings',
      mode: 'md',
    };
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
    //this.roomLocations = "coming soon";

    let roomWrapper = {
      room: this.room,
      building: this.building,
      histories: [this.roomHistory]
    };

    this.roomService.createRoom(roomWrapper).subscribe(
      res => {
        this.presentToast("New Room Created!")
      },
      (err) => {
        this.presentToast("Oh No! Room Not Created");
      },
      () => {

        this.navCtrl.push(RoomListPage);
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
