import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ItemListPage } from './../item-list/item-list';
import { RoomService } from './../../provider/room.service';
import { ItemService } from './../../provider/item.service';
import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BuildingService } from '../../provider/building.service';
import { Item } from '../../models/item';
import { Room } from '../../models/room';
import { Building } from '../../models/building';
import { ItemDetail } from '../../models/ItemDetail';
import { ItemHistory } from '../../models/ItemHistory';
import { ItemImage } from '../../models/ItemImage';
import { MobileInfoService } from '../../provider/mobileInfo.service';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { Vibration } from '@ionic-native/vibration';

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
  providers: [ItemListPage]
})
export class ItemCreatePage {
  options: GeolocationOptions;
  private hasSpecialCode = true;
  private createdCode = null;
  private base64data: string = null;
  private title: string = "Create Item";
  private description: string = "";
  private item: Item = new Item;
  private room: Room = new Room;
  private rooms: any = [];
  private building: Building = new Building;
  private buildings: any = [];
  private itemDetail: ItemDetail = new ItemDetail;
  private itemDetails: any = [];
  private itemHistory: ItemHistory = new ItemHistory;
  private selectRoomOptions: any = {};
  private selectBuildingOptions: any = {};
  private descriptions: any = [];
  private images: any = [];
  private image: ItemImage = new ItemImage;
  private mobileFlag: boolean = this.mobileInfoService.getMobileFlag();
  private hasRoom: boolean;
  private showCode: boolean = false;
  private selectRoom: string = "Select Room";

  constructor(private navCtrl: NavController, private navParams: NavParams, private itemService: ItemService, private itemListPage: ItemListPage,
    private roomService: RoomService, private toastCtrl: ToastController, private buildingService: BuildingService, private barcodeScanner: BarcodeScanner,
    private camera: Camera,private mobileInfoService: MobileInfoService, private geolocation: Geolocation, private nfc: NFC, private ndef: Ndef, private vibration: Vibration ) {  }

  ionViewDidEnter() {
    this.getBuilings();
    this.getRooms();
    this.getAllDescriptions();
    this.itemDetails = [];
    this.hasRoom = this.navParams.get('hasRoom');
    this.hasSpecialCode = this.navParams.get('hasSpecialCode');
    if(this.hasRoom){
      this.room = this.navParams.get('room');
      this.selectRoom = this.room.name+ " " +this.room.number;
    }
    if(this.hasSpecialCode){
      this.item.specialCode = this.navParams.get('specialCode');
    }
    this.selectRoomOptions = {
      title: 'Listed Rooms',
      mode: 'md',
    };
    if(this.mobileFlag) {
      this.addNfcListeners();
    }
  }

  ionViewDidLeave() {
    if(this.mobileFlag){
      this.removeNfcListner();      
    }
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
    this.item.lastAudit = date.toDateString();
    this.item.isPaid = false;
    this.item.active = true;

    let itemWrapper = {
      item: this.item,
      room: this.room,
      histories: [itemHistory],
      images: this.images,
      details: this.itemDetails,
      // locations: this.locations
    };

    this.itemService.createItem(itemWrapper).subscribe(
      res => {
        this.presentToast("New Item Created!")
      },
      (err) => {
        // this.presentToast("Oh No! Item Not Created");
      },
      () => {
       // this.navCtrl.pop();
      }
    );
  }

  getRooms() {
    this.roomService.getAllRooms().subscribe(
      res => this.rooms = res,
      (err) => {
        // this.presentToast("Error retrieving Rooms");
      }
    )
  }

  getBuilings() {
    this.buildingService.getAllBuildings().subscribe(
      res => this.buildings = res,
      (err) => {
        // this.presentToast("Error retrieving Buildings");
      }
    )
  }

  getAllDescriptions() {
    this.itemService.getAllDescriptions().subscribe(
      res => this.descriptions = res,
      err => {
        // this.presentToast("Error retrieving Descriptions!");
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
           // if(this.images === undefined || this.images === null){
           //   this.images = [];
            
            this.image.base64string = this.base64data;
            this.images.unshift(this.image); 
            this.presentToast("Image Added!");
          }
      },
      (err) => {
        this.presentToast("No Camera Present!")
      }
    );
  }

  getCurrentPosition(){
    this.options = {
      enableHighAccuracy : true
    };
     this.geolocation.getCurrentPosition(this.options).then(res => {
      //  console.log(res.coords);
       this.item.latitude = res.coords.latitude.toString(),
       this.item.longitude = res.coords.longitude.toString()
     }).catch((error) => {
      //  console.log('Location Unavailable.', error);
     });
  }

  getRoomsByBuilding(building) {
    this.roomService.getRoomsByBuildingId(building.id).subscribe(
      data => this.rooms = data,
      (err) => {
        // this.presentToast("Error retrieving Rooms");
      }
    )
  }

  createCode() {
    this.createdCode = this.item.specialCode;
  }

  scanCode() {
    this.barcodeScanner.scan()
    .then(
      barcodeData => {
        this.itemService.searchItemByCode(barcodeData.text).subscribe(
          res => {
            this.presentToast("Code alread used.");
          }, error => {
            this.getCurrentPosition();                
            this.item.specialCode = barcodeData.text,
            this.presentToast("Code Added");
          }
        );
      },
      (err) => {
        this.presentToast("Scanner Not Present!")
      });
  }

  addNfcListeners(): void {
    this.mobileInfoService.listen().subscribe(
      res => {
        this.vibrate(2000);
        this.searchRooms(this.nfc.bytesToHexString(res.tag.id));
      },
      (err) => {
      });
  }

  removeNfcListner() {
    this.mobileInfoService.listen().subscribe().unsubscribe();
  }

  showCodeClick(){
    this.showCode = !this.showCode;
  }

  searchRooms(tagId: string) {
    this.roomService.getRoomByNfcCode(tagId).subscribe(
      res => {
        this.room = res;
        this.presentToast("Room: " + this.room.name)
      },
      err => {
      }
    );
  }

  vibrate(time: number): void {
    this.vibration.vibrate(time);
  }

}
