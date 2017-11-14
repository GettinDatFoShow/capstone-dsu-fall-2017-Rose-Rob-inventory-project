import { BuildingService } from './../../provider/building.service';
import { RoomListPage } from './../room-list/room-list';
import { RoomService } from './../../provider/room.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
//import { NFC, Ndef } from '@ionic-native/nfc';
import { RoomDetail } from "../../models/RoomDetail";
import { Room } from "./../../models/room";


/**
 * Generated class for the RoomCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-create',
  templateUrl: 'room-create.html',
  providers: [ToastController, RoomListPage]
})
export class RoomCreatePage implements OnInit{

  title: string = "Create Room";
  name: string = "";
  room: any = {
    specialCode: null,
    name: null,
    number: null,
    location: null,
    created: null,
    lastUpdated: null
  };
  //rooms: any;
  roomDetails: any;
  roomDetail: any ={
    type: null,
    info: null
  };
  roomHistory: any = {
    action: null,
    date: null
  };
  building: any;
  buildings: any;
  selectBuildingOptions: any = {};
  names: any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public roomService: RoomService, public roomListPage: RoomListPage,
              public toastCtrl: ToastController, public buildingService: BuildingService) {//, public nfc: NFC, public ndef: Ndef) {

  }

  ngOnInit() {
    this.getBuildings();
    this.getAllNames();
    this.roomDetails = [];
    this.selectBuildingOptions = {
      title: 'Listed Buildings',
      mode: 'md',
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomCreatePage');
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
    this.room.addedToBuilding = date.toDateString();
    //this.room.histories = [this.roomHistory];
    this.room.location = "coming soon";

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
      () => {
        console.log(this.names);
      }
    )
  }

  scanRoom(){
    //TO DO: code for reading NFC tags
    //this.nfc.write(this.room);
  }
}
