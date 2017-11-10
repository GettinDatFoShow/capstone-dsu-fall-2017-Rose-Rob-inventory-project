import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../provider/item.service';
import { ItemDisplayPage } from '../item-display/item-display';
import { ToastController } from 'ionic-angular';
import { ItemUpdatePage } from '../item-update/item-update';
/**
 * Generated class for the ItemListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
  providers: [ToastController, ItemService]
})

export class ItemListPage {

  public refreshingFlag: boolean = false;
  public title: string = "Inventory";
  public room: any = {};
  public items: any = [];
  public error: any;
  public item: any = {};
  public roomFlag: boolean = false;
  public total: number = 0;
  public header: string = "Items";

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
              public itemService: ItemService, public barcodeScanner: BarcodeScanner) {
    this.room = navParams.get('param1');
    this.checkRoomNotNull(this.room);
  }

  refresh() {
    this.presentToast("Refreshing List.."); 
    this.refreshingFlag = true;   
    this.checkRoomNotNull(this.room);
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  checkRoomNotNull(room) {
    if(room === undefined) {
      this.getAll();
    }
    else{
      this.title = "Room " + this.room.name + " " + this.room.number + ": Inventory";
      this.getRoomItems(this.room.id);
      this.roomFlag = true;
    }
  }

  getRoomItems(roomId) {
    this.itemService.getItemsByRoomId(roomId)
    .subscribe(
      data => this.items = data,
      error => {
        this.presentToast("Error retrieving Items");
      },
      () => {
        this.total = this.items.length;
        this.header = this.room.name + " " + this.room.number + " currently has " + this.total + " items listed.";
        if(this.refreshingFlag === true ){
          this.presentToast("Room List is Fresh!"); 
          this.refreshingFlag = false;
        }
      }
    );
  }

  getAll() {
    this.itemService.getAllItems()
        .subscribe(
          data => this.items = data,
          error => {
            this.presentToast("Error retrieving Items");
          },
          () => {
            this.total = this.items.length;
            this.header = this.total + " items listed.";
            if(this.refreshingFlag === true ){
              this.presentToast("List is Fresh!"); 
              this.refreshingFlag = false;
            }
          }
        );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemListPage');
  }

  buttonTapped(event, item) {
    this.item = item;
    this.navCtrl.push(ItemDisplayPage, {
      param1: this.item,
      param2: this.room
    });
  };

  checkItemNotNull(item) {
    if(item === undefined) {
      this.presentToast("Item Needs Updating")
      this.navCtrl.push(ItemUpdatePage, {
        param1: this.item
      })
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
        data => {
          this.item = data,
          this.presentToast("Item Found!")
        },
        error => {
          this.presentToast("Error finding Item")
        },
        () => {
          this.checkItemNotNull(this.item);
        }
      );
    }, (err) =>{
        this.presentToast("No Scanner Present!")
    });
  }
  

  }
