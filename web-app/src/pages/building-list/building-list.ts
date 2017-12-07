import { RoomListPage } from './../room-list/room-list';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ItemService } from './../../provider/item.service';
import { ItemDisplayPage } from './../item-display/item-display';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BuildingService } from '../../provider/building.service';
import { Room } from '../../models/room';
import { Item } from '../../models/item';
import { Building } from '../../models/building';
import { RoomService } from '../../provider/room.service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { NFC } from '@ionic-native/nfc';
import { ItemListPage } from '../item-list/item-list';
import { RoomCreatePage } from '../room-create/room-create';
import { MobileInfoService } from '../../provider/mobileInfo.service';
import { Vibration } from '@ionic-native/vibration';
import { HomePage } from '../home/home';
import { ItemCreatePage } from '../item-create/item-create';

/**
 * Generated class for the BuildingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-building-list',
  templateUrl: 'building-list.html',
  providers: [ItemService, RoomService, ToastController]
})
export class BuildingListPage {

  private buildings: any = [];
  private building: Building = new Building;
  private item: Item = new Item;
  private room: Room = new Room;
  private total: number = 0;
  private mobileFlag: boolean = this.mobileInfoService.getMobileFlag();
  private showDetails: boolean = false;

  constructor(private navCtrl: NavController, private navParams: NavParams, private buildingServices: BuildingService,
    private itemService: ItemService, private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController,
    private mobileInfoService: MobileInfoService, private roomService: RoomService, private nfc: NFC, private vibration: Vibration) { }

  getAll() {
    this.buildingServices.getAllBuildings()
      .subscribe(
        //data => console.log(data),
        data => {
          this.buildings = data,
          this.total = this.buildings.length;
        },
        error => {
          this.presentToast(error)
        }
      );
  }

  ionViewDidEnter() {
    this.getAll();
    if(this.mobileFlag) {
      this.addNfcListeners();
    }
  }

  ionViewDidLeave() {
    if(this.mobileFlag) {
      this.removeNfcListner();
    }
  }

  buttonTapped(event, building) {
    this.building = building;
    this.navCtrl.push(RoomListPage, {
      hasBuilding: true,
      building: this.building
    });
  };

  checkItemNotNull(item) {
    if(item === undefined) {
      //TO DO: here add code to go add new item page
    }
    else{
      this.navCtrl.push(ItemDisplayPage, {
        mobileFlag: this.mobileFlag,
        item: this.item
      });
    }
  }

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
       this.itemService.searchItemByCode(barcodeData.text)
       .subscribe(
        data => this.item = data,
        error => {
            this.presentToast("Item Not Found");
            this.navCtrl.setRoot(ItemCreatePage,
              {
                hasSpecialCode: true,
                specialCode: barcodeData.text
              });
              this.navCtrl.popToRoot();
            }
      );
    }, (err) =>{
        // console.log('look right here!!!: ', err);
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
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

  searchRooms(tagId) {
    this.roomService.getRoomByNfcCode(tagId).subscribe(
      res => {
        this.room = res
        this.presentToast("Room: " + this.room.name);
        this.goToItemListPage(this.room);
      },
      err => {
        this.navCtrl.setRoot(RoomCreatePage, {
          hasTag: true,
          tagId: tagId
        });
        this.navCtrl.popToRoot();
      }
    );
  }

  vibrate(time:number): void {
    this.vibration.vibrate(time);
  }

  goToItemListPage(room): void {
    this.navCtrl.setRoot(ItemListPage, {
      hasRoom: true,
      room: this.room
    });
    this.navCtrl.popToRoot();
  }

  showDetail() {
    this.showDetails = !this.showDetails;
  }

}
