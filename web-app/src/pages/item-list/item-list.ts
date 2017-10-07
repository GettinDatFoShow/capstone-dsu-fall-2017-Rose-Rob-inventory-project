import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../provider/item-service';
import { ItemDisplayPage } from '../item-display/item-display';
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
  providers: [ItemService]
})

export class ItemListPage {

  public title: string = "Inventory";
  public room: any = {};
  public items: any = [];
  public error: any;
  public item: any = {};
  public roomFlag: boolean = false;
  public totalItems: number = 0;
  public header: string = "Items";

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public itemService: ItemService, public barcodeScanner: BarcodeScanner) {
    this.room = navParams.get('param1');
    console.log("Room: ", this.room);
    console.log(this.room);
    this.checkRoomNotNull(this.room);
  }

  refresh() {
    this.checkRoomNotNull(this.room);
  }

  checkRoomNotNull(room) {
    if(room === undefined) {
      this.getAllItems();
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
      error => alert(error),
      () => {
        console.log(this.items);
        console.log("Retrieved Room Items.");
        this.totalItems = this.items.length;
        this.header = this.room.name + " " + this.room.number + " currently has " + this.totalItems + " items listed.";
      }
    );
    }

  getAllItems() {
    this.itemService.getAllItems()
        .subscribe(
          // data => console.log(data),
          data => this.items = data,
          error => alert(error),
          () => {
            console.log(this.items);
            console.log("Retrieved All Items.");
            this.totalItems = this.items.length;
            this.header = "Inventory has " + this.totalItems + " items listed.";
          }
        );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemListPage');
  }

  itemTapped(event, item) {
    this.item = item;
    this.navCtrl.push(ItemDisplayPage, {
      param1: this.item,
      param2: this.room
    });
  };

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

  }
