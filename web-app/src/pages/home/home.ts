import { ItemService } from './../../provider/item.service';
import { ItemDisplayPage } from './../item-display/item-display';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';
import { RoomService } from '../../provider/room.service';
import { RoomListPage } from './../room-list/room-list';
import { RoomCreatePage } from '../room-create/room-create';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ItemService, ToastController, RoomService]
})
export class HomePage {

  public qrData = null;
  public scannedCode = null;
  public item: any;
  public mainImage: string = "../../assets/photos/inventory.jpg";
  public mobileFlag: boolean = true;
  public room: any =  {
    nfcCode: null,
    name: null,
    number: null,
    location: null,
    created: null,
    lastUpdated: null
  };

  constructor(public plt: Platform, public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner, public itemService: ItemService,
    public toastCtrl: ToastController, public nfc: NFC, public ndef: Ndef, public roomService: RoomService) {
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

  ionViewDidLoad() {
    this.addNfcListeners();    
    // console.log('ionViewDidLoad');
    // if( this.plt.is('core') || this.plt.is('mobileweb')){
    //   this.presentToast("Welcome To P.A.M Desktop!")
    // }
    // else {
    //   this.presentToast("Welcome To P.A.M Mobile App!")
    // }
  }

  addNfcListeners():void {
    this.nfc.addTagDiscoveredListener(()  => {
      this.presentToast('successfully attached TagDiscovered listener');
      }, (err) => {
        this.presentToast(err);
      }).subscribe((event) => {
        this.presentToast(this.nfc.bytesToHexString(event.tag.id));
        this.room.nfcCode = this.nfc.bytesToHexString(event.tag.id); 
        this.nfc.bytesToHexString(event.tag.id)      
        this.presentToast(this.room.nfcCode);
        this.roomService.getRoomByNfcCode(this.room.nfcCode);
        this.navCtrl.push(RoomListPage, {
          param1: this.room
        });
    });
    this.nfc.addNdefListener(() => {
      this.presentToast('successfully attached Ndef listener');
      }, (err) => {
        this.presentToast(err);
      }).subscribe((event) => {
        this.presentToast(this.nfc.bytesToHexString(event.tag.id));
        this.room.nfcCode = this.nfc.bytesToHexString(event.tag.id); 
        this.nfc.bytesToHexString(event.tag.id)      
        this.presentToast(this.room.nfcCode);
        this.roomService.getRoomByNfcCode(this.room.nfcCode);
        this.navCtrl.push(RoomListPage, {
          param1: this.room
        });
    });
    this.nfc.addNdefFormatableListener(() => {
      this.presentToast('successfully attached NdefFormatable listener');
      }, (err) => {
        this.presentToast(err);
      }).subscribe((event) => {
        this.presentToast(this.nfc.bytesToHexString(event.tag.id));
        this.room.nfcCode = this.nfc.bytesToHexString(event.tag.id); 
        this.nfc.bytesToHexString(event.tag.id)      
        this.presentToast(this.room.nfcCode);
        this.roomService.getRoomByNfcCode(this.room.nfcCode);
        this.navCtrl.push(RoomListPage, {
          param1: this.room
        });
    });
  }

  tagListenerSuccess(event: Event) {
    this.presentToast("FOUND NFC");
    this.vibrate(2000);
  }
  
  vibrate(time:number):void {
    if(navigator.vibrate) {
        navigator.vibrate(time);
    }
  }

}
