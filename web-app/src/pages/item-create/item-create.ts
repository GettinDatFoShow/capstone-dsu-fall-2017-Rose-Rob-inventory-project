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
import { ItemDetail } from './../../models/itemDetail';
// import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  // public photos: any;
  public base64Image: string;
  public title: string = "Create Item";
  public description: string = "";
  public item: Item = new Item();
  public room: Room = new Room();
  public rooms: Room[];
  public building: Building = new Building();
  public buildings: Building[];
  public itemDetail = new ItemDetail();
  public itemDetails: ItemDetail[];
  public itemHistory: ItemHistory = new ItemHistory();
  public selectRoomOptions: any = {};
  public selectBuildingOptions: any = {};
  public descriptions: any = [];

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
    // this.itemHistory.action = 'created';
    // this.itemHistory.date = new Date;
    // this.item.created = new Date;
    // this.item.addedToRoom = new Date;
    // this.item.histories = [this.itemHistory];

    var item = {
      description: "Test Create Item",
      specialCode: "testXOXOXOX",
      type: "code-working",
      color: "blue",
      room: {
        id: "1",
        number: 333,
        name: "SCI"
      },
      addedToRoom: new Date(),
      created: new Date(),
      active: true,
      cost: 33.33,
      isPaid: true,
      itemPicture: "data:image/jpeg;base64,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LNrO3RE/MwIFgNf7ETIuADtGOEamNs/74Z/6sN3r+oAoAcHjfBKUuIero5G3d4AJJnIvGOkJe8W1FfQo6xf+6Xljm5f4jSTNNdmW5+DVja9PL4gFATrAFADpLYMNDVlHUlzy/wCfPZnDmXG5wsXg6gUvZBujpDrDVDQWAtm8RMjQbbu42mHtvoYplsKFsgxGw1+J7pkowHT55PGni5pHU039phVLYf7lmt20rXygsnQy4SI4pvR6/iYy0SHRYyjaZNIuwVsbesFHiTTBjOtfl9JifUfgv4VSZ6y/SD2K+OXEOg9YfCs6GD6TJ9Pw8vBjj2+HtSPLV+l9CP718Kczz+L+kun0uHLX+fxLx4LOXpMce3wjXrCU6F/makExht16EMm5TuK5qJwKYu3AuTuCM/K+g7fzOpwjeyS4XwPWZ48QRdDMKhbWTDFYlNJLlLF44XHZBKY9BBW05yt+Zp3X0KzMItNtFxAJkfnKqXRMKHU3I7n0hfPtKefb4LSapTzgnmMNBHygw3vDP3ZuyBqJ2o0iewlz3YOsvC5dlZqvMthxpf8AT5yWU6TjA9FMUzWO/VK3qB+7wOI6D1/UR1MyVfyTEnrj+ZYilly4xGaGTP2TBQqnq/U0cHz/AP/aAAwDAQACAAMAAAAQ888888428488888888888u0gC88888888888Ebc/08888888w8I4ssWc88888sc/c4ZMnqUU88888sm8uNcSC2o888888s88tii4uw88888oz2AeDNa8088888Qcg87j8E8U4888888407G08sY08888884cc68w88888888848qU8M888888888s8A08Y8888888884osko44IU8888888888c8c8888//EABsRAAEEAwAAAAAAAAAAAAAAABEBEDBQQEFg/9oACAEDAQE/EKU5W3E5rk6L/8QAFxEAAwEAAAAAAAAAAAAAAAAAARFgQP/aAAgBAgEBPxDKIEw7hP/EACgQAQACAgEDAwMFAQAAAAAAAAERIQAxQVFhcRCBkTBAoSCxwdHw4f/aAAgBAQABPxD6ssoAdkToHK6f2YBkrRfhPLnsbUHmH+GBQBE1XARBu/j7sBVW15Wd+JrwYOdCChqKThVieAreDkCMGZTFHeOa65CokEqQBQ8fuvqoF19syUAlVgMB6shAGbvWxHR4AWI5cEwF5ZNo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"
    }
    this.itemService.createItem(item).subscribe(
      res => console.log("response : ", res),
      () => {
        this.presentToast("New Item Created!");
        this.navCtrl.push(ItemListPage);
      }
    ) 
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
      () => {
        console.log(this.descriptions);
      }
    )
  }

  captureImage() {
    const options : CameraOptions = {
      quality: 50, // picture quality
      //targetWidth: 1000,
      //targetHeight: 1000,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      // this.photos.push(this.base64Image);
      //this.photos.reverse();
    }, (err) => {
      console.log(err);
    });
    //TO DO: add code here for capturing an image and setting the this.item.itemPicuter value.
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
