import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../provider/item.service';
import { ItemDisplayPage } from '../item-display/item-display';
import { ToastController } from 'ionic-angular';
import { ItemUpdatePage } from '../item-update/item-update';
import { RoomUpdatePage } from "../room-update/room-update";
import { Building } from "../../models/building";
import { Room } from '../../models/room';
import { Item } from '../../models/item';

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

  private refreshingFlag: boolean = false;
  private title: string = "Inventory";
  private room: Room = new Room;
  private items: any = [];
  private item: Item = new Item;
  private total: number = 0;
  private header: string = "Items";
  private building: Building = new Building;
  private mobileFlag: boolean = false;
  private hasRoom: boolean = false;

  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController,
    private itemService: ItemService, private barcodeScanner: BarcodeScanner) { }


  ionViewDidLoad() {
    this.hasRoom = this.navParams.get('hasRoom');
    if (this.hasRoom) {
      this.room = this.navParams.get('room');
    }
    this.mobileFlag = this.navParams.get('mobileFlag');
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

  buttonTapped(event, item) {
    this.item = item;
    this.navCtrl.push(ItemDisplayPage, {
      item: this.item,
      room: this.room
    });
  };

  checkItemNotNull(item) {
    if(item === undefined) {
      this.presentToast("Item Needs Updating")
      this.navCtrl.push(ItemUpdatePage, {
        mobileFlag: this.mobileFlag,
        item: this.item
      })
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

  updateClicked(event) {
    this.navCtrl.push(RoomUpdatePage, {
      mobileFlag: this.mobileFlag,      
      room: this.room,
      building: this.building
    });
  };

  }
