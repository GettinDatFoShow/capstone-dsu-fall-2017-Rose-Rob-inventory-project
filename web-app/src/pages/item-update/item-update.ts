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
  displayImage: string = null;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItemService, public roomService: RoomService,
    public toastCtrl: ToastController, public barcodeScanner: BarcodeScanner, public camera: Camera, public itemHistoryService: ItemHistoryService ) {
    this.item = navParams.get('param1');
    this.room = navParams.get('param2');
    this.getItemHistroy(this.item.id);
    this.getItemImages();    
    console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemUpdatePage');
  }

  getItemHistroy(itemId) {
    this.itemHistoryService.getItemHistoryByItemId(itemId)
    .subscribe(
      res => {
        this.itemHistories = res
      },
      err => {
        this.presentToast("Error retreiving history.")
      }
    )
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

  onUpdate() {
    this.presentToast("Updating Item...");
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
      res => {
        this.presentToast("Item Updated!");
      },
      error => {
        this.presentToast("Error Updating Item")
      },
      () => {
        this.navCtrl.push(ItemListPage);
      }
    );
  }

  getRooms() {
    this.roomService.getAllRooms()
      .subscribe(
          res => {
            this.rooms = res
          },
          error => {
            this.presentToast("Error retrieving Rooms")
          }
      )
  }

  getAllDescriptions() {
    this.itemService.getAllDescriptions().subscribe(
      res => {
        this.descriptions = res
      },
      err => {
        this.presentToast("Error retrieving descriptions");
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
    this.roomService.getRoomsByBuildingId(building.id)
    .subscribe(
      data => {
        this.rooms = data;
      },
      error => {
        this.presentToast("Error retrieving Rooms");
      }
    );
  }

  scanCode(){
    this.barcodeScanner.scan()
    .then(
      barcodeData => {
        this.item.specialCode = barcodeData.text,
        this.presentToast("Code Scanned!")
      }, 
      (err) => {
        this.presentToast("Scanner Not Present!")
      });
  }

  scanRoom() {
    //TO DO: need to add nfc room scanning code here
    this.presentToast("NFC Not Available Yet");
  }
  
  getItemImages() {
    this.itemService.getItemImages(this.item.id)
      .subscribe(
        data => {
          this.images = data
        },
        error => {
          this.presentToast("Error retrieving images")
        },
        () => {
          if (this.images.length > 0){
            this.image = this.images[0];
            this.displayImage = this.image.base64string;
          }
        }
      )
  }
}