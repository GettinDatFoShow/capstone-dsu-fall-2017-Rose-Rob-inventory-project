import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomService } from '../../provider/room-service';
import { Room } from '../../provider/models/room';
import { Observable } from 'rxjs/Observable';
import { CurrencyPipe } from '@angular/common';
import { ItemListPage } from '../../pages/item-list/item-list';


/**
 * Generated class for the RoomListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-list',
  templateUrl: 'room-list.html',
})
export class RoomListPage {

  public rooms: any;
  public error: any;
  public room: Room;

  constructor(public navCtrl: NavController, public navParams: NavParams, public roomService: RoomService) {
    this.getAllRooms();
  }

  getAllRooms() {
    this.roomService.getAllRooms()
      .subscribe(
        // data => console.log(data),
        data => this.rooms = data,
        error => alert(error),
        () => {
          console.log(this.rooms);
          console.log("finished")
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomListPage');
  }

  roomTapped(event, room) {
    this.room = room;
    this.navCtrl.push(ItemListPage, {
      param1: room
    });
  };

}
