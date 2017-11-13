///<reference path="../../models/ItemDetail.ts"/>
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BuildingService } from './../../provider/building.service';
import { Room } from './../../models/room';
import { Building } from './../../models/building';
import { ItemListPage } from './../item-list/item-list';
import { ItemHistory } from './../../models/ItemHistory';
import { RoomService } from './../../provider/room.service';
import { ItemService } from './../../provider/item.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from './../../models/item';
import { ItemDetail } from './../../models/ItemDetail';
// import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ItemImage } from './../../models/ItemImage';
/**
 * Generated class for the ItemCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html',
  providers: [ToastController, ItemListPage]
})
export class ItemCreatePage implements OnInit {

  base64data: string = null;
  title: string = "Create Item";
  description: string = "";
  item: any = {
    specialCode: null,
    description: null,
    color: null,
    type: null,
    addedToRoom: null,
    created: null,
    lastUpdated: null,
    active: null,
    cost: null,
    isPaid: null,
    location: null
  };
  room: any;
  rooms: any;
  building: any;
  buildings: any;
  itemDetail: any = {
   type: null,
   info: null 
  };
  itemDetails: any;
  itemHistory: any = {
   action: null,
   date: null
  };
  selectRoomOptions: any = {};
  selectBuildingOptions: any = {};
  descriptions: any = [];
  images: any;
  image: any = {
   base64string: null 
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItemService, public itemListPage: ItemListPage,
    public roomService: RoomService, public toastCtrl: ToastController, public buildingService: BuildingService, public barcodeScanner: BarcodeScanner, public camera: Camera) {

  }

  ngOnInit() {
    this.getBuilings();
    this.getRooms();
    this.getAllDescriptions();
    this.itemDetails = [];
    this.selectRoomOptions = {
      title: 'Listed Rooms',
      mode: 'md',
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemCreatePage');
  }

  onAddDetail() {
    if (this.itemDetail.info !== null && this.itemDetail.type !== null) {
      if (this.itemDetail.info !== undefined && this.itemDetail.type !== undefined) {
        let detail = {
          type: this.itemDetail.type,
          info: this.itemDetail.info
        }
        this.itemDetails.push(detail);
        this.itemDetail.info = null;
        this.itemDetail.type = null;
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

  onCreate() {
    this.presentToast("Creating New Item");
    let date = new Date();
    let itemHistory = {
      date: date.toDateString(),
      action: "created"
    }
    this.item.created = date.toDateString();
    this.item.addedToRoom = date.toDateString();
    this.item.lastUpdated = date.toDateString();
    this.item.isPaid = false;
    this.item.active = true;
    this.item.location = "comming soon";

    let itemWrapper = {
      item: this.item,
      room: this.room,
      histories: [itemHistory],
      images: this.images,
      details: this.itemDetails
    };

    this.itemService.createItem(itemWrapper).subscribe(
      res => {
        this.presentToast("New Item Created!")
      },
      (err) => {
        this.presentToast("Oh No! Item Not Created");
      },
      () => {
        
        this.navCtrl.push(ItemListPage);
      }
    );
  }

  getRooms() {
    this.roomService.getAllRooms().subscribe(
      res => this.rooms = res,
      (err) => {
        this.presentToast("Error retrieving Rooms");
      }
    )
  }

  getBuilings() {
    this.buildingService.getAllBuildings().subscribe(
      res => this.buildings = res,
      (err) => {
        this.presentToast("Error retrieving Buildings");
      }
    )
  }

  getAllDescriptions() {
    this.itemService.getAllDescriptions().subscribe(
      res => this.descriptions = res,
      err => {
        this.presentToast("Error retrieving Descriptions!");
      }
 
    )
  }

  captureImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then(
      res => {
        this.base64data = 'data:image/jpeg;base64,' + res,
          () => {
            if(this.images === undefined || this.images === null){
              this.images = [];
            }
            this.image.base64string = this.base64data;
            this.images.push(this.image);
            this.presentToast("Image Added!");
          }
      },
      (err) => {
        this.presentToast("No Camera Present!")
      }
    );
  }

  getRoomsByBuilding(building) {
    this.roomService.getRoomsByBuildingId(building.id).subscribe(
      data => this.rooms = data,
      (err) => {
        this.presentToast("Error retrieving Rooms");
      }
    )
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.item.specialCode = barcodeData.text,
        () => {
          this.presentToast("Code Added!")
        }
    }, (err) => {
        this.presentToast("No Scanner Present!")
    }
    );
  }

  scanRoom() {
    //TO DO: need to add nfc room scanning code here
    this.presentToast("NFC Not Available Yet");
  }

}
