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

@IonicPage()
@Component({
  selector: 'page-room-update',
  templateUrl: 'room-update.html',
})
export class RoomUpdatePage {

  private title: string = "Update Room";
  private room: Room = new Room;
  private roomHistory: RoomHistory = new RoomHistory;
  private roomHistories: any = [];
  private building: Building = new Building;
  private buildings: any = [];
  private selectBuildingOptions: any = {};
  private mobileFlag: boolean = this.mobileInfoService.getMobileFlag();
  
  constructor(private navCtrl: NavController, private navParams: NavParams, private roomService: RoomService,
    private toastCtrl: ToastController, private buildingService: BuildingService,
    private roomHistoryService: RoomHistoryService,
    private nfc: NFC, private mobileInfoService: MobileInfoService) {}

  ionViewDidLoad() {
    this.room = this.navParams.get('room');
    this.building = this.navParams.get('building');
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
    // this.roomHistories.push(this.roomHistory);
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


  addNfcListeners(): void {
    this.mobileInfoService.listen().subscribe( 
      res => {
        this.presentToast("ID Scanned: " + this.nfc.bytesToString(res.tag.id));
        this.vibrate(2000);
        this.checkNfcCode(this.nfc.bytesToString(res.tag.id));
      }, 
      (err) => {
          this.presentToast(err);
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
