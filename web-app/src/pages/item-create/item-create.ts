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
  item: Item = new Item();
  room: Room = new Room();
  rooms: Room[];
  building: Building = new Building();
  buildings: Building[];
  itemDetail = new ItemDetail();
  itemDetails: ItemDetail[];
  itemHistory: ItemHistory = new ItemHistory();
  selectRoomOptions: any = {};
  selectBuildingOptions: any = {};
  descriptions: any = [];
  images: ItemImage[];
  image: ItemImage;

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
    this.itemDetails.push(this.itemDetail);
    this.itemDetail = new ItemDetail();
    this.presentToast("Detail Added!");
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
    if(this.itemDetails.length > 0){
        this.item.details = this.itemDetails;
    }
    let date = new Date;
    this.itemHistory.action = 'created';
    this.itemHistory.date = date.toDateString();
    this.item.created = date.toDateString();
    this.item.addedToRoom = date.toDateString();
    this.item.lastUpdated = date.toDateString();
    this.item.room = this.room;
    this.item.histories = [this.itemHistory];

    let newItem = {
      specialCode: this.item.specialCode,
      description: this.item.description,
      color: this.item.color,
      type: this.item.type,
      addedToRoom: date,
      created: date,
      lastUpdated: date,
      active: true,
      cost: this.item.cost,
      location: "coming soon:",
      isPaid: false,
      details: this.item.details,
      room: this.room,
      histories: [this.itemHistory],
      images: this.images
    };
    this.itemService.createItem(newItem).subscribe(
      res => console.log("response : ", res),
      () => {
        this.presentToast("New Item Created!");
        // this.navCtrl.push(ItemListPage);
      }
    );
    console.log(this.item);
  }

  getRooms() {
    this.roomService.getAllRooms().subscribe(
          res => this.rooms = res,
          () => {
            console.log(this.rooms);
          }
      )
  }

  getBuilings() {
    this.buildingService.getAllBuildings().subscribe(
        res => this.buildings = res,
        () => {
          console.log(this.building);
        }
    )
  }

  getAllDescriptions() {
    this.itemService.getAllDescriptions().subscribe(
      res => this.descriptions = res,
      err => console.log(err),
      () => {
        console.log(this.descriptions);
      }
    )
  }

  captureImage() {
    const options : CameraOptions = {
      quality: 100, // picture quality
      // targetWidth: 1000,
      // targetHeight: 1000,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then(
      res => {
         this.base64data = 'data:image/jpeg;base64,'+ res,
         () => {
           this.image.base64string = this.base64data;
          // this.images.push(this.image);
          // this.images.reverse();
         }
      },
      err => console.log(err)
    );

    this.presentToast("image added!")
  }

  getRoomsByBuilding(building) {
    this.roomService.getRoomsByBuildingId(building.id).subscribe(
      data => this.rooms = data,
      () => {
        console.log("new rooms loaded.");
      }
    )
  }

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.item.specialCode = barcodeData.text,
      this.presentToast("Code Scanned!")
    }, (err) =>{
        console.log('Error: ', err);
        this.presentToast("Error: Scanner Not Present!")
    });
  }

}
