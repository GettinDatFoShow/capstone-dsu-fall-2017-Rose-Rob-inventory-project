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
import { RoomLocation } from '../../models/RoomLocation';
import { Geolocation } from '@ionic-native/geolocation';
import { MobileInfoService } from '../../provider/mobileInfo.service';

@IonicPage()
@Component({
  selector: 'page-room-create',
  templateUrl: 'room-create.html',
  providers: [RoomListPage]
})
export class RoomCreatePage {

  private title: string = "Create Room";
  private room: Room = new Room;
  private roomHistory: RoomHistory = new RoomHistory;
  private building: Building = new Building;
  private buildings: any = [];
  private selectBuildingOptions: any = {};
  private mobileFlag: boolean = this.mobileInfoService.getMobileFlag();
  private hasTag: boolean = false;
  private locations: any = [];
  private location: RoomLocation = new RoomLocation;

  constructor(private nfc: NFC, private navCtrl: NavController, private navParams: NavParams, private roomService: RoomService,
    private roomListPage: RoomListPage, private toastCtrl: ToastController,private geolocation: Geolocation, private buildingService: BuildingService, private mobileInfoService: MobileInfoService) { }

  ionViewDidLoad() {
    this.getBuildings();
    this.hasTag = this.navParams.get('hasTag');
    if (this.hasTag) {
      this.room.nfcCode = this.navParams.get('tagId');
      this.navParams.data = {
        hasTag: false
      };
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

        this.navCtrl.pop();
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

  getCurrentPosition(){
    this.geolocation.getCurrentPosition().then(res =>
      this.room.roomLocation = res.coords.latitude+ " , " +res.coords.longitude,() => {
      this.locations.push(this.location);
    }).catch((error) => {
      // console.log('Location Unavailable.', error);
    });
  }

  addNfcListeners(): void {
    this.mobileInfoService.listen().subscribe( 
      res => {
        this.presentToast("ID Scanned: " + this.nfc.bytesToHexString(res.tag.id));
        this.vibrate(2000);
        this.checkNfcCode(this.nfc.bytesToHexString(res.tag.id));
        this.getCurrentPosition();
      }, 
      (err) => {
      });
  }

  checkNfcCode(tagId) {
    this.roomService.getRoomByNfcCode(tagId).subscribe(
      res => {
        this.presentToast("Sorry, Tag ID already in use.")
      }, err =>{
        this.room.nfcCode = tagId;
      }
    )
  }

  vibrate(time:number):void {
    if(navigator.vibrate) {
        navigator.vibrate(time);
    }
  }
}
