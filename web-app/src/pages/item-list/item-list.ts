import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../provider/item-service';
import { Item } from '../../provider/models/item';
import { Observable } from 'rxjs/Observable';
import { CurrencyPipe } from '@angular/common';
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
  public item: Item;
  public roomFlag: boolean = false;
  public totalItems: number;
  public header: string = "Items";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = "Inventory";
    console.log(navParams.get('param1'));
    this.room = navParams.get('param1');
    console.log("Room: ", this.room);
    this.checkRoomNotNull(this.room);
  }

  refresh() {
    this.checkRoomNotNull(this.room);
  }

  checkRoomNotNull(room) {
    var room = room;
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
    var itemSC = item.specialCode;
    this.itemService.searchItem(itemSC)
    .subscribe(
      // data => console.log(data),
      data => this.item = data,
      error => alert(error),
      () => {
        console.log(this.item);
        console.log("finished")
      }
    );
    };

  }
