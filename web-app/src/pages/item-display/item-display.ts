import { RoomService } from './../../provider/room-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemListPage } from '../item-list/item-list';
import { ItemService } from '../../provider/item-service';

@IonicPage()
@Component({
  selector: 'page-item-display',
  templateUrl: 'item-display.html',
  providers: [ItemService]
})
export class ItemDisplayPage {

  public item: any = {};
  public room: any = {name: "unknown", number: ""};
  public details: any = [];
  public history: any = [];
  


  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItemService) {
      this.item = navParams.get('param1');
      this.getRoom(this.item.id);
      console.log(this.item);
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDisplayPage');
  }

  checkRoomNotNull(room) {
    if(room === undefined) {
      this.getRoom(this.item.id);
    }
    else{
    }
  }

  getRoom(itemId) {
    this.itemService.getRoomByItem(itemId)
            .subscribe(
              data => this.room = data,
              error => alert("error recieving room."),
              () => {
                console.log("room recieved.");
                console.log(this.room);
              }
            );
  }
}
