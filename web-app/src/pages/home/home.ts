import { ItemService } from './../../provider/item.service';
import { ItemDisplayPage } from './../item-display/item-display';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';
import { RoomService } from '../../provider/room.service';
import { RoomCreatePage } from './../room-create/room-create';
import { ItemListPage } from '../item-list/item-list';
import { Room } from '../../models/room';
import { Item } from '../../models/item';
import { MobileInfoService } from '../../provider/mobileInfo.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private qrData = null;
  private scannedCode = null;
  private item: Item = new Item;
  private mainImage: string = "../../../resources/home.jpg";
  private mobileFlag: boolean = true;
  private room: Room = new Room;

  constructor(private platform: Platform, private navCtrl: NavController, private navParams: NavParams,
    private barcodeScanner: BarcodeScanner, private itemService: ItemService,
    private toastCtrl: ToastController, private nfc: NFC, private ndef: Ndef, 
    private roomService: RoomService, private mobileInfoService: MobileInfoService) { }


  ionViewDidLoad() {
    if( this.platform.is('core') || this.platform.is('mobileweb') || this.platform.is('desktop')){
      this.mobileInfoService.setMobileFlag(false);
     } else {
      this.mobileInfoService.setMobileFlag(true);       
    }
    if( !this.mobileFlag ){
      // this.presentToast("Welcome To P.A.M Desktop!");
     } else {
      // this.presentToast("Welcome To P.A.M Mobile App!");
      this.addNfcListeners();          
    }
  }

  checkItemNotNull(item) {
    if(item === undefined) {
      //TO DO: here add code to go add new item page
    }
    else{
      this.navCtrl.push(ItemDisplayPage, {
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
        // this.presentToast("ID Scanned: " + this.nfc.bytesToHexString(res.tag.id));
        this.vibrate(2000);
        this.searchRooms(this.nfc.bytesToHexString(res.tag.id));
      }, 
      (err) => {
          // this.presentToast(err);
      });
  }

  searchRooms(tagId) {
    this.roomService.getRoomByNfcCode(tagId).subscribe(
      res => {
        this.presentToast("Room: " + this.room.name)
        this.goToItemListPage(res);
      },
      err => {
        this.presentToast("Room Not Found.");
        this.navCtrl.push(RoomCreatePage, {
          hasTag: true,
          tagId: tagId
        });
      }
    );
  }

  vibrate(time:number): void {
    if(navigator.vibrate) {
        navigator.vibrate(time);
    }
  }

  goToItemListPage(room): void {
    this.navCtrl.push(ItemListPage, {
      hasRoom: true,
      room: this.room
    });
  }
}
