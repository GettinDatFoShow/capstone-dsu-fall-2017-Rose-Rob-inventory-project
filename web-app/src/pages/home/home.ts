import { ItemService } from './../../provider/item.service';
import { ItemDisplayPage } from './../item-display/item-display';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ItemService, ToastController]
})
export class HomePage {

  public qrData = null;
  public scannedCode = null;
  public item: any;
  public mainImage: string = "../../assets/photos/inventory.jpg";
  public mobileFlag: boolean = true;

  constructor(public plt: Platform, public navCtrl: NavController, 
    private barcodeScanner: BarcodeScanner, public itemService: ItemService,
    public toastCtrl: ToastController) {
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
    // console.log('ionViewDidLoad');
    if( this.plt.is('core') || this.plt.is('mobileweb')){
      this.presentToast("Welcome To P.A.M Desktop!")
    }
    else {
      this.presentToast("Welcome To P.A.M Mobile App!")
    }
  }

}