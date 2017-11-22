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
  private mainImage: string = "../../assets/photos/inventory.jpg";
  private mobileFlag: boolean = this.mobileInfoService.getMobileFlag();
  private room: Room = new Room;

  constructor(private plt: Platform, private navCtrl: NavController, private navParams: NavParams,
    private barcodeScanner: BarcodeScanner, private itemService: ItemService,
    private toastCtrl: ToastController, private nfc: NFC, private ndef: Ndef, 
    private roomService: RoomService, private mobileInfoService: MobileInfoService) { }


  ionViewDidLoad() {
    if( this.mobileFlag ){
      this.presentToast("Welcome To P.A.M Desktop!");
     } else {
      this.presentToast("Welcome To P.A.M Mobile App!");
      // this.addNfcListeners();          
    }
  }

  checkItemNotNull(item) {
    if(item === undefined) {
      //TO DO: here add code to go add new item page
    }
    else{
      this.navCtrl.push(ItemDisplayPage, {
        param1: this.item
      });
    }
  }

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
       this.itemService.searchItemByCode(barcodeData.text)
       .subscribe(
        // data => console.log(data),
        data => this.item = data,
        error => alert(error),
        () => {
          this.checkItemNotNull(this.item);
          console.log(this.item);
        }
      );
    }, (err) =>{
        console.log('Error: ', err);
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  // addNfcListeners(): void {
  //   this.nfc.addTagDiscoveredListener(()  => {
  //     this.presentToast('successfully attached TagDiscovered listener');
  //     }, (err) => {
  //       this.presentToast(err);
  //     }).subscribe((event) => {
  //       this.goToRoomList(event.tag.id);        
  //   });
  // }

  // goToRoomList(tagId) {
  //   this.presentToast(this.room.nfcCode);    
  //   this.room.nfcCode = this.nfc.bytesToHexString(tagId);  
  //   this.roomService.getRoomByNfcCode(this.room.nfcCode)
  //   .subscribe(
  //     res => { this.room = res,
  //       this.presentToast("Room Found"),
  //       this.navCtrl.push(ItemListPage, {
  //         hasRoom: true,
  //         room: this.room, 
  //       });
  //     },
  //     err => {
  //       this.presentToast("No Room Found."),
  //       this.navCtrl.push(RoomCreatePage, {
  //         hasTag: true,
  //         tagId: tagId,
  //       });
  //     }
  //   )    
  // }

}
