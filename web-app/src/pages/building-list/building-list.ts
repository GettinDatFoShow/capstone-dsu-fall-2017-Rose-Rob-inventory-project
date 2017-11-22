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
  
  constructor(private navCtrl: NavController, private navParams: NavParams, private buildingServices: BuildingService,
    private itemService: ItemService, private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController,
    private mobileInfoService: MobileInfoService, private roomService: RoomService, private nfc: NFC) { }

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

  ionViewDidLoad() {
    this.getAll();
    if(this.mobileFlag) {
      this.addNfcListeners();
    }
  }

  buttonTapped(event, building) {
    this.building = building;
    this.navCtrl.push(RoomListPage, {
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
        error => alert(error),
        () => {
          this.checkItemNotNull(this.item);
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
    this.nfc.addTagDiscoveredListener(()  => {
      this.presentToast('successfully attached TagDiscovered listener');
      }, (err) => {
        this.presentToast(err);
      }).subscribe((event) => {
        this.goToRoomList(event.tag.id);
    });
    this.nfc.addNdefListener(() => {
      this.presentToast('successfully attached Ndef listener');
      }, (err) => {
        this.presentToast(err);
      }).subscribe((event) => {
        this.goToRoomList(event.tag.id);
    });
    this.nfc.addNdefFormatableListener(() => {
      this.presentToast('successfully attached NdefFormatable listener');
      }, (err) => {
        this.presentToast(err);
      }).subscribe((event) => {
        this.goToRoomList(event.tag.id);
      });
  }

  goToRoomList(tagId) {
    this.presentToast(this.room.nfcCode);
    this.room.nfcCode = this.nfc.bytesToHexString(tagId);
    this.roomService.getRoomByNfcCode(this.room.nfcCode)
    .subscribe(
      res => { this.room = res,
        this.presentToast("Room Found"),
        this.navCtrl.push(ItemListPage, {
          hasRoom: true,
          room: this.room,
        });
      },
      err => {
        this.presentToast("No Room Found."),
        this.navCtrl.push(RoomCreatePage, {
          hasTag: true,
          tagId: tagId,
        });
      }
    )

  }

}
