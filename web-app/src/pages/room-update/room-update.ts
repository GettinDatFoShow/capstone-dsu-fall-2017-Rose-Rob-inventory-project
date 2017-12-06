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
import { MobileInfoService } from '../../provider/mobileInfo.service';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-room-update',
  templateUrl: 'room-update.html',
})
export class RoomUpdatePage {

  options: GeolocationOptions;
  private title: string = "Edit Room";
  private room: Room = new Room;
  private roomHistory: RoomHistory = new RoomHistory;
  private roomHistories: any = [];
  private building: Building = new Building;
  private buildings: any = [];
  private selectBuildingOptions: any = {};
  private mobileFlag: boolean = this.mobileInfoService.getMobileFlag();
  private locations: any = [];
  //private location: RoomLocation = new RoomLocation;

  constructor(private navCtrl: NavController, private navParams: NavParams, private roomService: RoomService,
    private toastCtrl: ToastController, private buildingService: BuildingService,
    private roomHistoryService: RoomHistoryService, private geolocation: Geolocation,
    private nfc: NFC, private mobileInfoService: MobileInfoService, private vibration: Vibration) {}

  ionViewDidLoad() {
    this.room = this.navParams.get('room');
    this.getBuilding(this.room.id);
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

  ionViewDidLeave() {
    this.removeNfcListner();
  }

  getRoomHistory(){
    this.roomHistoryService.getRoomHistoryByRoomId(this.room.id)
      .subscribe(
        res => {
          this.roomHistory = res
        },
        err => {
          // this.presentToast("Error retreiving history.")
        }
      )
  }

  getCurrentPosition(){
    this.options = {
      enableHighAccuracy : true
    };
     this.geolocation.getCurrentPosition(this.options).then(res => {
       console.log(res.coords);
       this.room.latitude = res.coords.latitude.toString(),
       this.room.longitude = res.coords.longitude.toString()
     }).catch((error) => {
       console.log('Location Unavailable.', error);
     });
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
    this.getCurrentPosition();
    let date = new Date;
    let roomHistory = {
      action: 'Updated',
      date: date.toDateString()
    }
    this.roomHistories.push(roomHistory)
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
        // this.presentToast(error)
     },
     () => {
        this.navCtrl.pop();
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
        }
      );
  }

  getBuilding(roomId) {
    this.buildingService.findBuildingByRoom(roomId).subscribe(
      res => {
        this.building = res;
      },
      err => {
        // this.presentToast("unable to find building.")
      }
    )
  }

  addNfcListeners(): void {
    this.mobileInfoService.listen().subscribe(
      res => {
        this.presentToast("ID Scanned: " + this.nfc.bytesToHexString(res.tag.id));
        this.vibrate(2000);
        this.checkNfcCode(this.nfc.bytesToHexString(res.tag.id));
      },
      (err) => {
          // this.presentToast(err);
      });
  }

  removeNfcListner() {
    this.mobileInfoService.listen().subscribe().unsubscribe();
  }

  checkNfcCode(tagId) {
    this.roomService.getRoomByNfcCode(tagId).subscribe(
      res => {
        this.presentToast("Sorry, Tag ID already in use.")
      }, err => {
        this.room.nfcCode = tagId;
      }
    )
  }

  vibrate(time:number):void {
    this.vibration.vibrate(time);
  }

}
