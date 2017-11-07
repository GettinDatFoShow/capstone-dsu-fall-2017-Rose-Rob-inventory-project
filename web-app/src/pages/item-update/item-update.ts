import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ItemService } from '../../provider/item.service';
import { Room } from '../../models/room';
import { ItemDetail } from '../../models/ItemDetail';
import { ItemHistory } from '../../models/ItemHistory';
import { ItemImage } from '../../models/ItemImage';
import { RoomService } from '../../provider/room.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ItemHistoryService } from '../../provider/itemHistory.service';
import {ItemListPage} from "../item-list/item-list";

/**
 * Generated class for the ItemUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-update',
  templateUrl: 'item-update.html',
  providers: [ToastController, RoomService, ItemService]
})
export class ItemUpdatePage {

  base64data: string = null;
  title: string = "Update Item";
  description: string = "";
  item: any = {};
  room: Room = new Room();
  rooms: Room[];
  itemDetail = new ItemDetail();
  itemDetails: ItemDetail[];
  itemHistory: ItemHistory = new ItemHistory();
  itemHistories: ItemHistory[];
  selectRoomOptions: any = {};
  selectBuildingOptions: any = {};
  descriptions: any = [];
  images: ItemImage[];
  image: ItemImage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItemService, public roomService: RoomService,
    public toastCtrl: ToastController, public barcodeScanner: BarcodeScanner, public camera: Camera, public itemHistoryService: ItemHistoryService ) {
    this.item = navParams.get('param1');
    this.room = navParams.get('param2');
    this.getItemHistroy(this.item.id);
    console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemUpdatePage');
  }

  getItemHistroy(itemId) {
    this.itemHistoryService.getItemHistoryByItemId(itemId)
    .subscribe(
      res => this.itemHistories = res,
      err => console.log("error retreiving item history."),
      () => {
        console.log("ITEM HISTORYS RECEIVED!");
        console.log(this.itemHistories);
      }
    )
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

  onUpdate() {
    this.presentToast("Updating Item");
    if(this.itemDetails.length > 0){
        this.item.details = this.itemDetails;
    }
    let date = new Date;
    this.itemHistory.action = 'Updated';
    this.itemHistory.date = date.toDateString();
    this.itemHistories.push(this.itemHistory);
    this.item.lastUpdated = date.toDateString();

    let itemWrapper = {
      item: this.item,
      room: this.room,
      histories: this.itemHistories,
      images: this.images,
      details: this.itemDetails
    }

    this.itemService.createItem(itemWrapper).subscribe(
      res => console.log("response : ", res),
      () => {
        this.presentToast("New Item Created!");
        this.navCtrl.push(ItemListPage);
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
           this.images.push(this.image);
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

  scanRoom() {
    //TO DO: need to add nfc room scanning code here
  }

}
