import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ItemService } from '../../provider/item.service';
import { Room } from '../../models/room';
import { ItemImage } from '../../models/ItemImage';
import { RoomService } from '../../provider/room.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ItemHistoryService } from '../../provider/itemHistory.service';
import { ItemListPage } from "../item-list/item-list";
import { ItemDetailService } from '../../provider/itemDetails.service'
import { NFC, Ndef } from '@ionic-native/nfc';
import { ItemDetail } from '../../models/ItemDetail';
import { Item } from '../../models/item';
import { MobileInfoService } from '../../provider/mobileInfo.service';
import { Vibration } from '@ionic-native/vibration';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-item-update',
  templateUrl: 'item-update.html',
  providers: [ItemDetailService]
})
export class ItemUpdatePage {

  options: GeolocationOptions;
  private createdCode: string = null;
  private base64data: string = null;
  private title: string = "Edit Item";
  private description: string = "";
  private item: Item = new Item;
  private room: Room = new Room;
  private rooms: any = [];
  private itemDetail: ItemDetail = new ItemDetail;
  private itemDetails: any = [];
  private itemHistories: any = [];
  private selectRoomOptions: any = {};
  private selectBuildingOptions: any = {};
  private descriptions: any = [];
  private images: any = [];
  private image: ItemImage;
  private displayImage: string = null;
  private mobileFlag: boolean = this.mobileInfoService.getMobileFlag();
  private locations: any = [];
  private showCode: boolean = false;

  constructor(private navCtrl: NavController, private navParams: NavParams, private itemService: ItemService, private roomService: RoomService,
    private toastCtrl: ToastController, private barcodeScanner: BarcodeScanner, private camera: Camera,
    private itemHistoryService: ItemHistoryService, private itemDetailService: ItemDetailService, private nfc: NFC, private ndef: Ndef,
    private mobileInfoService: MobileInfoService, private geolocation: Geolocation, private vibration: Vibration ) { }

  ionViewDidLoad() {
    this.item = this.navParams.get('item');
    this.room = this.navParams.get('room');
    this.itemHistories = this.navParams.get('history');
    this.itemDetails = this.navParams.get('details');
    this.getItemHistroy();
    this.getItemImages();
    this.getItemDetails();
    if (this.mobileFlag) {
      this.addNfcListeners();
    }
  }

  ionViewDidLeave() {
    this.removeNfcListner();
  }

  getItemHistroy() {
    this.itemHistoryService.getItemHistoryByItemId(this.item.id)
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
    this.getCurrentPosition();
    let date = new Date();
    let itemHistory = {
          action: 'Updated',
          date: date.toDateString()
    }
    this.itemHistories.push(itemHistory);
    this.item.lastUpdated = date.toDateString();

    let itemWrapper = {
      item: this.item,
      room: this.room,
      histories: this.itemHistories,
      images: this.images,
      details: this.itemDetails
    }

    this.itemService.updateItem(itemWrapper).subscribe(
      res => {
        this.presentToast("Item Updated!");
        () => {
          this.navCtrl.push(ItemListPage, {
            mobileFlag: this.mobileFlag,
            room: this.room
          });
        }
      },
      error => {
        this.presentToast(error)
      }
    );
  }

  getCurrentPosition(){
    this.options = {
      enableHighAccuracy : true
    };
     this.geolocation.getCurrentPosition(this.options).then(res => {
       console.log(res.coords);
       this.item.latitude = res.coords.latitude.toString(),
       this.item.longitude = res.coords.longitude.toString()
     }).catch((error) => {
       console.log('Location Unavailable.', error);
     });
  }

  getRooms() {
    this.roomService.getAllRooms()
      .subscribe(
          res => {
            this.rooms = res
          },
          error => {
            // this.presentToast("Error retrieving Rooms")
          }
      )
  }

  getAllDescriptions() {
    this.itemService.getAllDescriptions().subscribe(
      res => {
        this.descriptions = res
      },
      err => {
        // this.presentToast("Error retrieving descriptions");
      }
    )
  }

  getItemDetails(){
    this.itemDetailService.getItemDetails(this.item.id)
    .subscribe(
      data => this.itemDetails = data,
      error => {
        // this.presentToast("Error retrieving details")
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
        // this.presentToast("Error retrieving Rooms");
      }
    );
  }


  showCodeClick() {
    this.showCode = !this.showCode;
  }

  createCode() {
    this.createdCode = this.item.specialCode;
  }

  scan(){
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

  addNfcListeners(): void {
    this.mobileInfoService.listen().subscribe(
      res => {
        this.vibration.vibrate(2000);
        let tagId = this.nfc.bytesToHexString(res.tag.id);
    }, err => {
    }
    )
  }

  removeNfcListner() {
    this.mobileInfoService.listen().subscribe().unsubscribe();
  }

  getRoom(tagId) {
    this.roomService.getRoomByNfcCode(tagId)
    .subscribe(
      res => {
        this.room = res,
        this.presentToast("Room Found!");
        let itemHistory = {
          action: "Room Changed",
          date: new Date().toDateString
        }
      },
      err => {
        this.presentToast("No Room Found.")
      }
    );
  }

}
