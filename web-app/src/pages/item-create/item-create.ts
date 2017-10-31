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
  public images: ItemImage[];
  public image: ItemImage;

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
    this.itemHistory.action = 'created';
    this.itemHistory.date = new Date;
    this.item.created = new Date;
    this.item.addedToRoom = new Date;
    this.item.histories = [this.itemHistory];
    this.itemService.createItem(this.item).subscribe(
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
      targetWidth: 1000,
      targetHeight: 1000,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.image.base64string = this.base64Image;
      this.images.push(this.image);
      this.images.reverse();
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
